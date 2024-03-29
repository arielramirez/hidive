## Goal

Given a sample data set in JSON, use the data to replicate the HIDIVE Home Page to the best of your ability to showcase your skills.

Deploy the source code and final page to a hosted environment if possible. Link to the HIDIVE home page: https://www.hidive.com/

## Completed Work

[View the finished webpage.](http://54.224.31.117:5000/)

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

## Implementation Notes
- There were  characters in the JSON data substituting the apostrophes. I manually converted them to apostrophes.
- I realized that modals were using bootstrap after implementing them from scratch in react. I choose not to re-implement them in the interest of time. All hidive.com features were retained except for the transition effects.
- This was my first time working with Docker. A decent amount of time was spent figuring it out and setting up the server.
- I have limited experience with CSS transitions and they were a pain point here. I implemented a few, but did not have time to finish all of them.

<details><summary>What was not implemented?</summary>
  <p> 
    
#### Data Not Available
  - Badges on content sliders
  - Icons next to content slider titles
  - Image rotation on hover in content slider
  - Content slider dropdown sub-navigation and Episode List/You Might Like tabs
  - Content Slider View All links for sliders with more than 15 slides

#### Missing Bells and Whistles (out of time)
- Search icon in search area is a down-chevron instead of search icon
- Search bar requires extra click to focus on the typing area - it should auto-focus after expanded
- Search bar does not have collapse animation
- Register Modal width is too wide
- Video Slider Dropdown animation on expand, collapse and switching shows
- Modal animations on open/close

#### Next steps if asked to continue. . .
  - Welcome splash page
  - Mobile design
  - Make Flask->React Routing scalable
  - Host static folder directly from NGINX
  - Reorganize styling, get rid of redundancies between custom.css and hidive.css
    - TECHDEBT: remove the nasty note in VideoSlide regarding the class name GREEN - just change the nonsense class name to something sensical

</p>
</details>
