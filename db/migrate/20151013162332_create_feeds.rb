class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.string :topic, null: false
    end

    add_index :feeds, :url, unique: true
  end
end
