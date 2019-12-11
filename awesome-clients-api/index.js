
const axios = require('axios');
const express = require('express')
const app = express()
const port = 3000

app.get('/api/v1/awesomeClients', async (req, res) => {
    var token = await getToken();

    var response = await axios({
        baseURL: 'http://clients-api',
        method: 'get',
        url: '/clients',
        headers: {'Authorization': `Bearer ${token}`}
      });
    
    res.send(getAwesomeClients(response.data.clients));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

async function getAwesomeClients(clients)
{
    //TBD
    return clients;
}

async function getToken()
{
    const credentials = {
        client: {
          id: 'awesome-clients-api',
          secret: 'secret'
        },
        auth: {
          tokenHost: 'http://oauth-server',
          tokenPath: '/connect/token'
        }
      };

    const oauth2 = require('simple-oauth2').create(credentials);

    const tokenConfig = {
        scope: 'clients-api', 
    };

    const httpOptions = {};

    const result = await oauth2.clientCredentials.getToken(tokenConfig, httpOptions);
    const accessToken = oauth2.accessToken.create(result);

    return accessToken;
}
//main();