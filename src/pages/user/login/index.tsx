import {
  LockTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import {Alert, message} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormText} from '@ant-design/pro-form';
import {Link, history, useModel} from 'umi';
import Footer from '@/components/Footer';
import sha1 from 'js-sha1';
import {setLocalStorage} from '@/utils/utils'
import {accountLogin, LoginParamsType} from '@/services/login';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
/**
 * 此方法会跳转到 redirect 参数所在的位置
 */

const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const {query} = history.location;
    const {redirect} = query as {
      redirect: string;
    };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC<{}> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const {initialState, setInitialState} = useModel('@@initialState');


  const fetchMenuData = async (currentUser: object) => {
    const menuData = await initialState?.fetchMenuData?.();
    if (menuData) {
      setInitialState({
        ...initialState,
        menuData,
        currentUser
      });
    }
  };
  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    const {password} = values
    try {
      // 登录
      const msg = await accountLogin({...values, password: sha1(password)});
      // @ts-ignore
      const {success, message: text, userId, realName, photoPath} = msg;
      if (success) {
        const currentUser = {userId, realName, photoPath};
        setLocalStorage(currentUser); //临时报存用户信息
        await setInitialState({...initialState, currentUser});
        message.success('登录成功！');
        await fetchMenuData({userId, realName, photoPath});
        goto();
        return;
      } // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }

    setSubmitting(false);
  };

  const {success, text} = userLoginState;
  // @ts-ignore
  // @ts-ignore
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <Link to="/">
            {/*<img alt="logo" className={styles.logo} src="/logo.svg" />*/}
            <div className={styles.title}>海外油气新项目评价和投资综合决策平台</div>
          </Link>
          <ProForm
            // initialValues={{
            //   autoLogin: true,
            // }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
          >
            {success && text === '用户名或密码错误。'(
              <LoginMessage
                content='账户或密码错误'
              />
            )}
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder='用户名'
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockTwoTone className={styles.prefixIcon} />,
              }}
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
              ]}
            />
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码 ?
              </a>
            </div>
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
