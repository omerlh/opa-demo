package common.service2service
import data.services
import input.attributes.request.http as http_request

default allow = false

jwt_payload = _value {
    verified_jwt := input.attributes.metadata_context.filter_metadata["envoy.filters.http.jwt_authn"]["fields"]["jwt-metadata"]
    _value := {
        "client_id": verified_jwt["Kind"]["StructValue"]["fields"]["client_id"]["Kind"]["StringValue"]
    }
}

allow {
    jwt_payload.client_id == services[i].client_id
    http_request.path == services[i].allowed_routes[j].path
    http_request.method == services[i].allowed_routes[j].method
}


