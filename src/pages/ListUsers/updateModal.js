
import { Modal, notification, Form, Input } from 'antd'

import React from 'react'

const UpdateUserModal = ({
    isModalVisible,
    handleUpdate,
    handleCancel,
    handleUsername,
    handleJobName
}) => {


    return (

        <Modal title="Update User" visible={isModalVisible}
            onOk={handleUpdate}
            onCancel={handleCancel}
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
                <Input onChange={handleUsername} />
            </Form.Item>

            <Form.Item
                label="Job"
                name="Job"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Job!',
                    },
                ]}
            >
                <Input onChange={handleJobName} />
            </Form.Item>

        </Modal>
    )
}

export default UpdateUserModal