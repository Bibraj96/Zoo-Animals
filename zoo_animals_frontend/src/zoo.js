document.addEventListener("DOMContentLoaded", getZoos())

// function init() {
//   getZoos()
// }

// document.querySelectorAll(".get-sightings").forEach(element => {
//   element.addEventListener("click", loadSightings);
// }) 

function attachListeners() {

  document.querySelectorAll('.get-sightings').forEach(element => {
    element.addEventListener("click", loadSightings)
  }) 
  
}

function getZoos() {
  fetch("http://localhost:3000/zoos")
  .then((res) => res.json())
  .then((data) => {
    let zoos = document.getElementById('zoos');
    let output = '<h2>Zoos</h2>'
    data.forEach(function(zoo){
      output += `
        <ul>
          <li>Name: ${zoo.name}</li>
          <li>City: ${zoo.city}</li>
          <li>State: ${zoo.state}</li>
        </ul>
        <button class="get-sightings">Sightings</button>
      `;
    });
    zoos.innerHTML = output;
    attachListeners()
  })
}

function loadSightings() {
  console.log("This button works")
}
