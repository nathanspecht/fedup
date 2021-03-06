class Api::CollectionsController < ApplicationController

  def create
    @collection = Collection.new(collection_params)
    @collection.user_id = current_user.id
    if @collection.save
      render :show
    end
  end

  def destroy
  end

  def index
    @collections = Collection.includes(:feeds).where({ user_id: current_user.id })
    render :index
  end

  def show
    @collection = Collection.find(params[:id])
  end

  private

  def collection_params
    params.require(:collection).permit(:title)
  end
end
