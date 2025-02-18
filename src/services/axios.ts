import axios from "axios";
import { messageError } from "@/utils/common";
// 全局配置
// 创建 axios 实例
const service = axios.create({
  timeout: 10000000, // request timeout
  maxContentLength: 5
});
service.defaults.withCredentials = true;
// 响应成功
function responseSuccess(response: Record<string, any>) {
  if (response && (response.status === 200 || response.status === 304)) {
    if (response.data) {
      const code = response.data?.retcode + "";
      if (code == "100301") {
        return response.data;
      } else if (code == "100302") {
        messageError(response.data?.errmsg);
      } else if (code.charAt(3) == "4") {
        messageError("网络错误, 请刷新后重试");
      } else if (code.charAt(3) == "1") {
        messageError("操作失败");
      } else if (code.charAt(3) != "3" && code != "0") {
        messageError(response.data?.errmsg || "未知异常");
      }
      return response.data;
    } else {
      return messageError("网络错误");
    }
  } else {
    // 异常状态下，把错误信息返回去
    if (response && response.data?.errmsg) {
      return messageError(response.data.errmsg);
    } else if (response && response.status === 404) {
      return messageError("访问异常");
    } else {
      return messageError("网络错误");
    }
  }
}
// 响应错误
function responseError(response: any) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  messageError("网络错误");
  return response;
}

service.interceptors.request.use(
  (config: Record<string, any>) => {
    // 这里的config包含每次请求的内容
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    config.headers["Accept"] = "application/json";
    //忽略get方法空值
    const key = config.method === "get" ? "params" : "data";
    const data = config[key];
    //编辑时设置isHandleVal可以传空值
    if (!data.isHandleVal) {
      for (const key in data) {
        if (["", undefined, null].includes(data[key])) delete data[key];
      }
    } else {
      delete data.isHandleVal;
    }
    return config;
  },
  (error: Record<string, any>) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.resolve(error.response);
  }
);

// 请求方式配置
const Http: Record<string, any> = {};

const get = async function(row: { url: string; params: any }) {
  try {
    const Response = await service({
      method: "get",
      url: row.url,
      params: row.params // get 请求时带的参数
    });
    return responseSuccess(Response);
  } catch (Response) {
    return responseError(Response);
  }
};

const post = async function(row: { url: string; data: Record<string, any>; headers?: any }) {
  try {
    const Response = await service({
      method: "post",
      url: row.url,
      data: row.data,
      headers: row.headers
    });
    return responseSuccess(Response);
  } catch (Response) {
    return responseError(Response);
  }
};
const getBaseURL = (url: string) => {
  const config = require("./config").default;
  if (location.hostname === "localhost") {
    return "/test/all" + url;
  } else {
    if (url.includes("/crm/")) {
      return config.api + url;
    } else {
      return config.publicApi + url;
    }
  }
};

Http.get = function(url: string, params: Record<string, any> = {}) {
  return get({ url: getBaseURL(url), params });
};

Http.post = function(url: string, data: Record<string, any> = {}) {
  return post({ url: getBaseURL(url), data });
};

Http.postForm = function(url: string, data: Record<string, any> = {}) {
  return post({
    url: getBaseURL(url),
    data,
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export default Http;
