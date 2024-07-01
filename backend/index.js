// Import required modules
const express = require('express');
// const getProductByToken = require('./product-management/fetchProduct');
const cors = require("cors")
// const createProduct = require('./product-management/fetchProduct')
const bodyParser=require('body-parser');
// const updateProduct = require('./product-management/updateProduct');
// const deleteProduct = require('./product-management/deleteProduct');
const  productRoute  = require('./routes/productRoute');
const policyRoute = require('./routes/policyRoute');
const userRoute = require('./routes/userRoute')
const licenseRoute = require('./routes/licenseRoute')
const machineRoute = require('./routes/machineRoute')
require('dotenv').config();


// Create an instance of express application
const app = express();

app.use(cors())
// app.use(express.json())
app.use(bodyParser.json())
// app.use(express.urlencoded({extended: true}))
// app.use(bodyParser.urlencoded({extended: true}))

app.get("/",(req,res)=>{
  return res.status(200).send({message:"welcome to license management api - node"})
})
app.use('/products',productRoute)
app.use('/policies',policyRoute)
app.use('/users',userRoute)
app.use('/licenses',licenseRoute)
app.use('/machines',machineRoute);

const PORT =  4000;
// Define a route handler for the root URL

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


// getProductByToken()
//   .then(() => console.log("keygen sh connected"))
//   .catch(error => console.error('Main error:', error));
