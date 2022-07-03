const { default: mongoose } = require('mongoose');

const Schema=require('mongoose').Schema;

const Cdata=new Schema({
    Cname:{type:String,required: true},
    Cemail: {type:String,required: true},
    Cpass:{type: String,required:true},
    Clinkedin:{type: String,required:true},
    CAboutUs:{type:String}
},{ timestamps: true });

module.exports=mongoose.model('Cdata',Cdata);