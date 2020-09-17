class Sighting {
  constructor(data) {
    this.id = data.id
    this.animal = data.animal
    this.exhibit = data.exhibit
    this.schedule = data.schedule
    this.date = data.date
    this.dsecription = data.description
    this.accessibility = data.accessibility
  }

  static newSightingForm() {
    
  }
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
