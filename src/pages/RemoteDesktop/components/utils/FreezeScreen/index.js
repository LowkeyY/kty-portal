/**
 * @author Lowkey
 * @date 2021/01/29 15:48:11
 * @Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import styles from "./index.less";

/***
 *
 * @param props 参数对象
 * @returns {*}
 * @constructor
 */
const Mask = (props) => {
  const { text = '稍等片刻...' } = props;
  const outer = document.getElementById('outer');
  const node = (<div className={styles.freeze} id='freeze'>
    <img src={props.src} alt="" onContextMenu={() => {
      return false;
    }} />
    <div className={styles.progress}>
      <div className={styles.warning}>
        {text}
      </div>
    </div>
  </div>);
  return ReactDOM.createPortal(node, outer);
};


export class FreezeScreen {
  constructor(props) {
    this.text = props.text;
    this.div = document.createElement('div');
  }

  render = () => { //渲染
    const dom = document.getElementById('display');
    html2canvas(dom).then((canvas) => {
      const imgBlob = canvas.toDataURL('image/jpeg', 1.0);
      ReactDOM.render(<Mask src={imgBlob} text={this.text} />, this.div);
    });
  };
  destroy = () => { //销毁
    ReactDOM.unmountComponentAtNode(this.div);
    if (this.div.parentNode) {
      this.div.parentNode.removeChild(this.div);
    }
  };
}
