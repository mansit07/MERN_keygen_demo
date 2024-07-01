import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { addUser, updatedUser } from '../service/api';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';

const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingUser = location.state?.user;

  const [newUser, setNewUser] = useState({
    firstName: existingUser?.attributes?.firstName || '',
    lastName: existingUser?.attributes?.lastName || '',
    email: existingUser?.attributes?.email || '',
    password: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (existingUser) {
      setNewUser({
        firstName: existingUser.attributes.firstName,
        lastName: existingUser.attributes.lastName,
        email: existingUser.attributes.email,
        password: '', // Don't pre-fill password
      });
    }
  }, [existingUser]);

  const handleClose = () => {
    navigate('/all');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });

    // Validate the field dynamically
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    if (name === 'firstName' && !value.trim()) {
      error = 'First Name is required';
    } else if (name === 'lastName' && !value.trim()) {
      error = 'Last Name is required';
    } else if (name === 'email') {
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Email format is invalid';
      }
    } else if (name === 'password') {
      if (!value.trim() && !existingUser) {
        error = 'Password is required';
      } else if (value.length > 0 && value.length < 6) {
        error = 'Password must be at least 6 characters long';
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateFields = () => {
    const newErrors = { firstName: '', lastName: '', email: '', password: '' };
    let isValid = true;

    if (!newUser.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
      isValid = false;
    }
    if (!newUser.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
      isValid = false;
    }
    if (!newUser.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = 'Email format is invalid';
      isValid = false;
    }
    if (!newUser.password.trim() && !existingUser) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (newUser.password.length > 0 && newUser.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddOrUpdateUser = async () => {
    if (validateFields()) {
      try {
        if (existingUser) {
          await updatedUser(existingUser.id, newUser);
          toast.success("Update user successfully");
        } else {
          await addUser(newUser);
        }
        navigate('/all');
        handleClose();
      } catch (error) {
        console.error('Error adding/updating user:', error);
      }
    }
  };

  return (
    <div>
      <ToastContainer />
        <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{existingUser ? 'Update User' : 'Add New User'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
          value={newUser.firstName}
          onChange={handleInputChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
          value={newUser.lastName}
          onChange={handleInputChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={newUser.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        {!existingUser && (
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={newUser.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddOrUpdateUser}>{existingUser ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
    </div>
    
    
  );
};

export default AddUser;
