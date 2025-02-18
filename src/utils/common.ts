import { message } from "ant-design-vue";
export const messageSuccess = (msg?: any) => {
  message.destroy();
  const str = msg?.msg || msg?.message || msg || "请求成功";
  message.success({ content: str, key: str });
};

export const messageError = (error?: any) => {
  message.destroy();
  const str = error?.msg || error?.message || error || "请求错误";
  message.error({ content: str, key: str });
};

export const messageWarning = (error?: any) => {
  message.destroy();
  const str = error?.msg || error?.message || error || "提示";
  message.warning({ content: str, key: str });
};
