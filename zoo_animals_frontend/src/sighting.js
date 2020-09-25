class Sighting {
  constructor(data) {
    this.id = data.id
    this.animal = data.animal
    this.exhibit = data.exhibit
    this.schedule = data.schedule
    this.date = data.date
    this.description = data.description
    this.accessibility = data.accessibility
    this.zoo_id = data.zoo_id
  }

  static newSightingForm() {
    let newSightingFormDiv = document.getElementById('new-sighting-form')
    newSightingFormDiv.innerHTML += `
    <form id="add-sighting">
    <label>Animal: </label><br/>
    <input type="text" id="animal"><br/>
    <input type="hidden" id="sighting-id">
    <input type="hidden" id="sighting-zoo-id">
    <label>Exhibit: </label><br/>
    <input type="text" id="exhibit"><br/>
    <label>Schedule: </label><br/>
    <input type="text" id="schedule"><br/>
    <label>Date: </label><br/>
    <input type="text" id="date" placeholder="MM/DD/YY"><br/>
    <label>Description: </label><br/>
    <textarea type="text" id="description"></textarea><br/>
    <label>Accessibility: </label><br/>
    <input type="text" id="accessibility"><br/><br/>
    <input class="btn btn-info mb-4 mr-4" type="submit" value="Add New Sighting">
  </form>
  `
  document.getElementById('add-sighting').addEventListener("submit", createSighting)
  }
  
}

function attachSightingListeners() {
  document.getElementById('add-sighting-button').addEventListener("click", Sighting.newSightingForm)

  document.querySelectorAll('.add-sighting-button').forEach(element => {
    element.addEventListener("click", Sighting.newSightingForm)
  })

  document.querySelectorAll('.delete-sighting-button').forEach(element => {
    element.addEventListener("click", deleteSighting)
  })

  document.querySelectorAll('.delete-sighting-button').forEach(element => {
    element.addEventListener("click", deleteSighting)
  })
  document.querySelectorAll('.close-sighting-button').forEach(element => {
    element.addEventListener("click", clearZoosHtml)
  })
}

function loadSightings() {
  let zooId = this.parentElement.getAttribute('data-zoo-id')

  fetch("http://localhost:3000/sightings")
  .then(resp => resp.json())
  .then(data => {
    let sightingDiv = document.getElementById(`sighting-zoo-${zooId}`)
    let output = `
    <button id="add-sighting-button" class="btn btn-success mb-4 mr-4">Add a Sighting</button>
    <div id="new-sighting-form"></div>
    `
    data.forEach(function(sighting) {
      if(sighting.zoo.id == zooId) {
        output += `
        <div class="card card-body mb-3" data-sighting-id="${sighting.id}">
        <div id="new-sighting-form"></div>
        <p><strong>Animal</strong>: ${sighting.animal}</p>
        <p><strong>Exhibit</strong>: ${sighting.exhibit} - <strong>Schedule</strong>: ${sighting.schedule}</p>
        <p><strong>Date</strong>: ${sighting.date} </p>
        <p><strong>Description</strong>: ${sighting.description}</p>
        <p><strong>Accessibility</strong>: ${sighting.accessibility}</p>
        <button class="delete-sighting-button btn btn-danger mb-4 mr-4">Delete Sighting</button>
        <button class="close-sighting-button btn btn-outline-warning mb-4 mr-4">Close Sightings</button>
        </div>
        `
      }
    })
    sightingDiv.innerHTML = output
    attachSightingListeners()
  })
}

function createSighting(e) {
  e.preventDefault();
  let zooId = this.parentElement.parentElement.parentElement.getAttribute('data-zoo-id')

    const sighting = {
    animal: document.getElementById('animal').value,
    exhibit: document.getElementById('exhibit').value,
    schedule: document.getElementById('schedule').value,
    date: document.getElementById('date').value,
    description: document.getElementById('description').value,
    accessibility: document.getElementById('accessibility').value,
    zoo_id: zooId
  }

  fetch("http://localhost:3000/sightings", {
    method: 'POST',
    body: JSON.stringify(sighting),
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
  })
  .then(resp => resp.json())
  .then(json => {
    let newSighting = new Sighting(json)
    console.log(newSighting)
    Zoo.getZoos()
  })
}

function deleteSighting() {
  console.log(this.parentElement.getAttribute('data-sighting-id'))
  let sightingId = this.parentElement.getAttribute('data-sighting-id')

  fetch(`http://localhost:3000/sightings/${sightingId}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
  })
  .then(resp => resp.json())
  .then(json => {
    let selectedSighting = document.querySelector(`.card[data-sighting-id="${sightingId}"]`)
    selectedSighting.remove()
  })
}
