class Zoo {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.city = data.city
    this.state = data.state
    this.sightings = data.sightings
  }
}

document.addEventListener("DOMContentLoaded", getZoos())

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
          <li>${zoo.name}</li>
          <li>${zoo.city}, ${zoo.state}</li>
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
