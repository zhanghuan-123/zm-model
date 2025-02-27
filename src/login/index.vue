<template>
	<div class="login">
		<div class="login-box">
			<p class="login-logo">
				<img
          class="logo-wrap"
					src="@/assets/logo.png"
					alt=""
				/>
			</p>
			<h3>机器学习平台</h3>
			<div>
				<el-button @click="welcomeLogin" v-show="loginFlag">
					欢迎登录
				</el-button>
			</div>
			<div v-show="!verify">
				<div
					class="login-form"
					v-show="loginWay === 'number'"
					:class="{ 'logo-active': !loginFlag }"
				>
					<div class="bevel">
						<i @click="cutLoginWay" class="el-icon-mobile-phone"></i>
					</div>
					<h4>账号密码登录</h4>
					<el-form ref="number-form" :model="numberLoginFrom" :rules="RULES">
						<el-form-item prop="account">
							<el-input
								v-model.trim="numberLoginFrom.account"
								placeholder="请输入登录账号"
								maxlength="50"
								@input="checkInputOneAccount"
							>
								<i slot="prefix" class="el-icon-user"></i>
							</el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input
								@keyup.enter.native="submit('number-form')"
								v-model.trim="numberLoginFrom.password"
								type="password"
								placeholder="请输入登录密码"
								maxlength="18"
							>
								<i slot="prefix" class="el-icon-user"></i>
							</el-input>
						</el-form-item>
					</el-form>

					<!-- <p>
						<el-button type="text">忘记登录密码</el-button>
					</p> -->
					<div>
						<el-button
							class="login-button"
							type="primary"
							:disabled="!numberLoginFrom.account || !numberLoginFrom.password"
							@click="submit('number-form')"
							@keyup.enter.native="submit('number-form')"
							>登录</el-button
						>
					</div>
				</div>
				<div
					class="login-form phone-login-form"
					v-if="loginWay === 'phone'"
					:class="{ 'logo-active': !loginFlag }"
				>
					<div class="bevel">
						<i @click="cutLoginWay" class="el-icon-mobile-phone"></i>
					</div>
					<h4>短信登录</h4>
					<el-form ref="phone-form" :data="phoneLoginFrom" :rules="RULES">
						<el-form-item prop="phoneNo">
							<el-input
								placeholder="请输入绑定手机号"
								v-model.trim="phoneLoginFrom.phone"
								onkeyup="value=value.replace(/\D/g,'')"
								maxlength="11"
							>
								<i slot="prefix" class="el-icon-user"></i>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-input
								placeholder="请输入验证码"
								v-model.trim="phoneLoginFrom.code"
								onkeyup="value=value.replace(/\D/g,'')"
								maxlength="6"
							>
								<template slot="append">
									<el-button
										type="text"
										:disabled="getCodeButtonDisplay"
										@click="getPhoneCode"
									>
										{{ buttonText }}
									</el-button>
								</template>
								<i slot="prefix" class="el-icon-user"></i>
							</el-input>
						</el-form-item>
					</el-form>
					<div>
						<el-button
							class="login-button"
							type="primary"
							:disabled="!phoneLoginFrom.phone || !phoneLoginFrom.code"
							@click="login('phone-form')"
							@keyup.enter.native="submit('phone-form')"
							>登录</el-button
						>
					</div>
				</div>
			</div>

			<Vcode
				:show="verify"
				@success="verifySuccess"
				@fail="verifyFails"
				@close="closeRe"
				:canvasWidth="500"
				:canvasHeight="240"
			></Vcode>
		</div>
	</div>
</template>

<script>
import Vcode from "@/components/puzzle-code";
import { loginApi } from "@/api";
import { forbidFormatChecksInput } from "@/utils";
import { RULES } from "./config";

export default {
	components: {
		Vcode,
	},
	data() {
		return {
			loginFlag: true,
			verify: false,
			loginWay: "number",
			phoneLoginFrom: {
				phone: "",
				code: "",
			},
			numberLoginFrom: {
				account: "",
				password: "",
			},
			RULES,
			buttonText: "获取验证码",
			getCodeButtonDisplay: false,
		};
	},
	created() {
		// __STORAGE__.removeAll();
	},
	methods: {
		verifySuccess() {
			this.verify = false;
			this.login();
		},
		verifyFails() {
			// this.verify = false;
		},
		closeRe() {
			this.verify = false;
			this.phoneLoginFrom = {
				phone: "",
				code: "",
			};
			this.numberLoginFrom = {
				account: "",
				password: "",
			};
		},
		getPhoneCode() {
			this.getCodeButtonDisplay = true;
			let countDown = 60;
			setInterval(() => {
				if (countDown === 0) {
					this.buttonText = "获取验证码";
					this.getCodeButtonDisplay = true;
				} else {
					countDown -= 1;
				}
				this.buttonText = `${countDown}s`;
			}, 1000);
		},
		async login() {
      const { retcode } = await loginApi({...this.numberLoginFrom})
      if(retcode == 0) {
        //做一些储存用户身份的动作
        this.$router.push({
					name: "desginList",
				});
      }
		},
		submit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.verify = true;
				}
			});
		},
		welcomeLogin() {
			this.loginFlag = false;
		},
		cutLoginWay() {
			if (this.loginWay === "number") {
				this.loginWay = "phone";
			} else {
				this.loginWay = "number";
			}
		},
		checkInputOneAccount(val) {
			this.numberLoginFrom.account = forbidFormatChecksInput(val, "account");
		},
	},
};
</script>

<style lang="scss">
.login {
	text-align: center;
	display: flex;
	height: 100vh;
  width: 100%;
	background: url(../assets/login-background.jpg)
		no-repeat;
	background-size: 100% 100%;
	flex-direction: column;

	justify-content: center;
	.login-logo {
		img {
			width: 50px;
      height: 50px;
		}
	}
	.login-box {
		align-items: center;
		margin: auto;
		position: relative;
		top: -8%;
		h3 {
			font-weight: bold;
			font-size: 24px;
			letter-spacing: 14px;
			color: #ffffff;
			margin-top: 26px;
			margin-bottom: 40px;
		}
	}

	.login-form {
		width: 0;
		height: 0;
		overflow: hidden;
		opacity: 0;
		position: relative;
		transition-property: opacity, height;
		transition-duration: 1s, 0.5s;
		transition-timing-function: ease;
		margin: auto;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.8);
		padding: 0 58px;
		.bevel {
			display: none;
			position: absolute;
			width: 64px;
			height: 64px;
			top: 0;
			right: 0;
			border-radius: 4px;
			background: linear-gradient(
				to bottom left,
				#fff 50%,
				rgba(0, 0, 0, 0) 50%
			);
			text-align: right;
			padding-right: 15px;
			padding-top: 15px;
			i {
				font-size: 20px;
				cursor: pointer;
				&:hover {
					color: red;
				}
			}
		}
		.el-input {
			margin-top: 20px;
		}
		.el-form-item {
			margin-bottom: 0;
		}
		p {
			margin-top: 10px;
			text-align: right;
		}
		h4 {
			font-size: 24px;
			padding-top: 30px;
			text-align: left;
		}
		.login-button {
			background: #4a5aed;
			width: 100%;
			border-color: #4a5aed;
      margin-top: 30px;
		}
		.el-input--prefix .el-input__inner {
			padding-left: 40px;
		}
		.el-input__prefix {
			left: 15px;
			display: flex;
			align-items: center;
		}
	}
	.logo-active {
		opacity: 1;
		width: 540px;
		height: 350px;
	}
	.phone-login-form {
		.el-input-group__append,
		.el-input-group__prepend {
			width: 120px;
			padding: 0;
			.el-button {
				width: 100%;
			}
		}
		.login-button {
			margin-top: 30px;
		}
	}
	.record-warp {
		position: fixed;
		bottom: 0px;
		left: 50%;
		transform: translateX(-50%);
		color: #fff;
		padding: 40px 0;
		font-size: 12px;
		line-height: 18px;
	}
}
</style>
