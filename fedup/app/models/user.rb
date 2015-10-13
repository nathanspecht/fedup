class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, 
end
