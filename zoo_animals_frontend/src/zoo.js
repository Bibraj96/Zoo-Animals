const getZoos = () => {
  fetch("http://localhost:3000/zoos")
  .then((res) => res.json())
  .then((data) => {
    let zoos = document.getElementById('zoos');
    let output = '<h2>Zoos</h2>'
    data.forEach(function(zoo){
      output += `
        <ul>
          <li>Name: ${zoo.name}</li>
          <li>City: ${zoo.city}</li>
          <li>State: ${zoo.state}</li>
          <li>Sightings: ${zoo.sightings}</li>
        </ul>
      `;
    });
    zoos.innerHTML = output;
  })
}

document.addEventListener("DOMContentLoaded", getZoos)