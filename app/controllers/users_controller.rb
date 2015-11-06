class UsersController < ApplicationController
  skip_before_action :ensure_login, only: [:new, :create, :new_guest]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save!
      login(@user)
      redirect_to "/#/explore"
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def new_guest
    @user = generate_guest_user

    if @user.save!
      save_articles_for_guest_user(@user.id)
      create_collections_for_guest_user(@user.id)
      login(@user)
      render json: {"signed in" => true}
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

  def generate_guest_user
    user = User.new
    user.password = (100_000...999_999).to_a.sample.to_s
    user.username = "guest_" + (100_000...999_999).to_a.sample.to_s
    user
  end

  def save_articles_for_guest_user(user_id)
    Article.all[0..10].each do |article|
      save = Save.new
      save.user_id = user_id
      save.article_id = article.id
      save.save!
    end
  end

  def create_collections_for_guest_user(user_id)
    collection = Collection.new
    collection.title = "Favorites"
    collection.user_id = user_id
    collection.save!

    Feed.all[0..4].each do |feed|
      collectioning = Collectioning.new
      collectioning.collection_id = collection.id
      collectioning.feed_id = feed.id
      collectioning.save!
    end
  end
end
