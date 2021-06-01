import React, { Component } from 'react';
import { Drawer, Button, Space, Modal, Form, Input } from 'antd';
import { offsetByBody } from '@/utils/utils';

class ScriptRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      history: [],
      isModalVisible: false
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  handlerClick = (e) => {
    const { ref: { current } } = this.props.children;
    const { visible } = this.state;
    const { dom } = current;
    if (dom.current === e.target && visible) {
      const outer = dom.current;
      const x = e.clientX - offsetByBody(outer)['left'];
      const y = e.clientY - offsetByBody(outer)['top'];
      const color = this.getColorArr(x, y);
      this.setHistory(e.button, x, y, color);
    }
  };

  setHistory = (button = null, x, y, color, type = 'click') => {
    const arr = this.state.history;
    const res = {
      type,
      x,
      y,
      color,
      button,
      id: new Date().getTime()
    };
    this.setState({
      history: [...arr, res]
    });
  };

  getColorArr = (x, y) => {
    const canvas = document.getElementsByTagName('canvas')[0];
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let c = ctx.getImageData(x, y, 1, 1).data;
      return [c[0], c[1], c[2]];
    }
  };

  deleteClick = (id) => {

    const { history } = this.state;
    this.setState({
      history: history.filter(item => item.id !== id)
    });
  };

  renderHistory = () => {
    const { history } = this.state;
    return history.map(((item, i) => {
      const { button, type, x, y, color, id } = item;
      if (type === 'click') {
        if (button === 0) {
          return <p key={id} onClick={() => this.deleteClick(id)}>{`leftClick:X${x}-Y${y}-COLOR${color}`}</p>;
        } else if (button === 2) {
          return <p key={id}>{`rightClick:X${x}-Y${y}-COLOR${color}`}</p>;
        }
      }
    }));
  };

  resetClick = () => {
    this.setState({
      history: []
    });
  };

  cancelClick = () => {
    this.setState({
      history: []
    });
    this.setState({
      visible: false
    });
  };

  renderTitle = () => (
    <Space>
      <Button type="primary" onClick={this.resetClick}>
        重置
      </Button>
      <Button type="primary" onClick={this.createScript}>
        生成
      </Button>
      <Button type="primary" onClick={this.cancelClick}>
        取消
      </Button>
    </Space>
  );

  run = () => {
    const { history } = this.state;
    history.map(item => {
      (async () => { //分步依次执行
        const { x, y, color } = item;
        await this.checkColor(x, y, color, 1000, () => {
          console.log(x);
        }, () => console.log('err'));
      })();
    });
  };

  createScript = () => {
    this.setState({
      isModalVisible: true
    });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false
    });
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    });
  };

  checkColor = (x, y, current, time = 500, callback, error) => {
    const canvas = document.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext("2d");
    let count = 0;
    return new Promise((resolve) => {
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

  render() {
    const { visible, isModalVisible } = this.state;
    return (
      <div onMouseDown={this.handlerClick}>
        <Button type="primary" onClick={this.showDrawer}>
          录制脚本
        </Button>
        <Drawer
          title={this.renderTitle()}
          placement="right"
          closable={false}
          visible={visible}
          getContainer={false}
          mask={false}
        >
          {this.renderHistory()}
        </Drawer>
        {this.props.children}
        <Modal title="生成脚本" visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form
            name="script"
          >
            <Form.Item
              label="name"
              name="脚本名称"
              rules={[{ required: true, message: '脚本名称必填' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ScriptRecord;
