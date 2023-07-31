import { Dropdown, Space, Avatar, Divider, notification } from 'antd';
import { DownOutlined, PlusOutlined, AlignLeftOutlined, BlockOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useModel, history } from '@umijs/max';
import { Link } from '@umijs/max';
import styles from './index.less'
import { useEffect, useState } from 'react';
import { currentUser } from '@/services/api';
import { unicodeToStr } from '@/utils';
export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const hasLogin = initialState?.hasLogin;
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to='/userinfo'>
          个人信息
        </Link>
      ),
      icon: <AlignLeftOutlined />
    },
    {
      key: '2',
      label: (
        <Link to='./register'>注册</Link>
      ),
      icon: <PlusOutlined />,
    },
    {
      key: '3',
      label: (
        hasLogin === null || hasLogin === 'no-has' ?
          <div>
            <Link to={'/login'}>登录</Link>
          </div>
          :
          <div onClick={
            async () => {
              localStorage.removeItem('wusiToken');
              localStorage.removeItem('username');
              localStorage.setItem('blog_has_login', 'no-has');
              await setInitialState((s) => {
                return {
                  ...s,
                  token: ''
                }
              })
              notification.error({
                message: '退出成功！'
              })
            }}>
            退出
          </div>
      ),
      icon: <BlockOutlined />
    }
  ];
  const [avatarUrl, setAvatarUrl] = useState('');
  useEffect(() => {
    let avatarUrl = '';
    const getUserAvatar = async () => {
      const { data } = await currentUser();
      avatarUrl = data.avatar;
      setAvatarUrl(unicodeToStr(avatarUrl));
    }
    if (initialState?.hasLogin === 'no-has' || initialState?.hasLogin === null) {
      avatarUrl = '/avatar/刘能.jpg';
      setAvatarUrl(avatarUrl)
    } else {
      getUserAvatar();
    }
  }, [])
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar size={36} src={`http://www.wusi.fun/media/${avatarUrl}`} />
          <DownOutlined className={styles.moreOper} />
        </Space>
      </a>
    </Dropdown>
  )
}
