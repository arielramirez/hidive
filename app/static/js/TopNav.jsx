import React from "react";

class TopNav extends React.Component {
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
                        <a href="javascript:void(0);" className="dropdown-toggle" id="dropdownMenu12" data-toggle="dropdown">
                          <span className="fa fa-user" style={{fontSize: '2em'}} title="My Account"></span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu12">
                          <li><a href="/account/login"><i className="fa fa-sign-in fa-fw"></i> Log In</a></li>
                          <li><hr className="style1" /></li>
                          <li><a href="//help.hidive.com/" target="_blank"><i className="fa fa-question fa-fw"></i> Help Center</a></li>
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