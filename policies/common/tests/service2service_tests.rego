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