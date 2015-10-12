# Phase 2: Flux Architecture and Note CRUD (2 days)

## Rails
### Models
* Save

### Controllers
* SavesController (create, destroy, index)

### Views

## Flux
### Views (React Components)
* FeedView
  - TodayThumbs
    - ArticleThumb
  - PreviousThumbs
    - ArticleThumb

* ArticleView
  - CloseButton
  - ArticleHeading
  - ArticleNav
    - SaveButton
  - ArticleContent

### Stores
* Article
* Feed

### Actions
* ApiActions.receiveFeeds
* ApiActions.receiveFeedArticles

### ApiUtil
* ApiUtil.fetchFeeds
* ApiUtil.fetchFeedArticles
* ApiUtil.fetchSingleArticle
* ApiUtil.saveArticle

## Gems/Libraries
* Flux Dispatcher
* Twitter Bootstrap
