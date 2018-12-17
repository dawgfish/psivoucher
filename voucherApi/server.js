const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;

const basicAuth = require('express-basic-auth');
const mysql = require('mysql');

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nutanix/4u',
    database: 'psivoucher'
});
 
// connect to database
mc.connect();

app.listen(port);

console.log('PSI Voucher API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(basicAuth({
    users: { 'admin': 'nutanix/4u' }
}))

var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route

