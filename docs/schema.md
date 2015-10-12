# Schema Information
- Users have many feeds through collections.
  - Collections have feeds through collectionings.
- Feeds have many articles.
- Users have saved articles.
- Topics have many feeds.
- Articles have many tags through taggings.

## articles
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
url         | string    | not null
feed_id     | integer   | not null, foreign key (references feeds), indexed

## feeds
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
url         | string    | not null
topic_id    | string    | not null, foreign key (references topics), indexed

## collections
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
user_id     | string    | not null, foreign key (references users), indexed

## topic
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

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
