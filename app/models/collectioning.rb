# == Schema Information
#
# Table name: collectionings
#
#  id            :integer          not null, primary key
#  feed_id       :integer
#  collection_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Collectioning < ActiveRecord::Base
  validates :feed_id, uniqueness: { scope: :collection_id,
    message: "feed and collection already joined" }

  belongs_to :feed
  belongs_to :collection 
end
