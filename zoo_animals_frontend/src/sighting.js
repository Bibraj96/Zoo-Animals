function loadSightings() {
  let zooId = this.parentElement.getAttribute('data-zoo-id')
  let sightingDiv = document.getElementById(`sighting-${zooId}`)

  fetch("http://localhost:3000/sightings")
  .then(resp => resp.json())
  .then(data => {
    data.forEach(function(sighting) {
      if (sighting.zooId == zooId) {

      }
      // if(sighting.zoo.id == zooId) {
      //   console.log(sighting.animal)
      // } else {
      //   console.log(sighting.id)
      // }
    })
    })
  // console.log("This button works")
  // console.log(this.parentElement.getAttribute('data-zoo-id'))
}
