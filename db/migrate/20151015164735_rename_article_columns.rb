class RenameArticleColumns < ActiveRecord::Migration
  def change
    rename_column :articles, :snippet, :contentSnippet
    rename_column :articles, :date, :publishedDate
    add_column :articles, :categories, :text
  end
end
