const express = require('express');
const { result } = require('lodash');
// const _ = require('lodash');
const mongoose = require('mongoose');
const app = express();
const Blog = require('../models/blog')

app.listen(3000);

// connect to the database
const dbURI = 'mongodb+srv://test123:test123@cluster0.gczn8.mongodb.net/portifolio?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=> console.log('connected to database'))
.catch((err)=>console.log(err))

// view engine

app.set('view engine', 'ejs');
app.set('views','templates')

//midlleware and static files

app.use(express.static('templates'))
app.use(express.urlencoded({ extended: true }))

// mingoose and mongo sandbox routes

// save a blog
app.post('/add-blog',(req,res)=>{
    const blog = new Blog({
        title: 'new blog title',
        snippet: 'new blog snippet',
        body: 'new blog body bodyy'
    });
    blog.save().then((result)=>{
        res.send(result)
        res.redirect('/')
    }).catch(err=>{
        console.log(err)
    })
});
// retrieve all blogs
app.get('/all-blogs',(req,res)=>{
    Blog.find().then(result=>{res.send(result)})
    .catch(err=>{console.log(err)})
})
// search a single blog
app.get('/single-blog/:id',(req,res)=>{
    const id = req.params.id
    Blog.findById(id).then(result=>{res.send(result)})
    .catch(err=>console.log(err))
})
app.delete('/deleteBlog/:id',(req,res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then(result=>{res.json({ redirect:'/'})})
})
// app.update('/deleteBlog',(req,res)=>{
//     Blog.findByIdAndUpdate('5f623628f5ac58208c2a6a9e')
//     .then(result=>{res.json({ redirect:'/'})})
// })
// routes
app.get('/',(req,res)=>{res.render('index')})

app.get('/contact',(req,res)=>{res.render('pages/contact')})
app.get('/blog',(req,res)=>{res.render('pages/blog')})

app.use((req,res)=>{ res.render('pages/404',{title: 'sebasttien'})})