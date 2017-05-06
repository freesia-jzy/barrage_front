/**
 * Created by stonehx on 16-11-17.
 */
import React, {Component} from 'react';
import io from 'socket.io-client';
import goto from '../../until/goto';
import Select from './content/select';
import shallowCompare from 'react-addons-shallow-compare';
import codeHandler from '../../until/codeHandler';

const BOOM = {
  WALLTOKEN: 'WALLTOKEN',
  BOOMTOKEN: 'BOOMTOKEN',
  AUTHSUCC: 'AUTHSUCC',
  AUTHFAIL: 'AUTHFAIL',
  WALLMESSAGE: 'WALLMESSAGE',
  BOORECVMESSAGE: 'BOORECVMESSAGE',
  PULBOOMMESSAGE: 'PULBOOMMESSAGE',
  PULBOOMSELF: 'PULBOOMSELF'
};

class Home extends Component {
  constructor(props) {
    super(props);
    this._handleTips = this._handleTips.bind(this);
    this.state = {
      booms: [],
    };
    this._handleAddBoom = this._handleAddBoom.bind(this);
    this._handleRemoveBoom = this._handleRemoveBoom.bind(this);
    this._handleTips = this._handleTips.bind(this);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleRemoveBoom(boomId) {
    const {booms}=this.state;
    let newBooms = booms.filter((boom)=> {
      return boom.id != boomId;
    })
    this.setState({
      booms: newBooms
    })
  }

  _handleAddBoom(boom) {
    const {booms}=this.state;
    let winHeight = window.innerHeight - 150;
    let winWidth = window.innerWidth;
    boom.speed = 1;
    boom.id = boom.userId + Math.random() * 10000;
    boom.distance = winWidth + Math.ceil((boom.fontSize || 14)) * (boom.content.length + boom.nickname.length + 2) + 130;
    boom.top = Math.ceil(Math.random() * winHeight) + 50;
    booms.push(boom);
    this.setState({
      booms: booms
    })
  }

  _handleTips(code, codeMsg) {
    this.props.show(codeMsg + code);
  }

  componentDidMount() {
    global.socket = io.connect('http://api.wall.qoder.cn');
    socket.on('connect', ()=> {
      const token = localStorage.getItem('token');
      socket.emit(BOOM.WALLTOKEN, {token});
      socket.emit(BOOM.BOOMTOKEN, {token});
      socket.on(BOOM.AUTHSUCC, ()=> {
      });
      socket.on(BOOM.AUTHFAIL, ()=> {
        codeHandler(10008, this._handleTips);
        goto("/auth/login");
      });
      socket.on(BOOM.PULBOOMMESSAGE, (data)=> {
        let copyData = data;
        this._handleAddBoom(copyData);
      });

      socket.on(BOOM.PULBOOMSELF, (data)=> {
        let copyData = data;
        this._handleAddBoom(copyData);
      })
    })
  }

  render() {
    const {booms}=this.state;
    const {show, showLoading}=this.props;
    return (
      <div>
        {(this.props.children && React.cloneElement(this.props.children, {
          booms,
          _handleRemoveBoom: this._handleRemoveBoom,
          show,
          showLoading
        })) || <Select/>}
      </div>
    )
  }

}
export default Home;
