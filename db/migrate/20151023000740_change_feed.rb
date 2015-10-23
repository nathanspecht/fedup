class ChangeFeed < ActiveRecord::Migration
  def change
    change_column(:feeds, :topic, :string, null: true)
  end
end
