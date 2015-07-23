var express = require('express'),
    app     = express(),
    path    = require('path'),
    port    = 5005;

app.disable('etag');

app.get('/',  function(req, res){
    res.sendFile( path.join(__dirname, '../app/index.html'));
});

app.use(express.static( path.join( __dirname, '../app') ));
app.listen(port);

console.log('Magic happens on port ' + port);


