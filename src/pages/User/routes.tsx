import Index from './index';
// import ArticleEditor from './components/ArticleEditor';
// import ArticleList from './components/ArticleList';
import NftMintor from './components/NftMintor';
import MyNft from './components/MyNft';
// import ArticleScratch from './components/ArticleScratch';

const routes = [
  {
    path: '/collectible',
    // element: <Index />,
    children: [
      {
        path: 'mint',
        element: <NftMintor />,
      },
      {
        path: 'browse',
        element: <MyNft />,
      },
    ],
  },
];

export default routes;
