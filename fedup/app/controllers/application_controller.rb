class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    return nil if self.session[:session_token].nil?
    @user ||= User.find_by(session_token: self.session[:session_token])
  end

  def login(user)
    user.reset_session_token!
    self.session[:session_token] = user.session_token
  end

  def logout
    self.session[:session_token] = nil
  end
end
