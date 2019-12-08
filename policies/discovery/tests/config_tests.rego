package discovery

mock_config = {"labels": {"app": "a"}} 

test_resource_should_be_app_name {
    c := config with runtime_config as mock_config
    c.bundles["web-api"].resource == "bundles-v2/a.tar.gz"
    c.bundles["web-api"].service == "service-registry"
}

test_should_include_common_bundle {
    c := config with runtime_config as mock_config
    c.bundles["common"].resource == "bundles-v2/common.tar.gz"
    c.bundles["common"].service == "service-registry"
}

test_should_enable_access_logs {
    c := config with runtime_config as mock_config
    c["decision_logs"].console == true
}