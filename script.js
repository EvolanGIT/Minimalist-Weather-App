//search bar element
let inputName = document.getElementById('inputName');
//search button element
let searchBtn = document.querySelector('#pressSearch');
//city name in title
let cityName = document.getElementById('cityName')
//this is the target for the weather cards.
let container = document.querySelector('cardContainer');



//this event listener pulls the information from the searchbox which is the city's name, and passes it to the first fetch.
searchBtn.addEventListener('click', function(){
    event.preventDefault();
    console.log(inputName.value);
    citySearch = inputName.value;
    fetchCity(citySearch);
    nameTime(citySearch)
});


//this function displays the name of the chosen city to the user.
function nameTime () {
    cityName.innerHTML = citySearch.toUpperCase();
    
    
}

//this fetch captures the city name and pulls the latitude and longitude to the second fetch.
function fetchCity() {
    var cityData = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&appid=22512877ada2a919ebc827b52e0ed0a5' 
    console.log(cityData);
    fetch(cityData)
    .then(res => res.json())
    .then(data => { 
        console.log(data);    
        let lon = data.city.coord.lon
        console.log(lon);
        let lat = data.city.coord.lat
        console.log(lat);
        renderWeather(lat, lon)
    })
    
};


//this fetch renders the information from the city.
function renderWeather(lat, lon) {
    console.log(lat,lon)
    let pinLocation = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=22512877ada2a919ebc827b52e0ed0a5'
    console.log(pinLocation);
    let contentHTML = ''
    fetch(pinLocation)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        for (const info of pinLocation) {
        let icon = info.list[0].weather[0].icon
        console.log(icon);
        let temp = info.list[0].main.temp
        console.log(temp);
        let wind = info.list[0].wind.speed
        console.log(wind);
        let humidity = info.list[0].main.humidity
        console.log(humidity) 
        contentHTML += `
        <article class="container">
        <section class="row justify-content-between text-center">
            <div class="card bg-primary shadow-lg" style="width: 15rem;">
                <div class="card text-bg-light mb-2" style="max-width: 15rem;">
                    <div class="card-header bg-info">Day of the week</div>
                    <div class="card-body ">
                    <img src="#">
                    <p class="card-text">temp</p>
                    <p class="card-text">wind</p>
                    <p class="card-text">humidity</p>
                    </div>
                </div>
            </div>
        ` 
        }
        container.innerHTML = contentHTML
    })
};


