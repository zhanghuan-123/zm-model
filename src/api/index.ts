import axios from 'axios';
import Http from "@/services/axios";

function getFlowChartData() {
  return new Promise((resolve, reject) => {
    axios.get('api/getFlowChartData').then(resolve).catch(reject);
  });
}

function getMenuData() {
  return new Promise((resolve, reject) => {
    axios.get('api/getMenuData').then(resolve).catch(reject);
  });
}

const addSuggestionApi = (params: Record<string, any>) => {
  return Http.post("/crm-platform/api/merchant/addSuggestion", params);
};

const deleteModel = (params: Record<string, any>) => {
  return Http.post("/crm-platform/api/merchant/addSuggestion", params);
};

const getModelList = (params: Record<string, any>) => {
  return Http.post("/crm-platform/api/merchant/addSuggestion", params);
};

// 登录
const loginApi = (params: any) => {
  return Http.post("/crm-platform/api/account/login", params);
};


export default {
  getFlowChartData,
  getMenuData,
  addSuggestionApi,
  deleteModel,
  getModelList,
  loginApi,
};
