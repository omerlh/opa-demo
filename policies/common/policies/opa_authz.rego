# The "system" namespace is reserved for internal use
# by OPA. Authorization policy must be defined under
# system.authz as follows:
package system.authz

default allow = false  # Reject requests by default.

allow {
  input.method == "POST"
  input.path == ["v1", "data", "authorization", "rest", "allow"]
}

allow {
  input.method == "GET"
  input.path == ["health"]
}