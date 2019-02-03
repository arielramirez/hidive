
import React from "react";
import HidiveSlider from "./HidiveSlider";
import RegisterModal from "./RegisterModal";

export default class HomepageVideoSliders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider_data: null,
      selected_id: null
    };
  }
  componentDidMount() {
    var json = fetch('static/json/dashboard.json')
    .then(response => response.json())
    .then(json => this.setState({slider_data: json.Data}));
  }
  updateSelectedId(id) {
    //if slide was updated, send the new selected slide to all sliders
    //This provide the functionality such that if a slide from another row is open, it will close when a slide from another row is selected.
    this.setState({selected_id: id})
  }
  render() {
    var rows = this.state.slider_data 
      ? this.state.slider_data.TitleRows.map( function(row, i) {
        return (
          <div key={`${row.Name.replace(/\W/g, '')}_${i}`} className="section">
            <h1>{row.Name}</h1>
            <VideoSlider key={i} slide_data={row.Titles} selected_id={this.state.selected_id} updateSelectedId={this.updateSelectedId.bind(this)} />
          </div>)
      }.bind(this)) 
      : null

    return (
      <div>
        {rows}
      </div>
    )
  }
}

class VideoSlider extends React.Component {
  constructor(props) {
    super(props);
    this.num_slides = 5
    this.slider = React.createRef()
    this.state = {
      selected_id: null,
      selected_row: false
    }
  }
  componentWillReceiveProps(nextProps) {
    // check if a slide was selected in another slider
    if (this.props.selected_id != nextProps.selected_id && this.state.selected_id != nextProps.selected_id)
      this.setState({ selected_id: nextProps.selected_id, selected_row: false });  
  }
  updateSelectedId(id) {
    // update this, then check if a slide was selected in this slider and pass it to the parent component
    this.setState({selected_id: id, selected_row: !!id},
      function(id) {
        this.props.updateSelectedId ? this.props.updateSelectedId(id) : null
        if(this.state.selected_row) {
          this.slider.current.scrollIntoView({ behavior: 'smooth', block: 'start'})
        }
      }.bind(this, id))
  }
  afterChangeHook(current) {
    //if this slider is currently the active one and the slide changes, update the open slide to the current one
    if (this.state.selected_id) {
      this.updateSelectedId(this.props.slide_data[current].Id)
    }
  }
  getSelectedData() {
    var data_list = this.state.selected_id ? 
      this.props.slide_data.filter(
        function(obj) {
          return obj.Id == this.state.selected_id
        }.bind(this)
      ) : null

    if (data_list && data_list.length > 1)
      throw `Multiple show records found for id ${this.state.selected_id}`

    return data_list && data_list.length == 1 ? data_list[0] : null
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
      <div ref={this.slider}>
      {this.props.slide_data ? 
          (
          <div>
            <HidiveSlider settings={settings} afterChangeHook={this.afterChangeHook.bind(this)}>
              {this.props.slide_data.map(
                function(obj){
                  var props = {
                    ...obj,
                    updateSelectedId: this.updateSelectedId.bind(this),
                    selected: this.state.selected_row && this.state.selected_id == obj.Id,
                    key: obj.Id
                  }
                  return <VideoSlide {...props} />
                }.bind(this)
                )}
            </ HidiveSlider>
            <VideoSlideDropdown data={this.state.selected_row ? this.getSelectedData() : null} onClose={this.updateSelectedId.bind(this, null)} />
            <div className="clearfix" />
          </div>)
        : null }
      </div>
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
    if (this.props.selected != nextProps.selected && this.state.selected != nextProps.selected)
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
    this.props.updateSelectedId ? this.props.updateSelectedId(id) : null
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
      register_modal: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data)
      this.setState({ data: nextProps.data });  
  }
  toggleRegisterModal() {
    this.setState({register_modal: !this.state.register_modal})
  }
  hideSection() {
    this.props.onClose ? this.props.onClose() : null;
    setState({data: null})
  }
  render() {
    var data=this.state.data

    return (      
      data ? (
      <div className="window collapsible animated fadeIn" ref={this.moreInfo} style={{display: 'block'}}>
        <div className="closeWin" style={{zIndex: 16}} onClick={this.hideSection.bind(this)}>
          <span className="closeBtn fa fa-times"></span>
        </div>
        <div className="details" style={{opacity: 1}}>
          <div>
            <div className="title-text" style={{position: 'relative', width: '100%'}}>
              <div className="text-container" style={{opacity: 1, marginLeft: '0px'}}>
                <h1><a href="/tv/girls-last-tour">{data.Name}</a></h1>
                {data.ShowInfoTitle ? <h2>{data.ShowInfoTitle}</h2> :  null}
                <div className="top-gutter-10" data-tour-point={2}>
                  <button type="button" style={{marginRight: '4px'}} className="btn btn-xs btn-primary" onClick={this.toggleRegisterModal.bind(this)}>
                    <span className="fa fa-forward" style={{lineHeight: '1em'}} />
                    <span className="btn-text hidden-xs"> Add To Queue</span>
                    <span className="btn-text visible-xs"> (+)</span>
                  </button>
                  <button type="button" className="btn btn-xs btn-primary" onClick={this.toggleRegisterModal.bind(this)}>
                    <span className="fa fa-heart" style={{}} />
                    <span className="btn-text hidden-xs"> Add Favorite</span>
                    <span className="btn-text visible-xs"> (+)</span>
                  </button>
                </div>
                { data.LongSynopsis ? 
                  <p className="hidden-xs">{data.LongSynopsis}</p>
                  : null }
                <ul className="list-unstyled details" style={{fontSize: '12px'}}>
                  { data.FirstPremiereDate ? <li className="hidden-xs">Original Premiere: {formatDateTime(new Date(data.FirstPremiereDate))}</li> : null }
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
              <div className="title-img" style={{backgroundImage: `url(https:${data.KeyArtUrl})`, float: 'right'}}>
                <div className='player activated'>
                  <a href={data.KeyArtUrl} className="free-title-window">
                    <i className="fa fa-play-circle" style={{fontSize: '5em !important'}}></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RegisterModal open={this.state.register_modal} onClose={this.toggleRegisterModal.bind(this)} />
      </div>)
      : null
    );
  }
}