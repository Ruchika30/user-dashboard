
import { Modal, notification, Form, Input } from 'antd'

import React from 'react'

const DeleteModal = ({
    selectedRecord,
    isModalVisible,
    handleDelete,
    handleCancel,

}) => {
    const { first_name, last_name, id } = selectedRecord


    return (

        <Modal title="Delte User" visible={isModalVisible}
            onOk={handleDelete}
            onCancel={handleCancel}
        >
            {` Are you sure you want to delete user ${first_name} ${last_name} with id ${id}?`}


        </Modal>
    )
}

export default DeleteModal