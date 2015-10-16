# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#

class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, uniqueness: true

  before_validation :ensure_session_token

  has_many :saves, class_name: "Save"

  has_many :saved_articles, through: :saves, source: :article

  has_many :collections

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)

    if user
      user.is_password?(password) ? user : nil
    else
      nil
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
  end

  def is_password?(password)
    user_pass = BCrypt::Password.new(password_digest)
    user_pass.is_password?(password)
  end

end
