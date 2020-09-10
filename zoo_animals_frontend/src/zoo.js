fetch("http://localhost:3000/zoos")
.then((res) => res.json())
.then((data) => {
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
  document.getElementById('zoos').innerHTML = output;
})