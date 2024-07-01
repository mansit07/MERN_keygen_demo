const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const KEYGEN_API_URL = process.env.KEYGEN_API_URL
const KEYGEN_API_KEY = process.env.KEYGEN_API_KEY
const token = process.env.token

//creating new machine
router.post('/add', async (req, res) => {
  try {
    const { name,fingerprint,ip,license } = req.body; // Example: Extract product details from request body
    console.log(req.body);
    // Example: Make POST request to keygen.sh API to create a product
    const response = await axios.post(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/machines`, {
      data: {
        type: 'machines',
        attributes: {
          fingerprint,
          name,
          ip
        },
        relationships: {
          license:{
            data: {
              type: "licenses",
              id: license
            }
          },
        },
      }
    }, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        "Authorization": `Bearer ${token}`
      }
    });
    const machine = response.data.data; // Extract the newly created product from the response
    res.status(201).json(machine); // Respond with the newly created product
  } catch (error) {
    console.error('Error adding machine:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to add machine' });
  }
});

//get all machines
router.get('/all', async (req, res) => {
    try {
        // Example: Make GET request to keygen.sh API to fetch all products
        const response = await axios.get(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/machines?limit=15`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/vnd.api+json",
            'Accept': 'application/vnd.api+json'
        }
        });
    
        const machines = response.data.data; // Extract products from the response
        res.status(200).json(machines); // Respond with the array of products
    } catch (error) {
        console.error('Error fetching machines:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to fetch machines' });
    }
    });

//get single machine
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Example: Make GET request to keygen.sh API to fetch a product by ID
      console.log("fetching policy id: ",id);
      const response = await axios.get(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/machines/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.api+json'
        }
      });
  
      const machines = response.data.data; // Extract the product from the response
      res.status(200).json(machines); // Respond with the fetched product
    } catch (error) {
      console.error('Error fetching machine details:', error.response ? error.response.data : error.message);
      res.status(404).json({ message: 'machine not found' });
    }
  });

  //update machines
router.post('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const { ip } = req.body;  // Example: Extract updated product details from request body
  
      // Example: Make PATCH request to keygen.sh API to update a product by ID
      const response = await axios.patch(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/machines/${id}`, {
        data: {
          type: 'machines',
          attributes: {
            ip,
          }
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        }
      });
  
      const updatedMachines = response.data.data; // Extract the updated product from the response
      res.status(200).json(updatedMachines); // Respond with the updated product
    } catch (error) {
      console.error('Error updating machine:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: 'Failed to update machine' });
    }
  });

  //deleting machines
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Example: Make DELETE request to keygen.sh API to delete a product by ID
      await axios.delete(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/machines/${id}`, {
        headers: {
          "Accept": "application/vnd.api+json",
          'Authorization': `Bearer ${token}`
        }
      });
  
      res.status(200).json({ message: 'machines deleted successfully' });
    } catch (error) {
      console.error('Error deleting machines:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: 'Failed to delete machines' });
    }
  });

module.exports = router;