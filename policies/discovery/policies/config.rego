package discovery

config = {
  "bundles": {
    "common": {
      "service": "service-registry",
      "resource": "bundles/common.tar.gz"
    },
    "web-api": {
      "service": "service-registry",
      "resource": bundle_name
    }
  },
  "decision_logs": {
    "console": true
  },
  "plugins": {
    "envoy_ext_authz_grpc": {
      "addr": "0.0.0.0:9191",
      "dry-run": false,
      "query": "data.authorization.rest.allow"
    }
  }
}

bundle_name = sprintf("bundles/%s.tar.gz", [runtime_config.labels.app])