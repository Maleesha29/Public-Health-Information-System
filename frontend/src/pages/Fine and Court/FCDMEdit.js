import { useEffect, useState } from 'react';
import '../../styles/FCDocManage.css';
import Layout from '../../components/Layout';
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const FCDMEdit = () => {
  const { _id, r_id, ro_name, date, v_name, v_type } = useParams();
  const [reportid_u, setID] = useState(r_id);
  const [raidOfficer_u, setRaidOfficer] = useState(ro_name);
  const [date_u, setDate] = useState(date);
  const [violatorName_u, setViolatorName] = useState(v_name);
  const [foodViolation_u, setFoodViolation] = useState(v_type === 'foodViolation');
  const [dengueViolation_u, setDengueViolation] = useState(v_type === 'dengueViolation');
  const [errorMessage, setErrorMessage] = useState({});
  const [violationType, setViolationType] = useState(v_type); // Initialize violationType with v_type

  const navigate = useNavigate();

  // Schema for form validation 
  const validateSchema = Yup.object().shape({
    reportid_u: Yup.string().required('Report ID is required').matches(/^[A-Za-z0-9]+$/, 'Report ID must contain only letters and numbers'),
    raidOfficer_u: Yup.string().required('Raid Officer is Required').matches(/^[A-Za-z\s]+$/, 'Raid Officer name must contain only letters'),
    date_u: Yup.date().required('Date is required'),
    violatorName_u: Yup.string().required('Violator Name is Required').matches(/^[A-Za-z\s]+$/, 'Violator name must contain only letters'),
    violationType: Yup.string().required('Violation Type is Required').oneOf(['foodViolation', 'dengueViolation'], 'Please select a violation type'),
  });

  useEffect(() => {
    const validateForm = async () => {
      try {
        await validateSchema.validate({
          reportid_u,
          raidOfficer_u,
          date_u,
          violatorName_u,
          violationType,
        }, { abortEarly: false });

        // Clear error messages if validation passes
        setErrorMessage({});
      } catch (error) {
        // Set error messages if validation fails
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      }
    };

    // Validate form fields on component mount
    validateForm();
  }, [reportid_u, raidOfficer_u, date_u, violatorName_u, violationType,]);

  useEffect(() => {
    if (v_type === 'Food Violation') {
      setFoodViolation(true);
      setDengueViolation(false);
      setViolationType('foodViolation');
    } else if (v_type === 'Dengue Violation') {
      setDengueViolation(true);
      setFoodViolation(false);
      setViolationType('dengueViolation');
    }
  }, [v_type]);

  // Function to update document data
  const updateDoc = async (_id, r_id, ro_name, date, v_name, v_type) => {
    try {
      const response = await Axios.post('http://localhost:4000/api/updateDocM', {
        _id: _id,
        r_id,
        ro_name,
        date,
        v_name,
        v_type,
      });
      console.log("Form Update successfully", response.data);
      return response;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  // Function to handle form submission
  const updateD = async () => {
    try {
      // Validate form fields before submission
      await validateSchema.validate({
        reportid_u,
        raidOfficer_u,
        date_u,
        violatorName_u,
        violationType,
      }, { abortEarly: false });

      // Determine violation type based on state variables
      const violationTypeValue = foodViolation_u ? 'Food Violation' : dengueViolation_u ? 'Dengue Violation' : '';

      await updateDoc(_id, reportid_u, raidOfficer_u, date_u, violatorName_u, violationTypeValue);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Document Data Update Successfully.',
      }).then(() => {
        navigate('/F&CDocumentManagementTabe');
      });
    } catch (error) {
      const errors = {};
      error.inner.forEach(err => {
        errors[err.path] = err.message;
      });
      setErrorMessage(errors);
      console.log("Error", error);
    }
  }

  return (
    <Layout>
      <div className="formContainer">
        <form className="DMForm">
          <h2>Update Document Management</h2>
          <div>
            <label>Case Number</label>
            <input type="text" name="id" value={reportid_u} onChange={(e) => setID(e.target.value)} />
            {errorMessage.reportid_u && <div className='errorMessage'>{errorMessage.reportid_u}</div>}
          </div>
          <div>
            <label>Raid Officer</label>
            <input type='text' name='raid officer' value={raidOfficer_u} onChange={(e) => setRaidOfficer(e.target.value)} />
            {errorMessage.raidOfficer_u && <div className='errorMessage'>{errorMessage.raidOfficer_u}</div>}
          </div>
          <div>
            <label>Date</label>
            <input type='date' name='date' value={date_u} onChange={(e) => setDate(e.target.value)} />
            {errorMessage.date_u && <div className='errorMessage'>{errorMessage.date_u}</div>}
          </div>
          <div>
            <label>Violator Name</label>
            <input type='text' name='violator name' value={violatorName_u} onChange={(e) => setViolatorName(e.target.value)} />
            {errorMessage.violatorName_u && <div className='errorMessage'>{errorMessage.violatorName_u}</div>}
          </div>
          <div>
            <label>Violation Type:</label>
            <input type="radio" id="foodViolation" name="type" value='foodViolation' checked={violationType === 'foodViolation'} onChange={() => { setFoodViolation(true); setDengueViolation(false); setViolationType('foodViolation'); }} />
            Food Violation
            <span style={{ marginRight: '40px' }}></span>
            <input type="radio" id="dengueViolation" name="type" value='dengueViolation' checked={violationType === 'dengueViolation'} onChange={() => { setDengueViolation(true); setFoodViolation(false); setViolationType('dengueViolation'); }} />
            Dengue Violation
          </div>
          <button className='DMbut' type='button' onClick={updateD}>Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default FCDMEdit;
