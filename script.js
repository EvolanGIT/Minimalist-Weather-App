//search bar element
let inputName = document.getElementById('inputName');
//search button element
let searchBtn = document.querySelector('#pressSearch');
//city name in title
let cityName = document.getElementById('cityName')
//this is the target for the weather cards.
let container = document.querySelector('#cardContainer');



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
    let contentHTML = ''
    fetch(cityData)
    .then(res => res.json())
    .then(data => { 
        console.log(data);
        let dayInfo = data.list[i].dt_txt
        console.log(dayInfo);
        let timeInfo = dayInfo.split(" ")
        let weekDay = timeInfo[0];
        console.log(weekDay)
        console.log(timeInfo)   
        let lon = data.city.coord.lon
        console.log(lon);
        let lat = data.city.coord.lat
        console.log(lat);
        contentHTML =+ ``
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
        for (let i=0; i < data.list.length; i++) {
            if (i == 0 || i == 8 || i == 16 || i == 24 || i == 32) {
        let dayInfo = data.list[i].dt_txt
        console.log(dayInfo);
        let timeInfo = dayInfo.split(" ")
        let weekDay = timeInfo[0];
        console.log(weekDay)
        console.log(timeInfo)
        let icon = data.list[i].weather[0].icon
        console.log(icon);
        let temp = data.list[i].main.temp
        console.log(temp);
        let wind = data.list[i].wind.speed
        console.log(wind);
        let humidity = data.list[i].main.humidity
        console.log(humidity);
        contentHTML += `
        <section class="row justify-content-between text-center">
            <div class="card bg-dark shadow-lg" style="width: 15rem;">
                <div class="card text-bg-dark mb-2" style="max-width: 15rem;">
                    <div class="card-header fs-4 info">${weekDay}</div>
                    <div class="card-body bg-secondary border-dark">
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png">
                    <p class="card-text border-top border-dark fs-5">Temperature:&nbsp&nbsp${temp}</p>
                    <p class="card-text border-top border-dark fs-5">Wind Speed:&nbsp&nbsp${wind}</p>
                    <p class="card-text border-top border-dark fs-5">Humidity&nbspIndex:&nbsp${humidity}</p>
                    </div>
                </div>
            </div>
        </section>
        ` 
}    
    }
        container.innerHTML = contentHTML
    })
};


