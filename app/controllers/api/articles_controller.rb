class Api::ArticlesController < ApplicationController
  def create
    @article = Article.new(article_params)
    if @article.save!
      render json: @article
    end
  end

  def index
  end

  def destroy
  end

  def show
  end

  private

  def article_params
    params.require(:article).permit(:title, :author, :link, :content, :date, :snippet, :feed_id)
  end
end
