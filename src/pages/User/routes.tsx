import Index from './index';
import NftMintor from './components/NftMintor';
import MyNft from './components/MyNft';

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
