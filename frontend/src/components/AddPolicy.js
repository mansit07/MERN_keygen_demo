import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addPolicy, updatePolicy, getProducts } from '../service/api';

const AddPolicy = ({ open, onClose, policy }) => {
  const navigate = useNavigate();
  const [newPolicy, setNewPolicy] = useState({ name: '', product: '' });
  const [errors, setErrors] = useState({ name: '', product: '' });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    getAllProducts();
    if (policy) {
      setNewPolicy({ name: policy.attributes.name, product: policy.relationships.product.data.id });
      setSelectedProduct(policy.relationships.product.data.id);
    }
  }, [policy]);

  const getAllProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPolicy({ ...newPolicy, [name]: value });
    validateField(name, value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    setNewPolicy({ ...newPolicy, product: e.target.value });
    validateField('product', e.target.value);
  };

  const validateField = (name, value) => {
    let error = '';

    if (name === 'name' && !value.trim()) {
      error = 'Name is required';
    } else if (name === 'product' && !value.trim()) {
      error = 'Product is required';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateFields = () => {
    const newErrors = { name: '', product: '' };
    let isValid = true;

    if (!newPolicy.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!newPolicy.product.trim()) {
      newErrors.product = 'Product is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddPolicy = async () => {
    if (validateFields()) {
      try {
        if (policy) {
          await updatePolicy(policy.id, newPolicy);
        } else {
          await addPolicy(newPolicy);
        }
        onClose();
      } catch (error) {
        console.error('Error adding/updating policy:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{policy ? 'Update Policy' : 'Add New Policy'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={newPolicy.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          name="product"
          label="Product Name"
          select
          fullWidth
          variant="standard"
          value={selectedProduct}
          onChange={handleProductChange}
          error={!!errors.product}
          helperText={errors.product}
          disabled={!!policy}
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.attributes.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddPolicy}>{policy ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPolicy;
