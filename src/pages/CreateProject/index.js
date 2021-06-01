/**
 * @author Lowkey
 * @date 2020/12/30 10:48:50
 * @Description:
 */

import React, { useState, useEffect } from 'react';
import { Steps, Form, Card } from 'antd';
import { connect, history } from 'umi';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';

const { Step } = Steps;

const CreateProject = (props) => {
  const getCurrentStepAndComponent = (current) => {
    switch (current) {
      case 'groups':
        return {
          step: 1,
          component: <Step2 />
        };

      case 'result':
        return {
          step: 2,
          component: <Step3 />
        };

      case 'info':
      default:
        return {
          step: 0,
          component: <Step1 />
        };
    }
  };
  const { createProject: { current } } = props;
  const [stepComponent, setStepComponent] = useState(<Step1 />);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);

  const okHandler = () => {

  };

  return (
    <PageContainer title="创建项目" onBack={() => history.goBack()}>
      <Card>
        <Steps current={currentStep}>
          <Step title="填写项目信息" />
          <Step title="选择项目成员" />
          <Step title="完成" />
        </Steps>
        {stepComponent}
      </Card>
    </PageContainer>
  );
};


export default connect(({ createProject }) => ({
  createProject
}))(CreateProject);
