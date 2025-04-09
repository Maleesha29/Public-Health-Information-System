import React, { useState, useEffect } from "react";
import Axios from "axios";
import { 
  Table, TableHead, TableBody, TableRow, TableCell, 
  Button, TextField, Paper, Typography, Container, 
  Box, IconButton, Chip, Tooltip, CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, Download as DownloadIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import Layout from '../../components/Layout';
import '../../styles/Fine And Court/Document-Management.css';

const FCDMTable = () => {
  const [DMdata, setDMdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    getDOCMdata();
  }, []);

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  // Read
  const getDOCMdata = () => {
    setLoading(true);
    Axios.get('http://localhost:4000/api/Documents')
      .then(response => {
        console.log('Data from Server', response.data);
        setDMdata(response.data.allDocM);
        setLoading(false);
      })
      .catch(error => {
        console.error('Axios Error:', error);
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "Failed to load documents. Please try again.",
          icon: "error"
        });
      });
  };

  // Delete
  const deleteDocument = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#9e9e9e",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post('http://localhost:4000/api/deleteDocM', { _id: id })
          .then(() => {
            setDMdata(prevData => prevData.filter(ddata => ddata._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch(error => {
            console.error('Error deleting document:', error);
            Swal.fire({
              title: "Error",
              text: "Failed to delete document. Please try again.",
              icon: "error"
            });
          });
      }
    });
  };

  // filterData
  const filterData = () => {
    return DMdata.filter(ddata => {
      const searchQueryLower = searchQuery.toLowerCase();
      const includesSearchQuery = (value) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return value.toString().toLowerCase().includes(searchQueryLower);
        }
        return false;
      };

      return includesSearchQuery(ddata.r_id) ||
        includesSearchQuery(ddata.ro_name) ||
        includesSearchQuery(ddata.date) ||
        includesSearchQuery(ddata.v_name) ||
        includesSearchQuery(ddata.v_type);
    });
  };

  const updateDocument = (ddata) => {
    setEditData(ddata);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) 
      ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) 
      : dateString;
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
            Document Management
          </Typography>
          
          <Paper elevation={3} sx={{ mb: 3, p: 2, display: 'flex', alignItems: 'center' }}>
            <SearchIcon sx={{ mr: 1, color: '#7f8c8d' }} />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by case number, officer, violator name..."
              sx={{ flexGrow: 1 }}
            />
            <Button 
              variant="contained" 
              color="primary"
              sx={{ ml: 2 }}
              onClick={() => setSearchQuery('')}
            >
              Clear
            </Button>
          </Paper>
          
          <Paper elevation={3} sx={{ overflowX: 'auto' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#3498db' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Case Number</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Raid Officer</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Violator Name</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Violation Type</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Documents</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterData().length > 0 ? (
                    filterData().map((ddata, index) => (
                      <TableRow 
                        key={ddata._id}
                        sx={{ backgroundColor: index % 2 === 0 ? '#f5f6fa' : 'white' }}
                      >
                        <TableCell>{ddata.r_id}</TableCell>
                        <TableCell>{ddata.ro_name}</TableCell>
                        <TableCell>{formatDate(ddata.date)}</TableCell>
                        <TableCell>{ddata.v_name}</TableCell>
                        <TableCell>
                          <Chip 
                            label={ddata.v_type}
                            color={
                              ddata.v_type === 'Major' ? 'error' : 
                              ddata.v_type === 'Minor' ? 'warning' : 'default'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {Array.isArray(ddata.documents) && ddata.documents.length > 0 ? (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {ddata.documents.map((document, idx) => (
                                <Tooltip title={`Download File ${idx + 1}`} key={idx}>
                                  <IconButton 
                                    size="small" 
                                    color="primary"
                                    component="a"
                                    href={`data:${document.contentType};base64,${document.data}`}
                                    download={`file_${idx + 1}`}
                                  >
                                    <DownloadIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              ))}
                            </Box>
                          ) : (
                            <Typography variant="body2" color="text.secondary">No documents</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Edit">
                              <IconButton 
                                component={Link}
                                to={`/FCDMEdit/${encodeURIComponent(ddata._id)}/${encodeURIComponent(ddata.r_id)}/${encodeURIComponent(ddata.ro_name)}/${encodeURIComponent(ddata.date)}/${encodeURIComponent(ddata.v_name)}/${encodeURIComponent(ddata.v_type)}`}
                                color="primary"
                                size="small"
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton 
                                color="error"
                                size="small"
                                onClick={() => deleteDocument(ddata._id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: 'center', py: 3 }}>
                        <Typography variant="body1" color="text.secondary">
                          No records found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default FCDMTable;