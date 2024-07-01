const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Replace with your actual API key and URL from keygen.sh
const KEYGEN_API_URL = process.env.KEYGEN_API_URL
const KEYGEN_API_KEY = process.env.KEYGEN_API_KEY
const token = process.env.token


router.post('/add', async (req, res) => {
  try {
    const { name, product } = req.body; // Example: Extract product details from request body
    console.log(req.body);
    // Example: Make POST request to keygen.sh API to create a product
    const response = await axios.post(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/policies`, {
      data: {
        type: 'policies',
        attributes: {
          name: name, // Use the 'name' received from req.body
          // Add more attributes as needed
        },
        relationships: {
          product: {
            data: {
              type: 'products',
              id: product
            }
          }
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    });

    const newProduct = response.data.data; // Extract the newly created product from the response
    res.status(201).json(newProduct); // Respond with the newly created product
  } catch (error) {
    console.error('Error adding product:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to add product' });
  }
});

//get all policy
router.get('/all', async (req, res) => {
  try {
      // Example: Make GET request to keygen.sh API to fetch all products
      const response = await axios.get(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/policies?limit=15`, {
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.api+json'
      }
      });
  
      const policies = response.data.data; // Extract products from the response
      res.status(200).json(policies); // Respond with the array of products
  } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: 'Failed to fetch users' });
  }
  });

//get single policy
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Example: Make GET request to keygen.sh API to fetch a product by ID
      console.log("fetching policy id: ",id);
      const response = await axios.get(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/policies/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.api+json'
        }
      });
  
      const policy = response.data.data; // Extract the product from the response
      res.status(200).json(policy); // Respond with the fetched product
    } catch (error) {
      console.error('Error fetching policy details:', error.response ? error.response.data : error.message);
      res.status(404).json({ message: 'Policy not found' });
    }
  });

//update policy
router.post('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const { name, product } = req.body; 

      const response = await axios.patch(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/policies/${id}`, {
        data: {
          type: 'policies',
          attributes: {
            name
          }
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        }
      });
  
      const updatedProduct = response.data.data; // Extract the updated product from the response
      res.status(200).json(updatedProduct); // Respond with the updated product
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: 'Failed to update Policy' });
    }
  });

  //Delete policy by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Example: Make DELETE request to keygen.sh API to delete a product by ID
    await axios.delete(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/policies/${id}`, {
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