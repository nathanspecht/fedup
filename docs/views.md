# View Wireframes

## Landing Page
![landing-page]

## New Session
![new-session]

## FeedView / NavBar / SearchBar
![feed-view]

## SearchView
![search-view]

## ArticleView
![article-view]

## Component Heirarchy
### App
#### NavBar
  - links
  - CollectionDropdown
    - links
  - AddContentButton

#### SearchBar
  - SearchDropdown
    - links

#### FeedView
  - TodayThumbs
    - ArticleThumb
  - PreviousThumbs
    - ArticleThumb

#### SearchView
  - SiteThumb
    - AddToFeedButton
    - ArticlePreview

#### ArticleView
  - CloseButton
  - ArticleHeading
  - ArticleNav
    - SaveButton
    - NewTagButton
    - TagButton
  - ArticleContent

[landing-page]: ./wireframes/landing_page.png
[new-session]: ./wireframes/new_session.png
[feed-view]: ./wireframes/feed_view.png
[search-view]: ./wireframes/search_view.png
[article-view]: ./wireframes/article_view.png
[component-heirarchy]: ./wireframes/component_heirarchy.md
