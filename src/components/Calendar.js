import React, { Component } from 'react'
import Modal from './modal.js';
import Header from './Header';

export default class Calendar extends Component {
    constructor(props) {
        super(props);

        this.replaceModalItem = this.replaceModalItem.bind(this);
        this.saveModalDetails = this.saveModalDetails.bind(this);
        this.state = {
            requiredItem: 0,
            brochure: [
                {
                    dato: "Mandag d. 3. juni",
                    afleveret: "08:15",
                    afhentet: "16:00"
                },
                {
                    dato: "Tirsdag d. 4. juni",
                    afleveret: "08:15",
                    afhentet: "16:00"
                },
                 {
                    dato: "Onsdag d. 5. juni",
                    afleveret: "08:15",
                    afhentet: "16:00"
                }
            ]
        }
    }

    replaceModalItem(index) {
        this.setState({
            requiredItem: index
        });
    }

    saveModalDetails(item) {
        const requiredItem = this.state.requiredItem;
        let tempbrochure = this.state.brochure;
        tempbrochure[requiredItem] = item;
        this.setState({ brochure: tempbrochure });
    }

    deleteItem(index) {
        let tempBrochure = this.state.brochure;
        tempBrochure.splice(index, 1);
        this.setState({ brochure: tempBrochure });
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
          </React.Fragment>)
    
        });
        if (this.state.brochure.length > 0) {
            const brochure = this.state.brochure.map((item, index) => {
                return (
                    <React.Fragment>
                    {dayList}
                    <article>
                        <div key={index} class="col-lg-12">
                            <div class="card">
                                <h1 style={{textAlign: "center"}}>{item.dato}</h1>
                                <h2>Aflevere:  {item.afleveret}</h2>
                                <h2>Afhent: {item.afhentet}</h2>z
                                <div class="col-lg-4">
                                    <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                                        onClick={() => this.replaceModalItem(index)}>edit</button> {" "}
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    </article>
                    </React.Fragment>
                )
            });

            const requiredItem = this.state.requiredItem;
            let modalData = this.state.brochure[requiredItem];
            return (
                <div class="wrapper">
                    <div id="content">
                    <Header></Header>
                        <div class="container">
                            <div class="col-lg-12">
                                <h1>Calendar</h1>
                            </div>
                            {brochure}
                            <React.Fragment>
                                <div className="overlay"></div>
                                <div>
                                    <Modal
                                        dato={modalData.dato}
                                        afleveret={modalData.afleveret}
                                        afhentet={modalData.afhentet}
                                        saveModalDetails={this.saveModalDetails}
                                    />
                                </div>
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            )
        }
        return <h1>INGEN DATA</h1>
    }
}
