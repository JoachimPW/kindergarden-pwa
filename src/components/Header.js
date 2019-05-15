import React, { Component } from 'react'

export default class HeaderInclude extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{}
        
    }
    this.logout = this.logout.bind(this);
  }

  logout() {
   localStorage.setItem("loggedIn", "")
   localStorage.setItem("username", "")
  }

  componentDidMount(){
    window.minGlobal()  
  }

  render() {
    return (
      <React.Fragment>
        
        <button type="button" id="sidebarCollapse" class="btn main-background btn-toggle">
          <i class="fas fa-align-left"></i>
        </button>
        <nav id="sidebar">
          <div id="dismiss">
            <i class="fas fa-arrow-left"></i>
          </div>

          <div class="sidebar-header">
            <h3>Kindergarten</h3>
          </div>

          <ul class="list-unstyled components">
            <p class="logged-in">Logged in as:<br /> {localStorage.getItem("username")}</p>
            <li>
              <a href="/"><i class="fas fa-home icon-nav"></i>Home</a>
            </li>
            <li>
              <a href="/News"><i class="fas fa-newspaper icon-nav"></i>News</a>
            </li>
            <li>
              <a href="/Calendar"><i class="far fa-calendar-alt icon-nav"></i>Calendar</a>
            </li>
            <li>
              <a href="/"><i class="far fa-images icon-nav"></i>Photos</a>
            </li>
          </ul>

          <ul class="list-unstyled CTAs">
            <li>
              <a onClick={this.logout} href="/" class="download">Logout</a>
            </li>
          </ul>
        </nav>

      </React.Fragment>
    )

  }

}