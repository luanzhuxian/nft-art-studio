import Index from './index';
import ArticleEditor from './components/ArticleEditor';
import ArticleScratch from './components/ArticleScratch';
import ArticleList from './components/ArticleList';

const routes = [
  {
    path: '/artical',
    // element: <Index />,
    children: [
      {
        path: 'write',
        element: <ArticleEditor />,
      },
      {
        path: 'scratch',
        element: <ArticleScratch />,
      },
      {
        path: 'browse',
        element: <ArticleList />,
      },
    ],
  },
];

export default routes;
