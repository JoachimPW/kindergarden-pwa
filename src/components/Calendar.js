import React, { Component } from 'react'
import Header from './Header';

export default class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requiredItem: 0,
            brochure: [
               
            ]
        }
    }


    render() {

        let dayList = []
        this.props.days.forEach(elm => {
            dayList.push(<React.Fragment>
            <article>
              <div class="col-lg-12">
                <div class="card">

                <h3>{elm.date}</h3>
                    <fieldset>
                        <label>Aflever</label>
                        <input class="calender-input" type="text" value={elm.in} id="input_from" />
                    </fieldset>

                    <fieldset>
                        <label>Hent</label>
                        <input class="calender-input" type="text" value={elm.out} id="input_to" />
                    </fieldset>

                </div>
                <hr></hr>
              </div>
            </article>
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

