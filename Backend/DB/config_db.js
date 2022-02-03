const moongose=require('mongoose');
const dotenv=require("dotenv")
dotenv.config({ path:'./config.env'})
const DB=process.env.DATABASE

moongose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MongoDb connected sucessfully")
})
.catch((err)=>{
    console.log(err);
})
