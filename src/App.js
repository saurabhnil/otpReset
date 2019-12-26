import React, { Component } from 'react';
import './App.css';

class Card extends Component{

  constructor() {
    super();
    
    this.state = {
      showMenu: false,
      isPinReset: false,
      isEnterPin: false,
      isResetPinSuccess: false
    }
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.ResetPin = this.ResetPin.bind(this);
    this.submitOTP = this.submitOTP.bind(this);
    this.submitPIN = this.submitPIN.bind(this);
  }
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true, isResetPinSuccess: false }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false, isEnterPin: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      })
    };
  }

  ResetPin(event){
    this.setState({ showMenu: false, isPinReset: true, isEnterPin: false, isResetPinSuccess: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    })
  }

  submitOTP(){
    this.setState({ showMenu: false , isPinReset: false, isEnterPin: true, isResetPinSuccess: false });
  }

  submitPIN(){
    this.setState({ isEnterPin: false, isResetPinSuccess: true  });
  }

  render(){
    return (
      <div
      >  
        {/* className="App" */}
        <header className="App-header">
          <img className="img1" alt="" />
        </header> 

        <button onClick={this.showMenu}>
            Show menu
          </button>
          {
            this.state.showMenu
              ? (
              <div 
                // className="menu"
                width="30"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <ul><button> Funds transfer </button></ul>
                <ul><button> Check Balance </button></ul>
                <ul><button onClick={this.ResetPin}> Reset ATM Pin </button></ul>
              </div>
              ): (null)
            }
            {
              this.state.isPinReset 
              ? (
                <div>
                  You've selected to reset ATM pin. 
                  <br/>One Time Password will be sent to registered cell phone. Kindly enter it.
                  <br/>
                  <input type="password"/>
                  <button onClick={this.submitOTP}>
                    Next
                  </button>
                </div>
              ) : (null)
            }
            {
              this.state.isEnterPin 
              ? (
                <div>
                  OTP verified successfully. Kindly set the new pin. <br/>
                  Enter new pin
                  <br/>
                  <input type="password"/>
                  <br/>
                  Confirm new pin
                  <br/>
                  <input type="password"/>
                  <button onClick={this.submitPIN}>
                    Submit
                  </button>
                </div>
              ) : (null)
            }
            {
              this.state.isResetPinSuccess 
              ? (
                <div>
                  You've successfully reset new pin.
                </div>
              ) : (null)
            }
      </div>
    );
  }
}

export default Card;
