'use strict';

const express         = require('express');
const exphbs          = require('express-handlebars');
const bodyParser      = require('body-parser');
const path            = require('path');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('.hbs', exphbs({defaultLayout: 'layout',
                           extname: '.hbs',
                           layoutsDir: __dirname + '/views/layouts'}));
app.set('views', __dirname + '/views');
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));

require('./router/route')(app);

app.listen(3000);
console.log('Listening on port 3000...');
