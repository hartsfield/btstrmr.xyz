var React = require('react');
//var WebAPI = require('../utils/WebAPIUtils.js');
//var Signup = require('./Signup.react');
var AudioActions = require('../actions/AudioActions.js');
var AuthActionCreators = require('../actions/AuthActionCreators.js');
var UIActions = require('../actions/UIActions.js');

var SideBar = React.createClass({

  render: function () {
    if (this.props.mobile === null) {
      return (
        <ul className="sidebar">
          { this.props.user.success ?
            <button
              id={ this.props.mobile === null ? "logoutDoor" :  "mobile_logoutDoor"  }
              className="loginShow"
              onClick={this._userlogout}>
            </button>
          :
            <button
              class="loginShow"
              id={ this.props.mobile === null ? "loginKey" :  "mobile_loginKey"  }
              onClick={this._showForms}>
            </button>
          }

          <div id={this.props.mobile ? "mobile_logodiv" : "" }>
            <img
              id={this.props.mobile ? "mobile_spinny" : "spinny" }
              className={this.props.mobile ? "mobile_sidebar-img-logo" : "sidebar-img-logo"} 
              src="../../assets/SVG-TESTING/disk.svg"
            />
            {this.props.mobile ? 
            <p className="mobile_btlogo">BTSTRMR</p>
            :
            <div></div>
            }
            </div>

          <p className="btlogo">BTSTRMR</p>
          <p className="glogo">GLOBAL</p>
          <li
            className="sidebar-img"
            id="fresh"
            onClick={this._changeSort}>
            FRESH
          </li>
          <li
            className="sidebar-img"
            id="hot"
            onClick={this._changeSort}>
            HOT
          </li>
       
         {this.props.user.success ?
        
          <li
            className="sidebar-img"
            id="favs"
            onClick={this._changeSort}>
            FAVS
          </li>
        
         :
        
          <div></div>
       
         }
       
         <div id="rainbow">
          <li className="rainbow" ></li>
          <li className="rainbow" ></li>
          <li className="rainbow" ></li>
          <li className="rainbow" ></li>
          <li className="rainbow" ></li>
          <li className="rainbow" ></li>
          <li className="rainbow" ></li>
          <li className="rainbow" ></li>
          <li className="rainbow" ></li>
          <li className="rainbow" ></li>
          <li className="rainbow" ></li>
          <li className="rainbow" ></li>
          </div>
        </ul>
      );
    } else {
      if (this.props.showNav) {
        return (
          <div id="mobile_nav">

            <ul 
              className="mobile_sidebar"
              id="mobile_nav-1">
          { this.props.user.success ?
            <button
              id={ this.props.mobile === null ? "logoutDoor" :  "mobile_logoutDoor"  }
              className="loginShow"
              onClick={this._userlogout}>
            </button>
          :
            <button
              class="loginShow"
              id={ this.props.mobile === null ? "loginKey" :  "mobile_loginKey"  }
              onClick={this._showForms}>
            </button>
          }

          <div id={this.props.mobile ? "mobile_logodiv" : "" }>
            <img
              id={this.props.mobile ? "mobile_spinny" : "spinny" }
              className={this.props.mobile ? "mobile_sidebar-img-logo" : "sidebar-img-logo"} 
              src="../../assets/SVG-TESTING/disk.svg"
            />
            <p className="mobile_btlogo">BTSTRMR</p>
            </div>
              <li
                className="mobile_li_first mobile_sidebar-img"
                id="fresh"
                onClick={this._changeSort}>
                FRESH
              </li>
              <li
                className="mobile_sidebar-img"
                id="hot"
                onClick={this._changeSort}>
                HOT
              </li>
              {this.props.user.success ?
              <li
                className="mobile_sidebar-img"
                id="favs"
                onClick={this._changeSort}>
                FAVS
              </li>
              :
              <div></div>
              }
            </ul>
          </div>
        );
      } else {
        return (
          <div></div>      
        );
      };
    };
  },

  _changeSort: function (e) {
    window.location.hash =  e.target.innerHTML.toLowerCase();
    window.scrollTo(0,0);
    var order = e.target.id;
    UIActions.showNav();
    AudioActions.changeSort(order, this.props.user.user);
  },

  _userlogout: function () {
    AuthActionCreators.logout();
    /*  this.setState({
      showLogin: false,
      });*/
  },


  _showForms: function () {
    AuthActionCreators.showLoginForm();
    if (this.props.mobile !== null) {
      UIActions.showNav();
    }
//    this._checkIfHidden();
  },

});

module.exports = SideBar;
