import { Button, Form, Select, Switch } from "antd"
import { FC } from "react"

interface FormCompProps {
  filters: Filter[]
  setParams: any
}

export interface Filter {
  type: 'checkbox' | 'select' | 'input'
  title: string
  key: string
  value: any
  options?: any
}

const FormComp: FC<FormCompProps> = ({ filters, setParams }) => {

  const onFinish = (values: any) => {
    setParams((oldValue: any) => ({
      ...oldValue,
      filters: {
        ...oldValue.filters,
        ...values,
      }
    }))

  }

  const initialValues = filters.reduce((a, v) => ({ ...a, [v.key]: v.value}), {}) 

  return (
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      layout="inline"
      className="components-table-demo-control-bar"
      style={{ marginBottom: 16 }}
    >
      {filters.map((filter) => {
        if (filter.type === "checkbox") {
          return (
            <Form.Item valuePropName="checked" name={filter.key} label={filter.title}>
              <Switch />
            </Form.Item>
          )
        }
        if (filter.type === "select") {
          return (
            <Form.Item name={filter.key} label={filter.title}>
              <Select options={filter.options} />
            </Form.Item>
          )
        }
      })}
      {/* <Form.Item label="Bordered">
        <Switch checked={true} onChange={() => null} />
      </Form.Item> */}

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  )
}

export default FormComp