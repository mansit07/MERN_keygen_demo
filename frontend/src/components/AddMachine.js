import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addMachine, updateMachine, getAllLicense } from '../service/api';

const AddMachine = ({ machine, isEditing, onSave }) => {
  const navigate = useNavigate();
  const [newMachine, setNewMachine] = useState({ name: '', ip: '' , fingerprint: '', license: '' });
  const [errors, setErrors] = useState({ name: '', ip: '',fingerprint: '', license: '' });
  const [licenses, setLicenses] = useState([]);
  const [selectedLicense, setSelectedLicense] = useState('');

  useEffect(() => {
    if (isEditing && machine) {
      setNewMachine({
        name: machine.attributes.name,
        fingerprint: machine.attributes.fingerprint,
        ip: machine.attributes.ip,
        license: machine.relationships.license.data.id,
      });
      setSelectedLicense(machine.relationships.license.data.id);
    }
    getAllLicenses();
  }, [isEditing, machine]);

  const getAllLicenses = async () => {
    try {
      const response = await getAllLicense();
      console.log('Response from getAllLicenses:', response);
      setLicenses(response.data);
    } catch (error) {
      console.error('Error fetching licenses:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMachine({ ...newMachine, [name]: value });
    validateField(name, value);
  };

  const handleLicenseChange = (e) => {
    const value = e.target.value;
    setSelectedLicense(value);
    setNewMachine({ ...newMachine, license: value });
    validateField('license', value);
  };

  const validateField = (name, value) => {
    let error = '';

    if (name === 'name' && !value.trim()) {
      error = 'Name is required';
    }else if (name === 'ip' && !value.trim()) {
      error = 'Ip is required';
    }
     else if (name === 'fingerprint' && !value.trim() && !isEditing) {
      error = 'Fingerprint is required';
    } else if (name === 'license' && !value) {
      error = 'License selection is required';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleClose = async() => {
    window.location.href='/machine';
  };

  const handleAddOrUpdateMachine = async () => {
    if (validateForm()) {
      try {
        if (isEditing) {
          await updateMachine(machine.id, newMachine); // Implement updateMachine API call
        } else {
          await addMachine(newMachine); // Implement addMachine API call
        }
        onSave(); // Refresh machine list or perform other actions after save
        handleClose();
      } catch (error) {
        console.error('Error adding/updating machine:', error);
        // Handle error
      }
    }
  };

  const validateForm = () => {
    const newErrors = { name: '', ip:'', fingerprint: '', license: '' };
    let valid = true;

    if (!newMachine.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!newMachine.ip.trim()) {
      newErrors.ip = 'Ip is required';
      valid = false;
    }

    if (!newMachine.fingerprint.trim() && !isEditing) {
      newErrors.fingerprint = 'Fingerprint is required';
      valid = false;
    }

    if (!newMachine.license) {
      newErrors.license = 'License selection is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{isEditing ? 'Update Machine' : 'Add New Machine'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={newMachine.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          disabled={!!isEditing}
        />
        <TextField
          margin="dense"
          name="fingerprint"
          label="Fingerprint"
          type="text"
          fullWidth
          variant="standard"
          value={newMachine.fingerprint}
          onChange={handleInputChange}
          error={!!errors.fingerprint}
          helperText={errors.fingerprint}
          disabled={!!isEditing}
        />
        <TextField
          margin="dense"
          name="ip"
          label="IP"
          type="text"
          fullWidth
          variant="standard"
          value={newMachine.ip}
          onChange={handleInputChange}
          error={!!errors.ip}
          helperText={errors.ip}
        />

        <TextField
          margin="dense"
          name="license"
          label="License Name"
          select
          fullWidth
          variant="standard"
          value={selectedLicense}
          onChange={handleLicenseChange}
          error={!!errors.license}
          helperText={errors.license}
          disabled={!!isEditing}
        >
          {licenses.map((licenseItem) => (
            <MenuItem key={licenseItem.id} value={licenseItem.id}>
              {licenseItem.attributes.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddOrUpdateMachine}>{isEditing ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMachine;
