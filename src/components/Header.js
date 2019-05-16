import React, { Component } from 'react'
import gif from '../../src/wifi-4.4s-253px.gif';

export default class HeaderInclude extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      gif: ""

    }
    this.logout = this.logout.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
  }

  logout() {
    localStorage.setItem("loggedIn", "")
    localStorage.setItem("username", "")
  }

  componentDidMount() {
    window.minGlobal()
    this.interval = setInterval(() => this.checkStatus(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  checkStatus() {
    if (!navigator.onLine) {
      console.log("OFFLINE")
      this.setState({
        status: "You are currently offline - trying to establish connection",
        gif: <img src={gif} alt="" />
      })
    }
    else if (navigator.onLine) {
      this.setState({
        status: "Online",
        gif: ""
      })
    }
  };

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
            <p class="logged-in">Du er logget ind som:<br /> {localStorage.getItem("username")}</p>
            <li>
              <a href="/"><i class="fas fa-home icon-nav"></i>Home</a>
            </li>
            <li>
              <a href="/news"><i class="fas fa-newspaper icon-nav"></i>Nyheder</a>
            </li>
            <li>
              <a href="/calendar"><i class="far fa-calendar-alt icon-nav"></i> Kalender</a>
            </li>
            <li>
              <a href="/"><i class="far fa-images icon-nav"></i>Galleri</a>
            </li>
          </ul>

          <ul class="list-unstyled CTAs">
            <li>
              <a onClick={this.logout} href="/" class="download">Logout</a>
            </li>
          </ul>
        </nav>
        <div className="container">
          <div className="statusCheck col-lg-10 offset-lg-1">
            <h4>{this.state.status}</h4>
            <img style={{ display: "none" }} src={gif} alt="" />
            {this.state.gif}
          </div>
        </div>

      </React.Fragment>
    )

  }

}
