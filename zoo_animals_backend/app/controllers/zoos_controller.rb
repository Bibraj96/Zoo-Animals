class ZoosController < ApplicationController

  def index
    zoos = Zoo.all
    render json: zoos
  end

end
