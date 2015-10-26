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
    @user = User.new()
    @user.password = (100_000...999_999).to_a.sample.to_s
    @user.username = "guest_" + (100_000...999_999).to_a.sample.to_s
    if @user.save!
      login(@user)
      render json: {"signed in" => true}
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
