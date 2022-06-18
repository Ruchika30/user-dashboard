import { Button, Form, Input } from 'antd';
import React from 'react'

const FormComponent = ({ buttonLabel, onSubmit, handleInput, handlePassword }) => {


    return (
        <div>

            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}

                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input onChange={handleInput} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password InputRef={handleInput} onChange={handlePassword} />
                </Form.Item>


                <Button type="primary"
                    onClick={onSubmit}
                    htmlType="submit"
                    style={{ width: '100%' }}>
                    {buttonLabel}

                </Button>

            </Form>
        </div >

    );
};

export default FormComponent;