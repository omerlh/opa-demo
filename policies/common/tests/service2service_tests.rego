package common.service2service

services = [
    {
        "client_id": "a",
        "issuer": "b"
    },
    {
        "client_id": "*",
        "issuer": "d"
    },
    {
        "client_id": "c",
        "issuer": "b"
    }
]

test_allow {
    allow with input as {"claims": {"sub": "a", "iss": ["b"]}, "path": "/api/v1/device"}  with data.services as services 
}

test_allow_ad_client {
    allow with input as {"claims": {"appid": ["a"], "iss": ["b"]}, "path": "/api/v1/device"}  with data.services as services 
}

test_allow_cognito_client {
    allow with input as {"claims": {"client_id": ["a"], "iss": ["b"]}, "path": "/api/v1/device"}  with data.services as services 
}

test_disallowed_client {
    not allow with input as {"claims": {"sub": "z", "iss": ["b"]}, "path": "/api/v1/device"}  with data.services as services 
}

test_disallowed_issuer {
    not allow with input as {"claims": {"sub": "z", "iss": ["c"]}, "path": "/api/v1/device"}  with data.services as services 
}

test_issuer_allowed_with_any_client {
    allow with input as {"claims": {"sub": "z", "iss": ["d"]}, "path": "/api/v1/device"}  with data.services as services 
}