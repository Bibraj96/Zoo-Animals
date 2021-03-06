class SightingsController < ApplicationController
  def index
    sightings = Sighting.all
    render json: sightings
  end

  def create
    sighting = Sighting.create(sighting_params)
    render json: sighting
  end

  def show
    sighting = Sighting.find(params[:id])
    render json: sighting
  end

  def destroy
    sighting = Sighting.find_by(id: params[:id])
    sighting.destroy
    render json: sighting
  end

  private

  def sighting_params
    params.require(:sighting).permit(:animal, :exhibit, :schedule, :date, :description, :accessibility, :zoo_id)
  end
end
