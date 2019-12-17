package authorization.rest
import data.common

default allow = false

allow {
   common.service2service.allow
}