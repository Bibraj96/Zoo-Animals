class Zoo {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.city = data.city
    this.state = data.state
    this.sightings = data.sightings
  }

function loadSightings() {
  let zooId = this.parentElement.getAttribute('data-zoo-id')

  fetch("http://localhost:3000/sightings")
  .then(resp => resp.json())
  .then(data => {
    let sightingDiv = document.getElementById(`sighting-${zooId}`)
    let output = `<button class="add-sighting">Add a Sighting</button>`
    data.forEach(function(sighting) {
      if(sighting.zoo.id == zooId) {
        output += `
        <p>Animal: ${sighting.animal}</p>
        <p>Exhibit: ${sighting.exhibit} / Schedule: ${sighting.schedule}</p>
        <p>Date: ${sighting.date} </p>
        <p>Description: ${sighting.description}</p>
        <p>Accessibility: ${sighting.accessibility}</p>
        `
      }
    })
    sightingDiv.innerHTML = output
    })
}
