class CreateCollectionings < ActiveRecord::Migration
  def change
    create_table :collectionings do |t|
      t.integer :feed_id
      t.integer :collection_id
      t.timestamps null: false
    end

    add_index :collectionings, :feed_id
    add_index :collectionings, :collection_id
    add_index :collectionings, [:feed_id, :collection_id], unique: true
  end
end
