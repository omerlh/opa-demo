package opa.demo.b

default allow=false

allow {
    input["candies"] < 5
}