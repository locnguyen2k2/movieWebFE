import React, { useState } from 'react';
import axios from 'axios';
import API from '../../constants/API';
import TableItem from '../../components/Table';

const users = axios.get(API.API_LIST_USER, {withCredentials: true}).then((res) => {
    return res.data.data;
});
function ListUser() {
    const [user, setUser] = useState([]);
    users.then((data) => {
        setUser(data);
    });
    return (
        <TableItem
            title="List User"
            cols={['First name', 'Last name', 'Phone', 'Email', "Thiết lập"]}
            keys={['fname', 'lname', 'phone', 'email', ""]}
            data={user}
        />
    );
}

export default ListUser;