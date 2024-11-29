// components/Layout.tsx
import React from 'react';
import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
import CustomSidebar from './Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <CustomSidebar />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: '#f4f4f9',
            padding: '20px',
            minHeight: '100vh',
          }}
        >
          {/* Header */}
          <Toolbar />
          
          {/* Content */}
          <Container maxWidth="lg">
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
