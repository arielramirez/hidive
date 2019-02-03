import React from "react"
import ContactUsModal from "./ContactUsModal"

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open_modal: false
    }
  }
  toggleContactUsModal() {
    this.setState({open_modal: !this.state.open_modal})
  }
  render() {
    return (
      <footer className="tb-padding-10 overflow-auto">
        <div className="col-md-9">
          <ul className="list-inline">
            <li><a id="footerSignup" href="https://www.hidive.com/signup">Sign Up</a></li>
            <li><a href="https://help.hidive.com/" target="_blank">Help Center</a></li>
            <li><a href="https://www.hidive.com/about">About Us</a></li>
            <li><a id="contactUs" href="javascript:void(0);" onClick={this.toggleContactUsModal.bind(this)}>Contact Us</a></li>
            <li><a href="https://www.hidive.com/careers">Careers</a></li>
            <li><a href="https://www.hidive.com/privacy-policy">Privacy Policy</a></li>
            <li><a href="https://www.hidive.com/terms-of-use">Terms of Use</a></li>
            <li><a href="https://www.hidive.com/news">Press</a></li>
            <li><a href="https://www.hidive.com/devices">Devices</a></li>
          </ul>
          <ul className="list-inline">
            <li>HIDIVE and the logos ™ and © HIDIVE, LLC. <span><em style={{color:'transparent'}}>2019.0131.0154.456</em></span></li>
          </ul>
        </div>
        <div className="col-md-3 text-right">
          <a className="social-icons facebook2" id="facebook2_footer_anchor" href="//www.facebook.com/HIDIVEofficial" target="_blank"><i className="fa-facebook-official fa icon-1x"></i></a>
          <a className="social-icons twitter2" id="twitter2_footer_anchor" href="//www.twitter.com/HIDIVEofficial" target="_blank"><i className="fa-twitter fa icon-1x"></i></a>
          <a className="social-icons youtube2" id="youtube2_footer_anchor" href="//www.youtube.com/channel/UCeFzTMpr7ik6oU5MT_YAYzg" target="_blank"><i className="fa-youtube fa icon-1x"></i></a>
          <a className="social-icons instagram2" id="instagram2_footer_anchor" href="//www.instagram.com/HIDIVEofficial" target="_blank"><i className="fa-instagram fa icon-1x"></i></a>
        </div>
        <ContactUsModal open={this.state.open_modal} onClose={this.toggleContactUsModal.bind(this)} />
      </footer>
    )
  }
}
