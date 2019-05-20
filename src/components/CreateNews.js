import React, { Component } from 'react'

export default class NewQuestion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      date: "",
      text: ""
    }   
    
    this.handleNewsInput = this.handleNewsInput.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeTitle(event) {
    this.setState({
      title: event.target.value
    })
  }

  onChangeText(event) {
    this.setState({
      text: event.target.value
    })
  }

  onChangeDate(event) {
    this.setState({
      date: event.target.value
    })
  }

  handleNewsInput(event) {
      event.preventDefault()
      this.props.addNews(this.state.title, this.state.date, this.state.text);
    }
  

  render() {
    return (
      <React.Fragment>
        <br></br>
        <br></br>
        <div className="row justify-content-md-center">
          <div className="col-lg-8 col-centered" style={{ textAlign: "center" }}>
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Post News</label>
                    <input type="text" onChange={this.onChangeTitle} className="form-control" id="title" placeholder="Title..."></input>
                    <input type="text" onChange={this.onChangeDate} className="form-control" id="title" placeholder="Date..."></input>
                    <textarea type="text" onChange={this.onChangeText} className="form-control" placeholder="Text..."></textarea>
                  </div>
                  <button onClick={this.handleNewsInput}
                    type="submit" id="submitButton" className="btn btn-primary"> Post News
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
