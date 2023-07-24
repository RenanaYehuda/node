const axios = require("axios");
exports.API_URL = "http://localhost:3000";

exports.doApiGet = async (_url) => {
  try {
    let resp = await axios.get(_url);
    return resp;
  } catch (err) {
    throw err;
  }
};

// For Post,delete, put, patch
exports.doApiMethod = async (_url, _method, _body) => {
  try {
    let resp = await axios({
      url: _url,
      method: _method,
      data: _body,
    });
    console.log(resp.data);
    return resp;
  } catch (err) {
    throw err;
  }
};
