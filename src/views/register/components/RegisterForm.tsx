import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Login } from "@/api/interface";
import { registerApi } from "@/api/modules/login";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import { useTranslation } from "react-i18next";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const RegisterForm = () => {
	const { t } = useTranslation();
	// const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// 登录
	const onFinish = async (registerForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			await registerApi(registerForm);
			message.success("注册成功 🎉🎉🎉");
			// navigate(HOME_URL);
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ username: "admin", password: "123456" }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
				<Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
				<Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item
				name="confirmPassword"
				rules={[
					{ required: true, message: "请确认密码" },
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("密码不匹配"));
						}
					})
				]}
			>
				<Input.Password autoComplete="new-password" placeholder="确认密码" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					{t("login.confirm")}
				</Button>
				<Button type="primary" danger>
					<Link to="/login">登录</Link>
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(RegisterForm);
