class SightingsController < ApplicationController
  def index
    sightings = Sighting.all
    render json: sightings
  end
end
