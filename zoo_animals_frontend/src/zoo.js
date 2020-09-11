class Zoo {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.city = data.city
    this.state = data.state
    this.sightings = data.sightings
  }

  static newZooForm() {
    let newZooFormDiv = document.getElementById('new-zoo')
    newZooFormDiv.innerHTML += `
      <form id="add-zoo">
        <label>Name: </label><br/>
        <input type="text" id="name"><br/>
        <input type="hidden" id="zoo-id"
        <label>City: </label><br/>
        <input type="text" id="city"><br/>
        <label>State: </label><br/>
        <input type="text" id="state"><br/><br/>
        <input type="submit" value="Add New Zoo">
      </form>
      <br/>
    `
  }
}

document.addEventListener("DOMContentLoaded", init())

function init() {
  getZoos()
  Zoo.newZooForm()
}

function attachListeners() {

  document.querySelectorAll('.get-sightings').forEach(element => {
    element.addEventListener("click", loadSightings)
  }) 

  document.getElementById('add-zoo').addEventListener("submit", createZoo)
  
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

function createZoo(e) {
  e.preventDefault();

   const zoo = {
     name: document.getElementById('name').value,
     name: document.getElementById('city').value,
     name: document.getElementById('state').value
  }

  fetch("http://localhost:3000/zoos", {
    method: 'POST',
    body: JSON.stringify(zoo),
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
   })
   .then(resp => resp.json())
   .then(zoo => {
     console.log(zoo)
  })
}

function loadSightings() {
  console.log("This button works")
}
