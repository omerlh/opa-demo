
const credentials = {
    client: {
      id: 'client',
      secret: 'secret'
    },
    auth: {
      tokenHost: 'http://localhost:5000',
      tokenPath: '/connect/token'
    }
  };
   
const oauth2 = require('simple-oauth2').create(credentials);
const http = require('http');


const tokenConfig = {
  scope: 'api1', // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
};
 
// Optional per-call http options
const httpOptions = {};
 
async function main()
{
    // Get the access token object for the client
    try {
    const result = await oauth2.clientCredentials.getToken(tokenConfig, httpOptions);
    const accessToken = oauth2.accessToken.create(result);
    console.log(accessToken)
    } catch (error) {
    console.log('Access Token error', error.message);
    }
}

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('Hello, World!\n');
}

const server = http.createServer(requestListener);
server.listen(5008);

console.log("server listens on 5008")

//main();