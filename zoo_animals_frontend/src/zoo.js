class Zoo {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.city = data.city;
    this.state = data.state;
    this.sightings = data.sightings;
  }

  static newZooForm() {
    let newZooFormDiv = document.getElementById('new-zoo');
    newZooFormDiv.innerHTML += `
      <form id="add-zoo">
        <label>Name: </label><br/>
        <input type="text" id="name"><br/>
        <input type="hidden" id="zoo-id">
        <label>City: </label><br/>
        <input type="text" id="city"><br/>
        <label>State: </label><br/>
        <input type="text" id="state"><br/><br/>
        <input class="btn btn-outline-success mr-4" type="submit" value="Add New Zoo">
      </form>
      <br/>
    `
  }

}

document.addEventListener("DOMContentLoaded", init());

function init() {
  getZoos();
  Zoo.newZooForm();
}

function attachListeners() {

  document.querySelectorAll('.get-sightings').forEach(element => {
    element.addEventListener("click", loadSightings)
  }); 

  document.querySelectorAll('.delete-zoo').forEach(element => {
    element.addEventListener("click", deleteZoo)
  });

  document.getElementById('add-zoo').addEventListener("submit", createZoo);
  
}

function getZoos() {
  fetch("http://localhost:3000/zoos")
  .then((res) => res.json())
  .then((allZoos) => {
    const zoos = document.getElementById('zoos');
    let output = '<h2 class="display-4 mb-4">Zoos</h2>'
    allZoos.forEach(function(zoo){
      const newZoo = new Zoo(zoo);
      output += `
        <div class="container" data-zoo-id="${newZoo.id}">
          <ul class="list-group mb-3">
            <li class="list-group-item">${newZoo.name}</li>
            <li class="list-group-item">${newZoo.city}, ${newZoo.state}</li>
          </ul>
          <div id=sighting-zoo-${newZoo.id}></div>
          <div id=edit-zoo-form-${newZoo.id}></div>
          <button class="get-sightings btn btn-info mr-4">Sightings</button>
          <button class="delete-zoo btn btn-danger mr-4">Delete Zoo</button>
        </div><br/>
      `;
    });
    zoos.innerHTML = output;
    attachListeners();
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
     const newZoo = new Zoo(json)
     clearZooFormHtml();
     Zoo.newZooForm();
     getZoos();
  })
}

function deleteZoo() {
  const zooId = this.parentElement.getAttribute('data-zoo-id');

  fetch(`http://localhost:3000/zoos/${zooId}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
  })
  .then(resp => resp.json())
  .then(json => {
    const selectedZoo = document.querySelector(`.container[data-zoo-id="${zooId}"]`);
    selectedZoo.remove();
  })
}

function clearZooFormHtml() {
  const zooForm = document.getElementById("new-zoo");
  zooForm.innerHTML = ''
}

function clearZoosHtml() {
  const zooDiv = document.getElementById("zoos")
  zooDiv.innerHTML = ''
  getZoos();
}
