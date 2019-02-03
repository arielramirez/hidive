import React from "react";
import Slider from "react-slick";

class NextArrow extends React.Component {
  render() {
    return (
        <div onClick={this.props.onClick} style={{ ...this.props.style, display: "block"}} className="slick-arrow hidive-slick-next">
          <span className="fa fa-angle-right fa-icon-shadow"></span>
        </div>
    );
    
  }
}

class PrevArrow extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick} style={{ ...this.props.style, display: "block"}} className="slick-arrow hidive-slick-prev">
        <span className="fa fa-angle-left fa-icon-shadow"></span>
      </div>
    );
  }
}

export default class HidiveSlider extends React.Component {
  afterChangeHook(current) {
    this.props.afterChangeHook ? this.props.afterChangeHook(current) : null
  }
  render() {
    // default configuuration for hidive-styled slider
    var settings = {
      ...this.props.settings, //use passed-in settings
      dots: true,
      draggable: true,
      infinite: true,
      speed: 500,
      swipeToSlide: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      afterChange: this.afterChangeHook.bind(this)
    };    

    return this.props.children ? (
        <Slider {...settings}>
          {this.props.children}
        </Slider>
    ) : <span />;
  }
}
