const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const KEYGEN_API_URL = process.env.KEYGEN_API_URL
const KEYGEN_API_KEY = process.env.KEYGEN_API_KEY
const token = process.env.token

// POST /products/add - Add a new product
router.post('/add', async (req, res) => {
  try {
    const { name, url, platforms } = req.body;

    const response = await axios.post(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/products`, {
      data: {
        type: 'products',
        attributes: {   
          name,
          url, 
          platforms
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    });

    const newProduct = response.data.data;
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to add product' });
  }
});

// GET /products/all - Get all products
router.get('/all', async (req, res) => {
  try {

    const response = await axios.get(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/products?limit=15`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.api+json'
      }
    });

    const products = response.data.data;
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// GET /products/:id - Get product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.api+json'
      }
    });

    const product = response.data.data;
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product details:', error.response ? error.response.data : error.message);
    res.status(404).json({ message: 'Product not found' });
  }
});

// POST /products/:id - Edit product by ID
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const { name, url, platforms } = req.body;

    const response = await axios.patch(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/products/${id}`, {
      data: {
        type: 'products',
        attributes: {
          name, url, platforms 
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    });

    const updatedProduct = response.data.data;
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// DELETE /products/:id - Delete product by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {

    await axios.delete(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
