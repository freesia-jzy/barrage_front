import React from 'react';
import Home from './home';
import Loading from '../images/loading.gif';

import '../styles/msgBox.css';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTips: false,
      tipContent: "",
      isLoading: false
    };
    this._showTips = this._showTips.bind(this);
    this._isLoading = this._isLoading.bind(this);
    this.timer = null;
  }

  _showTips(content) {
    clearTimeout(this.timer);
    this.setState({isTips: true, tipContent: content});
    this.timer = setTimeout(()=> {
      this.setState({
        isTips: false
      })
    }, 1500)
  }

  _isLoading(tOrF){
    this.setState({isLoading:tOrF});
  }
  render() {
    return (
      <div className="index">
        <div id="msgBox" style={{display: this.state.isTips ? 'block' : 'none'}}>{this.state.tipContent}</div>
        <img id="loading" style={{display: this.state.isLoading ? 'block' : 'none'}} src={Loading} alt="loading"/>
        {this.props.children && React.cloneElement(this.props.children, {
          show: (content)=> {
            this._showTips(content)
          },
          showLoading:(tOrF)=>{
            this._isLoading(tOrF);
          }
        }) || <Home show={this._showTips} showLoading={this._isLoading}/>}
      </div>
    );
  }
}


AppComponent.defaultProps = {};

export default AppComponent;
