const express=require("express");
const cors = require("cors");
require('./DB/config_db')
const dotenv=require("dotenv")
const todo=require('./Models/todo_schema');


const app=express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

dotenv.config({ path:'./config.env'})


const PORT=process.env.PORT


app.listen(PORT,()=>{
    console.log("Server is Working at", PORT)
})





app.post('/create',async(req,res)=>{
    const {description}=req.body
    console.log(description)


    const newTodo=new todo({description})
    await newTodo.save()


    res.json({message:"Todo is created sucessfully"})
})





app.get('/todos',async(req,res)=>{

    const todos=await todo.find()
    console.log(todos)
    res.json(todos)
})





app.delete('/delete',async(req,res)=>{
    console.log("hello",req.body)

    const delTodo=await todo.deleteOne({_id:req.body._id})
    console.log(delTodo)
    res.json({message:"todo has been deleted"})
})





app.put('/update',async(req,res)=>{
    try{
    console.log(req.body)
    const{id,updateDescp}=req.body
    const updateTodo=await todo.findOneAndUpdate({_id:id},{description:updateDescp})
    res.json({message:"updated"})
    }catch(err){
        console.log(err)
    }
})