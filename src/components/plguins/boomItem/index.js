/**
 * Created by grace on 16-12-7.
 */
import React, {Component} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import './index.styl';

class BoomItem extends Component {
  componentDidMount() {
    const {boom, _handleRemoveBoom}=this.props;
    const {boomItem}=this.refs;
    let winWidth = window.innerWidth;
    let t = Math.ceil(winWidth / 420) * 5;
    boomItem.style.webkitTransition = `transform ${t}s ease-in`;
    setTimeout(()=> {
      boomItem.style.transform = `translate3D(${-boom.distance}px,0,0)`;
      boomItem.addEventListener('webkitTransitionEnd', ()=> {
        _handleRemoveBoom(boom.id);
      }, false)
    }, 6)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  render() {
    const {boom}=this.props;
    return (
      <li
        ref="boomItem"
        style={{
          top: boom.top + 'px',
          color: boom.color,
          fontSize: boom.fontSize + 'px'
        }}
        key={boom.id}>{boom.nickname}: {boom.content}</li>
    )
  }
}

export default BoomItem;
