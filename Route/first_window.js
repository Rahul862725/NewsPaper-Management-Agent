const route = require('express').Router();
const multer = require('multer');
const Cdata = require('../model/first_window')
const bodyParser=require('body-parser');
const { type } = require('express/lib/response');
const path =require('path')

const picks=["../static_img/download.jpg","../static_img/download1.jpg","../static_img/download2.jpg","../static_img/wikiPhoto.jpg","../static_img/Ederal.jpg","../static_img/Richard.jpg","../static_img/williRogers.jpg"]

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './view/upload_img');
    },
    filename: (req, file, cb) => {
       
        const fname = `${req.body.Cname}-${req.body.Cemail}-${Date.now()}`;
        cb(null, fname + '.jpg');
    }
});

const upload = multer({
    storage: storage
});

route.post('/signup', async (req, res) => {
    
    if (!req.body) {
        res.render('first_window/error', {text:"Please Fill fields"});
        return;
    }
   
        var data=Cdata.find({Cemail:req.body.Cemail})
        
       // console.log("data is",data)
        if(!data)
        {
            res.render('first_window/error',{text:"Already Registered. Please Login!"})
        }  
        
         const detail = {
            Cname: req.body.Cname,
            Cemail: req.body.Cemail,
            Cpass: req.body.Cpass,
            Clinkedin: req.body.Clinkedin,
            CAboutUs:req.body.CAboutUs
        }
              
        //insert
        //await Cdata.insert(detail);
        await Cdata.insertMany(detail)
         
        res.render('first_window/login',detail);
    
});

route.post('/login', async (req, res, next) => {
   
    if (!req.body) {
        res.render('first_window/error', {text:"Please Fill fields"});
        return;
    }
     
    const data = await Cdata.find({ Cemail: req.body.Cemail });
   // console.log(data)
    if (data.length==0) {
        res.render('first_window/error', {text:"Wrong details"} )
        return;
    }
    //console.log(req.body.Cpass)
    if(data[0].Cpass!=req.body.Cpass)
    {
        res.render('first_window/error',{text:"Wrong username or emailId"} );
        return;
    }
   
    res.render('first_window/Download',data);
});
module.exports = route;