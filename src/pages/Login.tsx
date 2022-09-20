/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Checkbox, Form, Input } from "antd";
import useLogin, { LoginParams } from "../hooks/Login/login";

const loginForm = css({
  width: '600px',
  margin: 'auto',
})

const Login = () => {
  const { isError, error, mutate, isLoading } = useLogin();
  console.log("LOG -> ~ Login ~ isError", isError)

  const onFinish = (values: LoginParams) => {
    mutate(values)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div css={loginForm}>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{
            required: true,
            message: 'Please input your username!',
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{
            required: true,
            message: 'Please input your password!',
          }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login