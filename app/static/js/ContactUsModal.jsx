import React from "react"
import Modal from "./Modal"

export default class ContactUsModal extends React.Component {
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
    var title = (<h2 className="text-orange" style={{padding: 0, margin: 0}}>Question? We're here to help!</h2>)
    var show_quick_help = this.state.reason == 'Careers' || this.state.reason == 'ScreeningRequests'
    var body = (
        <form id="contactUsForm">
          <input type="hidden" name="video" id="contactUsVideo" />
          <div className="form-group">
            <input className="form-control" id="name" name="name" placeholder="Name (Required)" required="required" type="text" placeholder="Name (Required)" />
          </div>
          <div className="form-group">
            <input className="form-control" id="email" name="email" placeholder="E-mail (Required & not shared)" required="required" type="email" placeholder={'Email (Required & not shared)'} />
          </div>
          <div className="form-group">
            <select id="contactUsSubject" name="subject" className="form-control" onChange={this.updateContactReason.bind(this)} value="default">
              <option disabled value="default">What's on your mind?</option>
              <option value="Careers">Careers</option>
              <option value="ConventionSupport">Convention Support</option>
              <option value="CopyrightInfringement">Copyright Infringement</option>
              <option value="General">General</option>
              <option value="PressNews">Press &amp; News</option>
              <option value="ScreeningRequests">Screening Requests</option>
              <option value="Suggestions">Suggestions</option>
              <option value="TechnicalSupport">Technical Support</option>
              <option value="ProductConcerns">Product Concerns</option>
            </select>
          </div>
          <div id="contactUsQuick" className="form-group quickHelp" style={show_quick_help ? {display: 'block'} : {}} >
            <h4>Quick Help</h4>
            {this.state.reason == 'Careers' ? (
              <ul id="quickCareers">
                <li><a href="https://www.hidive.com/careers">Careers.</a></li>
              </ul>) : null}
            {this.state.reason == 'ScreeningRequests' ? (
              <ul id="quickScreeningRequests">
                <li>
                  HIDIVE can’t give permission for you to screen our titles, BUT we can totally help you get
                  connected with the people who can. Leave the hard work to us: just send us a screening request,
                  and we’ll contact that show’s licensors on your behalf to get permission.
                </li>
              </ul>) : null}
          </div>
          <div className="form-group">
            <textarea className="form-control" cols={20} id="body" maxLength={1000} name="body" placeholder="Your Message (1000)" required="required" rows={5} style={{resize: 'none'}} defaultValue={""} />
          </div>
          <div className="form-group text-right">
            <button type="button" className="btn btn-default btn-sm" data-dismiss="modal" onClick={this.close.bind(this)}  style={{marginRight: '4px'}}>Close</button>
            <button id="contactUsSubmit" type="button" onClick={this.close.bind(this)}  className="btn btn-primary btn-sm"><i className="fa fa-paper-plane" aria-hidden="true" /> Send</button>
          </div>
          <div id="contactUsMessage" />
        </form>
    )
    return <Modal title={title} body={body} open={this.state.open} id={'ContactUsModal'} onClose={this.close.bind(this)} />;
  }
}