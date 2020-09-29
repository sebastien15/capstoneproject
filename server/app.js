import express from "express";
import _ from "lodash";
import "dotenv/config";
import morgan from "morgan";
import mongoose from "mongoose";
import appRoutes from "./routes/routes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.listen(5000);
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
app.use(appRoutes);
app.use(authRoutes);
app.use((req,res)=>{res.render('pages/404',{title: 'sebasttien'})});
