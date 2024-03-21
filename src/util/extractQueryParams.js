const extractQueryParams = (req) => {
  const uRLSearchParams = new URLSearchParams(req.url.split('?')[1]);
  const query = Object.fromEntries(uRLSearchParams);
  return query;
};

export default extractQueryParams;
