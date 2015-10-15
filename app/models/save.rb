# == Schema Information
#
# Table name: saves
#
#  id         :integer          not null, primary key
#  article_id :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Save < ActiveRecord::Base
  validates :user_id, :article_id, presence: true

  belongs_to :user,
  class_name: 'User',
  foreign_key: :user_id,
  primary_key: :id

  belongs_to :article,
  class_name: 'Article',
  foreign_key: :article_id,
  primary_key: :id
end
