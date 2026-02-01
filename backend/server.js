const express = require("express");
const app = express();
const PORT = 3030;

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

app.get("/health", (req,res)=>res.send("Alive and working well"));

app.post("/testpost", (req, res)=> {
    console.log(req.body.message);
    res.send(`Message received: ${req.body.message}`)
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})