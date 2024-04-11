document.addEventListener("DOMContentLoaded", async function () {
  fetch("/")
    .then((response) => {
      console.log(response);
      response.json();
    })
    .then((data) => {
      console.log(data);
      const name = data.name;
      renderName(name);
    })
    .catch((err) => {
      console.log("this is a error: ", err);
    });
});

function renderName(name) {
  document.getElementById("name-here").innerText = name;
}


