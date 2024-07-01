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
import { getAllMachines, getProducts, getAllLicense, deleteMachine } from '../service/api';
import AddMachine from './AddMachine';

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
  overflow-y: auto;
`;

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const [products, setProducts] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewMachine, setViewMachine] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const machinesResponse = await getAllMachines();
    const productsResponse = await getProducts();
    const licensesResponse = await getAllLicense();
    setMachines(machinesResponse.data);
    setProducts(productsResponse.data);
    setLicenses(licensesResponse.data);
  };

  const deleteUserDetails = async (id) => {
    await deleteMachine(id);
    fetchData();
  };

  const handleAddNewClick = () => {
    setIsEditing(false);
    setSelectedMachine(null);
    setOpenDialog(true);
  };

  const handleEditClick = (machine) => {
    setIsEditing(true);
    setSelectedMachine(machine);
    setOpenDialog(true);
  };

  const handleViewClick = (machine) => {
    setViewMachine(machine);
    setIsViewDialogOpen(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    fetchData();
  };

  const handleViewDialogClose = () => {
    setIsViewDialogOpen(false);
    setViewMachine(null);
  };

  const getProductById = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? product.attributes.name : '';
  };

  const getLicenseById = (licenseId) => {
    const license = licenses.find((license) => license.id === licenseId);
    return license ? license.attributes.name : '';
  };

  return (
    <>
      <div className='flex justify-end w-11/12 mt-10 ml-12'>
        <Button variant='contained' onClick={handleAddNewClick}>Add New Machine</Button>
      </div>
      <div>
        <StyledTable>
          <TableHead>
            <THead>
              <TableCell>Name</TableCell>
              <TableCell>Fingerprint</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>License</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Last Updated At</TableCell>
              <TableCell>Action</TableCell>
            </THead>
          </TableHead>
          <TableBody>
            {machines.map((machine) => (
              <TBody key={machine.id}>
                <TableCell>{machine.attributes.name}</TableCell>
                <TableCell>{machine.attributes.fingerprint}</TableCell>
                <TableCell>{machine.attributes.ip}</TableCell>
                <TableCell>{getLicenseById(machine.relationships.license.data.id)}</TableCell>
                <TableCell>{getProductById(machine.relationships.product.data.id)}</TableCell>
                <TableCell>{machine.attributes.created}</TableCell>
                <TableCell>{machine.attributes.updated}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    onClick={() => handleEditClick(machine)}
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => deleteUserDetails(machine.id)}
                    style={{ marginRight: 10 }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleViewClick(machine)}
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
        <AddMachine
          machine={selectedMachine}
          isEditing={isEditing}
          onSave={handleDialogClose}
        />
      )}
      {isViewDialogOpen && (
        <Dialog open={isViewDialogOpen} onClose={handleViewDialogClose} maxWidth="md" fullWidth>
          <DialogTitle>Machine Details</DialogTitle>
          <StyledDialogContent>
            {viewMachine && (
              <DialogContentText>
                <strong>Name:</strong> {viewMachine.attributes.name} <br />
                <strong>Fingerprint:</strong> {viewMachine.attributes.fingerprint} <br />
                <strong>License:</strong> {getLicenseById(viewMachine.relationships.license.data.id)} <br />
                <strong>Product:</strong> {getProductById(viewMachine.relationships.product.data.id)} <br />
                <strong>Created At:</strong> {viewMachine.attributes.created} <br />
                <strong>Last Updated At:</strong> {viewMachine.attributes.updated} <br />
              </DialogContentText>
            )}
          </StyledDialogContent>
          <DialogActions>
            <Button onClick={handleViewDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default MachineList;
