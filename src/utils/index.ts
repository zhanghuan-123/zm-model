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

const INPUTREG: any = {
	// 账号名：禁止输入这些
	account:
		"[`~!@#$^&*()=|{}';',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；”“'。，、？ ]",
	// 登陆密码：必须同时包含大小写字母及数字
	password: "/(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/",
	// 手机号：必须满足手机号格式
	phone: "/^1[3-9][0-9]{9}$/",
};

// el-input输入时格式校验
export const forbidFormatChecksInput = (val?: any,inputType?: any) => {
	const regularExpression = INPUTREG[inputType];
	const codeReg = new RegExp(regularExpression);
	let str = "";
	for (let i = 0; i < val.length; i += 1) {
		if (!codeReg.test(val[i])) {
			str += val[i];
		}
	}
	return str;
};
