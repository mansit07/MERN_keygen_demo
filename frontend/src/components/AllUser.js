import React, { useEffect, useState } from 'react';
import { Table, TableCell, TableHead, TableRow, TableBody, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUsers } from '../service/api';

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto 0 auto;
`;
const THead = styled(TableRow)`
  background: #000000;
  & > th {
    color: #fff;
    font-size: 18px;
  }
`;
const TBody = styled(TableRow)`
  & > td {
    font-size: 15px;
  }
`;

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  };

  const deleteUserDetails = async (id) => {
      await deleteUser(id);
      getAllUsers();
  };

  const handleAddNewClick = (user = null) => {
    navigate('/add', { state: { user } });
  };

  return (
    <>
      <div className='flex justify-end w-11/12 mt-10 ml-12'>
        <Button variant='contained' onClick={() => handleAddNewClick()}>Add New</Button>
      </div>
      <div>
        <StyledTable>
          <TableHead>
            <THead>
              <TableCell>FullName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Last Updated At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </THead>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TBody key={user.id}>
                <TableCell>{user.attributes.fullName}</TableCell>
                <TableCell>{user.attributes.email}</TableCell>
                <TableCell>{user.attributes.role}</TableCell>
                <TableCell>{user.attributes.created}</TableCell>
                <TableCell>{user.attributes.updated}</TableCell>
                <TableCell>{user.attributes.status}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    onClick={() => handleAddNewClick(user)}
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => deleteUserDetails(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TBody>
            ))}
          </TableBody>
        </StyledTable>
      </div>
    </>
  );
};

export default AllUser;
