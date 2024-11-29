"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Toolbar, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  // Función para obtener el estilo de los enlaces activos
  const getActiveStyle = (path: string) => {
    return pathname === path
      ? {
          backgroundColor: '#ffffff',
          color: '#162B4E',
          '&:hover': { backgroundColor: '#f4f4f4' },
          borderRadius: '12px',
          borderLeft: '4px solid #162B4E',
          transition: 'all 0.3s ease',
        }
      : {
          backgroundColor: '#162B4E',
          color: '#ddd',
          '&:hover': { 
            backgroundColor: '#3c4a63',
            borderRadius: '12px',
          }, 
          transition: 'background-color 0.3s ease',
          borderRadius: '12px',
        };
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 70 : 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: collapsed ? 70 : 240,
          boxSizing: 'border-box',
          backgroundColor: '#162B4E',
          color: '#fff',
          
          paddingTop: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          paddingLeft: 0
        },
      }}
    >
      {/* Header con logo o título */}
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
        <Typography variant="h6" noWrap sx={{ fontSize: collapsed ? '1.2rem' : '1.5rem', fontWeight: 'bold' }}>
          HOLA MODA
        </Typography>
        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: '#fff' }}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider sx={{ borderColor: '#fff' }} />

      {/* Links de navegación */}
      <List sx={{ padding: '10px 0' }}>
        <Link href="/dashboard" passHref>
          <ListItem disablePadding>
            <ListItemButton sx={{ ...getActiveStyle('/dashboard'), marginBottom: 2 }}>
              <ListItemIcon sx={{ color: pathname === '/dashboard' ? '#162B4E' : '#fff' }}>
                <HomeIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Home" sx={{ color: 'inherit' }} />}
            </ListItemButton>
          </ListItem>
        </Link>

        <Link href="/customers" passHref>
          <ListItem disablePadding>
            <ListItemButton sx={{ ...getActiveStyle('/customers'), marginBottom: 2 }}>
              <ListItemIcon sx={{ color: pathname === '/customers' ? '#162B4E' : '#fff' }}>
                <PeopleIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Customers" sx={{ color: 'inherit' }} />}
            </ListItemButton>
          </ListItem>
        </Link>

        <Link href="/purchases" passHref>
          <ListItem disablePadding>
            <ListItemButton sx={{ ...getActiveStyle('/purchases'), marginBottom: 2 }}>
              <ListItemIcon sx={{ color: pathname === '/purchases' ? '#162B4E' : '#fff' }}>
                <ShoppingCartIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Purchases" sx={{ color: 'inherit' }} />}
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default Sidebar;
