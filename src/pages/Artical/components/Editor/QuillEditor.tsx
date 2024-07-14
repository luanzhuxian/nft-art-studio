import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
import '@wangeditor/editor/dist/css/style.css';

export default function ArticleEditorQuill() {
  const [value, setValue] = useState('');
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
