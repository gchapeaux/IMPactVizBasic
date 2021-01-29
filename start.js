const express = require('express');
const path = require('path');
const Token = require('./static/js/viewer/token.js');

var app = express();


app.use('/static', express.static(__dirname + '/static'));
app.use(express.json({ limit: '50mb' }));
app.use('/api/forge/oauth', require('./static/js/viewer/oauth'));
app.use('/api/forge/oss', require('./static/js/viewer/oss'));
app.use('/api/forge/modelderivative', require('./static/js/viewer/modelderivative'));

app.get('/forge/oauth/token', (req, res) =>
    new Token().getTokenPublic(tokenPublic => res.status(200).end(tokenPublic.access_token))
);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html')); 
});
app.listen(3000, function () {
    console.log('Server listening on port 3000')
}); 