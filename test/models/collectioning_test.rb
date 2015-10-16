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

require 'test_helper'

class CollectioningTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
