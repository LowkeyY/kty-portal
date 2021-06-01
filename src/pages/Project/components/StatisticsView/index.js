import React from 'react';
import {  Col, Row, Card } from 'antd';
import LiquidStatistics from "./components";
import styles from './index.less';

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const StatisticsView = (props) => {

  return (
    <div className={styles.outer}>
      <Card bordered={false} className={styles.infoCard}>
        <Row>
          <Col sm={6} xs={24}>
            <Info title="总数" value="8" bordered />
          </Col>
          <Col sm={6} xs={24}>
            <Info title="进行中" value="6" bordered />
          </Col>
          <Col sm={6} xs={24}>
            <Info title="已完成" value="2" />
          </Col>
          <Col sm={6} xs={24}>
            <LiquidStatistics />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default StatisticsView;
