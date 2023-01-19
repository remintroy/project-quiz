import Express from "express";

// initiate router
const app = Express.Router();

app.get('/',(req,res)=>{
    res.send({status:'good',message:"Auth router is working"})
})

// export router
export default app;
