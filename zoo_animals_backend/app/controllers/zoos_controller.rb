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
    zoo = Zoo.new(zoo_params)
    if zoo.save
      render json: zoo
    else
      render json: {errors: zoo.errors.full_messages}
    end
  end

  def destroy
    zoo = Zoo.find_by(id: params[:id])
    zoo.destroy
    render json: zoo
  end

  private 

  def zoo_params
    params.require(:zoo).permit(:name, :city, :state)
  end

end
