import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout as AntLayout, Menu, Breadcrumb, Button, theme } from 'antd';
import {
  AppstoreOutlined,
  ShopOutlined,
  SettingOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styles from './style.module.css';
import Connect from '../Connect';

const { Header, Content, Sider } = AntLayout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'home',
    label: '首页',
    icon: <AppstoreOutlined />,
  },
  {
    key: 'market',
    label: 'NFT市场',
    icon: <ShopOutlined />,
  },
  {
    key: 'user',
    label: '个人中心',
    icon: <UserOutlined />,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: <SettingOutlined />,
  },
  // {
  //   key: 'grp',
  //   label: 'Group',
  //   type: 'group',
  //   children: [
  //     { key: '13', label: 'Option 13' },
  //     { key: '14', label: 'Option 14' },
  //   ],
  // },
];

const items2: MenuProps['items'] = [
  { key: 'artical', label: '文章', icon: UserOutlined },
  { key: 'market', label: '市场', icon: LaptopOutlined },
  { key: 'star', label: '明星', icon: NotificationOutlined },
].map((item, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(item.icon),
    label: item.label,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const Layout: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e.key);
    navigate(e.key);
  };

  return (
    <AntLayout className="h-full">
      <Header className="flex-center">
        <div className={styles.logo}>logo</div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          onClick={onClick}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Connect></Connect>
      </Header>
      <AntLayout className="h-full">
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultOpenKeys={['sub1']}
            items={items2}
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>
        <AntLayout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="h-full"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
