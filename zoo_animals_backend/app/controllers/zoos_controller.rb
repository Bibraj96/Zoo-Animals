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
    render json: zoo
  end

  def destroy
    zoo = Zoo.find_by(id: params[:id])
    zoo.destroy
    render json: zoo
  end
  
end

  private 

  def zoo_params
    params.require(:zoo).permit(:name, :city, :state)
  end

end
