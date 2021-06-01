/**
 * @author Lowkey
 * @date 2021/01/28 15:47:11
 * @Description: 遮挡控制栏
 */
import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./index.less";


class Mask extends React.Component {
  constructor(props) {
    super(props);
    this.container = document.getElementById(props.container);
  }

  render() {
    const { style, holder } = this.props;
    const node = (<div className={styles.topBarMask}>
      <div style={style} />
    </div>);
    if (holder) {
      return ReactDOM.createPortal(node, holder);
    }
    return node;

  }
}

class TopBarMask extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style, container } = this.props;
    return (<Mask {...{ holder: container, style }} />);

  }

}

TopBarMask.newMask = function newNotificationInstance(container, options) {

  const div = document.createElement('div');
  const parentNode = document.getElementById(container);
  ReactDOM.render(<TopBarMask container={parentNode} {...options} />, div);
};
TopBarMask.defaultProps = {
  style: {
    backgroundColor: null
  }
};

export default TopBarMask;
