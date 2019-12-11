import React from 'react';
import { GraphQL, GraphQLProvider, useGraphQL } from 'graphql-react'
import styled from 'styled-components'
import { useTable, useSortBy }  from 'react-table';
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  color: green
`;

const graphql = new GraphQL()

const Styles = styled.div`
  padding: 1rem;

  table {
    margin: auto
    border-spacing: 0;
    border: 1px solid black;
    color: green;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const columns = [
    {
      Header: 'Name',
      accessor: 'metadata.name',
      headerStyle: { whiteSpace: 'unset' },
    },
    {
        Header: 'Ready',
        accessor: 'status',
        headerStyle: { whiteSpace: 'unset' },
        Cell: ({ cell: { value }, column: { id } }) => <p style={{margin: 0}}> {value.availableReplicas} / {value.replicas} </p>,
      },

      {
        Header: 'Containers',
        accessor: 'spec.template.spec.containers',
        headerStyle: { whiteSpace: 'unset' },
        Cell: ({ cell: { value }, column: { id } }) => <p style={{margin: 0}}> {value.map(c => c.name).join(", ")} </p>,
      },
  ];

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
      initialState: {
          sortBy: [
              {
                  id: 0,
                  desc: false   
              }
          ]
      }
    }, useSortBy)
  
    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
    )
  }

const DeploymentList = ({ name }) => {
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
        query: `# Write your query or mutation here
        query getAllDeploymentInDefaultNamespace {
          all(namespace: "default") {
            deployments {
              items {
                metadata {
                  name
                }
                spec {
                  template {
                    spec {
                      containers {
                        name
                      }
                    }
                  }
                }
                status {
                  availableReplicas
                  replicas
                }
              }
            }
          }
        }
        `
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
  
    return cacheValue.data ? (
        <Styles>
      <Table columns={columns} data={cacheValue.data.all.deployments.items} />
    </Styles>
    ) : loading ? (
      // Data is often reloaded, so don’t assume loading indicates no data.
      'Loading…'
    ) : (
      // Detailed error info is available in the `cacheValue` properties
      // `fetchError`, `httpError`, `parseError` and `graphQLErrors`. A combination
      // of errors is possible, and an error doesn’t necessarily mean data is
      // unavailable.
      'Error!'
    )
  }
  

export default class DeploymentListContainer extends React.Component {
    state = {
      persons: []
    }

    componentDidMount() {
      setInterval(() => {
        graphql.reload();
      }, 1000);
    }  
  
    render() {
      return (
        <div style={{color: "33FF00"}}>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center",
  alignItems: "center", width: "80%", margin: "auto"}}>
        <p style={{color: "green"}}>$ kubectl get deployments -w</p>
        <FadeLoader
          css={override}
          size={60} // or 150px
          color={"green"}
          loading={true}
        />
        </div>
        <GraphQLProvider graphql={graphql}>
            <DeploymentList name="pikachu" />
        </GraphQLProvider>
        </div>
      )
    }
  }