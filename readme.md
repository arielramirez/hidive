## Remaining Tasks
#### Content Sliders
- Dropdown animation expand
- Dropdown animation collapse
- Dropdown animation switch to new show
- Trigger login/register modal on button click (needs modal first) 

#### Modals
- Register/login
- Contact us

#### Footer
- Contact Us modal (needs to be built)

#### Search
- Search input animation
- Search string matches (fuzzy)

#### Clean up
- Move all jsx components into own files for maintainability
- (optional but advised) Remove all unecessary styling, remove redundancies between hidive and custom stylesheets for simplicity
  - remove the nasty note in VideoSlide regarding the class name GREEN - just change the stupid class name

## If Time Allows. . .
Known bugs
- add auto-scroll on dropdown click to align browser with row selected
- Full width slider only supports desktop
- slider nav arrows should be relative (re-position with browser, needs to be a percentage of total height)
- Fonts are hunting in /fonts, need to serve /fonts from /static/fonts
- Slider nav incorrect (fixed by fonts. . .)
- Remove 'free' from top nav (website was updated . . .)
- implement glyphicons (right/left arrows in slider, video player icon, bottom arrow icon for slider hover dropdown)


## Features Missing from Implementation
- No data available
  - Badges on content sliders
  - Icons next to content slider titles
  - Image rotation on hover in content slider
  - Content slider dropdown - Content within Episode List and You Might Like nav options
- Unsure if necessary
  - Welcome landing page
  - mobile version
  - ARIA support



Implementation Notes:
- All icons are currently font icons. No glyphy icons included. 
- Did not implement sub-nav in content dropdown. There was no data to populate the sub-menus.
- There were  characters in the JSON data substituting the apostrophes. I manually converted them to apostrophes.
