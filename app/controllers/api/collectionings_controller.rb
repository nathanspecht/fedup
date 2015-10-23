class Api::CollectioningsController < ApplicationController
  def create
    if !params[:collectioning][:feed][:id]
      feed = Feed.find_by_url(params[:collectioning][:feed][:url])
      if feed
        feed_id = feed.id
      else
        feed = Feed.new({ title: params[:collectioning][:feed][:title],
                          url: params[:collectioning][:feed][:url] })
        feed.save!
        feed_id = feed.id
      end
    else
      feed_id = params[:collectioning][:feed][:id]
    end

    @collectioning = Collectioning.new({feed_id: feed_id,
                collection_id: params[:collectioning][:collection_id]})

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
    params.require(:collectioning).permit(:collection_id, :feed)
  end

end
