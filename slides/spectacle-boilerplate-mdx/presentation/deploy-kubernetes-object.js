import React from 'react';
import { GraphQL, GraphQLProvider, useGraphQL } from 'graphql-react'
//import query from 'raw-loader!../assets/deployment-oauth-server.graphql';

const graphql = new GraphQL()

const DeployKubernetesObject = ({ name }) => {
    // The useGraphQL hook can be used just the same for queries or mutations.
    const { loading, cacheValue = {} } = useGraphQL({
      // Any GraphQL API can be queried in components, where fetch options for
      // the URL, auth headers, etc. are specified. To avoid repetition it’s a
      // good idea to import the fetch options override functions for the APIs
      // your app uses from a central module. The default fetch options received
      // by the override function are tailored to the operation; typically the
      // body is JSON but if there are files in the variables it will be a
      // FormData instance for a GraphQL multipart request.
      fetchOptionsOverride(options) {
        options.url = 'http://localhost:8080'
      },
  
      // The operation typically contains `query` and sometimes `variables`, but
      // additional properties can be used; all are JSON encoded and sent to the
      // GraphQL server in the fetch request body.
      operation: {
        query: `mutation createDeployment {
                  createAppsV1NamespacedDeployment(namespace: \"default\", _26Input: \"{\\r\\n  \\\"apiVersion\\\": \\\"apps\\/v1\\\",\\r\\n  \\\"kind\\\": \\\"Deployment\\\",\\r\\n  \\\"metadata\\\": {\\r\\n    \\\"name\\\": \\\"oauth-server2\\\",\\r\\n    \\\"labels\\\": {\\r\\n      \\\"app\\\": \\\"oauth-server2\\\"\\r\\n    }\\r\\n  },\\r\\n  \\\"spec\\\": {\\r\\n    \\\"replicas\\\": 1,\\r\\n    \\\"selector\\\": {\\r\\n      \\\"matchLabels\\\": {\\r\\n        \\\"app\\\": \\\"oauth-server2\\\"\\r\\n      }\\r\\n    },\\r\\n    \\\"template\\\": {\\r\\n      \\\"metadata\\\": {\\r\\n        \\\"labels\\\": {\\r\\n          \\\"app\\\": \\\"oauth-server2\\\"\\r\\n        }\\r\\n      },\\r\\n      \\\"spec\\\": {\\r\\n        \\\"containers\\\": [\\r\\n          {\\r\\n            \\\"name\\\": \\\"oauth-server\\\",\\r\\n            \\\"image\\\": \\\"quay.io\\/omerlh\\/oauth-server:latest\\\",\\r\\n            \\\"imagePullPolicy\\\": \\\"Always\\\",\\r\\n            \\\"ports\\\": [\\r\\n              {\\r\\n                \\\"containerPort\\\": 9999\\r\\n              }\\r\\n            ]\\r\\n          }\\r\\n        ]\\r\\n      }\\r\\n    }\\r\\n  }\\r\\n}\")  
                  {
                        metadata {
                                name
                                creationTimestamp
                                }
                        }
                }`
      },
  
      // Load the query whenever the component mounts. This is desirable for
      // queries to display content, but not for on demand situations like
      // pagination view more buttons or forms that submit mutations.
      loadOnMount: true,
  
      // Reload the query whenever a global cache reload is signaled.
      loadOnReload: true,
  
      // Reload the query whenever the global cache is reset. Resets immediately
      // delete the cache and are mostly only used when logging out the user.
      loadOnReset: true
    })
  
    return cacheValue.graphQLErrors ? (
        `Error ${cacheValue.graphQLErrors[0].message}`
    ) : cacheValue.data ? (
        `deployment ${cacheValue.data.createAppsV1NamespacedDeployment.metadata.name} created`
    ) : loading ? (
      // Data is often reloaded, so don’t assume loading indicates no data.
      'Dployment in progress...'
    ) : (
      // Detailed error info is available in the `cacheValue` properties
      // `fetchError`, `httpError`, `parseError` and `graphQLErrors`. A combination
      // of errors is possible, and an error doesn’t necessarily mean data is
      // unavailable.
      'Error!'
    )
  }
  

export default class DeployKubernetesObjectContainer extends React.Component {
    state = {
      persons: []
    }
  
    render() {
      return (
        <GraphQLProvider graphql={graphql}>
            <DeployKubernetesObject />
        </GraphQLProvider>
      )
    }
  }