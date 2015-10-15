class Api::ArticlesController < ApplicationController
  def create
    debugger
    @article = Article.find_by_link(article_params[:link])
    if @article
      save = Save.new
      save.user_id = current_user.id
      save.article_id = @article.id
      render json: @article if save.save!
    else
      @article = Article.new(article_params)
      if @article.save!
        save = Save.new
        save.user_id = current_user.id
        save.article_id = @article.id
        render json: @article if save.save!
      end
    end
  end

  def index
    @articles = current_user.saved_articles
  end

  def destroy
  end

  def show
  end

  private

  def article_params
    params.require(:article).permit(:title,
                                    :author,
                                    :link,
                                    :content,
                                    :publishedDate,
                                    :contentSnippet,
                                    { categories: [] },
                                    :feed_id)
  end
end
