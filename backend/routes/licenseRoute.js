const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const KEYGEN_API_URL = process.env.KEYGEN_API_URL
const KEYGEN_API_KEY = process.env.KEYGEN_API_KEY
const token = process.env.token

//creating license
router.post('/add', async (req, res) => {
    try {
      const { name,expiry,policy, users } = req.body; // Example: Extract product details from request body
      // Example: Make POST request to keygen.sh API to create a product
      const response = await axios.post(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/licenses`, {
        data: {
          type: 'licenses',
          attributes: {
            name,
            expiry
          },
          relationships: {
            policy:{
              data: {
                type: "policies",
                id: policy
              }
            },
            owner:{
              data: {
                type: "users",
                id: users
              }
            }
          },
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        }
      });
      const licenses = response.data.data; // Extract the newly created product from the response
      res.status(201).json(licenses); // Respond with the newly created product
    } catch (error) {
      console.error('Error adding license:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: 'Failed to add license' });
    }
  });

// get all licenses
router.get('/all', async (req, res) => {
    try {
        // Example: Make GET request to keygen.sh API to fetch all products
        const response = await axios.get(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/licenses?limit=15`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.api+json'
        }
        });
    
        const licenses = response.data.data; // Extract products from the response
        res.status(200).json(licenses); // Respond with the array of products
    } catch (error) {
        console.error('Error fetching licenses:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to fetch licenses' });
    }
    });

//get single license
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Example: Make GET request to keygen.sh API to fetch a product by ID
      console.log("fetching policy id: ",id);
      const response = await axios.get(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/licenses/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.api+json'
        }
      });
  
      const licenses = response.data.data; // Extract the product from the response
      res.status(200).json(licenses); // Respond with the fetched product
    } catch (error) {
      console.error('Error fetching licenses details:', error.response ? error.response.data : error.message);
      res.status(404).json({ message: 'licenses not found' });
    }
  });

//update license
router.post('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { name } = req.body; // Example: Extract updated product details from request body
  
      // Example: Make PATCH request to keygen.sh API to update a product by ID
      const response = await axios.patch(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/licenses/${id}`, {
        data: {
            type: 'licenses',
            attributes: {
              name
            },
          }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        }
      });
  
      const updatedLicense = response.data.data; // Extract the updated product from the response
      res.status(200).json(updatedLicense); // Respond with the updated product
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: 'Failed to update product' });
    }
  });

//deleting license
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Example: Make DELETE request to keygen.sh API to delete a product by ID
      await axios.delete(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/licenses/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      res.status(200).json({ message: 'licenses deleted successfully' });
    } catch (error) {
      console.error('Error deleting licenses:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: 'Failed to delete licenses' });
    }
  });

module.exports = router;