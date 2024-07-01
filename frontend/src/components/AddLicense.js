import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addLicense, getAllPolicies, getUsers, updateLicense } from '../service/api';

const AddLicense = ({ open, onClose, license }) => {
  const navigate = useNavigate();

  // State variables
  const [newLicense, setNewLicense] = useState({
    name: license ? license.attributes.name : '',
    expiry: license ? license.attributes.expiry : '',
    users: license ? license.relationships.owner.data.id : '',
    policy: license ? license.relationships.policy.data.id : ''
  });

  const [errors, setErrors] = useState({
    name: '',
    expiry: '',
    users: '',
    policy: ''
  });

  const [policy, setPolicy] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(license ? license.relationships.policy.data.id : '');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(license ? license.relationships.owner.data.id : '');

  useEffect(() => {
    getAllPolicy();
    getAllUser();
  }, []);

  // Fetch all policies
  const getAllPolicy = async () => {
    try {
      const response = await getAllPolicies();
      setPolicy(response.data);
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  };

  // Fetch all users
  const getAllUser = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLicense({ ...newLicense, [name]: value });
    validateField(name, value);
  };

  // Handle policy selection change
  const handlePolicyChange = (e) => {
    const value = e.target.value;
    setSelectedPolicy(value);
    setNewLicense({ ...newLicense, policy: value });
    validateField('policy', value);
  };

  // Handle user selection change
  const handleUserChange = (e) => {
    const value = e.target.value;
    setSelectedUsers(value);
    setNewLicense({ ...newLicense, users: value });
    validateField('users', value);
  };

  // Validate individual field
  const validateField = (name, value) => {
    let error = '';

    if (name === 'name' && !value.trim()) {
      error = 'Name is required';
    } else if (name === 'expiry' && !value) {
      error = 'Expiry is required';
    } 
    else if (name === 'users' && !value) {
      error = 'User selection is required';
    } else if (name === 'policy' && !value) {
      error = 'Policy selection is required';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Validate form fields before submission
  const validateForm = () => {
    const newErrors = { name: '', expiry: '' , users: '', policy: '' };
    let valid = true;

    if (!newLicense.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!newLicense.expiry.trim()) {
      newErrors.expiry = 'Expiry is required';
      valid = false;
    }

    if (!newLicense.users) {
      newErrors.users = 'User selection is required';
      valid = false;
    }

    if (!newLicense.policy) {
      newErrors.policy = 'Policy selection is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle add or update license action
  const handleAddOrUpdateLicense = async () => {
    if (validateForm()) {
      try {
        if (license) {
          await updateLicense(license.id, newLicense);
        } else {
          await addLicense(newLicense);
        }
        onClose();
      } catch (error) {
        console.error('Error adding/updating license:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{license ? 'Update License' : 'Add New License'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={newLicense.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
        autoFocus
        margin="dense"
        name="expiry" // Corrected name attribute
        type="date"
        fullWidth
        variant="standard"
        value={newLicense.expiry} // Bind to newLicense.expiry
        onChange={handleInputChange} // Call handleInputChange with correct name
        error={!!errors.expiry}
        helperText={errors.expiry}
        />


        <TextField
          margin="dense"
          name="policy"
          label="Policy Name"
          select
          fullWidth
          variant="standard"
          value={selectedPolicy}
          onChange={handlePolicyChange}
          error={!!errors.policy}
          helperText={errors.policy}
          disabled={!!license}
        >
          {policy.map(policyItem => (
            <MenuItem key={policyItem.id} value={policyItem.id}>
              {policyItem.attributes.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="users"
          label="User Name"
          select
          fullWidth
          variant="standard"
          value={selectedUsers}
          onChange={handleUserChange}
          error={!!errors.users}
          helperText={errors.users}
          disabled={!!license}
        >
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>
              {user.attributes.email}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddOrUpdateLicense}>{license ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLicense;
