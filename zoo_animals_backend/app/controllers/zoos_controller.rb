class ZoosController < ApplicationController

  def index
    zoos = Zoo.all
    render json: zoos
  end

  def show
    zoo = Zoo.find(params[:id])
    render json: zoo
  end

  def create
    zoo = Zoo.create(zoo_params)
    render json: dog
  end

end
