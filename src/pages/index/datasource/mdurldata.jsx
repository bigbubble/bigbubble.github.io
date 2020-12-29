// md文件信息数组
const mdUrlData = [
  {
    name: '首页',
    url: '',
  },
  {
    children: [
      {
        name: 'test1/1',
        url: './public/md/text.md',
        date: '2020-12-12',
      },

      {
        name: 'test1/2',
        url: './public/md/text.md',
        date: '2020-12-12',
      },
    ],
    name: 'test1',
    url: '',
  },
  {
    children: [
      {
        name: 'test2/1',
        url: './public/md/text.md',
        date: '2020-12-12',
      },
      {
        name: 'test2/2',
        url: './public/md/text.md',
        date: '2020-12-12',
      },
    ],
    name: 'test2',
    url: '',
  },
  {
    name: 'test3',
    url: './public/md/text.md',
    date: '2020-12-12',
  },
];

export default mdUrlData;
