package common.service2service
import data.services


allow {
    input.claims.iss[_] == services[i].issuer
    input.claims.sub == services[i].client_id
}