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
export default {
  getFlowChartData,
  getMenuData,
  addSuggestionApi,
};
