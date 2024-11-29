"use client";
import React, { useEffect, useState } from 'react';
import { getSalesOfAllItems } from '@/services/itemService';  
import { getSalesOfAllLocations } from '@/services/locationService';  
import { Grid, Paper, Typography, Card, CardContent, useTheme, Box } from '@mui/material';
import Layout from '../../components/Layout'; 
import { ItemSales } from '@/types/item';  
import { LocationSales } from '@/types/location';  
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const theme = useTheme();
  
  const [itemData, setItemData] = useState<ItemSales[]>([]);
  const [locationData, setLocationData] = useState<LocationSales[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamada a la API de productos más vendidos
        const resultItems: ItemSales[] = await getSalesOfAllItems();
        setItemData(resultItems);

        // Llamada a la API de ventas por ubicación
        const resultLocations: LocationSales[] = await getSalesOfAllLocations();
        setLocationData(resultLocations);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: locationData.map(location => location.location_name), 
    datasets: [
      {
        label: 'Sales',
        data: locationData.map(location => location.total_sales), 
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)', 
        borderWidth: 1,
      },
    ],
  };

  // Opciones para el gráfico de barras
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sales By Location',
        font: {
          size: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const totalSales = locationData.reduce((sum, location) => sum + location.total_sales, 0);
            const percentage = ((tooltipItem.raw / totalSales) * 100).toFixed(2);
            return `${tooltipItem.label}: ${tooltipItem.raw} ventas (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Location',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Layout>
      <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Dashboard HOLA MODA
      </Typography>

      <Grid container spacing={2}>
        {/* Tarjetas de Información - Productos Más Vendidos */}
        {itemData.slice(0, 3).map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 3,
              backgroundColor: theme.palette.background.paper,
              borderRadius: '12px',
              boxShadow: 3,
              height: 'auto',
              minHeight: 180,
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {item.item_name}
                </Typography>
                <Typography variant="h4" sx={{
                  fontWeight: 'bold',
                  marginY: 1,
                  color: theme.palette.primary.main,
                  fontSize: '2rem',
                }}>
                  {item.total_sales}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                  Revenue: ${item.total_revenue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Texto explicativo debajo de las tarjetas */}
        <Grid item xs={12}>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ marginTop: 1, fontSize: '1.2rem' }}>
            Top 3 best-selling items
          </Typography>
        </Grid>

        {/* Área para el gráfico de ventas por ubicación */}
        <Grid item xs={12}>
          <Paper sx={{
            padding: 3,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 3,
            borderRadius: '12px',
            minHeight: 350,
          }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              Sales By Location Chart
            </Typography>
            <Box sx={{
              height: 350,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.palette.grey[200],
              borderRadius: '8px',
            }}>
              <Bar data={chartData} options={options} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
