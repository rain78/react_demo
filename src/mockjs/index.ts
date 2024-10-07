import Mock from "mockjs";

Mock.mock("/api/hooks/login", "post", {
	code: 200,
	data: {
		access_token: "bqddxxwqmfncffacvbpkuxvwvqrhln"
	},
	message: "成功"
});

interface LoginRequest {
	username: string;
	password: string;
}

interface LoginResponse {
	code: number;
	token?: string;
	message: string;
}
interface Request {
	body: any;
}
Mock.mock("/hooks/login", "post", (request: Request) => {
	const requestBody = request.body;
	if (requestBody !== null) {
		const { username, password } = JSON.parse(requestBody) as LoginRequest;
		if (username === "admin" && password === "123456") {
			return {
				code: 200,
				access_token: "mock_token_123456",
				message: "Login successful"
			} as LoginResponse;
		} else {
			return {
				code: 401,
				message: "账号密码错误"
			} as LoginResponse;
		}
		// ...
	} else {
		return {
			code: 401,
			message: "输入错误"
		} as LoginResponse;
	}
});

Mock.mock("/hooks/register", "post", (request: Request) => {
	const requestBody = request.body;
	if (requestBody !== null) {
		const { username, password } = JSON.parse(requestBody) as LoginRequest;
		if (username && password) {
			return {
				code: 200,
				message: "register successful"
			};
		} else {
			return {
				code: 401,
				message: "注册失败"
			};
		}
		// ...
	} else {
		return {
			code: 401,
			message: "注册失败"
		};
	}
});
