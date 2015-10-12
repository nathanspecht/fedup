# Phase 1: User Authentication, Note Model and JSON API

## Rails
### Models
* User
* Article
* Feed

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* Api::ArticlesController (create, destroy, show, index)
* Api::FeedsController (create, destroy, show, index)

### Views
* users/new.html.erb
* session/new.html.erb
* feeds/index.json.jbuilder
* feeds/show.json.jbuilder
* articles/show.json.jbuilder

## Flux
### Views (React Components)

### Stores

### Actions

### ApiUtil

## Gems/Libraries
* BCrypt
* Google Feed API
