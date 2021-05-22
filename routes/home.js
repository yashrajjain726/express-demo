const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index',{title:'My Express App',message:'Hello World'}) // loading  index.pug from views folder .(it is used to return things in html format)
   });

module.exports =  router;