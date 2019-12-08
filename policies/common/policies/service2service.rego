package common.service2service
import data.services

allow {
    input.claims.iss[_] == services[i].issuer
    input.claims.appid[_] == services[i].client_id
}

allow {
    input.claims.iss[_] == services[i].issuer
    input.claims.client_id[_] == services[i].client_id
}

allow {
    input.claims.iss[_] == services[i].issuer
    input.claims.sub == services[i].client_id
}

allow {
    input.claims.iss[_] == services[i].issuer
    services[i].client_id == "*"
}