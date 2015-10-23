# == Schema Information
#
# Table name: feeds
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  url         :string           not null
#  topic       :string
#  description :text
#

class Feed < ActiveRecord::Base
  validates :title, :url, presence: true

  has_many :saved_articles,
  class_name: 'Article',
  foreign_key: :feed_id,
  primary_key: :id

  has_many :collectionings
  has_many :collections, through: :collectionings, source: :collection
end
