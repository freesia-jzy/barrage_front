/**
 * Created by grace on 16-11-28.
 */
import React,{Component} from 'react';
import './index.styl';
import api from '../../../../api';
import Regex from '../../../../until/regex';
import codeHandler from '../../../../until/codeHandler';
import Nav from '../../../plguins/nav';
import TouchMove from '../../../plguins/touchMove';
const back=require('../../../../images/back.png');

class ReSendEmail extends Component{

  constructor(props) {
    super(props);
    this.state={
      emailAddress:'',
    };
    this._handleReSend = this._handleReSend.bind(this);
    this._handleChange=this._handleChange.bind(this);
    this._handleTips=this._handleTips.bind(this);
  }
  _handleChange(event) {
    this.setState({
      emailAddress:event.target.value
    });
  }
  _handleTips(code,codeMsg){
    this.props.show(codeMsg+code);
  }

  _handleReSend(e) {
    e.preventDefault();
    if(!Regex.email.test(this.state.emailAddress)){
      throw new Error('邮箱格式不对！');
    }
    this.props.showLoading(true);
    fetch(api.reSendEmail,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.emailAddress,
      })
    }).then((res)=>{
      this.props.showLoading(false);
      return res.json();
    }).then((json)=>{
      if (json.code === 0) {
        this.props.show('reSendEamil success');
      } else {
        codeHandler(json.code,this._handleTips);
      }
    })
  }


  render(){
    return(
      <div className="re-send-email">
        <Nav to="登录" title="重新发送激活邮件"/>
        <TouchMove to="/auth/login">
          <div className="content">
            <input type="text" placeholder="请输入您的邮箱地址" onChange={this._handleChange}/>
            <button className="btn" onClick={this._handleReSend}>点击重新发送激活邮件</button>
          </div>
        </TouchMove>
      </div>
    )
  };
}

export default ReSendEmail;
