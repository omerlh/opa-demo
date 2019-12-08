package authorization.rest
import data.common

default allow = false

allow {
   input.parsed_path = ["api", "v1", "products"]
   input.parsed_query.lang = ["en"]
}