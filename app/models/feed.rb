# == Schema Information
#
# Table name: feeds
#
#  id    :integer          not null, primary key
#  title :string           not null
#  url   :string           not null
#  topic :string           not null
#

class Feed < ActiveRecord::Base
  validates :title, :url, :topic, presence: true

  has_many :saved_articles,
  class_name: 'Article',
  foreign_key: :feed_id,
  primary_key: :id
end
