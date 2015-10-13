class SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      login(user)
      redirect_to static_pages_url
    else
      flash.now[:errors] = "Invalid Login."
      render :new
    end
  end

  def destroy
    logout(current_user)
    redirect_to new_session_url
  end
end