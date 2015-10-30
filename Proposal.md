## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Article and Feed Models and JSON API (1.5 days)

During Phase 1 I will implement user authentication--signing in and signing up.
I will set up a full JSON API for articles and feeds.

[Details][phase-one]

### Phase 2: Flux Architecture, Add Feeds to Collections, Save Articles (3.5 days)

In Phase 2 I will begin to add organization to articles and feeds. Feeds from
various sites will be stored in the database (by their url and title). An article will not be saved to the database unless a user saves it. Articles are saved to the
database one time and associated with users through saves. When a user clicks
the link to save an article for later, it will be saved to the database only
if it has not yet been saved. I will write `FeedView` and `ArticleView` React
components along with their associated children, using bootstrap to keep the html
organized.

[Details][phase-two]

### Phase 3: Navigation and Search Bars (1 day)

I will create the `NavBar` and `SearchBar` React components.

[Details][phase-three]

### Phase 4: Tags and Collections (1 day)

Allow users to add tags to articles and view articles based on tags. Tagging an article will
save it to the database if it is not yet saved. Taggings will be associated with users.
In this way, separate users will have their own set of tags on any
given article. Allow users to create collections and add feeds to these collections.

[Details][phase-four]

### Phase 5: Mark an article as read or hidden, Organize Collections (1 day)

Users can mark an article as read so that it is no longer stored in their feed.
Users can remove collections and move feeds to different collections.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

Make things look nice with CSS and Bootstrap



[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
