import React, { Component } from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

class Pops extends Component {

    state={
        openModal : false
    }

    onClickButton = e =>{
        e.preventDefault()
        this.setState({openModal : true})
    }

    onCloseModal = ()=>{
        this.setState({openModal : false})
    }

    render() {
        return (
            <div>
                <button onClick={this.onClickButton}>Click Me</button>
                <Modal open={this.state.openModal} onClose={this.onCloseModal}>
                    <h1>You Did it!</h1>
                </Modal>   
            </div>
        )
    }  
}

export default Pops;