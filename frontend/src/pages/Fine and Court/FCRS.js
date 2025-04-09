import { useEffect, useState } from "react";
import '../../styles/FCRS.css';
import Layout from '../../components/Layout';
import Axios from "axios";
import 'jspdf-autotable';

const FCRS = () => {
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

  const FilterData = () => {
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
      <div className="search">
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search" />
      </div>
      <div className="stTable">
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Raid Officer Name</th>
              <th>Date</th>
              <th>Violation Location</th>
              <th>Violation Type</th>
              <th>Violation Description</th>
              <th>Violator Name</th>
              <th>Violator Email</th>
              <th>Violator Contact Number</th>
              <th>Violator ID</th>
              <th>Evidences</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            {FilterData().length > 0 ? (
              FilterData().map((RVdata) => (
                <tr key={RVdata._id}>
                  <td>{RVdata.ro_name}</td>
                  <td>{RVdata.date}</td>
                  <td>{RVdata.v_location}</td>
                  <td>{RVdata.v_type}</td>
                  <td>{RVdata.v_description}</td>
                  <td>{RVdata.v_name}</td>
                  <td>{RVdata.v_email}</td>
                  <td>{RVdata.v_mobile}</td>
                  <td>{RVdata.v_nic}</td>
                  <td className="evidence-cell">
                    {Array.isArray(RVdata.evidence) && RVdata.evidence.length > 0 ? (
                      RVdata.evidence.map((evidence, index) => (
                        <img key={index} src={`data:${evidence.contentType};base64,${evidence.data}`} alt={`Image ${index + 1}` } />
                      ))
                    ) : (
                      <span>No evidence</span>
                    )}
                  </td>
                  <td>{RVdata.decision || 'Pending'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14">No Data Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default FCRS;
