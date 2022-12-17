//search bar element
let inputName = document.getElementById('inputName');
//search button element
let searchBtn = document.querySelector('#pressSearch');
//city name in title
let cityName = document.getElementById('cityName')
//this is the target for the weather cards.
let container = document.querySelector('#cardContainer');
//this is the target for the current weather of the chosen city.
let firstInfo = document.querySelector('#firstInfo');



//this event listener pulls the information from the searchbox which is the city's name, and passes it to the first fetch.
searchBtn.addEventListener('click', function(){
    event.preventDefault();
    console.log(inputName.value);
    citySearch = inputName.value;
    fetchCity(citySearch);
    nameTime(citySearch);
    saveInput(citySearch)
});

// this function saves the city choice 
function saveInput () {
    // saves the user input into local storage
    localStorage.setItem('search', JSON.stringify(citySearch));
    // retrieves the local storage items from the key 'search'
    let citySave = JSON.parse(localStorage.getItem('search')); 
    // empty array to push the local storage into
    let cityList = ''
    // pushes the values from 'search' into the empty array above
    cityList.push(citySave);
    // this loop creates the list item for each city name to be displayed.
    let listedCity = ''
    for (let i = 0; i < cityList.length; i++) {
    listedCity += `<li>${cityList}</li>`
    }
    document.querySelector('.dropdown-menu').innerHTML = listedCity;
}



//this function displays the name of the chosen city to the user.
function nameTime () {
    cityName.innerHTML = citySearch.toUpperCase();   
}

//this fetch captures the city name and pulls the latitude and longitude to the second fetch.
function fetchCity() {
    var cityData = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&units=imperial&appid=22512877ada2a919ebc827b52e0ed0a5' 
    console.log(cityData);
    let contentHTML = ''
    fetch(cityData)
    .then(res => res.json())
    .then(data => { 
        console.log(data); 
        let lon = data.city.coord.lon
        console.log(lon);
        let lat = data.city.coord.lat
        console.log(lat);
        for (let i=0; i < data.list.length; i++) {
            if (i == 0) {
        let dayInfo = data.list[i].dt_txt
        console.log(dayInfo);
        let timeInfo = dayInfo.split(" ")
        let weekDay = timeInfo[0];
        console.log(weekDay)
        let icon = data.list[i].weather[0].icon
        console.log(icon);
        let temp = data.list[i].main.temp
        console.log(temp);
        let wind = data.list[i].wind.speed
        console.log(wind);
        let humidity = data.list[i].main.humidity
        console.log(humidity);
        contentHTML = `
        <section>
        <div class="container d-flex flex-column align-items-center">
        <div class="fs-2 fw-semibold">${weekDay}</div>
        <img id="mainIcon" src="http://openweathermap.org/img/wn/${icon}@2x.png">
        </div>
        <div class="container d-flex justify-content-between">
        <div class="fs-4 fst-italic fw-semibold"><u>Temp:${temp}°F</u></div>
        <div class="fs-4 fst-italic fw-semibold"><u>Wind Speed:${wind}mph</u></div>
        <div class="fs-4 fst-italic fw-semibold"><u>Humidity Index:${humidity}%</u></div>
        </div>
        <div class="container mt-5 d-flex justify-content-center">
        <h3>Here is your 5 day forecast</h3>
        </div>
        </section>
        `
        renderWeather(lat, lon)
    }    
}
    firstInfo.innerHTML = contentHTML
})
};



//this fetch renders the information from the city name fetch.
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
            if (i == 7 || i == 15 || i == 23 || i == 31 || i == 39) {
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
                <div class="card text-bg-dark mb-2" style="max-width: 17rem;">
                    <div class="card-header fs-4 info">${weekDay}</div>
                    <div class="card-body bg-secondary border-dark">
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png">
                    <p class="card-text border-top border-dark fs-6">Temperature:&nbsp${temp}°F</p>
                    <p class="card-text border-top border-dark fs-6">Wind Speed:&nbsp${wind}mph</p>
                    <p class="card-text border-top border-dark fs-6">Humidity&nbspIndex:&nbsp${humidity}%</p>
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


