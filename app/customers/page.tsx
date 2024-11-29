"use client";

import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import Layout from '../../components/Layout';
import { getAllPurchases, deletePurchase, getPurchaseById } from '@/services/purchaseService';
import { Purchase } from '@/types/purchase';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]); // Estado para almacenar las compras
  const [openView, setOpenView] = useState(false); // Estado para el modal de vista
  const [openDelete, setOpenDelete] = useState(false); // Estado para el modal de eliminar
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null); // Compra seleccionada

  // Llamada a la API para obtener las compras
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await getAllPurchases();
        setPurchases(data); 
      } catch (error) {
        console.error('Error al obtener las compras:', error);
      }
    };
    fetchPurchases();
  }, []);

  // Abre el modal de ver detalles de la compra
  const handleViewOpen = async (purchase: Purchase) => {
    try {
      const data = await getPurchaseById(purchase.purchase_id);
      setSelectedPurchase(data);
      setOpenView(true);
    } catch (error) {
      console.error('Error al obtener los detalles de la compra:', error);
    }
  };

  // Cierra el modal de ver detalles
  const handleViewClose = () => setOpenView(false);

  // Abre el modal de eliminación de la compra
  const handleDeleteOpen = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setOpenDelete(true);
  };

  // Cierra el modal de eliminación
  const handleDeleteClose = () => setOpenDelete(false);

  // Elimina la compra
  const handleDelete = async () => {
    if (selectedPurchase) {
      try {
        // Eliminar la compra
        await deletePurchase(selectedPurchase.purchase_id);
        
        // Actualizar la lista de compras después de eliminar
        const updatedPurchases = await getAllPurchases();
        setPurchases(updatedPurchases);
        
        handleDeleteClose();
      } catch (error) {
        console.error('Error al eliminar la compra:', error);
      }
    }
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#162B4E' }}>
        Purchases
      </Typography>

      {/* Contenedor de la tabla con scroll */}
      <Paper sx={{ maxHeight: '700px', overflowY: 'auto', borderRadius: '8px' }}>
        <TableContainer sx={{ boxShadow: 3 }}>
          <Table aria-label="Purchases Table" sx={{ minWidth: '100%' }}>
            <TableHead>
              <TableRow sx={{
                backgroundColor: '#162B4E',
                position: 'sticky',
                top: 0,
                zIndex: 1,
                color: '#fff'
              }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Purchase ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Customer ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Item Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchases.map((purchase) => (
                <TableRow hover key={purchase.purchase_id} sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                  '&:hover': { backgroundColor: '#f4f4f4' },
                }}>
                  <TableCell align="center">{purchase.purchase_id}</TableCell>
                  <TableCell align="center">${purchase.purchase_amount}</TableCell>
                  <TableCell align="center">{purchase.customer_id}</TableCell>
                  <TableCell align="center">{purchase.item_name}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleViewOpen(purchase)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteOpen(purchase)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal de ver detalles */}
      <Dialog open={openView} onClose={handleViewClose}>
        <DialogTitle>Purchase Details</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Purchase ID: {selectedPurchase?.purchase_id}</Typography>
            <Typography variant="h6">Amount: ${selectedPurchase?.purchase_amount}</Typography>
            <Typography variant="h6">Customer ID: {selectedPurchase?.customer_id}</Typography>
            <Typography variant="h6">Item: {selectedPurchase?.item_name}</Typography>
            <Typography variant="h6">Location: {selectedPurchase?.location_name}</Typography>
            <Typography variant="h6">Color: {selectedPurchase?.color_name}</Typography>
            <Typography variant="h6">Payment Method: {selectedPurchase?.payment_method_name}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de eliminación */}
      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <DialogTitle>Delete Purchase</DialogTitle>
        <DialogContent>
          <Typography variant="body1">¿Are you sure you want to delete this purchase?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Purchases;
