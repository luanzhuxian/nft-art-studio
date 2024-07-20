import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { ownedTypedNFT } from '@src/services/nft-service';
import { myArticles } from '@src/services/arweave-service';

const columns = [
  {
    key: 'index',
    dataIndex: 'index',
    title: '序号',
    width: 100,
  },
  {
    key: 'id',
    dataIndex: 'tokenId',
    title: 'ID',
    width: 100,
    ellipsis: true,
    render: (val) => {
      // console.log(typeof val); // bigint
      return Number(val);
    },
  },
  {
    key: 'title',
    dataIndex: 'name',
    title: '标题',
    // width: 500,
    render: (text: string) => (
      <a href="#" target="_self">
        {text}
      </a>
    ),
  },
  {
    key: 'desc',
    dataIndex: 'description',
    title: 'Description',
  },
  {
    key: 'content',
    dataIndex: 'content',
    title: '内容',
  },
];

function ArticleList() {
  const [articles, setArticles] = useState([]);

  // 访问去中心化设施 ipfs 获取文章
  // const loadArticles = async () => {
  //   const ns = await myArticles();
  //   const as = ns.map((a, index: number) => {
  //     const ttag = a.node.tags.filter((e) => {
  //       const istitle = e.name === 'title';
  //       return istitle;
  //     });
  //     const title = ttag.length == 1 ? ttag[0].value : 'unknown';
  //     return {
  //       index,
  //       id: a.node.id,
  //       shortId: a.node.id.substring(0, 10) + '...',
  //       title: title,
  //       content: 'pp',
  //     };
  //   });
  //   setArticles(as);
  // };

  const navigate = useNavigate();

  const loadArticles = useCallback(async () => {
    const { success, data } = await ownedTypedNFT('article');
    const articals = data.map((e, i) => ({ key: i, index: i, entity: e, ...e }));
    console.log('articals', articals);
    setArticles(articals);
  }, []);

  // const view = async (entity, event) => {
  //   // 从ipfs取文章内容
  //   const content = await readArticle(entity.uri);
  //   navigate('/article/read', { state: { title: entity.name, content } });
  // };

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={articles}
        bordered
        onRow={(record) => {
          return {
            onClick: (event) => {},
            onDoubleClick: (event) => {},
            onContextMenu: (event) => {},
            onMouseEnter: (event) => {},
            onMouseLeave: (event) => {},
          };
        }}
      />
    </div>
  );
}
export default ArticleList;
