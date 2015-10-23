class SessionsController < ApplicationController
  skip_before_action :ensure_login, only: [:new, :create]

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      login(user)
      redirect_to "/"
    else
      flash.now[:errors] = "Invalid Login."
      render :new
    end
  end

  def destroy
    logout
    render :new
  end
end
