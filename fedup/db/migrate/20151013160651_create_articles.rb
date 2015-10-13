class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string  :title,   null: false
      t.string  :author,  null: false
      t.string  :link,    null: false
      t.text    :content, null: false
      t.date    :date,    null: false
      t.text    :snippet, null: false
      t.integer :feed_id, null: false
    end

    add_index :articles, :link, unique: true
    add_index :articles, :feed_id
  end
end
