import React, { useEffect, useState } from 'react';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllPolicies, deletePolicy, getProducts } from '../service/api';
import AddPolicy from './AddPolicy'; // Import the AddPolicy component

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto 0 auto;
`;
const THead = styled(TableRow)`
  background: #000000;
  & > th {
    color: #fff;
    font-size: 18px;
  }
`;
const TBody = styled(TableRow)`
  & > td {
    font-size: 15px;
  }
`;


const PolicyList = () => {
  const [policy, setPolicy] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // State to manage add/edit dialog open status
  const [selectedPolicy, setSelectedPolicy] = useState(null); // State to manage selected policy for editing
  const [viewDialogOpen, setViewDialogOpen] = useState(false); // State to manage view dialog open status
  const [viewPolicy, setViewPolicy] = useState(null); // State to manage selected policy for viewing
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllPolicy();
  }, []);

  const getAllPolicy = async () => {
    // Fetch policies and products from API and set to state
    const policyResponse = await getAllPolicies();
    const productResponse = await getProducts();
    setPolicy(policyResponse.data);
    setProducts(productResponse.data);
  };

  const deleteUserDetails = async (id) => {
    // Delete policy logic
    await deletePolicy(id);
    getAllPolicy();
  };

  const handleAddNewClick = () => {
    setSelectedPolicy(null); // Clear selected policy
    setOpenDialog(true); // Open add/edit dialog
  };

  const handleEditClick = (policyItem) => {
    setSelectedPolicy(policyItem); // Set selected policy
    setOpenDialog(true); // Open add/edit dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close add/edit dialog
    getAllPolicy(); // Refresh policies after dialog closes
  };

  const handleViewClick = (policyItem) => {
    setViewPolicy(policyItem); // Set selected policy
    setViewDialogOpen(true); // Open view dialog
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false); // Close view dialog
    setViewPolicy(null); // Clear selected policy
  };

  const getProductById = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? product.attributes.name : '';
  };

  return (
    <>
      <div className='flex justify-end w-11/12 mt-10 ml-12'>
        <Button variant='contained' onClick={handleAddNewClick}>Add New Policy</Button>
      </div>
      <div>
        <StyledTable>
          <TableHead>
            <THead>
              <TableCell>Name</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Last Updated At</TableCell>
              <TableCell>Action</TableCell>
            </THead>
          </TableHead>
          <TableBody>
            {policy.map((policyItem) => (
              <TBody key={policyItem.id}>
                <TableCell>{policyItem.attributes.name}</TableCell>
                <TableCell>{getProductById(policyItem.relationships.product.data.id)}</TableCell>
                <TableCell>{policyItem.attributes.created}</TableCell>
                <TableCell>{policyItem.attributes.updated}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    onClick={() => handleEditClick(policyItem)}
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => deleteUserDetails(policyItem.id)}
                    style={{ marginRight: 10 }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleViewClick(policyItem)}
                  >
                    View
                  </Button>
                </TableCell>
              </TBody>
            ))}
          </TableBody>
        </StyledTable>
      </div>
      {openDialog && (
        <AddPolicy
          open={openDialog}
          onClose={handleCloseDialog}
          policy={selectedPolicy}
        />
      )}
      <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
        <DialogTitle>Policy Details</DialogTitle>
        <DialogContent>
          {viewPolicy && (
            <DialogContentText>
              <strong>Name:</strong> {viewPolicy.attributes.name} <br />
              <strong>Product:</strong> {getProductById(viewPolicy.relationships.product.data.id)} <br />
              <strong>Created At:</strong> {viewPolicy.attributes.created} <br />
              <strong>Last Updated At:</strong> {viewPolicy.attributes.updated} <br />
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PolicyList;

