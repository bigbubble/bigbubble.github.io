import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import Intro from './Intro';
import MdUrlContext from '../context/context';
import marked from 'marked';
import hljs from 'highlight.js/lib/core';
import '../less/a11y-dark-custom.css';

hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
hljs.registerLanguage(
  'javascript',
  require('highlight.js/lib/languages/javascript'),
);
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
// marked options
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  gfm: true, // 允许 Git Hub标准的markdown.
  pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
  sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  breaks: false, // 允许回车换行（该选项要求 gfm 为true）
  smartLists: true, // 使用比原生markdown更时髦的列表
  smartypants: false, // 使用更为时髦的标点,
  preCls: 'hljs',
});

export default () => {
  // md文件信息
  const { mdPage } = useContext(MdUrlContext);

  const [content, setContent] = useState('');

  useEffect(() => {
    const getContent = async () => {
      const result = await axios.get(mdPage);
      if (result.status == 200) {
        setContent(marked(result.data));
      } else {
        message.error('拉取数据错误');
      }
    };
    getContent();
  }, [mdPage]);

  return (
    <div>
      {mdPage ? (
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      ) : (
        <Intro />
      )}
    </div>
  );
};
