import React, { useEffect, useState } from 'react';
import { Table, TableCell, TableHead, TableRow, TableBody, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../service/api';

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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      let response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEditClick = (product) => {
    navigate('/addproduct', { state: { product } });
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteProduct(id);
      getAllProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleAddNewClick = () => {
    navigate('/addproduct');
  };

  return (
    <>
      <div className='flex justify-end w-11/12 mt-10 ml-12'>
        <Button variant='contained' onClick={handleAddNewClick}>Add New Product</Button>
      </div>
      <div>
        <StyledTable>
          <TableHead>
            <THead>
              <TableCell>Name</TableCell>
              <TableCell>Url</TableCell>
              <TableCell>Platforms</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Last Updated At</TableCell>
              <TableCell>Action</TableCell>
            </THead>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TBody key={product.id}>
                <TableCell>{product.attributes.name}</TableCell>
                <TableCell>{product.attributes.url}</TableCell>
                <TableCell>{product.attributes.platforms ? product.attributes.platforms.join(', ') : ''}</TableCell>
                <TableCell>{product.attributes.created}</TableCell>
                <TableCell>{product.attributes.updated}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    onClick={() => handleEditClick(product)}
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => handleDeleteClick(product.id)}
                    style={{ marginRight: 10 }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleViewClick(product)}
                  >
                    View
                  </Button>
                </TableCell>
              </TBody>
            ))}
          </TableBody>
        </StyledTable>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Product Details</DialogTitle>
        <StyledDialogContent>
          {selectedProduct && (
            <DialogContentText>
              <strong>Name:</strong> {selectedProduct.attributes.name} <br />
              <strong>Url:</strong> {selectedProduct.attributes.url} <br />
              <strong>Platforms:</strong>{' '}
              {selectedProduct.attributes.platforms
                ? selectedProduct.attributes.platforms.join(', ')
                : 'N/A'}{' '}
              <br />
              <strong>Created At:</strong> {selectedProduct.attributes.created} <br />
              <strong>Last Updated At:</strong> {selectedProduct.attributes.updated} <br />
            </DialogContentText>
          )}
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductList;
