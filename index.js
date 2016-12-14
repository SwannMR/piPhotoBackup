'use strict';

const express         = require('express');
const exphbs          = require('express-handlebars');
const bodyParser      = require('body-parser');
//const server          = require('http').createServer(app);
//const io              = require('socket.io')(server);

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('.hbs', exphbs({defaultLayout: 'layout',
                           extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static('public'));

require('./router/route')(app);

app.listen(3000);
console.log('Listening on port 3000...');
