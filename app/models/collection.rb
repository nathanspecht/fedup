# == Schema Information
#
# Table name: collections
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Collection < ActiveRecord::Base
  validates :title, uniqueness: { scope: :user_id,
    message: "collection already created for this user" }

  belongs_to :user
  has_many :collectionings
  has_many :feeds, through: :collectionings, source: :feed
end
