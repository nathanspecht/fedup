class Feed < ActiveRecord::Base
  validates :title, :url, :topic, presence: true
end
