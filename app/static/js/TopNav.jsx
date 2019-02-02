import React from "react";

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    // needed for menu functionality
    this.accountMenu = React.createRef()
    this.externalClickHandler = this.hideMenuOnExternalClick.bind(this)
    this.state = {
      show_menu: false
    };
  }
  toggleMenu(evt) {
    if (evt) {
      evt.stopPropagation()
    }
    if (!this.state.show_menu) {
      // adapted from https://www.blustemy.io/detecting-a-click-outside-an-element-in-javascript/
      //identifying click outside menu
      // this is needed to close the menu when user clicks outside of menu element
      document.addEventListener("click", this.externalClickHandler)
    }
    else {
      //stop listening for click when menu is closed
      document.removeEventListener("click", this.externalClickHandler)
    }
    this.setState({ show_menu: !this.state.show_menu })
  }
  hideMenuOnExternalClick(evt) {
    const flyoutElement = this.accountMenu.current
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement == flyoutElement) {
            // This is a click inside. Do nothing, just return.
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside, so close the menu
    this.toggleMenu()
  }
  render() {
    return (
      <nav className="navbar navbar-fixed-top">
        <div className="container-fluid top-padding-15 bottom-gutter-5">
          <div className="row">
            <div className="col-sm-9">
              <ul className="list-inline nav-list">
                <li style={{width:'160px'}}>
                    <a id="hdLogo" href="/" title="HIDIVE">
                      <img src="static/images/HIDIVE_logo.svg" alt="HIDIVE" className="img-responsive" style={{height:'35px', maxWidth: 'none !important'}} />
                    </a>
                </li>
                  <li>
                    <a href="https://www.hidive.com/simulcasts" className="nav">Simulcasts</a>
                  </li>
                  <li>
                    <a href="https://www.hidive.com/dubs" className="nav">Dubs</a>
                  </li>
                  <li>
                    <a href="https://www.hidive.com/tv" className="nav">Series</a>
                  </li>
                  <li>
                    <a href="https://www.hidive.com/movies" className="nav">Movies</a>
                  </li>
                  <li>
                    <a href="https://www.hidive.com/free-episodes" className="nav free" style={{fontWeight:'700'}}>
                      <span className="plaque free">FREE!</span>
                    </a>
                  </li>
                  <li> | </li>
                  <li className="">
                    <a href="https://www.hidive.com/jan-2019-release-schedule" className="nav">Schedule</a>
                  </li>
                  <li>
                    <a href="//shop.sentaifilmworks.com/" target="" id="shop">Shop</a>
                  </li>
                  <li>
                    <a href="https://www.hidive.com/news">News</a>
                  </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <div className="top-gutter-5">
                <div className="text-right">
                  <ul className="list-inline nav-list" style={{position: 'relative'}}>
                    <li>
                      <a href="https://www.hidive.com/signup" id="signUpNow" className="animated flash">
                        <span className="plaque">FREE Trial!</span>
                      </a>
                    </li>
                    <li style={{position: 'relative'}}>
                      <div id="topSearch">
                        <form className="form-group-sm search-form" id="nav-search" method="get" action="/search" role="search">
                          <span className="twitter-typeahead" style={{position: 'relative', display: 'inline-block'}}>
                            <input type="text" name="q" className="typeahead form-control input-sm tt-input" placeholder="Search Titles..." dir="auto" style={{position: 'relative', verticalAlign: 'top'}}></input>
                            <pre aria-hidden="true" style={{position: 'absolute', visibility: 'hidden', whiteApace: 'pre', fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, wordSpacing: '0px', letterSpacing: '0px',  textIndent: '0px', textRendering: 'auto', textTransform: 'none'}}></pre>
                            <div className="tt-menu" style={{position: 'absolute', top: '100%', left: '0px', zIndex: '100', display: 'none'}}>
                              <div className="tt-dataset tt-dataset-search"></div>
                            </div>
                          </span>
                          <button type="submit" className="btn btn-default btn-sm" id="search-btn">
                            <span className="fa fa-search"></span>
                          </button>
                        </form>
                      </div>
                      <a href="javascript:void(0);" id="searchIcon">
                        <span className="fa fa-search" style={{fontSize: '2em'}}></span>
                      </a>
                    </li>
                    <li className="">
                      <div className="dropdown">
                        <a href="javascript:void(0);" onClick={this.toggleMenu.bind(this)} className="dropdown-toggle" id="dropdownMenu12" data-toggle="dropdown">
                          <span className="fa fa-user" style={{fontSize: '2em'}} title="My Account"></span>
                        </a>
                        <ul ref={this.accountMenu} className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu12" style={{display: this.state.show_menu ? 'initial' : 'none'}}>
                          <li><a href="https://www.hidive.com/account/login"><i className="fa fa-sign-in fa-fw"></i> Log In</a></li>
                          <li><hr className="style1" /></li>
                          <li><a href="https://help.hidive.com/" target="_blank"><i className="fa fa-question fa-fw"></i> Help Center</a></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
    ;
  }
}

export default TopNav;