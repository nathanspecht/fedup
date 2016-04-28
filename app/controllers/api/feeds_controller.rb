class Api::FeedsController < ApplicationController

  def create
  end

  def destroy
  end

  def show
    if params[:feed_url]
      feed = Feedjira::Feed.fetch_and_parse(params[:feed_url])
    else
      feed = Feedjira::Feed.fetch_and_parse(Feed.find(params[:id]).url)
    end

    # Should be in the articles controller?

    articles = []
    articles = feed.entries.map { |entry| Article.construct(entry) }
    render json: articles
  end

  def index
    @feeds = Feed.all
  end
end
