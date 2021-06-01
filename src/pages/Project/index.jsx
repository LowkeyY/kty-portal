import React, { Component } from 'react';
import { connect, history } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Menu, Button } from 'antd';
import ProjectList from './components/ProjectList';
import StatisticsView from './components/StatisticsView';
import styles from './style.less';

const { Item } = Menu;

class Project extends Component {
  main = undefined;

  constructor(props) {
    super(props);
    const menuMap = {
      list: '项目列表',
      statistics: '统计报表'
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'list'
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchList'
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  handlerCreate = () => {
    history.push('/createProject');
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };
  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };
  selectKey = (key) => {
    this.setState({
      selectKey: key
    });
  };
  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }

      let mode = 'inline';
      const { offsetWidth } = this.main;

      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      this.setState({
        mode
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;
    const { project: { list }, tableLoading } = this.props;
    switch (selectKey) {
      case 'list':
        return <ProjectList data={list} loading={tableLoading} dispatch={this.props.dispatch} />;

      case 'statistics':
        return <StatisticsView />;

      default:
        break;
    }
    return null;
  };

  renderButtons = () => {
    const { selectKey } = this.state;
    switch (selectKey) {
      case 'list':
        return (
          <Button type="primary" style={{ marginBottom: '10px' }} onClick={this.handlerCreate}>
            创建项目
          </Button>
        );

      case 'statistics':
        return (
          <Button type="primary">导出报表</Button>
        );
      default:
        break;
    }
    return null;
  };

  render() {

    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            if (ref) {
              this.main = ref;
            }
          }}
        >
          <div className={styles.leftMenu}>
            <Menu mode={mode} selectedKeys={[selectKey]} onClick={({ key }) => this.selectKey(key)}>
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.header}>
              <div className={styles.title}>{this.getRightTitle()}</div>
              {this.renderButtons()}
            </div>
            {this.renderChildren()}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default connect(({ project, loading }) => ({
  project,
  tableLoading: loading.effects['project/fetchList']
}))(Project);
