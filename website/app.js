/* Global Variables */
const apiKey = "8ad2d677771c9c8493e122c4f0f17d30" ; // key from OpenWeatherMap.com 
const generateButton = document.querySelector("#generate"); 
let dateF=null;
let tempF=null;
let contentF=null;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear(); 

generateButton.addEventListener("click", async()=>{
const zip = document.querySelector("#zip"); 
const content = document.querySelector("#feelings").value; //get content from text area
    const zipCode = zip.value ;
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`); //req to OpenWeatherMap.com to get temp
    const tempData = await data.json(); // convert to java script object
    const temp =tempData.main.temp; 
  
   
    //send data to local server
    await fetch('/setTemp' ,{
    method: "POST" ,
    credentials : "same-origin" ,
    headers: {"Content-Type": "application/json"},
    body : JSON.stringify({
           date: newDate ,
           temp : temp ,
          content :content  }) 

    });

//get data from local host 
    
const res = await fetch('/getTemp',{credentials : "same-origin" });
const result = await res.json(); // convert to java script object
tempF=result.temp;
contentF=result.content;
dateF=result.date;
update (tempF,dateF,contentF);

}); 
      
//update html content 
function update (temp,date,content)
{

    const D =document.getElementById("date");
    const T =document.getElementById("temp");
    const C =document.getElementById("content");
   
    D.innerHTML=date;
    T.innerHTML=temp;
    C.innerHTML=content;
}