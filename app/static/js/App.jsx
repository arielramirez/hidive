import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import FullWidthBanner from "./FullWidthBanner";
import FeaturedSlider from "./FeaturedSlider";
import HomepageVideoSliders from "./HomepageVideoSliders";
import RegisterModal from "./RegisterModal";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <TopNav />
        <Container />
        <div id="modal-root"></div>
      </div>
    )
  }
}

class Container extends React.Component {
  render() {
    var temp = <img style={{maxWidth: '100%', zIndex: '2', position: 'relative'}} src="static/images/HIDIVE_HOMEcarousel_Winter2019_PastelMemories.gif" />
    return (
        <div className="container-fluid">
          <div className="body-bg-color top-page-offset">
            <FullWidthBanner img_url="static/images/HIDIVE_GlobalBanner_Website_XboxOne_1110x76_2.jpg" link="https://www.hidive.com/news#cbp=/news/2018/10/17/hidive-launches-on-xbox-one" collapsible={true}/>
            <RegisterModal />
            <FeaturedSlider />
            <HomepageVideoSliders />
            <Footer />
          </div>
        </div>
    )
  }
}
