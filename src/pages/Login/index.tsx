import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.less'; // 引入 index.less 文件
import { useModel, history } from '@umijs/max';
import { logo } from '@/utils/imgApi';
import { useState } from 'react';
import { loginHandler as fetchLogin } from '@/services/api';
const { Title } = Typography;

export default () => {
  const [account, setAccount] = useState('');
  const [pwd, setPwd] = useState('');
  const { initialState, setInitialState } = useModel('@@initialState');
  const loginHandler = async () => {
    const { code, username, data } = await fetchLogin({ username: account, password: pwd });

    if (code === 200) {
      localStorage.setItem('username', username);
      localStorage.setItem('wusiToken', data.token);
      localStorage.setItem('blog_has_login', 'has');
      await setInitialState((s) => {
        return {
          ...s,
          username,
          token: data.token,
          hasLogin: 'has'
        }
      })
      history.push('/home');
    }
  }
  return (
    <div className={styles.container}>
      <Card className={styles.loginCard}>
        <Title level={2} className={styles.loginTitle}>
          <img src={logo} alt="logo" />
          wusi|blog
        </Title>
        <Form name="login" className={styles.loginForm}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input prefix={<UserOutlined />} placeholder="请用账号:xby" onChange={(e) => { setAccount(e.target.value) }} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="请用密码:111" onChange={(e) => { setPwd(e.target.value) }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginButton} onClick={loginHandler}>Login</Button>
          </Form.Item>
        </Form>
        <span className={styles.bottomText}>记录生活中的小细节</span>
      </Card>
    </div>
  );
};

