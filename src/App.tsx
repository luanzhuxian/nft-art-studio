import { useState } from 'react';
import { Link, Navigate, useRoutes } from 'react-router-dom';

import Layout from '@src/components/Layout';
import Home from './pages/Home';
import Market from './pages/Market';
import User from './pages/User';

const routes = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/market',
    element: <Market />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen">
      <Layout>
        <div className="panel-body">{useRoutes(routes)}</div>
      </Layout>
    </div>
  );
}

export default App;
