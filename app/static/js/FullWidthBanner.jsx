import React from "react";

class FullWidthBanner extends React.Component {
  constructor(props) {
    super(props);
    this.hide_ad_code = 'hidden'
    this.hide_ad_cookie = 'hidden'
    this.adDiv = React.createRef()
    document.cookie=`${this.hide_ad_cookie}=false`
    this.state = {
      hide_ad: getCookie(this.hide_ad_cookie) 
    };
  }
  closeAd() {
    document.cookie=`${this.hide_ad_cookie}=${this.hide_ad_code}`
    collapseSection(this.adDiv.current)
    setTimeout(() => {this.setState({ hide_ad: this.hide_ad_code})}, 1000)
  }
  render() {
    var hide_ad =this.state.hide_ad === this.hide_ad_code 
    return ( 
      <div ref={this.adDiv} id="marketApp" className={"col-xs-12 tb-padding-15 animated fadeIn collapsible " + (hide_ad ? 'collapsed hidden' : '')}>
        <div className="banner-img clearfix" style={{backgroundColor: 'black'}}>
          <button type="button" className="close" onClick={this.closeAd.bind(this)} aria-label="Close">
            <span aria-hidden="true"><i className="fa fa-times" aria-hidden="true"></i></span>
          </button>
          <a href={this.props.link}>
            <img className="img-responsive hidden-xs" src={this.props.img_url}/>
          </a>
        </div>
      </div>
    )
  }
}

export default FullWidthBanner;