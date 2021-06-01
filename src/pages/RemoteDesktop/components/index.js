/**
 * @author Lowkey
 * @date 2021/01/14 11:10:54
 * @Description:Guacamole组件
 */
import React, { Component } from "react";
import { Modal, Button, Spin } from 'antd';
import { offsetByBody } from '@/utils/utils';
import Guacamole from 'guacamole-common-js';
import LoginProgress from './components/LoginProgress';
import TopBarMask from './utils/TopBarMask';
import { FreezeScreen } from './utils/FreezeScreen';
import styles from './index.less';


class CunovsGuacamole extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loginProgress: false,
      ctrl: false,
    };
    this.dom = React.createRef();
  }

  componentDidMount() {
    const { clientId = '' } = this.props;
    const display = document.getElementById("display");

    this.guac = new Guacamole.Client(new Guacamole.HTTPTunnel("/cs2bs/tunnel"));

    display.appendChild(this.guac.getDisplay().getElement());

    this.guac.onerror = (error) => {
      alert(error);
    };

    this.guac.onstatechange = (state) => {
      if (state === 3) {
        this.setState({
          loading: false,
          loginProgress: true
        });
        TopBarMask.newMask('outer', {
          style: { backgroundColor: this.getColor(726, 13) }
        }); //遮挡控制栏
        (async () => { //分步依次执行
          await this.checkColor(495, 425, [222, 226, 222], 1000, this.remoteClick, () => this.setState({ loginProgress: false })), //点击登录按钮
            await this.checkColor(496, 363, [222, 226, 222], 1000, this.remoteClick, () => this.setState({ loginProgress: false })), // 数据库异常确认
            await this.checkColor(846, 10, [198, 90, 82], 1000, () => this.setState({ loginProgress: false }), () => this.setState({ loginProgress: false })); // 隐藏登录动画
          this.remoteKeyboard(65513, 32, 120); //最大化
          console.log('全部执行完了');
        })();
      }
    };

    this.guac.connect(`app_id=${clientId}`);


    let mouse = new Guacamole.Mouse(this.guac.getDisplay().getElement());

    mouse.onmousedown = mouse.onmouseup = mouse.onmousemove = (mouseState) => {
      this.guac.sendMouseState(mouseState);
    };

    const keyboard = new Guacamole.Keyboard(document);
    keyboard.onkeydown = (keysym) => {
      console.log(keysym);
      this.guac.sendKeyEvent(1, keysym);
    };

    keyboard.onkeyup = (keysym) => {
      this.guac.sendKeyEvent(0, keysym);
    };
  }


  componentWillUnmount() {
    this.remoteKeyboard(65513, 65473);  //关闭
    this.guac.disconnect();
  }



  handleClick = (e) => {
    const outer = document.getElementById("outer");
    console.log(e.clientX - offsetByBody(outer)['left'], e.clientY - offsetByBody(outer)['top']);
    const freeze = new FreezeScreen({ container: 'outer' });
    if (this.state.ctrl) {
      freeze.render();
      setTimeout(() => freeze.destroy(), 3000);
    }
  };



  remoteClick = (x, y) => {
    this.guac.sendMouseState({ x: x, y: y, left: true });
    setTimeout(() => {
      this.guac.sendMouseState({ x: x, y: y, up: true });
    }, 50);
  };

  remoteKeyboard() {
    var length = arguments.length;
    for (let i = 0; i < length; i++) {
      this.guac.sendKeyEvent(1, arguments[i]);
    }
    for (let i = length; i > 0; i--) {
      this.guac.sendKeyEvent(0, arguments[i - 1]);
    }

  }


  checkColor = (x, y, current, time = 500, callback, error) => {  //颜色检测
    const canvas = document.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext("2d");
    let count = 0;
    return new Promise((resolve) => { //需要返回Promises对象异步调用
      const timer = setInterval(() => {
        count++;
        let c = ctx.getImageData(x, y, 1, 1).data;
        if (c[0] === current[0] && c[1] === current[1] && c[2] === current[2]) {
          clearInterval(timer);
          if (callback) callback(x, y);
          resolve();
        }
        if (count > 15) {
          clearInterval(timer);
          if (error) error();
        }
      }, time);
    });
  };

  getColor = (x, y) => {
    const canvas = document.getElementsByTagName('canvas')[0];
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let c = ctx.getImageData(x, y, 1, 1).data;
      return `rgba(${c[0]},${c[1]},${c[2]},1)`;
    }
  };

  render() {
    const { loading, loginProgress } = this.state;
    const { width = 880, height = 575, top = 0, left = 0 } = this.props;
    document.onkeydown = (event) => {
      this.setState({
        ctrl: event.ctrlKey
      });
    };
    document.onkeyup = (event) => {
      this.setState({
        ctrl: false
      });
    };
    return (
      <div className={styles.outer} ref={this.dom} id="outer" style={{ width, height }}>
        <Spin className={styles.spin} spinning={loading} tip="正在连接..." />
        <LoginProgress loginProgress={loginProgress} />
        {/*<TopBarMask color={this.getColor(653, 11)} />*/}
        <div
          className={styles.container}
          id="display"
          onClick={(e) => this.handleClick(e)}
          style={{ left, top }}
        />
      </div>
    );
  }
}

export default CunovsGuacamole;
