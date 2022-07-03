require('dotenv').config();
const mongoose=require('mongoose');

module.exports=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },(err)=>{
        if(err)
        {
            console.log("Error: ",err);
        }
        else{
            console.log("Connect to Database.")
        }
    })
}