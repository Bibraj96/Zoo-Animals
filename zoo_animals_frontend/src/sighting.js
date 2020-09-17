class Sighting {
  constructor(data) {
    this.id = data.id
    this.animal = data.animal
    this.exhibit = data.exhibit
    this.schedule = data.schedule
    this.date = data.date
    this.description = data.description
    this.accessibility = data.accessibility
  }

  static newSightingForm() {
    let newSightingFormDiv = document.getElementById('new-sighting-form')
    newSightingFormDiv.innerHTML += `
    <form id="add-sighting">
    <label>Animal: </label><br/>
    <input type="text" id="animal"><br/>
    <input type="hidden" id="sighting-id">
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
  }
}

function loadSightings() {
  let zooId = this.parentElement.getAttribute('data-zoo-id')

  fetch("http://localhost:3000/sightings")
  .then(resp => resp.json())
  .then(data => {
    let sightingDiv = document.getElementById(`sighting-${zooId}`)
    let output = `<button id="add-sighting">Add a Sighting</button>`
    data.forEach(function(sighting) {
      if(sighting.zoo.id == zooId) {
        output += `
        <div id="new-sighting-form"></div>
        <p>Animal: ${sighting.animal}</p>
        <p>Exhibit: ${sighting.exhibit} / Schedule: ${sighting.schedule}</p>
        <p>Date: ${sighting.date} </p>
        <p>Description: ${sighting.description}</p>
        <p>Accessibility: ${sighting.accessibility}</p>
        `
      }
    })
    sightingDiv.innerHTML = output
    document.getElementById('add-sighting').addEventListener("click", Sighting.newSightingForm)
    })
}
