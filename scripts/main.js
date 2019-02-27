new Vue({
  el: '#app',
  data: {
    selected_area: "",
    selected_pref : "",
    selected_weather : "",
    selected_prefs: [],
    areas : [
      "Pacific",
      "West Central",
      "Southwest",
      "Great Lakes",
      "Southeast",
      "Florida/Caribbean",
      "Mid-Atlantic",
      "New York/New Jersey",
      "New England"
    ],
    pref : [
      [
        "Washington",
        "Oregon",
        "Idaho",
        "Nevada",
        "California",
        "Alaska",
        "Hawaii"
      ],
      [
        "Montana",
        "Wyoming",
        "North Dakota",
        "South Dakota",
        "Nebraska",
        "Kansas",
        "Colorado",
        "Utah",
        "Iowa",
        "Missouri"
      ],
      [
        "Oklahoma",
        "Texas",
        "New Mexico",
        "Arizona"
      ],
      [
        "Minnesota",
        "Wisconsin",
        "Illinois",
        "Indiana",
        "Kentucky",
        "Ohio",
        "Michigan"
      ],
      [
        "Arkansas",
        "Louisiana",
        "Mississippi",
        "Alanama",
        "Georgia",
        "Tennessee",
        "North Carolina",
        "South Carolina"
      ],
      [
        "Florida"
      ],
      [
        "Virginia",
        "West Virginia",
        "Maryland",
        "Delaware",
        "Pennsylvania"
      ],
      [
        "New Jersey",
        "New York"
      ],
      [
        "Maine",
        "New Hampshire",
        "Vermont",
        "Massachusetts",
        "Connecticut",
        "Rhode Island"
      ]
    ]
  },
  methods : {
    _set_area : function(){
      if(this.selected_area !== ""){
        this.selected_pref = "";
        this.selected_prefs = this.pref[this.selected_area];
      }else{
        this.selected_prefs = [];
        var state = this.selected_pref;
      }
    }
  }
});


const appKey = "bbba8d9c2e71bab1da208462f0b3d74a";

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) 
{
  if (event.key === "Enter") 
  {
    findWeatherDetails();
  }
}

function findWeatherDetails() 
{
  if (searchInput.value === "") 
  {
  
  }
  else 
  {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
    httpRequestAsync(searchLink, theResponse);
  }
 }

function theResponse(response) 
{
  let jsonObject = JSON.parse(response);
  cityName.innerHTML = jsonObject.name;
  icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
  humidity.innerHTML = jsonObject.main.humidity + "%";
}

function httpRequestAsync(url, callback)
{
  console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => 
    { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}