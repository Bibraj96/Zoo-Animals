class SightingsController < ApplicationController
  def index
    sightings = Sighting.all
    render json: sightings
  end

  def create
    sighting = Sighting.create(sighting_params)
    render json: sighting
  end

  
end
