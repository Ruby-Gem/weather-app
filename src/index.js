const apiKey = "OWIxZWI3ZjZiMGR0YTNjYTM0YTY0MDU3NDdlODg1bzE=";

function search(event) {
  event.preventDefault();
  const userValue = document
    .querySelector("form input.search-input")
    .value.trim();

  if (!userValue.length) return;

  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${userValue}&key=${atob(
    apiKey
  )}&units=metric`;
  axios
    .get(apiUrl)
    .then((res) => {
      const { status, temperature, city, condition, wind } = res.data;
      if (status === "not_found")
        return alert("City not found, please try another city.");

      try {
        document.querySelector("#current-city").textContent = city;
        document.querySelector(".current-temperature-value").textContent =
          Math.round(temperature.current);
        document.querySelector('img.current-temperature-icon').src = condition.icon_url;
        document.querySelector(
          "p.current-details"
        ).innerHTML = `<span id="current-date">${formatDate(
          new Date(res.data.time)
        )}</span>, ${condition.description} <br/>Humidity<strong> ${
          temperature.humidity
        }%</strong>, Wind: <strong>${wind.speed} km/h</strong>`;
      } catch (err) {
        console.error(err.mesage);
      }
    })
    .catch((error) => {
      console.error("Error fetching the weather data:", error);
    });
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
