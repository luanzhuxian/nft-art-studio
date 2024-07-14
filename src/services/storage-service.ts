export const articles = async () => {
  const res = [];
  let index = 0;
  const length = localStorage.length;
  for (let i = 0; i < length; i++) {
    const id = localStorage.key(i);
    if (id.startsWith('artical')) {
      const title = id.split('-')[1];
      index++;
      res.push({ index, title, content: localStorage.getItem(id) });
    }
  }
  return res;
};

export const getArticle = async (title) => {
  const id = 'artical' + title;
  return localStorage.getItem(id);
};

export const saveArticle = async (title, content) => {
  const id = 'artical' + title;
  localStorage.setItem(id, content);
};

export const removeArticle = async (title) => {
  const id = 'artical' + title;
  localStorage.removeItem(id);
  return articles();
};
