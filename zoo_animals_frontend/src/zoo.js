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

  document.querySelectorAll('.delete-zoo').forEach(element => {
    element.addEventListener("click", deleteZoo)
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
        <div class="card" data-zoo-id="${zoo.id}"
          <ul>
            <li>${zoo.name}</li>
            <li>${zoo.city}, ${zoo.state}</li>
          </ul>
          <button class="get-sightings">Sightings</button>
          <button class="edit-zoo">Edit Zoo</button>
          <button class="delete-zoo">Delete Zoo</button>
        </div><br/>
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
     city: document.getElementById('city').value,
     state: document.getElementById('state').value
  }

  fetch("http://localhost:3000/zoos", {
    method: 'POST',
    body: JSON.stringify(zoo),
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
   })
   .then(resp => resp.json())
   .then(zoo => {
     getZoos()
  })
}

function deleteZoo() {
  // console.log(this.parentElement.getAttribute('data-zoo-id'))
  let zooId = this.parentElement.getAttribute('data-zoo-id')

  fetch(`http://localhost:3000/zoos/${zooId}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
  })
  .then(resp => resp.json())
  .then(json => {
    let selectedZoo = document.querySelector(`.card[data-zoo-id="${zooId}"]`)
    selectedZoo.remove()
  })
}

function loadSightings() {
  console.log("This button works")
}
