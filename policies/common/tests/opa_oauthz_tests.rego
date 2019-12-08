package system.authz

test_allow_authz_path {
    allow with input as {"method": "POST", "path": ["v1", "data", "authorization", "rest", "allow"]} 
}

test_allow_health {
    allow with input as {"method": "GET", "path": ["health"]} 
}

test_not_allowed_method {
    not allow with input as {"method": "GET", "path": ["v1", "data", "authorization", "rest", "allow"]} 
}

test_not_allowed_path {
    not allow with input as {"method": "GET", "path": ["v1", "data", "t", "rest", "allow"]} 
}