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
                        <input type="text" value={elm.in} id="input_from" />
                    </fieldset>

                    <fieldset>
                        <label>Hent</label>
                        <input type="text" value={elm.out} id="input_to" />
                    </fieldset>

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
                                <h1>Kalender</h1>
                            </div>
                            {dayList}
                        </div>
                    </div>
                </div>                      
             </React.Fragment>

                );
    }
}
