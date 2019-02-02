import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import FullWidthBanner from "./FullWidthBanner";
import FeaturedSlider from "./FeaturedSlider";
import HidiveSlider from "./HidiveSlider";

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
    var temp = <img style={{maxWidth: '100%', zIndex: '2', position: 'relative'}} src="static/images/HIDIVE_HOMEcarousel_Winter2019_PastelMemories.gif" />
    return (
        <div className="container-fluid">
          <div className="body-bg-color top-page-offset">
            <FullWidthBanner img_url="static/images/HIDIVE_GlobalBanner_Website_XboxOne_1110x76_2.jpg" link="https://www.hidive.com/news#cbp=/news/2018/10/17/hidive-launches-on-xbox-one" collapsible={true}/>
            <FeaturedSlider />
            
            <ContentSections />

            <Footer />
          </div>
        </div>
    )
  }
}

class ContentSections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderData: null
    };
  }
  componentDidMount() {
    var json = fetch('static/json/dashboard.json')
    .then(response => response.json())
    .then(json => this.setState({sliderData: json.Data}));
  }
  render() {
    console.log(this.state.sliderData)

    var rows = this.state.sliderData 
      ? this.state.sliderData.TitleRows.map( function(row, i) {
        return (
          <div key={`${row.Name.replace(/\W/g, '')}_${i}`} className="section">
            <h1>{row.Name}</h1>
            <ContentSlider slide_data={row.Titles} />
          </div>)
      }) 
      : null

    return (
      <div>
        {rows}
      </div>
    )
  }
}


class ContentSlider extends React.Component {
  componentDidMount() {

  }
  render() {
    var settings = {
      className: "title-slider",
      slidesToShow: 5,
      slidesToScroll: 5,
      lazyLoad: true
    };

    var slide_html = function(obj) {
      return (
        <div className="cell slide">
          <div className="hitbox" key={obj.Id}>
            <div className="arrow_box">
            </div>
          </div>
          <div className="slider-default-img default-img">
            <img src={obj.RokuHDArtUrl} className="img-responsive animated fadeIn" />
          </div>
        </div>
        )
    }



    return (
      this.props.slide_data ? 
        <HidiveSlider settings={settings}>
          {this.props.slide_data.slice(0,10).map(slide_html)}
        </ HidiveSlider>
      : <span />
    )
  }
}
