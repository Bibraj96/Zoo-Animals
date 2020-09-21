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
    <input type="text" id="date"><br/>
    <label>Description: </label><br/>
    <input type="text" id="description"><br/>
    <label>Accessibility: </label><br/>
    <input type="text" id="accessibility"><br/><br/>
    <input type="submit" value="Add New Sighting">
  </form>
  `
  document.getElementById('add-sighting').addEventListener("submit", createSighting)
  }
  
}

function loadSightings() {
  let zooId = this.parentElement.getAttribute('data-zoo-id')

  fetch("http://localhost:3000/sightings")
  .then(resp => resp.json())
  .then(data => {
    let sightingDiv = document.getElementById(`sighting-zoo-${zooId}`)
    let output = `<button id="add-sighting-button">Add a Sighting</button>`
    data.forEach(function(sighting) {
      if(sighting.zoo.id == zooId) {
        console.log(sighting.zoo.id)
        output += `
        <div data-sighting-id="${sighting.id}">
        <div id="new-sighting-form"></div>
        <p>Animal: ${sighting.animal}</p>
        <p>Exhibit: ${sighting.exhibit} / Schedule: ${sighting.schedule}</p>
        <p>Date: ${sighting.date} </p>
        <p>Description: ${sighting.description}</p>
        <p>Accessibility: ${sighting.accessibility}</p>
        <button class="delete-sighting-button">Delete Sighting</button>
        </div>
        `
      }
    })
    sightingDiv.innerHTML = output
    document.getElementById('add-sighting-button').addEventListener("click", Sighting.newSightingForm)
    document.querySelectorAll('.add-sighting-button').forEach(element => {
      element.addEventListener("click", Sighting.newSightingForm)
    })
    document.querySelectorAll('.delete-sighting-button').forEach(element => {
      element.addEventListener("click", deleteSighting)
    })
  })
}

document.querySelectorAll('.delete-sighting-button').forEach(element => {
  element.addEventListener("click", deleteSighting)
})

function createSighting(e) {
  e.preventDefault();
  let zooId = this.parentElement.parentElement.parentElement.parentElement.getAttribute('data-zoo-id')
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
    // getZoos()
  })
}

function deleteSighting() {
  console.log(this.parentElement.getAttribute('data-sighting-id'))
  // let zooId = this.parentElement.getAttribute('data-zoo-id')

  // fetch(`http://localhost:3000/zoos/${zooId}`, {
  //   method: 'DELETE',
  //   headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
  // })
  // .then(resp => resp.json())
  // .then(json => {
  //   let selectedZoo = document.querySelector(`.card[data-zoo-id="${zooId}"]`)
  //   selectedZoo.remove()
  // })
}
