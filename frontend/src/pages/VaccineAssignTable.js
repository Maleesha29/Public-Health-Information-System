import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/VaccineAssignTable.css';
import Axios from 'axios';
import Swal from 'sweetalert2';

const VaccineAssignTable = () => {
    const [vaccinestaff, setVaccinestaff] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getVaccineStaff();
    }, []);

    const getVaccineStaff = () => {
        Axios.get('http://localhost:4000/api/getstaffvaccine')
            .then(response => {
                console.log('data from server', response.data);
                setVaccinestaff(response.data.allstaffvaccine);
            })
            .catch(error => {
                console.error("Axios error", error);
            });
    };

    const handleDelete = async (id) => {
        // Show confirmation alert before deleting
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await Axios.post('http://localhost:4000/api/deletestaffvaccine', { _id: id });
                    console.log(response.data.message);
                    setVaccinestaff(prevStaff => prevStaff.filter(staff => staff._id !== id));
                    // Show success alert after deletion
                    Swal.fire(
                        'Deleted!',
                        'The staff member has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error deleting staff:', error);
                    // Show error alert if deletion fails
                    Swal.fire(
                        'Error!',
                        'Failed to delete the staff member.',
                        'error'
                    );
                }
            }
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredStaff = vaccinestaff.filter(staff =>
        staff.staffmember.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <div className="assigned-staff-table">
                <h3>Assigned Staff</h3>
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search Staff Member"
                    />
                </div>
                <table border={1} cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Program Type</th>
                            <th>Staff Member</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaff && filteredStaff.length > 0 ? (
                            filteredStaff.map(staff => (
                                <tr key={staff._id}>
                                    <td>{staff.type}</td>
                                    <td>{staff.staffmember}</td>
                                    <td>{staff.date}</td>
                                    <td>{staff.location}</td>
                                    <td>{staff.description}</td>
                                    <td><button className="edit-button">Edit</button></td>
                                    <td><button className="delete-button" onClick={() => handleDelete(staff._id)}>Delete</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No staff assigned</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default VaccineAssignTable;
