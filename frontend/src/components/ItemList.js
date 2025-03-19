import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';
import api from '../services/api';
import ItemForm from './ItemForm';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await api.getItems();
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.deleteItem(id);
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleFormClose = () => {
    setSelectedItem(null);
    setOpenForm(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedItem) {
        await api.updateItem(selectedItem.id, formData);
      } else {
        await api.createItem(formData);
      }
      fetchItems();
      handleFormClose();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenForm(true)}
        >
          Add New Item
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(item)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ItemForm
        open={openForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        item={selectedItem}
      />
    </Box>
  );
};

export default ItemList;
