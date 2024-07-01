import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { addProducts, updatedProduct } from '../service/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingProduct = location.state?.product;

  const [newProduct, setNewProduct] = useState({
    name: existingProduct?.attributes?.name || '',
    url: existingProduct?.attributes?.url || '',
    platforms: existingProduct?.attributes?.platforms || [],
  });

  const [errors, setErrors] = useState({
    name: '',
    url: '',
    platforms: '',
  });

  useEffect(() => {
    if (existingProduct) {
      setNewProduct({
        name: existingProduct.attributes.name,
        url: existingProduct.attributes.url,
        platforms: existingProduct.attributes.platforms,
      });
    }
  }, [existingProduct]);

  const handleClose = () => {
    navigate('/productList');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'platforms' ? value.split(',') : value, // Split platforms by comma to form an array
    });

    // Validate fields dynamically
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name' && !value.trim()) {
      error = 'Name is required';
    } else if (name === 'url' && !/^https:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+.*$/.test(value)) {
      error = 'URL must be properly formatted (e.g., https://xyz.com)';
    } else if (name === 'platforms' && !value.split(',').filter(Boolean).length) {
      error = 'Platforms are required';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateFields = () => {
    const newErrors = { name: '', url: '', platforms: '' };
    let isValid = true;

    if (!newProduct.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!/^https:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+.*$/.test(newProduct.url)) {
      newErrors.url = 'URL must be properly formatted (e.g., https://xyz.com)';
      isValid = false;
    }
    if (!newProduct.platforms.length || !newProduct.platforms.filter(Boolean).length) {
      newErrors.platforms = 'Platforms are required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddOrUpdateProduct = async () => {
    if (validateFields()) {
      try {
        if (existingProduct) {
          await updatedProduct(existingProduct.id, newProduct);
        } else {
          await addProducts(newProduct);
        }
        navigate('/productList');
        handleClose();
      } catch (error) {
        console.error('Error adding/updating product:', error);
      }
    }
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{existingProduct ? 'Update Product' : 'Add New Product'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={newProduct.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          name="url"
          label="URL"
          type="url"
          fullWidth
          variant="standard"
          value={newProduct.url}
          onChange={handleInputChange}
          error={!!errors.url}
          helperText={errors.url}
        />
        <TextField
          margin="dense"
          label="Platforms"
          type="text"
          fullWidth
          placeholder="Enter platforms (comma-separated)"
          name="platforms"
          value={newProduct.platforms.join(',')} // Join array to display in textarea
          onChange={handleInputChange}
          error={!!errors.platforms}
          helperText={errors.platforms}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddOrUpdateProduct}>{existingProduct ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProduct;
