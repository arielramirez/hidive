import React from "react";
import TopNav from "./TopNav"
import Footer from "./Footer"
import FullWidthBanner from "./FullWidthBanner"

export default class App extends React.Component {
  render() {
    return (
      <div>
        <TopNav />
        <ContentContainer />
      </div>
    )
  }
}

class ContentContainer extends React.Component {
  render() {
    return (
        <div className="container-fluid">
          <div className="body-bg-color top-page-offset">
            <FullWidthBanner img_url="static/images/HIDIVE_GlobalBanner_Website_XboxOne_1110x76_2.jpg" link="https://www.hidive.com/news#cbp=/news/2018/10/17/hidive-launches-on-xbox-one" collapsible={true}/>
            <img style={{maxWidth: '100%', zIndex: '2', position: 'relative'}} src="static/images/HIDIVE_HOMEcarousel_Winter2019_PastelMemories.gif" />
            <VideoSliders />
            <Footer />
          </div>
        </div>
    )
  }
}


// TODO: largeSlider

class VideoSliders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliders: null
    };
  }
  setSliderData(json) {
    console.log('got the data!')
    console.log(json)
  }
  render() {
    var json = fetch('static/json/dashboard.json')
    .then(response => response.json())
    .then(json => this.setSliderData(json));

    return (
      <div>Here's a slider!</div>
    )
  }
}

// todo: implement slider functionality basic, then large
class Slider extends React.Component {
  render() {
    return (
      <div>Slider component</div>
    )
  }
}
