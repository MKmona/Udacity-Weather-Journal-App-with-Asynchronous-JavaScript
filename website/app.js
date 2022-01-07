/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5e77ece155b961c08f7d9ec54ffb9784&units=metric';

// Create a new date instance dynamically with JS
let dateObject = new Date();

// Async GET remote API
const getData = async(zip)=>{
    const request = await fetch(baseUrl+zip+apiKey);
    try{
        const response = await request.json();
        return response;
    }
    catch(error){
        console.log("error", error);
    }
}

// Async POST local API
const postData = async(url, data={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        return newData;
    }
    catch(error){
        console.log("error", error);
    }
}

//Update function
const updateUI = async ()=>{
    const request = await fetch('/getData');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.content;
    }catch(error){
        console.log("error", error);
    }
}

//Click Event
const btn = document.getElementById('generate');
btn.addEventListener('click', takeAction);

function takeAction(e){
    const zipCode =  document.getElementById('zip').value;
    const feelings =  document.getElementById('feelings').value;
    const newDate = dateObject.getMonth()+1+'.'+ dateObject.getDate()+'.'+ dateObject.getFullYear();

    if(zipCode == ''){
        alert("Please Enter the Zip Code");
    }
    else{
        getData(zipCode).then(function(data){
                postData('/sendData', {
                    temperature: data.main.temp, 
                    date: newDate, 
                    content: feelings
                });}).then(function(data){
                    updateUI()
                });
    }
}

    

    

  



