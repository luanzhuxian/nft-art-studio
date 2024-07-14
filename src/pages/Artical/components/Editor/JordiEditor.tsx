import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, theme, Button, Space, Input } from 'antd';
import JoditEditor from 'jodit-react';
import { storeArticle } from '@src/services/arweave-service';

import { addToIpfs } from '@src/services/ipfs-service';
import { mintNFT } from '@src/services/nft-service';
import { messageBox } from '@src/services/message-service';

const { Content, Footer } = Layout;

const config = {
  zIndex: 0,
  readonly: false,
  // activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
  toolbarButtonSize: 'middle' as 'small' | 'middle' | 'tiny' | 'xsmall' | 'large',
  theme: 'default',
  enableDragAndDropFileToEditor: true,
  saveModeInCookie: false,
  spellcheck: false,
  editorCssClass: false,
  triggerChangeEvent: true,
  height: 400,
  // direction: 'ltr',
  // language: 'en',
  // debugLanguage: false,
  // i18n: 'en',
  // tabIndex: -1,
  // toolbar: true,
  // enter: 'P',
  // useSplitMode: false,
  // colorPickerDefaultTab: 'background',
  imageDefaultWidth: 100,
  // removeButtons: [
  //   'source',
  //   'fullsize',
  //   'about',
  //   'outdent',
  //   'indent',
  //   'video',
  //   'print',
  //   'table',
  //   'fontsize',
  //   'superscript',
  //   'subscript',
  //   'file',
  //   'cut',
  //   'selectall',
  // ],
  // disablePlugins: ['paste', 'stat'],
  // events: {},
  // textIcons: false,
  uploader: {
    insertImageAsBase64URI: true,
  },
  // placeholder: '',
  // showXPathInStatusbar: false,
};

const Editor = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const publishPost = async () => {
    try {
      // 发送到去中心化设施 ipfs
      const uri = await addToIpfs(content); // 得到 文章uri
      const meta = { name: title, description: title, type: 'article', uri };
      const entity = JSON.stringify(meta);
      const tokenURI = await addToIpfs(entity); // 得到 meta uri
      const { success, tokenId } = await mintNFT(tokenURI); // 发起合约交易
      if (success && tokenId) {
        messageBox('success', '', tokenId?.toString());
      } else {
        messageBox('danger', '', 'mint failed');
      }
      navigate('/article/browse');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        messageBox('danger', '', error.message);
      }
    }
  };

  const publishPost2 = async () => {
    console.log(content);
    const html = content;
    // draftToHtml(convertToRaw(editorState.getCurrentContent()))//self-contained markdown ...
    const tags = { 'Content-Type': 'text/html', 'Domain-Type': 'article', title: title };
    const url = await storeArticle(html, tags);
    console.log(url);
  };

  const savePost = () => {};

  return (
    <Layout>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Input onChange={(e) => setTitle(e.target.value)} placeholder="请输入标题" />
        <JoditEditor
          ref={editor}
          config={config}
          value={content}
          onBlur={(newContent) => setContent(newContent)}
        />
      </Content>
      <Footer>
        <Space wrap>
          <Button type="primary" onClick={publishPost}>
            发表
          </Button>
          <Button type="primary" onClick={savePost}>
            保存
          </Button>
        </Space>
      </Footer>
    </Layout>
  );
};
export default Editor;
