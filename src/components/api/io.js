import axios from "axios";
import { getAccessToken, getTenant } from "./AuthUtils";
import { wisereadsApi, projectsWisereadsApi } from "./instances.json";

//axios.defaults.baseURL = wisereadsApi;


export const io = ({ url, method, data, params, headers = {} }) => {
  // refer here : https://www.npmjs.com/package/axios#axiosrequestconfig-1
  let apiUrl = null
  let token = null
  let reqHeaders = null

  if(url.startsWith('/projects-api')){
    
     apiUrl =  projectsWisereadsApi+url
  
  }else{

  apiUrl = wisereadsApi+url
   token = getAccessToken();
   reqHeaders = token
    ? {
        Authorization: token,
        tenant: getTenant()
      }
    : { tenant: getTenant() };
  }
  return axios({
    url:apiUrl,
    method,
    headers: {
      ...reqHeaders,
      ...headers
    },
    params,
    data
  });
};

