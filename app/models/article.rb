# == Schema Information
#
# Table name: articles
#
#  id             :integer          not null, primary key
#  title          :string           not null
#  author         :string           not null
#  link           :string           not null
#  content        :text             not null
#  publishedDate  :date             not null
#  contentSnippet :text             not null
#  feed_id        :integer          not null
#  categories     :text
#

class Article < ActiveRecord::Base
  validates :title,
            :author,
            :link,
            :content,
            :publishedDate,
            :contentSnippet,
            :categories,
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
  
  def self.construct(entry)
    summary = ActionView::Base.full_sanitizer.sanitize(entry.summary) ||
              ActionView::Base.full_sanitizer.sanitize(entry.content)
    
    article = Article.new(
      contentSnippet: summary[0..120],
      link: entry.url,
      author: entry.author,
      publishedDate: entry.published,
      content: entry.content || entry.summary,
      title: entry.title,
      categories: entry.categories
    )
  end
end
