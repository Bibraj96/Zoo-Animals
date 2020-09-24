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
        <input class="btn btn-success mr-4" type="submit" value="Add New Zoo">
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
    let output = '<h2 class="display-4 mb-4">Zoos</h2>'
    data.forEach(function(zoo){
      output += `
        <div class="container" data-zoo-id="${zoo.id}">
          <ul class="list-group mb-3">
            <li class="list-group-item">${zoo.name}</li>
            <li class="list-group-item">${zoo.city}, ${zoo.state}</li>
          </ul>
          <div id=sighting-zoo-${zoo.id}></div>
          <div id=edit-zoo-form-${zoo.id}></div>
          <button class="get-sightings btn btn-info mr-4">Sightings</button>
          <button class="edit-zoo-button btn btn-warning mr-4">Edit Zoo</button>
          <button class="delete-zoo btn btn-danger mr-4">Delete Zoo</button>
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
   .then(json => {
     let newZoo = new Zoo(json)
     clearZooFormHtml()
     Zoo.newZooForm()
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
    let selectedZoo = document.querySelector(`.container[data-zoo-id="${zooId}"]`)
    selectedZoo.remove()
  })
}

function clearZooFormHtml() {
  let zooForm = document.getElementById("new-zoo")
  zooForm.innerHTML = ''
}

function clearZoosHtml() {
  let zooDiv = document.getElementById("zoos")
  zooDiv.innerHTML = ''
  getZoos()
}
