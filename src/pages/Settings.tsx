import { Button, Checkbox, Form, Input, Switch } from "antd";
import { useState } from "react";
import useTest from "../test";

interface SettingsForm {
  delay: number
  errorRequest: boolean
}

const defaultSettings = {
  delay: localStorage.getItem('chgkRatingDevSettings') ? JSON.parse(localStorage.getItem('chgkRatingDevSettings')!).delay ?? 1000 : 1000,
  errorRequest: localStorage.getItem('chgkRatingDevSettings') ? JSON.parse(localStorage.getItem('chgkRatingDevSettings')!).errorRequest ?? false : false,
}

const Settings = () => {
  const [settings, setSettings] = useState<SettingsForm>(defaultSettings)
  // const { navigateToUsersPage } = useTest()

  const onFinish = (values: any) => {
    const data = {
      ...settings,
      ...values,
    }
    setSettings(data)
    localStorage.setItem('chgkRatingDevSettings', JSON.stringify(data));
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ delay: settings.delay, errorRequest: settings.errorRequest }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Delay"
          name="delay"
          rules={[{
            required: true,
            message: 'Please input your username!',
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
         label="Error Request"
          name="errorRequest"
          valuePropName="checked"
        >
          <Switch />
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
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ playersPage: true }}
        // onFinish={}
        autoComplete="off"
      >
        <Form.Item
         label="Players Page"
          name="playersPage"
          valuePropName="checked"
        >
          <Switch />
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
  )
}

export default Settings