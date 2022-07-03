const express=require('express');
const connectDb=require('./config/db');
const handlebars=require('express-handlebars');
const Handlebars=require('handlebars');
const path=require('path');
const bodyParser=require('body-parser')
const multer=require('multer');

//Route path
const fw=require('./Route/first_window');
 
const PORT=process.env.PORT||3000;

 
const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//set front end parameter
app.engine('hbs',handlebars.engine({
    extname:'hbs',
    defaultLayout:false
}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'view/'));
app.use(express.static(path.join(__dirname,"view/")));
Handlebars.registerHelper('ifNotEquals', function(arg1, arg2, options) {
    return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
});


//Route
const picks=["static_img/download.jpg","static_img/download1.jpg","static_img/download2.jpg","static_img/wikiPhoto.jpg","static_img/Ederal.jpg","static_img/Richard.jpg","static_img/williRogers.jpg"]
const detail={
    Cpick: picks,
    Clinkedin:"https://www.linkedin.com/mynetwork/",
    Cfacebook:"https://www.facebook.com/help/2053403608222571",
    Cinstagram:"https://www.facebook.com/help/2053403608222571",
    Ctelegram:"https://www.facebook.com/help/2053403608222571",
    CAboutUs:"",
    Cname:"abc"

}

app.use('/first_window',fw)
app.get('/',(req,res)=>{
   
    res.render('first_window/Home', detail);
});
app.get('/first_window/login',(req,res)=>{
    res.render('first_window/login', detail);
});
app.get('/first_window/About',(req,res)=>{
    res.render('first_window/About', detail);
});

app.get('/first_window/signup',(req,res)=>{
    res.render('first_window/signup');
})
app.get('/first_window/Download',(req,res)=>{
    res.render('first_window/Download');
})
app.get('/first_window/error',(req,res)=>{
    res.render('first_window/error');
})
app.use('/first_window',fw);

 

//error
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  });

//connections
connectDb();
app.listen(PORT,(err)=>{
    if(err)
    {
        console.log("Error: ",err);
    }
    else
    {
        console.log(`Server running on http://localhost:${PORT}`);
    }
})