class Api::CollectionsController < ApplicationController
  def create
    @collection = Collection.new(collection_params)
    @collection.user_id = current_user.id
    if @collection.save
      render json: @article
    end
  end

  def destroy
  end

  def show
  end

  def index
    @collections = Collection.find_by_user_id(current_user.id)
    render json: @collections
  end

  private

  def article_params
    params.require(:collection).permit(:title)
  end
end
