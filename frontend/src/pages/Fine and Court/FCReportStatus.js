import { useEffect, useState } from "react";
import '../../styles/FCRS.css';
import Layout from '../../components/Layout';
import Axios from "axios";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import 'jspdf-autotable';

const FCReportStatus = () => {
  const [RVdata, setRVdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getReportData();
  }, []);

  const getReportData = () => {
    Axios.get('http://localhost:4000/api/VioReports')
      .then(response => {
        console.log('Data from Server', response.data);
        setRVdata(response.data.allVioReports);
      })
      .catch(error => {
        console.error('Axios Error : ', error);
      });
  };

  const filterData = () => {
    return RVdata.filter(rvdata => {
      const searchQueryLower = searchQuery.toLowerCase();
      const includesSearchQuery = (value) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return value.toString().toLowerCase().includes(searchQueryLower);
        }
        return false;
      };

      return includesSearchQuery(rvdata.ro_name) ||
        includesSearchQuery(rvdata.ro_email) ||
        includesSearchQuery(rvdata.ro_mobile) ||
        includesSearchQuery(rvdata.date) ||
        includesSearchQuery(rvdata.v_location) ||
        includesSearchQuery(rvdata.v_type) ||
        includesSearchQuery(rvdata.v_name) ||
        includesSearchQuery(rvdata.v_email) ||
        includesSearchQuery(rvdata.v_mobile) ||
        includesSearchQuery(rvdata.v_nic);
    });
  };

  return (
    <Layout>
      <h2>Violation Report Status</h2>
      <div className="searchvr">
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search" />
      </div>
      <div className="stTable">
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Raid Officer Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Violation Location</TableCell>
              <TableCell>Violation Type</TableCell>
              <TableCell>Violation Description</TableCell>
              <TableCell>Violator Name</TableCell>
              <TableCell>Violator Email</TableCell>
              <TableCell>Violator Contact Number</TableCell>
              <TableCell>Violator ID</TableCell>
              <TableCell>Evidences</TableCell>
              <TableCell>Decision</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData().length > 0 ? (
              filterData().map((RVdata) => (
                <TableRow key={RVdata._id}>
                  <TableCell>{RVdata.ro_name}</TableCell>
                  <TableCell>{RVdata.date}</TableCell>
                  <TableCell>{RVdata.v_location}</TableCell>
                  <TableCell>{RVdata.v_type}</TableCell>
                  <TableCell>{RVdata.v_description}</TableCell>
                  <TableCell>{RVdata.v_name}</TableCell>
                  <TableCell>{RVdata.v_email}</TableCell>
                  <TableCell>{RVdata.v_mobile}</TableCell>
                  <TableCell>{RVdata.v_nic}</TableCell>
                  <TableCell >{RVdata.evidence}</TableCell>
                  <TableCell>{RVdata.decision}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="11">No Data Available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default FCReportStatus;
