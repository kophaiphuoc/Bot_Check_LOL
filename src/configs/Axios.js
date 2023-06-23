const axios = require('axios');
const qs = require('qs');

axios.defaults.paramsSerializer = params => {
  return qs.stringify(params, { encode: false });
};

async function Axios(method, url, params) {
  console.log(method, url, params)
  const options = {
    method: method,
    url: url,
    params:params.length > 0 ? {q:params} : null
  };
  try {
    const response = await axios.request(options);
    if(response.status === 200){
      return response.data;
    }else{
      return 2
    }
  } catch (error) {
    console.log(error)
    return 2;
  }
}

module.exports = Axios