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
        <input type="hidden" id="zoo-id">
        <label>City: </label><br/>
        <input type="text" id="city"><br/>
        <label>State: </label><br/>
        <input type="text" id="state"><br/><br/>
        <input type="submit" value="Add New Zoo">
      </form>
      <br/>
    `
  }

  static editZooForm(id) {
    let editZooFormDiv = document.getElementById(`edit-zoo-form-${id}`)
    editZooFormDiv.innerHTML += `
      <form id="edit-zoo">
        <label>Name: </label><br/>
        <input type="text" id="name"><br/>
        <input type="hidden" id="zoo-id">
        <label>City: </label><br/>
        <input type="text" id="city"><br/>
        <label>State: </label><br/>
        <input type="text" id="state"><br/><br/>
        <input type="submit" value="Edit Zoo">
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

  document.querySelectorAll('.edit-zoo-button').forEach(element => {
    element.addEventListener("click", editZoo)
  })

  document.querySelectorAll('.delete-zoo').forEach(element => {
    element.addEventListener("click", deleteZoo)
  })

  document.getElementById('add-zoo').addEventListener("submit", createZoo)
  
}

function editFormListener() {
  document.getElementById('edit-zoo').addEventListener("submit", updateZoo)
}

function getZoos() {
  fetch("http://localhost:3000/zoos")
  .then((res) => res.json())
  .then((data) => {
    let zoos = document.getElementById('zoos');
    let output = '<h2>Zoos</h2>'
    data.forEach(function(zoo){
      output += `
        <div class="card" data-zoo-id="${zoo.id}">
          <ul>
            <li>${zoo.name}</li>
            <li>${zoo.city}, ${zoo.state}</li>
          </ul>
          <div id=sighting-${zoo.id}></div>
          <div id=edit-zoo-form-${zoo.id}></div>
          <button class="get-sightings">Sightings</button>
          <button class="edit-zoo-button">Edit Zoo</button>
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

function editZoo() {
  let zooId = this.parentElement.getAttribute('data-zoo-id')

  fetch(`http://localhost:3000/zoos/${zooId}`)
  .then(resp => resp.json())
  .then(data => {
    Zoo.editZooForm(data.id)
    let zooForm = document.getElementById(`edit-zoo-form-${data.id}`)
    zooForm.querySelector('#name').value = data.name
    zooForm.querySelector('#zoo-id').value = data.id
    zooForm.querySelector('#city').value = data.city
    zooForm.querySelector('#state').value = data.state
    editFormListener()
  })
}

function updateZoo(e) {
  e.preventDefault();
  let zooId = this.parentElement.parentElement.getAttribute('data-zoo-id')

  const zoo = {
    name: document.getElementById('name').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value
  }

  fetch(`http://localhost:3000/zoos/${zooId}`, {
    method: 'PATCH',
    body: JSON.stringify(zoo),
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
  })
  .then(resp => resp.json())
  .then(zoo => {
    editFormListener()
    getZoos()
  })
}

function deleteZoo() {
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