const passwordReg = /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
const phoneReg = /^1[3-9][0-9]{9}$/;

const validatePass = (rule, value, callback) => {
	if (value === "") {
		callback(new Error("请输入密码"));
	} else if (passwordReg.test(value)) {
		callback();
	} else {
		callback(new Error("请输入格式正确的密码"));
	}
};

const validatePhoneReg = (rule, value, callback) => {
	if (value === "") {
		callback(new Error("请输入手机号"));
	} else if (phoneReg.test(value)) {
		callback();
	} else {
		callback(new Error("请输入格式正确的手机号"));
	}
};

export const RULES = {
	account: [
		{
			required: true,
			message: "请输入账号名称",
			trigger: "blur"
		}
	],
	password: [
		{
			required: true,
			message: "请输入登陆密码",
			trigger: "blur"
		},
		{
			validator: validatePass,
			trigger: "blur"
		}
	],
	phoneNo: [
		{
			required: true,
			message: "请输入手机号",
			trigger: "blur"
		},
		{
			validator: validatePhoneReg,
			trigger: "blur"
		}
	]
};
