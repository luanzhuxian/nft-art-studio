import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout as AntLayout, Menu, Breadcrumb, theme } from 'antd';
import {
  AppstoreOutlined,
  ShopOutlined,
  SettingOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  EditOutlined,
  FileOutlined,
  FolderViewOutlined,
  PoundOutlined,
  PropertySafetyOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Connector from '../Connector';
import styles from './style.module.css';

const { Header, Content, Sider } = AntLayout;

type MenuItem = Required<MenuProps>['items'][number];

const shellNavItems: MenuItem[] = [
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

const sideNavItems: MenuProps['items'] = [
  {
    key: 'artical',
    label: '文章',
    icon: React.createElement(UserOutlined),
    children: [
      {
        key: 'artical/write',
        label: '写文章',
        icon: React.createElement(EditOutlined),
      },
      {
        key: 'artical/scratch',
        label: '草稿',
        icon: React.createElement(FileOutlined),
      },
      {
        key: 'artical/browse',
        label: '浏览',
        icon: React.createElement(FolderViewOutlined),
      },
    ],
  },
  {
    key: 'collectible',
    label: '藏品',
    icon: React.createElement(UserOutlined),
    children: [
      {
        key: 'collectible/mint',
        label: '铸币',
        icon: React.createElement(PoundOutlined),
      },
      {
        key: 'collectible/browse',
        label: '浏览',
        icon: React.createElement(PropertySafetyOutlined),
      },
    ],
  },
  {
    key: 'community',
    label: '社区',
    icon: React.createElement(UserOutlined),
    children: [
      {
        key: 'community-zhongchou',
        label: '众筹',
        icon: React.createElement(PoundOutlined),
      },
      {
        key: 'community-vote',
        label: '投票',
        icon: React.createElement(PropertySafetyOutlined),
      },
    ],
  },
  { key: 'market', label: '市场', icon: React.createElement(LaptopOutlined) },
  { key: 'star', label: '明星', icon: React.createElement(NotificationOutlined) },
];
// .map((item, index) => {
//   const key = String(index + 1);
//   return {
//     key: `sub${key}`,
//     icon: React.createElement(item.icon),
//     label: item.label,
//     onClick: () => {
//       console.log(item);
//     },
//     // children: new Array(4).fill(null).map((_, j) => {
//     //   const subKey = index * 4 + j + 1;
//     //   return {
//     //     key: subKey,
//     //     label: `option${subKey}`,
//     //   };
//     // }),
//   };
// });

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(sideNavItems as LevelKeysProps[]);

const Layout: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const [stateOpenKeys, setStateOpenKeys] = useState([]);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <AntLayout className="h-full">
      <Header className="flex-center">
        <div className={styles.logo}>logo</div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={shellNavItems}
          onClick={onClick}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Connector />
      </Header>
      <AntLayout className="h-full">
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultOpenKeys={[]}
            items={sideNavItems}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            onClick={onClick}
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
