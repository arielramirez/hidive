import React from "react"
import Modal from "./Modal"

export default class RegisterModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reason: null,
      open: this.props.open || false
    }
  }
  componentWillReceiveProps(nextProps) {
    // check if a slide was selected in another slider
    if (this.props.open != nextProps.open && nextProps.open != this.state.open)
      this.setState({ open: nextProps.open });  
  }
  updateContactReason(evt) {
    this.setState({reason: evt.target.value})
  }
  close() {
    this.setState({open: false})
    this.props.onClose ? this.props.onClose() : null
  }
  render() {
    var body = (
      <div>
        <div className="clearfix">
          <div className="col-lg-10 col-lg-offset-1">
            <h2 className="text-center text-cyan" style={{marginTop: '5px'}}>Want to start watching?</h2>
            <p className="custom-msg text-primary" style={{display: 'none'}} />
            <p>Become a subscriber and access all of these great features:</p>
            <ol>
              <li>Simulcasts</li>
              <li>English Dubs</li>
              <li>HIDIVE Exclusives</li>
              <li>Up to 1080p Resolution</li>
              <li>And So Much More!</li>
            </ol>
          </div>
        </div>
        <div className="clearfix">
          <div className="col-lg-8 col-lg-offset-2 tb-padding-10">
            <a href="https://www.hidive.com/signup" className="btn btn-primary btn-block"><i className="fa fa-thumbs-up" aria-hidden="true" /> Free 7 Day Trial</a>
          </div>
          <div className="col-lg-8 col-lg-offset-2 tb-padding-10">
            <a href="https://www.hidive.com/account/login" className="btn btn-warning btn-block"><i className="fa fa-sign-in" aria-hidden="true" /> I Already Have an Account</a>
          </div>
        </div>
      </div>
    )
    return <Modal body={body} open={this.state.open}  id={'RegisterModal'} onClose={this.close.bind(this)} />;
  }
}