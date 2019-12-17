# OPA REST Authorization Demo

## Repo structure

* Demo - contains a short OPA demo, showing basic rego functionality. 
To run, make sure you have OPA run in server mode with the policies, using:
```
opa run -s demo/policies
```
* oauth-server - issue tokens for the demo, based on IdentityServer
* demo-server - dummy server written in NodeJS, used to demo authN/Z
* policies - contains our authZ policies
* bundle-uploader - script that bundle the policies
* deployment - Kubernetes manifest files
* bundle-packer - script for bundling the policies

## Running the Demo

Deploy all the services:
```
kubectl apply -f deployment/
```

Bundle and upload the policies (make sure you have minio [client installed](https://min.io/download#/macos)):
```
mkdir dist
node bundle-packer/index.js 
minio=$(kubectl get pods -l component=minio -o=jsonpath='{.items[0].metadata.name}')
kubectl port-forward $minio 9000:9000
mc config host add minio http://localhost:9000 minio minio123
mc cp dist/ minio/bundles
```

And now, you can run a pod on the cluster and use it to test the setup. 
Run the pod using:

```
kubectl run -it --restart=Never --image curlimages/curl curl /bin/sh
```

Request a token using:
```
curl -X POST \
  http://oauth-server/connect/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&client_id=client&client_secret=secret&scope=api1'
```

And now you can test the authorization.

This request is authorized:
```
curl -H "Authorization: Bearer <access token>" http://oauth-client/api/v1/sensitive
```

While this request is not:
```
curl -H "Authorization: Bearer <access token>" http://oauth-client/api/v2/sensitive
```
