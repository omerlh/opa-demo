/* eslint-disable */

var path = require("path");
var express = require("express");
var webpack = require("webpack");
var config = require("./webpack.config");
var axios = require("axios")

var app = express();
var compiler = webpack(config);

var serverPort = process.env.PORT || 3000;

app.use(require("webpack-dev-middleware")(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static('assets'))

app.get("/awesome", async function(req, res){
  const response = await axios.get(`http://host.docker.internal:8001/api/v1/namespaces/default/services/oauth-client/proxy`, {
    validateStatus: function (status) {
      return true; // default
    },
  });
  res.send(response.data);
})

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(serverPort, "0.0.0.0", function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening at http://localhost:" + serverPort);
});
