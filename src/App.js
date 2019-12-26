import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import PropTypes from 'prop-types'
// import Swipe from 'react-easy-swipe'
// import classnames from 'classnames'

// import {
//     overlayStyle,
//     overlayActiveStyle,
//     menuOuterStyle,
//     menuOuterActiveStyle,
//     menuShadowStyle,
//     menuShadowActiveStyle,
//     menuInnerStyle,
//     getSkew,
//   } from './styles'

// function App() {
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
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
          {/* ATM pin reset
          <br/>Menu goes here */}
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

  // const IDLE = 'idle'
  // const VERTICAL = 'vertical'
  // const HORIZONTAL = 'horizontal'
/*
  class CheeseburgerMenu extends Component {
    constructor() {
      super()
      this.state = {
        swiping: false,
        direction: IDLE,
        swipePosition: { x: 0, y: 0 },
        menuExtraStyle: {},
      }
  
      this.onSwipeStart = this.onSwipeStart.bind(this)
      this.onSwipeMove = this.onSwipeMove.bind(this)
      this.onSwipeEnd = this.onSwipeEnd.bind(this)
    }
  
    onSwipeStart(event) {
      if (this.props.isOpen) {
        this.setState({
          swiping: true,
        })
      }
    }
  
    onSwipeMove(position, event) {
      if (this.state.swiping) {
        const options = this.getOptions()
        let direction = this.state.direction
  
        if (direction === IDLE) {
          const swipeThreshold = options.width / 15
          const pastThreshold = (
            (Math.abs(position.x) > swipeThreshold) ||
            (Math.abs(position.y) > swipeThreshold)
          )
  
          if (pastThreshold) {
            if (
              (
                (!this.props.right && position.x < 0) ||
                ( this.props.right && position.x > 0)
              ) &&
              Math.abs(position.x) > Math.abs(position.y)
            ) {
              direction = HORIZONTAL
            }
            else {
              direction = VERTICAL
            }
          }
        }
  
        if (direction === HORIZONTAL) {
          const swipeClosing = (
            (!this.props.right && position.x < 0) ||
            ( this.props.right && position.x > 0)
          )
  
          const translateX = (swipeClosing ? position.x : 0)
  
          this.setState({
            direction,
            swipePosition: position,
            menuExtraStyle: {
              transform: getSkew(options) + `translate3d(${translateX}px, 0px, 0px)`,
              transition: 'transform 0s',
            },
          })
  
          event.preventDefault()
        }
  
        if (direction === VERTICAL) {
          this.setState({
            direction,
            swipePosition: { x: 0, y: 0 },
            menuExtraStyle: {},
          })
        }
      }
    }
  
    onSwipeEnd(event) {
      const swipeCloseThreshold = this.getOptions().width / 3
      if (
        (!this.props.right && this.state.swipePosition.x < -swipeCloseThreshold) ||
        (this.props.right && this.state.swipePosition.x > swipeCloseThreshold)
      ) {
        this.props.closeCallback()
      }
      this.setState({
        swiping: false,
        direction: IDLE,
        swipePosition: { x: 0, y: 0 },
        menuExtraStyle: {},
      })
    }
  
    getOptions() {
      return {
        isLeft: !this.props.right,
        transitionTime: this.props.transitionTime || 0.3,
        topOffset: this.props.topOffset || 0,
        bottomOffset: this.props.bottomOffset || 0,
        width: this.props.width || 300,
        backgroundColor: this.props.backgroundColor || 'white',
        showShadow: !this.props.noShadow,
        skewY: this.props.skewY,
      }
    }
  
    render() {
      const {
        isOpen,
        closeCallback,
        className,
        overlayClassName,
        outerClassName,
        innerClassName,
        shadowClassName,
        children,
      } = this.props
  
      const options = this.getOptions()
  
      const baseMenuOuterStyle = (isOpen ? menuOuterActiveStyle(options) : menuOuterStyle(options))
      const currentMenuOuterStyle = { ...baseMenuOuterStyle, ...this.state.menuExtraStyle }
  
      return (
        // <div className="App">
        //   <header className="App-header"> 
        //     ATM pin reset
        //     <br/>Menu goes here 2
        //   </header>
        // </div>
        <div
          className={classnames(
            'cheeseburger-menu',
            className,
            { open: isOpen }
          )}
        >
          <div
            className={classnames('cheeseburger-menu-overlay', overlayClassName)}
            style={isOpen ? overlayActiveStyle(options) : overlayStyle(options)}
            onClick={closeCallback}
          />
  
          <Swipe
            onSwipeStart={this.onSwipeStart}
            onSwipeMove={this.onSwipeMove}
            onSwipeEnd={this.onSwipeEnd}
          >
            <div className={classnames('cheeseburger-menu-outer', outerClassName)} style={currentMenuOuterStyle}>
              <div className={classnames('cheeseburger-menu-inner', innerClassName)} style={menuInnerStyle(options)}>
                {children}
              </div>
              <div
                className={classnames('cheeseburger-menu-shadow', shadowClassName)}
                style={isOpen ? menuShadowActiveStyle(options) : menuShadowStyle(options)}
              />
            </div>
          </Swipe>
        </div>
      )
    }
  }
  
  CheeseburgerMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeCallback: PropTypes.func.isRequired,
    right: PropTypes.bool,
    transitionTime: PropTypes.number,
    topOffset: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    bottomOffset: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    width: PropTypes.number,
    backgroundColor: PropTypes.string,
    skewY: PropTypes.number,
    noShadow: PropTypes.bool,
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
    outerClassName: PropTypes.string,
    innerClassName: PropTypes.string,
    shadowClassName: PropTypes.string,
    children: PropTypes.node,
  }
  
  export default CheeseburgerMenu;*/

// export default App;
export default Card;
