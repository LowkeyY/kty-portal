/**
 * @author Lowkey
 * @date 2020/12/29 16:19:46
 * @Description:可调整列宽
 */

import React, { useEffect } from 'react';
import { Button } from 'antd';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import { Menu, Table, Tag } from 'antd';
import { history, connect } from 'umi';
import styles from "./index.less";

const { Item } = Menu;

const data = [
  {
    key: '1',
    '1': 1564,
    '2': 32,
    '3': 456,
    '4': 40,
    '5': 42,
    '6': 4,
    '7': 50
  },
  {
    key: '2',
    '1': 1564,
    '2': 32,
    '3': 456,
    '4': 40,
    '5': 42,
    '6': 4,
    '7': 50
  },
  {
    key: '3',
    '1': 1564,
    '2': 32,
    '3': 456,
    '4': 40,
    '5': 42,
    '6': 4,
    '7': 50
  },
  {
    key: '4',
    '1': 1564,
    '2': 32,
    '3': 456,
    '4': 40,
    '5': 42,
    '6': 4,
    '7': 50
  }
];

const ResultTable = (props) => {
  const { dispatch, resultTable: { columns, menuMap }, loading } = props;
  const [selectKey, setSelectKey] = React.useState('1');
  const [width, setWidth] = React.useState(160);
  const [down, setDown] = React.useState(false);
  const { id = '' } = props.location.query;
  const side = React.useRef(null);
  useEffect(() => {
    dispatch({
      type: 'resultTable/fetchList',
      payload: {
        tabId: selectKey,
        id
      }
    });
  }, ['1']);

  useEffect(() => {
    dispatch({
      type: 'resultTable/fetchTabList',
      payload: {
        id
      }
    });
  }, ['0']);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => <Item
      key={item}>{menuMap[item]}</Item>);
  };

  const onChange = ({ key }) => {
    setSelectKey(key);
    dispatch({
      type: 'resultTable/fetchList',
      payload: {
        id,
        tabId: key
      }
    });
  };

  const renderChildren = () => (
    <Table loading={loading} title={() => <span>{menuMap[selectKey]}</span>} columns={columns} dataSource={data}
           scroll={{ x: 'max-content' }} bordered />
  );

  const handlerDown = (state) => {
    setDown(state);
  };

  const handlerMove = (e) => {
    if (down) setWidth(Math.max(e.clientX, 160));
  };
  return (
    <PageContainer breadcrumb onBack={() => history.goBack()}>
      <GridContent>
        <div className={styles.main}
             onSelect={() => false}
             onMouseMove={handlerMove}
             onMouseUp={() => handlerDown(false)}
        >
          <div className={styles.leftMenu} style={{ width }} ref={side}>
            <Menu selectedKeys={[selectKey]} onClick={onChange}>
              {getMenu()}
            </Menu>
            <div className={styles.adjust} onMouseDown={() => handlerDown(true)} />
          </div>
          <div className={styles.right}>
            {renderChildren()}
          </div>
        </div>
      </GridContent>
    </PageContainer>
  );
};

export default connect(({ resultTable, loading }) => ({
  resultTable,
  loading: loading.effects['resultTable/fetchList']
}))(ResultTable);
