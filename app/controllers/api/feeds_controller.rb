class Api::FeedsController < ApplicationController

  def create
  end

  def destroy
  end

  def show
  end

  def index
    @feeds = Feed.all
  end
end
