import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            dato: '',
            afleveret: '',
            afhentet: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dato: nextProps.dato,
            afleveret: nextProps.afleveret,
            afhentet: nextProps.afhentet
        });
    }

    afleveretHandler(e) {
        this.setState({ afleveret: e.target.value });
    }

    afhentetHandler(e) {
        this.setState({ afhentet: e.target.value });
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Rediger tider</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{textAlign: "center"}}>
                            <p><span>Afleveret: </span><input type="time" value={this.state.afleveret} onChange={(e) => this.afleveretHandler(e)} /></p>
                            <p><span>Afhent: </span><input type="time" value={this.state.afhentet} onChange={(e) => this.afhentetHandler(e)} /></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Luk</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>Gem ændringer</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;