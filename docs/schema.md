# Schema Information
- Users have many feeds through collections.
  - Collections have feeds through collectionings.
- Feeds have many articles.
- Users have many saved articles through saves.
- Articles have many tags through taggings.

## articles
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
title          | string    | not null
author         | string    | not null
categories     | string    | not null
link           | string    | not null, indexed, unique
content        | text      | not null
publishedDate  | string    | not null
contentSnippet | string    | not null
feed_id        | integer   | not null, foreign key (references feeds), indexed

## feeds
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
url         | string    | not null, indexed, unique
topic       | string    | not null

## collections
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
user_id     | string    | not null, foreign key (references users), indexed

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
article_id  | integer   | not null, foreign key (references articles), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed
user_id     | integer   | foreign key (references users), indexed

## saves
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
article_id  | integer   | not null, foreign key (references articles), indexed, unique [user_id]
user_id     | integer   | not null, foreign key (references users), indexed

## collectionings
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
feed_id       | integer   | not null, foreign key (references feeds), indexed, unique [user_id]
collection_id | integer   | not null, foreign key (references collections), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
