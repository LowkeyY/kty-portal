import React, { Component, Fragment, useState, useEffect } from 'react';
import { connect, useModel } from 'umi';
import { Col, Row, Card, Space, List } from 'antd';
import ProjectCard from './components/ProjectCard';
import ProjectStatistics from './components/ProjectStatistics';
import TaskCard from './components/TaskCard';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import styles from './index.less';

const Dashboard = (props) => {

  useEffect(() => {
    const { dispatch } = props;
    dispatch({
      type: 'dashboard/fetchProjects'
    });
    dispatch({
      type: 'dashboard/fetchNotice'
    });
  }, []);
  const handlerProjectClick = (e, id = '') => {
    history.push({
      pathname: '/project/projectDetails',
      query: {
        id
      }
    });
  };

  const { projects, notices, taskDate } = props.dashboard;
  return (
    <div id="test-pro-layout">
      <PageContainer >
        <Row gutter={24}>
          <Col lg={17} md={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              className={styles.card}
              title={<span className={styles.tips}>进行中的项目</span>}
              bordered={false}
            >
              <Row gutter={24}>
                {
                  projects && projects.map(item =>
                    <Col xs={24} sm={24} md={12} lg={12} key={item.id}>
                      <ProjectCard data={item} handlerClick={handlerProjectClick} />
                    </Col>
                  )
                }
              </Row>
            </Card>
            <Card className={styles.card} style={{ marginBottom: 24 }}
                  title={<span className={styles.tips}>公共资源</span>}
                  extra={<a href="#">更多</a>}
                  bordered={false}>
              <List
                size="large"
                dataSource={notices}
                renderItem={item => <List.Item extra={item.date}>
                  <span>{item.title}</span>
                </List.Item>
                }
              />
            </Card>
          </Col>
          <Col lg={7} md={24} xs={24}>
            <Card
              className={styles.card}
              style={{ marginBottom: 24 }}
              title={<span className={styles.tips}>项目统计</span>}
              bordered={false}
            >
              <ProjectStatistics />
            </Card>
            <Card className={styles.taskCard} title={<span className={styles.tips}>我的任务</span>}
                  bordered={false} style={{ marginBottom: 24 }}>
              <TaskCard data={taskDate} />
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </div>
  );
};

export default connect(({ dashboard }) => ({
  dashboard
}))(Dashboard);
