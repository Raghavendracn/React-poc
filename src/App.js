import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Paper,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UsersTable from './components/UsersTable';

// Environment Variables Configuration
const config = {
  appName: process.env.REACT_APP_NAME || 'React MUI Sample App',
  appVersion: process.env.REACT_APP_VERSION || '1.0.0',
  appDescription: process.env.REACT_APP_DESCRIPTION || 'A sample React application',
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com',
  apiTimeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 5000,
  enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  enableDebugMode: process.env.REACT_APP_ENABLE_DEBUG_MODE === 'true',
  showContactStats: process.env.REACT_APP_SHOW_CONTACT_STATS === 'true',
  primaryColor: process.env.REACT_APP_PRIMARY_COLOR || '#1976d2',
  secondaryColor: process.env.REACT_APP_SECONDARY_COLOR || '#dc004e',
  themeMode: process.env.REACT_APP_THEME_MODE || 'light',
  maxContacts: parseInt(process.env.REACT_APP_MAX_CONTACTS) || 100,
  defaultCountryCode: process.env.REACT_APP_DEFAULT_COUNTRY_CODE || '+1'
};

const theme = createTheme({
  palette: {
    mode: config.themeMode,
    primary: {
      main: config.primaryColor,
    },
    secondary: {
      main: config.secondaryColor,
    },
  },
});

function App() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1-555-0123' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1-555-0124' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1-555-0125' }
  ]);
  
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [editingContact, setEditingContact] = useState(null);

  const handleAddContact = () => {
    if (newContact.name && newContact.email && newContact.phone) {
      // Check max contacts limit from environment
      if (!editingContact && contacts.length >= config.maxContacts) {
        alert(`Maximum ${config.maxContacts} contacts allowed`);
        return;
      }
      
      if (editingContact) {
        setContacts(contacts.map(contact => 
          contact.id === editingContact.id 
            ? { ...editingContact, ...newContact }
            : contact
        ));
        setEditingContact(null);
      } else {
        const id = Math.max(...contacts.map(c => c.id)) + 1;
        // Add default country code if phone doesn't start with +
        const phone = newContact.phone.startsWith('+') 
          ? newContact.phone 
          : `${config.defaultCountryCode}-${newContact.phone.replace(/^-/, '')}`;
        setContacts([...contacts, { id, ...newContact, phone }]);
      }
      setNewContact({ name: '', email: '', phone: '' });
      setOpen(false);
      setSnackbarOpen(true);
      
      // Log analytics if enabled
      if (config.enableAnalytics) {
        console.log('Contact added/updated:', { action: editingContact ? 'update' : 'add' });
      }
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setNewContact({ name: contact.name, email: contact.email, phone: contact.phone });
    setOpen(true);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setSnackbarOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditingContact(null);
    setNewContact({ name: '', email: '', phone: '' });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {config.appName} - Contact Manager
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {config.enableDebugMode && (
                <Chip 
                  icon={<InfoIcon />}
                  label={`v${config.appVersion}`} 
                  color="info" 
                  variant="outlined"
                  size="small"
                />
              )}
              <Chip 
                label={`${contacts.length}/${config.maxContacts} Contacts`} 
                color="secondary" 
                variant="outlined"
              />
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Welcome Card */}
            <Grid item xs={12}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h4" gutterBottom color="primary">
                    Welcome to {config.appName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {config.appDescription}. You can manage contacts, add new ones, edit existing contacts, and delete them.
                  </Typography>
                  {config.enableDebugMode && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                      <Typography variant="caption" display="block">
                        <strong>Debug Info:</strong> API Base URL: {config.apiBaseUrl} | 
                        Theme: {config.themeMode} | 
                        Analytics: {config.enableAnalytics ? 'Enabled' : 'Disabled'}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Contact List */}
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Contact List
                </Typography>
                <List>
                  {contacts.map((contact) => (
                    <ListItem
                      key={contact.id}
                      secondaryAction={
                        <Box>
                          <IconButton 
                            edge="end" 
                            aria-label="edit"
                            onClick={() => handleEditContact(contact)}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => handleDeleteContact(contact.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={contact.name}
                        secondary={
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <EmailIcon sx={{ mr: 1, fontSize: 16 }} />
                              <Typography variant="body2">{contact.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <PhoneIcon sx={{ mr: 1, fontSize: 16 }} />
                              <Typography variant="body2">{contact.phone}</Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Statistics Card - Only show if enabled in env */}
            {config.showContactStats && (
              <Grid item xs={12} md={4}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Statistics
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h3" color="primary">
                        {contacts.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Contacts (Max: {config.maxContacts})
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h4" color="secondary">
                        {contacts.filter(c => c.email.includes('@gmail.com')).length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Gmail Users
                      </Typography>
                    </Box>
                    {config.enableDebugMode && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Default Country: {config.defaultCountryCode}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )}

            {/* Users Table */}
            <Grid item xs={12}>
              <UsersTable />
            </Grid>
          </Grid>
        </Container>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>

        {/* Add/Edit Contact Dialog */}
        <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingContact ? 'Edit Contact' : 'Add New Contact'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <TextField
                fullWidth
                label="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Phone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                margin="normal"
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddContact} variant="contained">
              {editingContact ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success">
            Contact {editingContact ? 'updated' : 'added'} successfully!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
