import express from "express";
import _ from "lodash";
import "dotenv/config";
import morgan from "morgan";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes";

const app = express();

app.listen(3000);
// connect to the database
const dbURI = process.env.DATABASE_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=> console.log('connected to database'))
.catch((err)=>console.log(err))

// view engine

app.set('view engine', 'ejs');
app.set('views','templates')

//routers
app.use(blogRoutes);


// page routers
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