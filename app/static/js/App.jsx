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
            {/* <FeaturedSlider /> */}
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
    var rows = this.state.sliderData 
      ? this.state.sliderData.TitleRows.slice(0,1).map( function(row, i) {
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
  constructor(props) {
    super(props);
    this.num_slides = 5
    this.state = {
      selected_show_id: null
    }
  }
  updateSelectedShowId(id) {
    this.setState({selected_show_id: id})
  }
  getSelectedShowData() {
    var data_list = this.state.selected_show_id ? 
     this.props.slide_data.filter(function(obj) {return obj.Id == this.state.selected_show_id}.bind(this)) : null
    if (data_list && data_list.length != 1)
      throw "Invalid selected show id selected"
    return data_list ? data_list[0] : data_list
  }
  render() {
    var settings = {
      className: "title-slider",
      slidesToShow: this.num_slides,
      slidesToScroll: this.num_slides,
      lazyLoad: true
    }

    //workaround for known react-slick bug: https://github.com/akiran/react-slick/issues/1296 
    if (this.props.slide_data && this.props.slide_data.length < this.num_slides) {
      settings.className += ' hide-duplicate-slides'
    }
    return (
      this.props.slide_data ? 
        <div>
          <HidiveSlider settings={settings}>
            {this.props.slide_data.map(
              function(obj){
                var props = {
                  ...obj,
                  updateSelectedShowId: this.updateSelectedShowId.bind(this),
                  selected: this.state.selected_show_id == obj.Id
                }
                return <VideoSlide {...props} />
              }.bind(this)
            )}
          </ HidiveSlider>
          <VideoSlideDropdown data={this.getSelectedShowData()} />
        </div>
      : <span />
    )
  }
}

class VideoSlide extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      selected: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selected != nextProps)
      this.setState({ selected: nextProps.selected });  
  }
  hoverOn() {
    this.setState({ hover: true });
  }
  hoverOff(){  
    this.setState({ hover: false });    
  }
  selectShow(id) {
    this.setState({selected: true})
    this.props.updateSelectedShowId ? this.props.updateSelectedShowId(id) : null
  }
  render() {
    var hover_class = this.state.hover ? " fadeIn" : "";
    return (
      <div className="cell slide" key={this.props.Id}>
        <div className="hitbox" onMouseEnter={this.hoverOn.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>
          <div className={"arrow_box" + (this.state.selected ? " green" : "")}> {/* <---- GREEN IS A TERRIBLE CLASS NAME FOR APPLYING/REMOVING CLICK EFFECTS!!!! And the border is blue, not green... Techdebt anyone? Only using this because the css is already built in hidive.css*/}
            <div className={"player" + hover_class}>
              <a href={this.props.MasterArtUrl} target="_blank"  className="fa fa-play-circle" style={{fontSize: '3em', lineHeight: '1em'}}></a>
            </div>
            <div className={"synopsis" + hover_class}>
              <h3 title={this.props.Name}>{this.props.Name}</h3>
            </div>
            <div id={this.props.Id} className={"expander" + hover_class} style={{lineHeight: '1em', cursor: 'pointer'}} onClick={this.selectShow.bind(this, this.props.Id)}>
              <span className="fa fa-angle-down"></span>
            </div>
          </div>
        </div>
        <div className="slider-default-img default-img">
          <img src={this.props.MasterArtUrl} className="img-responsive animated fadeIn" />
        </div>
      </div>
      )
    }
}


class VideoSlideDropdown extends React.Component {  
  constructor(props) {
    super(props);
    this.moreInfo = React.createRef()
    this.state = {
      data: this.props.data,
      expanded: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data)
      this.setState({ data: nextProps.data }, this.showMoreInfo.bind(this, this.props.data));  
  }
  showMoreInfo(prevData) {
    // if (this.state.data && !prevData) {
    //   expandSection(this.moreInfo.current)
    // } 
  }
  showSubscribeModal() {
    alert("TODO")
  }
  render() {
    console.log(this.state.data)
    var data=this.state.data

    var collapsed = this.state.data

    return (      
      data ? (
      <div className="window collapsible  animated fadeIn" data-collapsed={true} ref={this.moreInfo} style={{display: 'block'}}> {/* start at 0 to intialize collapsed for animation */}
        <div className="closeWin" onClick={collapseSection.bind(this.moreInfo.current)}>
          <span className="closeBtn fa fa-times"></span>
        </div>
        <div className="details" style={{opacity: 1}}>
          <div className="display-table">
            <div className="title-text">
              <div className="text-container" style={{opacity: 1, marginLeft: '0px'}}>
                <h1><a href="/tv/girls-last-tour">{data.Name}</a></h1>
                <h2>Season 1</h2>
                <div className="top-gutter-10" data-tour-point={2}>
                  <button type="button" style={{marginRight: '4px'}} className="btn btn-xs btn-primary" onClick={this.showSubscribeModal}>
                    <span className="fa fa-forward" style={{lineHeight: '1em'}} />
                    <span className="btn-text hidden-xs"> Add To Queue</span>
                    <span className="btn-text visible-xs"> (+)</span>
                  </button>
                  <button type="button" className="btn btn-xs btn-primary" onClick={this.showSubscribeModal}>
                    <span className="fa fa-heart" style={{}} />
                    <span className="btn-text hidden-xs"> Add Favorite</span>
                    <span className="btn-text visible-xs"> (+)</span>
                  </button>
                </div>
                <p className="hidden-xs">In a future where most of humanity has perished, two girls explore the ruins of civilization, looking for food and fuel. With Chito behind the wheel and Yuuri handling gun duties, they try to salvage what’s left of their post-apocalyptic world.</p>
                <ul className="list-unstyled details" style={{fontSize: '12px'}}>
                  <li className="hidden-xs">Original Premiere: 10/5/2017 6:00:00 PM</li>
                  <li>
                    Versions: <span className="comma-list">
                      <span>Broadcast</span>
                      <span>Home Video</span>
                    </span>
                    (TV-14)
                  </li>
                  <li>
                    Audio: <span className="comma-list">
                      <span>Japanese</span>
                      <span>English</span>
                    </span>
                  </li>
                  <li>
                    Subtitles: <span className="comma-list">
                      <span>English</span>
                    </span>
                  </li>
                  <li className="hidden-xs">Genres: Drama, Science Fiction</li>
                </ul>
              </div>
              <div className="table-cell title-img" style={{backgroundImg: `url(https:${data.KeyArtUrl})`}}>
                <div className="player activated">
                  <a href={data.KeyArtUrl} className="free-title-window">
                    <i className="fa fa-play-circle"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)
      : null
    );
  }
}