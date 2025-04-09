import { useEffect, useState } from "react";
import Axios from "axios";
import Layout from '../../components/Layout';
import { Search } from "lucide-react";
import '../../styles/Repost-Status.css';

const FCRS = () => {
  const [reportsData, setReportsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    fetchViolationReports();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchViolationReports = () => {
    setIsLoading(true);
    Axios.get('http://localhost:4000/api/VioReports')
      .then(response => {
        console.log('Data from Server', response.data);
        setReportsData(response.data.allVioReports);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Axios Error : ', error);
        setIsLoading(false);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredReports = reportsData.filter(report => {
    const query = searchQuery.toLowerCase();
    const searchableFields = [
      report.ro_name,
      report.ro_email,
      report.ro_mobile,
      report.date,
      report.v_location,
      report.v_type,
      report.v_name,
      report.v_email,
      report.v_mobile,
      report.v_nic,
      report.v_description,
      report.decision
    ];

    return searchableFields.some(field => {
      if (field === null || field === undefined) return false;
      return String(field).toLowerCase().includes(query);
    });
  });

  const toggleRowExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const getStatusClass = (decision) => {
    if (!decision || decision === 'Pending') return 'fcrs-status-pending';
    if (decision.toLowerCase().includes('approved')) return 'fcrs-status-approved';
    if (decision.toLowerCase().includes('rejected')) return 'fcrs-status-rejected';
    return 'fcrs-status-other';
  };

  return (
    <Layout>
      <div className="fcrs-container">
        <div className="fcrs-header">
          <h1 className="fcrs-title">Violation Reports Dashboard</h1>
          <div className="fcrs-search-container">
            <input
              type="text"
              className="fcrs-search-input"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="fcrs-loading">
            <div className="fcrs-spinner"></div>
            <p>Loading reports...</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="fcrs-table-container">
            <table className="fcrs-table">
              <thead>
                <tr>
                  <th>Raid Officer</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Violation Type</th>
                  <th>Violator</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report, index) => (
                  <>
                    <tr key={index} className="fcrs-table-row">
                      <td>{report.ro_name}</td>
                      <td>{new Date(report.date).toLocaleDateString()}</td>
                      <td>{report.v_location}</td>
                      <td>
                        <span className="fcrs-violation-type">{report.v_type}</span>
                      </td>
                      <td>{report.v_name}</td>
                      <td>
                        <span className={`fcrs-status ${getStatusClass(report.decision)}`}>
                          {report.decision || 'Pending'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="fcrs-view-btn"
                          onClick={() => toggleRowExpand(index)}
                        >
                          {expandedRow === index ? 'Hide Details' : 'View Details'}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === index && (
                      <tr className="fcrs-expanded-row">
                        <td colSpan="7">
                          <div className="fcrs-details-container">
                            <div className="fcrs-details-column">
                              <h3>Raid Officer Details</h3>
                              <p><strong>Name:</strong> {report.ro_name}</p>
                              <p><strong>Email:</strong> {report.ro_email}</p>
                              <p><strong>Contact:</strong> {report.ro_mobile}</p>
                            </div>
                            
                            <div className="fcrs-details-column">
                              <h3>Violator Details</h3>
                              <p><strong>Name:</strong> {report.v_name}</p>
                              <p><strong>Email:</strong> {report.v_email}</p>
                              <p><strong>Contact:</strong> {report.v_mobile}</p>
                              <p><strong>ID:</strong> {report.v_nic}</p>
                            </div>
                            
                            <div className="fcrs-details-column fcrs-wide-column">
                              <h3>Violation Details</h3>
                              <p><strong>Type:</strong> {report.v_type}</p>
                              <p><strong>Location:</strong> {report.v_location}</p>
                              <p><strong>Description:</strong> {report.v_description}</p>
                              <p><strong>Decision:</strong> {report.decision || 'Pending'}</p>
                              
                              <div className="fcrs-evidence-section">
                                <h3>Evidence</h3>
                                {Array.isArray(report.evidence) && report.evidence.length > 0 ? (
                                  <div className="fcrs-evidence-gallery">
                                    {report.evidence.map((evidence, idx) => (
                                      <div key={idx} className="fcrs-evidence-item">
                                        <img 
                                          src={`/api/placeholder/120/80`} 
                                          alt={`Evidence ${idx + 1}`}
                                          className="fcrs-evidence-thumbnail"
                                        />
                                        <span className="fcrs-evidence-name">Evidence {idx + 1}</span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="fcrs-no-evidence">No evidence provided</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="fcrs-empty-state">
            <div className="fcrs-empty-icon">📋</div>
            <h2>No Reports Found</h2>
            <p>No violation reports match your search criteria. Try adjusting your search or check back later.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FCRS;