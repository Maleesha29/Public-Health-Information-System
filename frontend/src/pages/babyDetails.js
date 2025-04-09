
import React, { useEffect, useState } from 'react'
import '../styles/babydetails.css'
import Header from '../components/Header';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import Swal from 'sweetalert2'
import * as Yup from 'yup';

const BabyDetails = ({ submitted, data }) => {
    const [bname, setbname] = useState('');
    const [age, setbage] = useState('');
    const [weight, setbweight] = useState('');
    const [contactnumber, setbcontactnumber] = useState('');
    const [specialnotes, setbspecialnotes] = useState('');
    const [BirthDate, setbbirthdate] = useState('');
    const [GardianName, setGardian] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const validateSchema = Yup.object().shape({
        bname: Yup.string().required('Baby name is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
        age: Yup.number().required('Age is required'),
        weight: Yup.number().required('weight is required'),
        contactnumber: Yup.string().matches(/^0\d{9}$/, 'Invalid Contact Number').required('Contact Number is Required'),
        specialnotes: Yup.string().required('Special notes is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Special notes must contain only letters'),
        BirthDate:Yup.date().required('Birth date is required'),
        GardianName: Yup.string().required('Gardian name is Required').matches(/^[A-Za-z\s]+$/, 'Gardian Name must contain only letters')
    });




    const addbaby = async (e) => {
        e.preventDefault();

        try {
            await validateSchema.validate(
                {
                    bname,
                    age,
                    weight,
                    contactnumber,
                    specialnotes,
                    BirthDate,
                    GardianName,
                },
                { abortEarly: false }
            );

            // Clear error messages
            setErrorMessage({});

            const response = await Axios.post('http://localhost:4000/api/addBaby', {
                bname: bname,
                age: age,
                weight: weight,
                co_no: contactnumber,
                notes: specialnotes,
                BDate: BirthDate,
                Gname: GardianName,

            });

            console.log('Baby data adding is successful', response.data);
            Swal.fire({
                title: "Success!",
                text: "Baby data was added successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });

            setbname('');
            setbage('');
            setbweight('');
            setbcontactnumber('');
            setbspecialnotes('');
            setbbirthdate('');
            setGardian('');
            // navigate('/Babytable');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach(err => {
                    errors[err.path] = err.message;
                });
                setErrorMessage(errors);
            } else {
                console.error('Error', error);
            }
        }
    }


    return (
        <Layout>

            <div>
                <div className='bdtitle'>

                    <h3 className='he3'>Baby Details</h3>
                    <form className='addbaby'>
                        <div className='input'>
                            <label htmlFor='bname'>Baby Name</label>
                            <input onChange={e => setbname(e.target.value)} value={bname} type='text' id='bname' autoComplete='off' placeholder='Baby Name' />
                            {errorMessage.bname && <div className="text-danger">{errorMessage.bname}</div>}

                        </div>

                        <div className='input'>
                            <label htmlFor='age'>Age</label>
                            <input onChange={e => setbage(e.target.value)} value={age} type='text' id='age' autoComplete='off' placeholder='Age' />
                            {errorMessage.age && <div className="text-danger">{errorMessage.age}</div>}

                        </div>

                        <div className='input'>
                            <label htmlFor='weight'>Weight</label>
                            <input onChange={e => setbweight(e.target.value)} value={weight} type='text' id='weight' autoComplete='off' placeholder='Weight' />
                            {errorMessage.weight && <div className="text-danger">{errorMessage.weight}</div>}

                        </div>

                        <div className='input'>
                            <label htmlFor='contactnumber'>Contact Number</label>
                            <input maxLength={10} value={contactnumber} onChange={e => setbcontactnumber(e.target.value.slice(0, 10))} type='tel' id='contactnumber' autoComplete='off' placeholder='Contact Number' />
                            {errorMessage.contactnumber && <div className="text-danger">{errorMessage.contactnumber}</div>}

                        </div>

                        <div className='input'>
                            <label htmlFor='specialnotes'>Special Notes</label>
                            <input value={specialnotes} onChange={e => setbspecialnotes(e.target.value)} type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes' />
                            {errorMessage.specialnotes && <div className="text-danger">{errorMessage.specialnotes}</div>}

                        </div>

                        <div className='input'>
                            <label htmlFor='birthdate'>Birth Date</label>
                            <input value={BirthDate} onChange={e => setbbirthdate(e.target.value)} type='date' id='birthdate' autoComplete='off' placeholder='Birthdate' />
                            {errorMessage.BirthDate && <div className="text-danger">{errorMessage.BirthDate}</div>}
                        </div>

                        <div>
                            <label htmlFor='gardian name'>Gardian name</label>
                            <input value={GardianName} onChange={e => setGardian(e.target.value)} type='text' id='Gardian name' autoComplete='off' placeholder='gardian name' />
                            {errorMessage.GardianName && <div className="text-danger">{errorMessage.GardianName}</div>}
                        </div>

                        <button onClick={addbaby} className='bddsave' >Save</button>


                        <Link to="/Babytable">
                            <button className='bddsubmit' >View Babydata</button>
                        </Link>


                    </form>

                </div>
            </div>
        </Layout>

    )
}

export default BabyDetails

