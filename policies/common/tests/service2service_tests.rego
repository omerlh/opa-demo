package common.service2service

services = [
    {
        "client_id": "client",
        "allowed_routes": [
                {
                    "path": "/api/v1/sensitive",
                    "method": "GET"
                }
            ]
    }
]

enovy_allowed_input = {
        "attributes": {
            "metadata_context": {
                "filter_metadata": {
                    "envoy.filters.http.jwt_authn": {
                        "fields": {
                            "jwt-metadata": {
                                "Kind": {
                                    "StructValue": {
                                        "fields": {
                                            "client_id": {
                                                "Kind": {
                                                    "StringValue": "client"
                                                }
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "request": {
                "http": {
                    "method": "GET",
                    "path": "/api/v1/sensitive",
                }
            }
        }
}

enovy_disallow_client = {
        "attributes": {
            "metadata_context": {
                "filter_metadata": {
                    "envoy.filters.http.jwt_authn": {
                        "fields": {
                            "jwt-metadata": {
                                "Kind": {
                                    "StructValue": {
                                        "fields": {
                                            "client_id": {
                                                "Kind": {
                                                    "StringValue": "client2"
                                                }
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "request": {
                "http": {
                    "method": "GET",
                    "path": "/api/v1/sensitive",
                }
            }
        }
}

enovy_disallow_path = {
        "attributes": {
            "metadata_context": {
                "filter_metadata": {
                    "envoy.filters.http.jwt_authn": {
                        "fields": {
                            "jwt-metadata": {
                                "Kind": {
                                    "StructValue": {
                                        "fields": {
                                            "client_id": {
                                                "Kind": {
                                                    "StringValue": "client"
                                                }
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "request": {
                "http": {
                    "method": "GET",
                    "path": "/api/v1/sensitive2",
                }
            }
        }
}

enovy_disallow_method = {
        "attributes": {
            "metadata_context": {
                "filter_metadata": {
                    "envoy.filters.http.jwt_authn": {
                        "fields": {
                            "jwt-metadata": {
                                "Kind": {
                                    "StructValue": {
                                        "fields": {
                                            "client_id": {
                                                "Kind": {
                                                    "StringValue": "client"
                                                }
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "request": {
                "http": {
                    "method": "POST",
                    "path": "/api/v1/sensitive",
                }
            }
        }
}


test_allow {
    allow with input as enovy_allowed_input with data.services as services 
}

test_disallow_client {
    not allow with input as enovy_disallow_client with data.services as services 
}

test_disallow_method {
    not allow with input as enovy_disallow_method with data.services as services 
}

test_disallow_path {
    not allow with input as enovy_disallow_path with data.services as services 
}