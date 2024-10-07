import { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Login } from "@/api/interface";
import { loginApi } from "@/api/modules/login";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import { useTranslation } from "react-i18next";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const LoginForm = () => {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// 登录
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			const data = await loginApi(loginForm);
			console.log("登录返回：", data);
			message.success("token 为：" + data.access_token);
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
			initialValues={{ remember: true, username: "admin", password: "123456" }}
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
			<Form.Item name="remember">
				<Checkbox>记住我</Checkbox>
			</Form.Item>
			<Form.Item className="login-btn">
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					{t("login.confirm")}
				</Button>
				<Button type="primary" danger>
					<Link to="/register">注册</Link>
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(LoginForm);
