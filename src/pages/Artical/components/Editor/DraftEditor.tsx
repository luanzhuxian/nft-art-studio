import React, { useState } from 'react';
import { Layout, theme, Button, Space, Input } from 'antd';
import { EditorState, convertToRaw, AtomicBlockUtils } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
import '@wangeditor/editor/dist/css/style.css';

import { storeNftArticle } from '@src/services/arweave-service';

const { Content, Footer } = Layout;

export default function ArticleEditorDraft() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onEditorStateChange = (es: EditorState) => {
    setEditorState(es);
  };

  const addImage = () => {
    // CREATE <img /> block
    const entityKey = editorState // from STATE
      .getCurrentContent()
      .createEntity('IMAGE', 'MUTABLE', {
        src: 'some_img_url',
        height: '100px',
        width: '100px',
      })
      .getLastCreatedEntityKey();

    // NEW EDITOR STATE
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

    // SETSTATE
    setEditorState(newEditorState);
  };

  const handlePastedText = () => false;
  function uploadImageCallBack(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        const idata = this.result;
        resolve({
          data: {
            link: idata,
          },
        });
      };
    });
  }

  async function publishPost() {
    // turn the state to html
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent())); //self-contained markdown ...
    const url = await storeNftArticle(title, html);
    alert(url);
  }

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
        <Editor
          placeholder="请输入内容"
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
          handlePastedText={() => false}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              urlEnabled: false,
              uploadEnabled: true,
              previewImage: true,
              inputAccept: '*/*',
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: true },
            },
          }}
        />
      </Content>
      <Footer>
        <Space wrap>
          <Button type="primary" onClick={publishPost}>
            发表
          </Button>
          <Button type="primary">保存</Button>
        </Space>
      </Footer>
    </Layout>
  );
}
