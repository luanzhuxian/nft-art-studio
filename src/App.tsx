import { Navigate, useRoutes } from 'react-router-dom';

import Layout from '@src/components/Layout';
import Home from './pages/Home';
import Market from './pages/Market';
import articleRoutes from './pages/Artical/routes';
import userRoutes from './pages/User/routes';

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
    path: '/',
    element: <Navigate to="/home" />,
  },
  ...articleRoutes,
  ...userRoutes,
];

function App() {
  return (
    <div className="h-screen">
      <Layout>
        <div className="panel-body h-full">{useRoutes(routes)}</div>
      </Layout>
    </div>
  );
}

export default App;
