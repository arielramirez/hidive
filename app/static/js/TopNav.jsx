import React from "react"
import Select from "react-select"

export default class TopNav extends React.Component {
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
    //closes menu if click occurs not on menu component
    executeFunctionIfClickNotOnElement(evt, this.accountMenu.current, this.toggleMenu.bind(this))
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
                      <TopNavSearch />
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

class TopNavSearch extends React.Component {
  constructor(props) {
    super(props);    
    this.search_url = "https://www.hidive.com/search?q="
    this.searchBar = React.createRef()
    this.externalClickHandler = this.collapseOnExternalClick.bind(this)
    this.state = {
      expanded: false,        //used to expand/collapse text area on icon click
      search_options: null,
      search_text: '',
      menu_is_open: false,
      placeholder_text: false
    };
  }
  openSearchInput() {
    if(!this.state.expanded) {
      this.setState({expanded: true})
      var input = document.getElementById('react-select-2-input')
      input.focus()
      setTimeout(function() {
        //placeholder text doesn't look wonky during animation, so setting it after animation finishes
        this.setState({placeholder_text: 'Search Titles...'})
        document.addEventListener("click", this.externalClickHandler)
      }.bind(this), 500)
    }
  }
  closeSearchInput() {
    if (this.state.expanded) {
      document.removeEventListener("click", this.externalClickHandler)
      this.setState({expanded: false, placeholder_text: ''})
    }
  }
  collapseOnExternalClick(evt) {
    //colapsing the search bar if user clicks outside of seach area
    executeFunctionIfClickNotOnElement(evt, this.searchBar.current, this.closeSearchInput.bind(this))
  }
  loadSearchOptions() {
    fetch('static/json/dashboard.json')
    .then(response => response.json())
    .then(json => this.setState({search_options: this.extractContentNamesFromJSON(json.Data)}));
  }
  extractContentNamesFromJSON(data) {
    //extracting arrays with titles from json data
    var titles_arrays = data.TitleRows.map(function(title_row) {
      return title_row.Titles.map(function(title) {
        return title.Name
      })
    })

    console.log(titles_arrays)
    // converting to single array
    var titles = [].concat(...titles_arrays)
    // removing duplicates
    var unique_titles = [... new Set(titles)]

    //returning in correct format
    return unique_titles.sort().map(function(title, i) {
      // using the title as a url component to allow search as a query param on search page
      return {value: encodeURIComponent(title), label: title}
    })
  }
  handleInputChange(text) {
    var state_changes = {}
    if (text.length > 2) {
      state_changes.menu_is_open = true
    }
    console.log(text)

    this.setState({...state_changes, search_text: text})
  }
  checkForSearch(evt) {
    if (evt.key == 'Enter') {
      evt.stopPropagation()
      this.search(this.state.search_text)
    }
  }
  search(search_term) {
    console.log(search_term)
    var term = search_term ? search_term : this.state.search_text
    window.location.href = this.search_url + term
  }
  menuItemSelected(menu_item) {
    this.search(menu_item.value)
  }
  hideMenu() {
    this.setState({ menu_is_open: false });
  }
  render() {

    const customStyles = function() {
      return {
        control: (base, state) => ({
          ...base,
          backgroundColor: '#222325',
          border: '1px solid #555',
          borderRadius: '5px',
          color: 'white',
          textAlign: 'left',
          boxShadow: '4px 4px 6px rgba(0,0,0,.5)',
          maxHeight: '200px',
          overflowY: 'auto',
          "&:hover": {
            border: '1px solid #555',
          }
        }),
        input: base => ({
          ...base,
          margin: 0,
          padding: 0,
          color: 'white'
        }),
        menu: base => ({
          ...base,
          backgroundColor: "rgba(0, 0, 0, .9)",
          color: 'hsl(0,0%,50%)',
          textAlign: 'left',
          borderRadius: 0,
          marginTop: 0
        }),
        menuList: base => ({
          ...base,
          padding: 0,
          backgroundColor: "rgba(0, 0, 0, .9)",
          color: 'hsl(0,0%,50%)',
          textAlign: 'left',
        }),
        option: base => ({
          ...base,
          backgroundColor: "rgba(0, 0, 0, .9)",
          color: 'hsl(0,0%,50%)',
          textAlign: 'left',   
          "&:hover": {
            backgroundColor: 'hsl(0,0%,50%)',
            color: 'white',
          },
        }),
        noOptionsMessage: base => ({
          ...base,
          color: "white",
          textAlign: 'left'
        })
      }
    };

    //this isn't working for some reason
    const DropdownIndicator = function(props){
      console.log(props)
      return (
        <components.DropdownIndicator {...props}>
          <a style={{display: 'block'}} onClick={this.search.bind(this)}> 
            <i className="fa fa-search"></i>
          </a>
        </components.DropdownIndicator>
      );
    }.bind(this);
    

    return (
      <div ref={this.searchBar}>
        <div id='topSearch' style={{ top: '-5px'}} className={"search-expandable " + (this.state.expanded ? "search-expanded" : "search-collapsed")}  >
          <Select 
              name="topNavSearchBar" 
              options={this.state.search_options ? this.state.search_options : this.loadSearchOptions()} 
              styles={customStyles()} 
              DropdownIndicatorComponent={DropdownIndicator}
              placeholder={this.state.placeholder_text} 
              className={this.state.expanded ? '' : 'hidden'}
              onInputChange={this.handleInputChange.bind(this)}
              onKeyDown={this.checkForSearch.bind(this)}
              onChange={this.menuItemSelected.bind(this)}
              onBlur={this.hideMenu.bind(this)}
              menuIsOpen={this.state.is_menu_open}
              noOptionsMessage={() => 'No matching titles...'}
          /> 
        </div>
        <a href="javascript:void(0);" id="searchIcon" onClick={this.openSearchInput.bind(this)}>
          <span className="fa fa-search" style={{fontSize: '2em'}}></span>
        </a>
      </div>
    )
  }
}