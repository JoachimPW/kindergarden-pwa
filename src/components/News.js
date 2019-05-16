import React, { Component } from 'react';
import Modal from './modal.js';
import Header from './Header';
class News extends Component {

  render() {
    let newsList = []
    this.props.news.forEach(elm => {
      newsList.push(<React.Fragment>
        <article>
          <div class="col-lg-12">
            <div class="card">
              <h1>{elm.title}</h1>
              <h3>{elm.date}</h3>
              <p>{elm.text}</p>
            </div>
            <hr></hr>
          </div>
        </article>
      </React.Fragment>)

    });
    return (
      <React.Fragment>
        <div class="wrapper">
          <div id="content">

            <Header></Header>

            <div class="container">
              <div class="col-lg-12">
                <h1>Nyheder</h1>
              </div>
              {newsList}

            </div>
          </div>
        </div>

      </React.Fragment>
    );

  }
}

export default News;
