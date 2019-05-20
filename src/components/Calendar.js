import React, { Component } from 'react'
import Header from './Header';

export default class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inTime:"",
            outTime:""
        }

        this.handleTidspunkt = this.handleTidspunkt.bind(this)
        this.onChangeIn = this.onChangeIn.bind(this)
        this.onChangeOut = this.onChangeOut.bind(this)
    }

    handleTidspunkt(id) {
        this.props.updateTime(this.state.inTime, this.state.outTime, id)
    }

    onChangeIn(event) {
        this.setState({
            inTime: event.target.value
        })
      }

      onChangeOut(event) {
        this.setState({
            outTime: event.target.value
        })
      }

    render() {

        let dayList = []
        this.props.days.forEach(elm => {
            dayList.push(<React.Fragment>

                <form className="form-fix">
                <h1>{elm.date}</h1>
                    <label>
                        Vælg afleveringstidspunkt:</label>
                <select value={this.state.inTime} onChange={this.onChangeIn}>
                            <option value={elm.in} selected>{elm.in}</option>
                            <option value="08:30">08:30</option>
                            <option value="08:45">08.45</option>
                            <option value="09:00">09:00</option>
                            <option value="09:15">09:15</option>
                        </select>
                        <label>
                        Vælg afhentningstidspunkt:</label>
                        <select value={this.state.outTime} onChange={this.onChangeOut}>
                            <option value={elm.out} selected>{elm.out}</option>
                            <option value="15:15">15:15</option>
                            <option value="15:30">15:30</option>
                            <option value="15:45">15.45</option>
                            <option value="16:00">16:00</option>
                        </select>
                    
                    <button onClick={this.handleTidspunkt}>Ændre tidspunkt</button>
                </form>
                
            </React.Fragment>

            )

        });

        return (
            <div class="wrapper">
                <div id="content">
                    <Header></Header>
                    <div class="container">
                        <div class="col-lg-12">
                            <h1>Kalender</h1>
                        </div>
                        {dayList}

                    </div>
                </div>
            </div>
        )
    }
}

