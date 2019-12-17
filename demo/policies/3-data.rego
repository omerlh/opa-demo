package opa.demo.c
import data.kids

default allow = false

allow {
    input["name"] = kids[i].name 
    input["candies"] < kids[i].candies_limit
}