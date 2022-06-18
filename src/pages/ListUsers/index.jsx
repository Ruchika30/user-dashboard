import { Button, Space, Table, notification, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react';
import { listUsers, createUserService, deleteUserService } from '../../services/userService'
import { useHistory } from 'react-router-dom';
import { pageRoutes } from '../../network/pageRoutes'
import useAuth from '../../hooks/useAuth'
import CreateUserModal from './createUserModal'
import DeleteUserModal from './DeleteUserModal'
import UpdateModal from './updateModal'
import { Keys } from '../../network/key'

const TableComponent = () => {
    const history = useHistory()
    const { isLoggedIn } = useAuth()
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [usersList, setUsersList] = useState([])
    const [username, setUsername] = useState('')
    const [jobValue, handleJob] = useState('')
    const [isCreateUserModalVisible, setCreateUserModal] = useState(false);
    const [showUpdateModal, setshowUpdateModal] = useState(false)
    const [showDeleteModal, setshowDeleteModal] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState()

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },


        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleUpdate(record)}>Update</a>
                    <a onClick={() => handleDelete(record)}>Delete</a>
                </Space>
            ),
        },
    ];


    const handleCancel = () => {
        setCreateUserModal(false);
        setshowUpdateModal(false)
        setshowDeleteModal(false)
    };

    const openNotificationWithIcon = (error) => {
        notification['error']({
            message: 'Unauthenticated user',
            description: 'Kindly login'

        });
    };


    const createUser = () => {

        if (isLoggedIn) {
            setCreateUserModal(true);
        }
        else openNotificationWithIcon()
    }

    const handleUpdate = (record) => {
        setSelectedRecord(record)
        if (isLoggedIn) {
            setshowUpdateModal(true)
        }
        else openNotificationWithIcon()
    }

    const handleDelete = (record) => {
        setSelectedRecord(record)
        if (isLoggedIn) {
            setshowDeleteModal(true)
        }
        else openNotificationWithIcon()
    }

    const handleCreateUser = async () => {
        try {
            const response = await createUserService({
                "name": username,
                "job": jobValue,
            })
            if (response) {
                notification['success']({
                    message: 'User Created !',
                });
            }
            setCreateUserModal(false)
        }
        catch (error) {
            console.log(" create user error", error.message)
            notification['error']({
                message: 'User Creation failed !',
                description: error.message
            });
        }
    }

    const handleUpdateUser = async () => {
        try {
            const response = await createUserService({
                id: selectedRecord.id,
                "name": username,
                "job": jobValue,
            })
            if (response) {
                notification['success']({
                    message: 'User Updated !',
                });
            }
            setshowUpdateModal(false)
        }
        catch (error) {
            console.log(" update user error", error.message)
            notification['error']({
                message: 'User Update failed !',
                description: error.message
            });
        }
    }

    const handleDeleteUser = async () => {
        try {
            const response = await deleteUserService({
                id: selectedRecord.id
            })
            if (response) {
                notification['success']({
                    message: 'User deleted !',
                });
            }
            setshowDeleteModal(false)
        }
        catch (error) {
            console.log(" create user error", error.message)
            notification['error']({
                message: 'User Deletion failed !',
                description: error.message
            });
        }
    }

    const getInitialData = async () => {
        try {
            const response = await listUsers({
                pageNumber, pageSize
            });

            setUsersList(response.data)

        } catch (error) {
            console.log("List suers error", error)
        }
    };

    useEffect(() => {
        getInitialData()
    }, [])

    const goToLogin = () => {
        history.push(pageRoutes.login)
    }
    const handleLogout = () => {
        if (isLoggedIn) {
            localStorage.removeItem(Keys.authToken)
            history.push(pageRoutes.login)
            notification['success']({
                message: 'User Logged out !',
            });
        }
    }

    const hanleNewUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleJobName = (e) => {
        handleJob(e.target.value)
    }

    return (
        <>

            <div style={{ width: '70%', margin: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'end', padding: '10px' }}>
                    <Button type="primary" onClick={createUser} >
                        Create User
                    </Button>
                    {!isLoggedIn && <Button type="primary" onClick={goToLogin} style={{ marginLeft: '10px' }} >
                        Log In
                    </Button>}
                    {isLoggedIn && <Button type="primary" onClick={handleLogout} style={{ marginLeft: '10px' }} >
                        Log Out
                    </Button>}
                </div>


                {isCreateUserModalVisible &&
                    <CreateUserModal
                        isModalVisible={isCreateUserModalVisible}
                        handleCreateUser={handleCreateUser}
                        handleCancel={handleCancel}
                        handleJobName={handleJobName}
                        handleUsername={hanleNewUsername}
                    />}


                {showDeleteModal &&
                    <DeleteUserModal
                        selectedRecord={selectedRecord}
                        isModalVisible={showDeleteModal}
                        handleDelete={handleDeleteUser}
                        handleCancel={handleCancel}

                    />}

                {showUpdateModal &&
                    <UpdateModal
                        isModalVisible={showUpdateModal}
                        handleUpdate={handleUpdateUser}
                        handleCancel={handleCancel}
                        handleJobName={handleJobName}
                        handleUsername={hanleNewUsername}

                    />}



                <Table columns={columns} dataSource={usersList} />

            </div>
        </>
    )
}

export default TableComponent

