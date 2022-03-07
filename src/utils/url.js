export const getUrlQueries = () => {
  let search = window.location.search.match(/\?.*(?=\b|#)/);
  if (search) {
    search = search[0].replace(/^\?/, "");
  }
  if (!search) return {};
  const queries = {};
  const params = search.split("&");
  params.forEach((item) => {
    const param = item.split("=");
    queries[param[0]] = decodeURIComponent(param[1]);
  });
  return queries;
};

export const getUrlParamValue = (key) => {
  const queries = getUrlQueries();
  return queries[key];
};
