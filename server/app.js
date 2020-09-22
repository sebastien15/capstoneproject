const express = require('express');
const _ = require('lodash');
const app = express();

app.listen(3000);

// view engine

app.set('view engine', 'ejs');
app.set('views','templates')

app.get('/',(req,res)=>{
    // res.sendFile('./templates/index.ejs',{ root: __dirname })
    res.render('index')
})

app.get('/contact',(req,res)=>{
    // res.sendFile('./templates/pages/contact.html',{ root: __dirname })
    res.render('pages/contact')
})

app.use((req,res)=>{
    // res.sendFile('./templates/pages/404.html',{ root: __dirname })
    res.render('pages/404',{title: 'sebasttien'})
})