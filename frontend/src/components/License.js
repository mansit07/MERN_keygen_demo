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
import { getAllLicense, deleteLicense, getProducts, getAllPolicies, getUsers } from '../service/api';
import AddLicense from './AddLicense'; // Import AddLicense component

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

const StyledDialogContent = styled(DialogContent)`
  padding: 20px;
`;

const License = () => {
  const [licenses, setLicenses] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentLicense, setCurrentLicense] = useState(null);
  const [viewLicense, setViewLicense] = useState(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllLicenses();
      const productResponse = await getProducts();
      const policiesResponse = await getAllPolicies();
      const usersResponse = await getUsers();
      setProducts(productResponse.data);
      setPolicies(policiesResponse.data);
      setUsers(usersResponse.data);
    };

    fetchData();
  }, []);

  const getAllLicenses = async () => {
    let response = await getAllLicense();
    setLicenses(response.data);
  };

  const deleteUserDetails = async (id) => {
    await deleteLicense(id);
    getAllLicenses();
  };

  const handleAddNewClick = () => {
    setCurrentLicense(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (license) => {
    setCurrentLicense(license);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    getAllLicenses(); // Refresh the list after closing the dialog
  };

  const handleViewClick = (license) => {
    setViewLicense(license);
    setIsViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setViewLicense(null);
  };

  const getProductById = (productId) => {
    if (products && products.length > 0) {
      const product = products.find((product) => product.id === productId);
      return product ? product.attributes.name : '';
    }
    return '';
  };

  const getPolicyById = (policyId) => {
    if (policies && policies.length > 0) {
      const policy = policies.find((policy) => policy.id === policyId);
      return policy ? policy.attributes.name : '';
    }
    return '';
  };

  const getUserById = (userId) => {
    if (users && users.length > 0) {
      const user = users.find((user) => user.id === userId);
      return user ? user.attributes.email : '';
    }
    return '';
  };

  return (
    <>
      <div className='flex justify-end w-11/12 mt-10 ml-12'>
        <Button variant='contained' onClick={handleAddNewClick}>Add New License</Button>
      </div>
      <div>
        <StyledTable>
          <TableHead>
            <THead>
              <TableCell>Name</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Policy</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Last Updated At</TableCell>
              <TableCell>Action</TableCell>
            </THead>
          </TableHead>
          <TableBody>
            {licenses.map((license) => (
              <TBody key={license.id}>
                <TableCell>{license.attributes.name}</TableCell>
                <TableCell>{license.attributes.key}</TableCell>
                <TableCell>{license.attributes.status}</TableCell>
                <TableCell>{license.attributes.expiry}</TableCell>
                <TableCell>{getUserById(license.relationships.owner.data.id)}</TableCell>
                <TableCell>{getPolicyById(license.relationships.policy.data.id)}</TableCell>
                <TableCell>{getProductById(license.relationships.product.data.id)}</TableCell>
                <TableCell>{license.attributes.created}</TableCell>
                <TableCell>{license.attributes.updated}</TableCell>
                <TableCell>
                  <div className='mb-1'>
                    <Button
                      variant='contained'
                      onClick={() => handleEditClick(license)}
                      style={{ marginRight: 10 }}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="mb-1">
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => deleteUserDetails(license.id)}
                      style={{ marginRight: 10 }}
                    >
                      Delete
                    </Button>
                  </div>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleViewClick(license)}
                  >
                    View
                  </Button>
                </TableCell>
              </TBody>
            ))}
          </TableBody>
        </StyledTable>
      </div>
      {isDialogOpen && (
        <AddLicense
          open={isDialogOpen}
          onClose={handleCloseDialog}
          license={currentLicense}
        />
      )}
      {isViewDialogOpen && (
        <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
          <DialogTitle>License Details</DialogTitle>
          <StyledDialogContent>
          {viewLicense && (
              <DialogContentText>
                <strong>Name:</strong> {viewLicense.attributes.name} <br />
                <strong>Key:</strong> {viewLicense.attributes.key} <br />
                <strong>Status:</strong> {viewLicense.attributes.status} <br />
                <strong>Expiry:</strong> {viewLicense.attributes.expiry} <br />
                <strong>Owner:</strong> {getUserById(viewLicense.relationships.owner.data.id)} <br />
                <strong>Policy:</strong> {getPolicyById(viewLicense.relationships.policy.data.id)} <br />
                <strong>Product:</strong> {getProductById(viewLicense.relationships.product.data.id)} <br />
                <strong>Created At:</strong> {viewLicense.attributes.created} <br />
                <strong>Last Updated At:</strong> {viewLicense.attributes.updated} <br />
              </DialogContentText>
            )}
          <DialogActions>
            <Button onClick={handleCloseViewDialog} color="primary">
              Close
            </Button>
          </DialogActions>
          </StyledDialogContent>            
        </Dialog>
      )}
    </>
  );
};

export default License;
