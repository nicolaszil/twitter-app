export const queryParser = (params = {}) => {
  let query = '?';

  Object.keys(params)
    .filter(value => params[value] !== '' && params[value] !== undefined && params[value] !== null)
    .forEach((key, index) => query += `${index === 0 ? '' : '&'}${key}=${params[key]}`);
  return query;
};

export const paramsReplacer = (url, params = {}) => {
  let parsedUrl = url;

  Object.keys(params).map((key) => {
    if (parsedUrl.includes(`{${key}}`)) {
      parsedUrl = parsedUrl.replace(`{${key}}`, params[key]);
    }
  });

  return parsedUrl;
};
