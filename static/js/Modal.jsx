import React from "react";
import ReactDOM from "react-dom";


export default class Modal extends React.Component{
  constructor(props) {
    super(props)
    this.elem = document.createElement('div1')
    this.modalBackground = React.createRef()
    this.state = {
      open: this.props.open || false,
    }
  }
  componentDidMount() {
    document.getElementById('modal-root').appendChild(this.elem)
  }
  componentWillUnmount() {
    document.getElementById('modal-root').removeChild(this.elem)
  }
  close() {
    this.setState({open: false})
    this.props.onClose ? this.props.onClose() : null

  }
  open() {
    this.setState({open: true})
  }
  checkForBackroundClick(evt) {
    //close the modal if the user clicked on the background
    if (evt.target == this.modalBackground.current) {
      this.close()
    }
  }
  render() {
    return ReactDOM.createPortal(
      (<div ref={this.modalBackground} className={'modal fade ' + (this.props.open ? 'modal-open in' :  'hidden') } id={this.props.id} tabIndex={-1} role="dialog" onClick={this.checkForBackroundClick.bind(this)} style={{display: 'block', paddingRight: '15px', backgroundColor: 'rgb(0, 0, 0, .5)'}}>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <button type="button" className="close" style={{position: 'absolute', right: '15px', top: '15px'}} onClick={this.close.bind(this)}><span aria-hidden="true">×</span></button>
            {this.props.title ?
              <div className="modal-header">
                <div className="modal-title">
                  {this.props.title}
                </div>
              </div>
            : null}
            <div className="modal-body">
              {this.props.body}  
            <div className="text-center"><small className="text-tiny">US 73.32.231.244</small></div>
            </div>
          </div>
        </div>
      </div>),
      this.elem)
  }
}
