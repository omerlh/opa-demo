package discovery
runtime_config = config {
  output := opa.runtime()
  config := output.config  
}