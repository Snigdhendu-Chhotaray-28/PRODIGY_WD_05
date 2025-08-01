const apiKey = "affa03f1cf444b7ebd663412252602";
let city;

function getCityWeather(){
    const location = document.querySelector('#city').value;
    if(!location==""){
        city = location;
        result(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
    }
}

function getLocationWeather(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            result(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`);
        }, () => {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


const result = async(link)=>{
    document.querySelector('.loadingTxt').innerText = "Fetching...";
    document.querySelector('.loading').style.visibility = "visible";

    let promise = await fetch(link);
    let data = await promise.json();
    
    document.getElementById("weather").innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Weather: ${data.current.condition.text}</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind Speed: ${data.current.wind_kph} kph</p>`;

    document.querySelector('.loading').style.visibility = "hidden";
    document.querySelector('.loadingTxt').style.visibility = "hidden";
};


document.querySelectorAll('button').forEach((btn)=>{
    btn.addEventListener('mouseenter',()=>{
        btn.classList.add('black_bg');
    });
    btn.addEventListener('mouseleave',()=>{
        btn.classList.remove('black_bg');
    });
});