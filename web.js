var app = require('./config/express')();

app.listen('8003',function(){
    console.log('Server start : 8003');
    //return ('Server start : 8003');
});
exports = module.exports = app;
