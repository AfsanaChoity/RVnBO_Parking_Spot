
import {

    Button,

    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
} from 'antd';

import { useState } from 'react';
// import CodeVerifyModal from './CodeVerifyModal';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const BookingCheckoutForm = () => {
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
        setOpenModal(true);
    };

    const onFinishFailed = ({ errorFields }) => {
        // optional: scroll to the first error
        form.scrollToField(errorFields?.[0]?.name);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );



    return (
        <div>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label={<span style={{ fontWeight: 700 }}>E-mail</span>}

                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input placeholder="Enter your registered email " />
                </Form.Item>





                <Form.Item
                    name="name"
                    label={<span style={{ fontWeight: 700 }}>Name</span>}
                    // tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
                >
                    <Input placeholder="Enter your registered name " />
                </Form.Item>

                <Form.Item
                    name="city"
                    label={<span style={{ fontWeight: 700 }}>City</span>}
                    rules={[
                        { required: true, message: 'Please select your city!' },
                    ]}
                >
                    {/* <Cascader options={residences} /> */}
                    <Input placeholder="Enter your city " />

                </Form.Item>

                <Form.Item
                    name="postcode"
                    label={<span style={{ fontWeight: 700 }}>Postcode</span>}
                    rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label={<span style={{ fontWeight: 700 }}>Phone Number</span>}
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label={<span style={{ fontWeight: 700 }}>Gender</span>}
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>

                

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="" style={{ color: "#468F9D" }}>terms & conditions</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button  type="primary" htmlType="submit" style={{ backgroundColor: "#468F9D", fontWeight: "600", fontSize: 20, padding: "24px 44px" }}>
                        Continue
                    </Button>
                </Form.Item>


            </Form>

            {/* Modal */}
            {/* <div>
                <CodeVerifyModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                ></CodeVerifyModal>
            </div> */}
        </div>
    );
};
export default BookingCheckoutForm;