# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151015164735) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string  "title",          null: false
    t.string  "author",         null: false
    t.string  "link",           null: false
    t.text    "content",        null: false
    t.date    "publishedDate",  null: false
    t.text    "contentSnippet", null: false
    t.integer "feed_id",        null: false
    t.text    "categories"
  end

  add_index "articles", ["feed_id"], name: "index_articles_on_feed_id", using: :btree
  add_index "articles", ["link"], name: "index_articles_on_link", unique: true, using: :btree

  create_table "feeds", force: :cascade do |t|
    t.string "title", null: false
    t.string "url",   null: false
    t.string "topic", null: false
  end

  add_index "feeds", ["url"], name: "index_feeds_on_url", unique: true, using: :btree

  create_table "saves", force: :cascade do |t|
    t.integer  "article_id", null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "saves", ["article_id", "user_id"], name: "index_saves_on_article_id_and_user_id", unique: true, using: :btree
  add_index "saves", ["article_id"], name: "index_saves_on_article_id", using: :btree
  add_index "saves", ["user_id"], name: "index_saves_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string "username",        null: false
    t.string "password_digest", null: false
    t.string "session_token",   null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
