import { useEffect, useState } from "react";
import Layout from '../../components/Layout';
import Axios from "axios";
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo1 from '../../webImages/logo1.png';
import { Link } from "react-router-dom";
import { 
  Search, Download, ChevronDown, ChevronUp, Filter, Trash2, Edit, Eye, X
} from "lucide-react";
import '../../styles/Fine And Court/Violation-Reports.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';



const FCRVTable = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [reportsData, setReportsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);
  const [viewImageModal, setViewImageModal] = useState({ open: false, image: null });
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({
    violationType: 'all',
    dateRange: { start: '', end: '' }
  });

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = () => {
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
        Swal.fire({
          title: "Error",
          text: "Failed to fetch report data. Please try again later.",
          icon: "error"
        });
      });
  };

  const handleDeleteReport = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post('http://localhost:4000/api/deleteVioR', { _id: id })
          .then(() => {
            setReportsData(prevData => prevData.filter(report => report._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "The report has been deleted successfully.",
              icon: "success"
            });
          })
          .catch(error => {
            console.error('Error Deleting Document', error);
            Swal.fire({
              title: "Error",
              text: "Failed to delete the report. Please try again.",
              icon: "error"
            });
          });
      }
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleRowExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const openImageView = (imageData, contentType) => {
    setViewImageModal({ 
      open: true, 
      image: `data:${contentType};base64,${imageData}` 
    });
  };

  const closeImageView = () => {
    setViewImageModal({ open: false, image: null });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getViolationTypes = () => {
    const types = [...new Set(reportsData.map(item => item.v_type))];
    return ['all', ...types];
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredData = () => {
    return reportsData
      .filter(report => {
        // Search filter
        const searchQueryLower = searchQuery.toLowerCase();
        const searchFields = [
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
          report.v_description
        ];
        
        const matchesSearch = searchFields.some(field => {
          if (field === null || field === undefined) return false;
          return String(field).toLowerCase().includes(searchQueryLower);
        });

        // Violation type filter
        const matchesType = filters.violationType === 'all' || 
          report.v_type === filters.violationType;

        // Date range filter
        let matchesDateRange = true;
        if (filters.dateRange.start && filters.dateRange.end) {
          const reportDate = new Date(report.date);
          const startDate = new Date(filters.dateRange.start);
          const endDate = new Date(filters.dateRange.end);
          endDate.setHours(23, 59, 59); // Include the entire end day
          
          matchesDateRange = reportDate >= startDate && reportDate <= endDate;
        }

        return matchesSearch && matchesType && matchesDateRange;
      })
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF('landscape');
  
    // Add logo
    const logo = new Image();
    logo.src = logo1;
    doc.addImage(logo, 'PNG', 20, 10, 20, 20);
  
    // Add header text
    doc.setFontSize(12);
    doc.text('Public Health Information System', 45, 15);
    doc.text('Suwasiripaya, No. 385, Rev. Baddegama Wimalawansa Thero Mawatha,', 45, 20);
    doc.text('Colombo 10, Sri Lanka.', 45, 25);
    doc.text('Tel: 112 694033, 112 675011, 112 675449, 112 693493', 45, 30);
    
    // Add report title
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Violation Reports', 130, 40, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const today = new Date().toLocaleDateString();
    doc.text(`Generated on: ${today}`, 260, 40, { align: 'right' });
  
    // Generate the table
    doc.autoTable({
      head: [
        ['Officer Name', 'Date', 'Location', 'Violation Type', 'Violator Name', 'Violator ID', 'Description']
      ],
      body: filteredData().map(report => [
        report.ro_name,
        formatDate(report.date),
        report.v_location,
        report.v_type,
        report.v_name,
        report.v_nic,
        report.v_description
      ]),
      startY: 50,
      styles: {
        cellWidth: 'auto',
        fontSize: 8,
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 250, 254],
      }
    });
  
    doc.save('Violation_Report.pdf');
  };

  const SortIndicator = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp size={14} className="fcrv-sort-icon" /> : 
      <ChevronDown size={14} className="fcrv-sort-icon" />;
  };

  return (
    <Layout>
      <div className="fcrv-container">
        <div className="fcrv-header">
          <h1 className="fcrv-title">Violation Report Management</h1>
          
          <div className="fcrv-toolbar">
            <div className="fcrv-search-container">
              <input
                type="text"
                className="fcrv-search-input"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search reports..."
              />
            </div>
            
            <div className="fcrv-filter-container">
              <div className="fcrv-filter-dropdown">
                <label htmlFor="violationType">Type:</label>
                <select 
                  id="violationType" 
                  value={filters.violationType}
                  onChange={(e) => handleFilterChange('violationType', e.target.value)}
                  className="fcrv-filter-select"
                >
                  {getViolationTypes().map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="fcrv-date-filter">
                <label>From:</label>
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleFilterChange('dateRange', {...filters.dateRange, start: e.target.value})}
                  className="fcrv-date-input"
                />
                <label>To:</label>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleFilterChange('dateRange', {...filters.dateRange, end: e.target.value})}
                  className="fcrv-date-input"
                />
              </div>
              
              <button 
                className="fcrv-pdf-button"
                onClick={generatePDF}
                title="Download PDF Report"
              >
                <Download size={16} />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="fcrv-loading">
            <div className="fcrv-spinner"></div>
            <p>Loading reports...</p>
          </div>
        ) : filteredData().length > 0 ? (
          <div className="fcrv-table-container">
            <table className="fcrv-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('ro_name')} className="fcrv-sortable">
                    <div className="fcrv-th-content">
                      Officer Name <SortIndicator column="ro_name" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('date')} className="fcrv-sortable">
                    <div className="fcrv-th-content">
                      Date <SortIndicator column="date" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('v_location')} className="fcrv-sortable">
                    <div className="fcrv-th-content">
                      Location <SortIndicator column="v_location" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('v_type')} className="fcrv-sortable">
                    <div className="fcrv-th-content">
                      Type <SortIndicator column="v_type" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('v_name')} className="fcrv-sortable">
                    <div className="fcrv-th-content">
                      Violator <SortIndicator column="v_name" />
                    </div>
                  </th>
                  <th>Evidence</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData().map((report, index) => (
                  <>
                    <tr key={report._id} className="fcrv-table-row">
                      <td>{report.ro_name}</td>
                      <td>{formatDate(report.date)}</td>
                      <td>{report.v_location}</td>
                      <td>
                        <span className="fcrv-violation-type">{report.v_type}</span>
                      </td>
                      <td>{report.v_name}</td>
                      <td>
                        {Array.isArray(report.evidence) && report.evidence.length > 0 ? (
                          <div className="fcrv-evidence-thumbnails">
                            {report.evidence.slice(0, 2).map((evidence, idx) => (
                              <div 
                                key={idx} 
                                className="fcrv-evidence-thumbnail"
                                onClick={() => openImageView(evidence.data, evidence.contentType)}
                              >
                                <img 
                                  src={`data:${evidence.contentType};base64,${evidence.data}`} 
                                  alt={`Evidence ${idx + 1}`}
                                  width={40} 
                                  height={40} 
                                />
                              </div>
                            ))}
                            {report.evidence.length > 2 && (
                              <div className="fcrv-evidence-more">
                                +{report.evidence.length - 2}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="fcrv-no-evidence">None</span>
                        )}
                      </td>
                      <td>
                        <div className="fcrv-actions">
                          <button 
                            className="fcrv-action-btn fcrv-view-btn"
                            onClick={() => toggleRowExpand(index)}
                            title={expandedRow === index ? "Hide Details" : "View Details"}
                          >
                            <FaEye size={16} />
                          </button>
                          <Link 
                            to={`/FCRVEdit/${report._id}/${report.ro_name}/${report.ro_email}/${report.ro_mobile}/${report.date}/${report.v_location}/${report.v_type}/${report.v_description}/${report.v_name}/${report.v_nic}/${report.v_mobile}/${report.v_email}`}
                            className="fcrv-action-btn fcrv-edit-btn"
                            title="Edit Report"
                          >
                            <Edit size={16} />
                          </Link>
                          <button 
                            className="fcrv-action-btn fcrv-delete-btn"
                            onClick={() => handleDeleteReport(report._id)}
                            title="Delete Report"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRow === index && (
                      <tr className="fcrv-expanded-row">
                        <td colSpan="7">
                          <div className="fcrv-details-container">
                            <div className="fcrv-details-section">
                              <h3 className="fcrv-details-heading">Raid Officer</h3>
                              <div className="fcrv-details-grid">
                                <div className="fcrv-detail-item">
                                  <span className="fcrv-detail-label">Name:</span>
                                  <span className="fcrv-detail-value">{report.ro_name}</span>
                                </div>
                                <div className="fcrv-detail-item">
                                  <span className="fcrv-detail-label">Email:</span>
                                  <span className="fcrv-detail-value">{report.ro_email}</span>
                                </div>
                                <div className="fcrv-detail-item">
                                  <span className="fcrv-detail-label">Contact:</span>
                                  <span className="fcrv-detail-value">{report.ro_mobile}</span>
                                </div>
                              </div>
                            </div>

                            <div className="fcrv-details-section">
                              <h3 className="fcrv-details-heading">Violator</h3>
                              <div className="fcrv-details-grid">
                                <div className="fcrv-detail-item">
                                  <span className="fcrv-detail-label">Name:</span>
                                  <span className="fcrv-detail-value">{report.v_name}</span>
                                </div>
                                <div className="fcrv-detail-item">
                                  <span className="fcrv-detail-label">Email:</span>
                                  <span className="fcrv-detail-value">{report.v_email}</span>
                                </div>
                                <div className="fcrv-detail-item">
                                  <span className="fcrv-detail-label">Contact:</span>
                                  <span className="fcrv-detail-value">{report.v_mobile}</span>
                                </div>
                                <div className="fcrv-detail-item">
                                  <span className="fcrv-detail-label">ID:</span>
                                  <span className="fcrv-detail-value">{report.v_nic}</span>
                                </div>
                              </div>
                            </div>

                            <div className="fcrv-details-section fcrv-full-width">
                              <h3 className="fcrv-details-heading">Violation Details</h3>
                              <div className="fcrv-details-grid">
                                <div className="fcrv-detail-item">
                                  <span className="fcrv-detail-label">Type:</span>
                                  <span className="fcrv-detail-value">{report.v_type}</span>
                                </div>
                                <div className="fcrv-detail-item">
                                  <span className="fcrv-detail-label">Location:</span>
                                  <span className="fcrv-detail-value">{report.v_location}</span>
                                </div>
                                <div className="fcrv-detail-item fcrv-full-width">
                                  <span className="fcrv-detail-label">Description:</span>
                                  <span className="fcrv-detail-value">{report.v_description}</span>
                                </div>
                              </div>
                            </div>

                            <div className="fcrv-details-section fcrv-full-width">
                              <h3 className="fcrv-details-heading">Evidence</h3>
                              {Array.isArray(report.evidence) && report.evidence.length > 0 ? (
                                <div className="fcrv-evidence-gallery">
                                  {report.evidence.map((evidence, idx) => (
                                    <div 
                                      key={idx} 
                                      className="fcrv-evidence-item"
                                      onClick={() => openImageView(evidence.data, evidence.contentType)}
                                    >
                                      <img 
                                        src={`data:${evidence.contentType};base64,${evidence.data}`} 
                                        alt={`Evidence ${idx + 1}`}
                                        className="fcrv-evidence-img"
                                      />
                                      <span className="fcrv-evidence-caption">Evidence {idx + 1}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="fcrv-no-data">No evidence provided</p>
                              )}
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
          <div className="fcrv-empty-state">
            <div className="fcrv-empty-icon">📋</div>
            <h2>No Reports Found</h2>
            <p>No violation reports match your search criteria. Try adjusting your search or check back later.</p>
          </div>
        )}
      </div>

      {viewImageModal.open && (
        <div className="fcrv-modal-overlay" onClick={closeImageView}>
          <div className="fcrv-modal-content" onClick={e => e.stopPropagation()}>
            <button className="fcrv-modal-close" onClick={closeImageView}>
              <X size={24} />
            </button>
            <img 
              src={viewImageModal.image} 
              alt="Evidence" 
              className="fcrv-modal-image"
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FCRVTable;