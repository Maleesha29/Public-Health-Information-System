import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { FaTrash } from 'react-icons/fa';

const DengueAssignTable = () => {
  const [denguedata, setDenguedata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getDengueData();
  }, []);

  const getDengueData = () => {
    Axios.get('http://localhost:4000/api/getstaffdengue')
      .then(response => {
        console.log('data from server', response.data);
        setDenguedata(response.data.allstaffdengue);
        setFilteredData(response.data.allstaffdengue); // Initialize filteredData with all data
      })
      .catch(error => {
        console.error("Axios error: ", error);
      })
  };

  const handleDelete = (id) => {
    Axios.post('http://localhost:4000/api/deletestaffdengue',{ _id: id })
      .then(response => {
        console.log('Deleted successfully');
        setDenguedata(prevData => prevData.filter(camp => camp._id !== id));
        setFilteredData(prevData => prevData.filter(camp => camp._id !== id)); // Update filteredData
      })
      .catch(error => {
        console.error("Axios delete error: ", error);
      });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const filtered = denguedata.filter(camp =>
      camp.staffmember.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Layout>
      <div className='adminClinic'>
      <h2>Dengue Assignments</h2>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      <TableContainer component={Paper}>
        <Table border={1} cellPadding={10} cellSpacing={0}>
          <TableHead>
            <TableRow>
              <TableCell>Venue</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Assigned Staff</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((camp) => (
                <TableRow key={camp._id}>
                  <TableCell>{camp.venue}</TableCell>
                  <TableCell>{camp.date}</TableCell>
                  <TableCell>{camp.time}</TableCell>
                  <TableCell>{camp.staffmember}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(camp._id)}><FaTrash/></Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5">No Dengue Assignments found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </Layout>
  );
};

export default DengueAssignTable;
