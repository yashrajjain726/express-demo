const Joi = require("joi");  // to add validations and make required things such as entering string of length 6 char containing symbols, capital char,and too much.
const helmet = require('helmet');
const morgan = require('morgan'); // returing each log in console of any request such as get,post,put,delete,with errors too.
const express = require("express");
const logger =  require('./middleware/logger'); 
const config = require('config'); // to add configuration for each env using config folder
const debug = require('debug')('app:startup')  // to set debug module instead of console.log for each enviroment.
const courses =  require('./routes/courses');
const home =  require('./routes/home') ; 

const app = express();

app.set('view engine','pug') // to return html outputs inplace of json
app.set('views','./views'); //default setting
// Configuration
console.log('Application Name:'+ config.get('name'));
console.log('Mail Server Name:'+ config.get('mail.host')); 
console.log('Mail Server Password:'+ config.get('mail.password')); 

app.use(express.json()); // to load json formats
app.use(express.urlencoded({extended:true})); 
app.use(express.static('public')); // to load static pages 
app.use(helmet());
app.use('/api/courses',courses);
app.use('/',home);


if(app.get('env')==='development')  // to get the env variable and set it.
{
  app.use(morgan('tiny'));
  debug('Morgan Enabled....') // instead of console.log() using debug module
}


// PORTS
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
