# == Schema Information
#
# Table name: articles
#
#  id      :integer          not null, primary key
#  title   :string           not null
#  author  :string           not null
#  link    :string           not null
#  content :text             not null
#  date    :date             not null
#  snippet :text             not null
#  feed_id :integer          not null
#

class Article < ActiveRecord::Base
  validates :title,
            :author,
            :link,
            :content,
            :date,
            :snippet,
            :feed_id,
            presence: true

  belongs_to :feed,
  class_name: 'Feed',
  foreign_key: :feed_id,
  primary_key: :id

  has_many :saves,
  class_name: 'Save',
  foreign_key: :article_id,
  primary_key: :id

  has_many :savers, through: :saves, source: :user
end
