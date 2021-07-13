// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 3000; 

// Require Express to run server and routes
const express = require ('express');
// Require body-parser to run server
const bodyParser =require ('body-Parser');
// Require cors to run server 
const cors =require ('cors');
// Start up an instance of app
const app = express(); 
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server 
app.listen(port,()=>{console.log("server running at "+port); });

app.get("/getTemp",(req,res)=>{ // send data to web 
res.send(projectData);
});
app.post("/setTemp", (req,res)=>{
    
     projectData = {...req.body} ; // save the body of request in projectData 
       res.send(); //no response 
}); 

