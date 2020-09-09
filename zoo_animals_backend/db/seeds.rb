# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

bronx = Zoo.create(name: "Bronx Zoo", city: "New York", state: "New York")
central_park = Zoo.create(name: "Central Park Zoo", city: "New York", state: "New York")
san_diego = Zoo.create(name: "San Diego Zoo", city: "San Diego", state: "California")

tortoise = Sighting.create(animal: "Aldabra Tortoise", exhibit: "Zoo Center", schedule: "Open year-round", date: "04/14/20", accessibility: "Wheelchair Accessible", description: "I had no idea that tortoises could be so large!", zoo: bronx)
panda = Sighting.create(animal: "Red Panda", exhibit: "Temperate Territory", schedule: "Open year-round", date: "06/25/20", accessibility: "Steep Hill", description: "This is the most adorable panda I've ever seen. Hard to see in the trees sometimes though", zoo: central_park)
fox = Sighting.create(animal: "Arctic Fox", exhibit: "Northern Frontier", schedule: "Late fall - winter", date: "01/30/20", accessibility: "Wheelchair Accessible", description: "These foxes look so peaceful in the snow.", zoo: san_diego)
