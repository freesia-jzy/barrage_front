/**
 * Created by stonehx on 16-11-17.
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import 'react-dom';
import back from '../../../../images/back.png';
import regex from '../../../../until/regex';
import api from '../../../../api/index';
import goto from '../../../../until/goto';
import nameHandler from '../../../../until/nameHandle';
import handleCodeHandler from '../../../../until/codeHandler';
import TopBar from '../../../plguins/nav';
import TouchMove from '../../../plguins/touchMove';
import HeadImg from '../../../plguins/headImg';
import './index.styl';

class Register extends Component {
  //构造函数，必写，若不写，会报错（无法确定使用当前组件函数）
  constructor(props) {
    //引用父辈的构造函数
    super(props);
    this.state = {
      email: "",
      password: "",
      repasswd: "",
      nickName: "",
      isTrue: true
    };
    this._handleChangeOnEmail = this._handleChangeOnEmail.bind(this);
    this._handleChangeOnPasswd = this._handleChangeOnPasswd.bind(this);
    this._handleChangeOnRePasswd = this._handleChangeOnRePasswd.bind(this);
    this._handleChangeOnNickName = this._handleChangeOnNickName.bind(this);
    this._handleFetch = this._handleFetch.bind(this);
    this._handleTips = this._handleTips.bind(this);
    this._handleIsLeagle = this._handleIsLeagle.bind(this);
  }

  _handleChangeOnEmail(event) {
    this.setState({email: event.target.value});
  }

  _handleChangeOnPasswd(event) {
    this.setState({password: event.target.value});
  }

  _handleChangeOnRePasswd(event) {
    this.setState({repasswd: event.target.value});
    if (event.target.value == this.state.password) {
      this.setState({isTrue: true});
    } else {
      this.setState({isTrue: false});
    }
  }

  //输入昵称函数
  _handleChangeOnNickName(event) {
    this.setState({nickName: event.target.value});
  }

  _handleTips(code, codeMsg) {
    this.props.show(codeMsg + code);
  }

  _handleIsLeagle() {
    if (!nameHandler(this.state.nickName, regex.nameLength)) {
      this.props.show('中文昵称0-8位,英文昵称0-16位！');
      return false;
    } else if (!regex.email.test(this.state.email)) {
      this.props.show('email格式错误！');
      return false;
    } else if (!regex.passwd.test(this.state.password)) {
      this.props.show('密码应为6-22位！');
      return false;
    } else if (this.state.repasswd === '') {  //当没有输第二次密码时
      this.setState({isTrue:false});
      return false;
    } else if(!this.state.isTrue){    //当输入两次密码不同时
      return false;
    }else {
      return true;
    }
  }
    //进行fetch函数传送函数

    _handleFetch() {

      if (this._handleIsLeagle()) {
        this.props.showLoading(true);
        fetch(api.register, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
          }, body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            nickname: this.state.nickName
          })
        }).then((res)=> {
          this.props.showLoading(false);
          return res.json()
        }).then((res)=> {
          console.log(res.code);
          if (res.code === 0) {
            this.props.show('注册成功！');
            goto('/auth/emailSendSuccess');
          } else {
            handleCodeHandler(res.code, this._handleTips);
          }
        })
      }
    }

    render()
    {
      return (
        <div>
          <TopBar to="登录" title='用户注册'/>
          <TouchMove to="/auth/login">
            <HeadImg/>
            <div className="register-main">
              <div className="input-list">
                <input type="text" value={this.state.nickName} placeholder="请输入昵称" onChange={this._handleChangeOnNickName}
                       id="input-list-email"/>
                <input type="text" value={this.state.email} placeholder="请输入邮箱" onChange={this._handleChangeOnEmail}
                       id="input-list-email"/>
                <input type="password" value={this.state.password} placeholder="请输入密码"
                       onChange={this._handleChangeOnPasswd}
                       id="input-list-password"/>
                <input type="password" value={this.state.repasswd}
                       style={{borderColor: this.state.isTrue ? '' : '#ff0000'}} placeholder="重复输入密码"
                       onChange={this._handleChangeOnRePasswd} id="input-list-repassword"/>
              </div>
              <button className="register-button" onClick={this._handleFetch} id="input-list-button">立即注册
              </button>
            </div>
          </TouchMove>
        </div>
      )
    }
  }

  export
  default
  Register;
