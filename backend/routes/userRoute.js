const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const KEYGEN_API_URL = process.env.KEYGEN_API_URL
const KEYGEN_API_KEY = process.env.KEYGEN_API_KEY
const token = process.env.token

router.post('/add', async (req, res) => {
    try {
      const { firstName,lastName,email,password } = req.body;
      console.log(req.body);
      const response = await axios.post(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/users`, {
        data: {
          type: 'users',
          attributes: {   
            firstName,
            lastName,
            email,
            password
          }
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        }
      });
  
      const newUser = response.data.data;
      console.log(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error adding user:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: error.message });
    }
  });

//get all users
router.get('/all', async (req, res) => {
  try {

      const response = await axios.get(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/users?limit=15`, {
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.api+json'
      }
      });
  
      const users = response.data.data;
      res.status(200).json(users);
  } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: 'Failed to fetch users' });
  }
  });

//getting single user info
router.get('/:id', async (req, res) => {
const { id } = req.params;
try {

    const response = await axios.get(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/users/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.api+json'
    }
    });

    const user = response.data.data;
    res.status(200).json(user);
} catch (error) {
    console.error('Error fetching user details:', error.response ? error.response.data : error.message);
    res.status(404).json({ message: 'user not found' });
}
});

//updating user
router.post('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const { firstName,lastName,email  } = req.body;
  
  
      const response = await axios.patch(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/users/${id}`, {
        data: {
          type: 'users',
          attributes: {
            firstName,lastName,email   
          }
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        }
      });
  
      const updatedUser = response.data.data;
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating User:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: 'Failed to update User' });
    }
  });

  //deleting user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await axios.delete(`${KEYGEN_API_URL}/${KEYGEN_API_KEY}/users/${id}`, {
        headers: {
          "Accept": "application/vnd.api+json",
          'Authorization': `Bearer ${token}`
        }
      });
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  });


module.exports = router;