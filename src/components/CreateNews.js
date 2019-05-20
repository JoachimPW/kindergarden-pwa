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

        <div class="container">
            <div class="col-lg-12">
              <form class="custom-form">
                <h2 class="center">Tilføj en nyhed</h2>
                <div className="form-group col-lg-12">
                  <label class>Overskrift</label>
                  <input type="text" onChange={this.onChangeTitle} className="form-control" id="title" placeholder="Title..."></input>
                </div>

                <div className="form-group col-lg-12">
                <label class>Dato</label>
                  <input type="text" onChange={this.onChangeDate} className="form-control" id="dato" placeholder="Dato"></input>
                </div>

                <div className="form-group col-lg-12">
                <label class>Tekst</label>
                  <textarea type="text" onChange={this.onChangeText} className="form-control" id="tekst" placeholder="Skriv nyhed her..."></textarea>
                </div>

                <button onClick={this.handleNewsInput}
                  type="submit" id="submitButton" className="btn btn-primary"> Tilføj nyhed
                </button>

              </form>
            </div>
        </div>




      </React.Fragment>
    )
  }
}
