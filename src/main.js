const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const date = document.querySelector("#datepicker");
const loadBtn = document.querySelector("#load-btn");
const app = document.querySelector("#app");

const today = new Date().toISOString().split("T")[0];
date.min = "1995-06-16";
date.max = today;
date.value = today;

function loadAPOD() {
  app.innerHTML = "<p>loading...</p>";

  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date.value}`)
    .then(response => response.json())
    .then(data => {
      let media;

      if (data.media_type === "image") {
        media = `<img src="${data.url}"/>`;
      } else {
        media = `<video src="${data.url}" controls></video>`;
      }

      app.innerHTML = `
        <h1>${data.title}</h1>
        ${media}
        <p>${data.explanation}</p>
      `;
    })
    .catch(err => {
      app.innerHTML = `<p>Error: ${err.message}</p>`;
    });
}

loadBtn.addEventListener("click", loadAPOD);
loadAPOD();