class Api::CollectioningsController < ApplicationController
  def create
    @collectioning = Collectioning.new(collectioning_params)
    if @collectioning.save!
      @feed = Feed.find(@collectioning.feed_id)
      @collection = Collection.find(@collectioning.collection_id)
      render :show
    end
  end

  def destroy
    @collectioning = Collectioning.find_by_collection_id_and_feed_id(
      params[:collectioning][:collection_id],
      params[:collectioning][:feed_id]
    )
    if @collectioning && @collectioning.delete
      @feed = Feed.find(@collectioning.feed_id)
      @collection = Collection.find(@collectioning.collection_id)
      render :show
    end
  end

  def show
    @collectioning = Collectioning.find(params[:id])
    @feed = Feed.find(@collectioning.feed_id)
    @collection = Collection.find(@collectioning.collection_id)
    render :show
  end

  private

  def collectioning_params
    params.require(:collectioning).permit(:collection_id, :feed_id)
  end
end
