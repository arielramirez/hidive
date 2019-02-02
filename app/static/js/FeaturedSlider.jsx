import React from "react";
import HidiveSlider from "./HidiveSlider";

export default class FeaturedSlider extends React.Component {

  render() {
    var settings = {
      autoplay: true,
      autoplaySpeed: 4000,
      className: "carousel tour bottom-gutter-15",
      slidesToShow: 1,
      slidesToScroll: 1
    };

    var slide_data = [
      {
        "link": 'https://www.hidive.com/devices',
        "img_url": "static/images/HIDIVE_HOMEcarousel_FireTablet_NGNL.jpg"
      },
      {
        "link": 'https://www.hidive.com/account/signup',
        "img_url": "static/images/HIDIVE_HOMEcarousel_Winter2019_PastelMemories.gif"
      },
      {
        "link": "https://www.hidive.com/account/signup",
        "img_url": "static/images/HIDIVE_HOMEcarousel_20percentOff_Promo_UPDATED.gif"
      },
    ]

    var slide_html = function(obj, i) {
      return (
        <a key={`featured_slide_${i}`} className="slider-link" style={{width: '1140px', display: 'block'}} href={obj.link}>
         <img src={obj.img_url} style={{width: '1140px', display: 'block'}} />
        </a>)
    }

    return slide_data ? (
      <div className="carousel-wrapper overflow-auto bottom-gutter-15">
        <HidiveSlider settings={settings}>
          {slide_data.map(slide_html)}
        </HidiveSlider>
      </div>
      
    ) : <span />;
  }
}
