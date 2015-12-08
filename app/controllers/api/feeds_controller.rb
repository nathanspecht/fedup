class Api::FeedsController < ApplicationController

  def create
  end

  def destroy
  end

  def show
    feed = Feedjira::Feed.fetch_and_parse(params[:feed_url]) ||
           Feedjira::Feed.fetch_and_parse(Feed.find(params[:id]).url)
    articles = []
    feed.entries.each do |entry|
      article = Article.new
      summary = ActionView::Base.full_sanitizer.sanitize(entry.summary) ||
                ActionView::Base.full_sanitizer.sanitize(entry.content)
      article.contentSnippet = summary[0..120] if summary
      article.link = entry.url
      article.author = entry.author
      article.publishedDate = entry.published
      article.content = entry.content || entry.summary
      article.title = entry.title
      article.categories = entry.categories
      articles.push(article)
    end

    render json: articles
  end

  def index
    @feeds = Feed.all
  end

end
