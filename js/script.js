document.querySelector("#search").addEventListener("submit", async (event) => { //os addEventListener sao sempre assim
    event.preventDefault(); // Impede a página de recarregar

  const cityName =  document.querySelector("#city_name").value

  if(!cityName) {
    return showAlert("você precisa digitar uma cidade")
  }

  const apiKey = `8910189a0afc0c32b4b734f8891c9b10`
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br` //encodeURI serve para quando usamos acentos como ã, é, ê

  const results = await fetch(apiUrl);
  const json = await results.json();
  console.log(json)

  if(json.cod === 200) {
    showInfo({
        city: json.name,
        country: json.sys.country,
      temp: json.main.temp,
     tempMax: json.main.temp_max,
      tempMin: json.main.temp_min,
      description: json.weather[0].description,
      tempIcon: json.weather[0].icon,
      windSpeed: json.wind.speed,
        humidity: json.main.humidity,

    })
  } else {
    document.querySelector("#weather").classList.remove("show")
    showAlert(`
        não foi possível localizar a cidade
         <img src="img/undraw_booo_bxr0.svg"/>
        ` )
  }

});

function showInfo(json) {
    showAlert("")

    document.querySelector("#weather").classList.add("show")
    //inserir as informaçoes da api no site
    document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`
    document.querySelector("#temp_value").innerHTML = `${json.temp.toFixed(1).toString().replace(".", ",")}`
    document.querySelector("#temp_description").innerHTML = `${json.description}`
    document.querySelector("#temp_img").setAttribute("src",`https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector("#temp_max").innerHTML = `${json.tempMax.toFixed(1).toString().replace(".", ",")}`
    document.querySelector("#temp_min").innerHTML = `${json.tempMin.toFixed(1).toString().replace(".", ",")}`
    document.querySelector("#wind").innerHTML = `${json.windSpeed.toFixed(1)}km/h`
    document.querySelector("#humidity").innerHTML = `${json.humidity}%`
}

function showAlert(msg) {
    document.querySelector("#alert").innerHTML = msg
}