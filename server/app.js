import express from "express";
import _ from "lodash";
import "dotenv/config";
import morgan from "morgan";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.listen(3000);
// connect to the database
const dbURI = process.env.DATABASE_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=> console.log('connected to database'))
.catch((err)=>console.log(err))

// view engine

app.set('view engine', 'ejs');
app.set('views','templates');
app.use(morgan('dev'));

// middleware and static files

app.use(express.static('templates'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routers
app.use(blogRoutes);
app.use(authRoutes);

// page routers
app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/contact',(req,res)=>{
    res.render('pages/contact')
})
app.get('/blog',(req,res)=>{
    res.render('pages/blog')
})
app.get('/blogSingle',(req,res)=>{
    res.render('pages/blogSingle')
})

app.use((req,res)=>{
    res.render('pages/404',{title: 'sebasttien'})
})