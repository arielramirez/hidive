
## Features Implemented
- Top Nav
  - User Menu
  - Search Bar
- Top Banner
- Featured Slider
- Content Sliders from JSON data
  - Dropdown on Video Selection
  - Registration Modal
- Footer
- Contact Us Modal with Form

## Notable Tools
- Docker
- Flask
- React
- [react-slick](https://github.com/akiran/react-slick)
- [react-select](https://github.com/JedWatson/react-select)

## Features Missing from Implementation
#### Data Not Available
  - Badges on content sliders
  - Icons next to content slider titles
  - Image rotation on hover in content slider
  - Content slider dropdown sub-navigation and Episode List/You Might Like tabs
  - Content Slider View All links for sliders with more than 15 slides

#### Missing Bells and Whistles - Out of time
- Search icon in search area is a down chevron instad of search icon
- Search bar does not have collapse animation
- Video Slider Dropdown animation on expand
- Video Slider Dropdown animation on collapse
- Video Slider Dropdown animation switch to different show
- Modal animations on open/close

#### Next steps if asked to continue. . .
  - Welcome splash page
  - Mobile design
  - Make Flask->React Routing scalable
  - Host folder directly from NGINX or UWSGI
  - Reorganize styling, get rid of redundancies between custom.css and hidive.css
    - TECHDEBT: remove the nasty note in VideoSlide regarding the class name GREEN - just change the nonsense class name to something sensical
  - Security audit
  - ARIA support

## Implementation Notes
- There were  characters in the JSON data substituting the apostrophes. I manually converted them to apostrophes.
- Realized that modals were using bootstrap after implementing from scratch in react. Did not redesign or convert to bootstrap (out of time)
