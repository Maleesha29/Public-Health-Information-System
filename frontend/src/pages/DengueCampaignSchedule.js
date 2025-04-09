import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/denguecampaignschedule.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const DengueCampaigns = () => {
    const [venue, setVenue] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [etime, setEtime] = useState('');
    const [drName, setDrName] = useState('');
    const [errorMessage, setErrorMessage] = useState({});

    const validateSchema = Yup.object().shape({
        venue: Yup.string().required('Venue is required').matches(/^[A-Za-z\s]+$/, 'Venue must contain only letters'),
        date: Yup.date()
            .required('Date is required')
            .test('date', 'Date must be the current date or a future date', value => {
                const selectedDate = new Date(value);
                const currentDate = new Date();
                return selectedDate >= currentDate;
            }),
        time: Yup.string().required('Starting Time is required'),
        etime: Yup.string().required('End Time is required'),
        drName: Yup.string().required('Conducted by is required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    });

    const addCamp = async (e) => {
        e.preventDefault();
        setErrorMessage({}); 

        try {
            await validateSchema.validate({
                venue,
                date,
                time,
                etime,
                drName,
            }, { abortEarly: false });

            
            const response = await Axios.post('http://localhost:4000/api/addCamp', {
                venue,
                date,
                time,
                etime,
                drName,
            });

            console.log('Successfully added campaign', response.data);
            
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
    };

    return (
        <Layout>
            <div className='title2'>
                <h3 className='h23'>Campaign Details</h3>
                <form className='campaigndetails' onSubmit={addCamp}>
                    <div className="input">
                        <label className='venue' htmlFor="venue">Venue</label>
                        <input
                            value={venue}
                            onChange={e => setVenue(e.target.value)}
                            type="text"
                            id="venue"
                            name="venue"
                            autoComplete='off'
                            placeholder='Venue'
                        />
                        {errorMessage.venue && <div className="text-danger">{errorMessage.venue}</div>}
                    </div>
                    <div className="input">
                        <label htmlFor="date">Date</label>
                        <input
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            type="date"
                            id="date"
                            name="date"
                            autoComplete='off'
                            placeholder='Date'
                        />
                        {errorMessage.date && <div className="text-danger">{errorMessage.date}</div>}
                    </div>
                    <div className="input">
                        <label className='stime' htmlFor="time">Starting Time</label>
                        <input
                            value={time}
                            onChange={e => setTime(e.target.value)}
                            type="time"
                            id="time"
                            name="time"
                            autoComplete='off'
                            placeholder='Starting Time'
                        />
                        {errorMessage.time && <div className="text-danger">{errorMessage.time}</div>}
                    </div>
                    <div className="input">
                        <label className='etime' htmlFor="etime">End Time</label>
                        <input
                            value={etime}
                            onChange={e => setEtime(e.target.value)}
                            type="time"
                            id="etime"
                            name="etime"
                            autoComplete='off'
                            placeholder='End Time'
                        />
                        {errorMessage.etime && <div className="text-danger">{errorMessage.etime}</div>}
                    </div>
                    <div className="input">
                        <label className='drname' htmlFor="drName">Conducted by</label>
                        <input
                            value={drName}
                            onChange={e => setDrName(e.target.value)}
                            type="text"
                            id="drName"
                            name="drName"
                            autoComplete='off'
                            placeholder='Conducted by'
                        />
                        {errorMessage.drName && <div className="text-danger">{errorMessage.drName}</div>}
                    </div>
                    <div className="input">
                        <button type='submit'>Save</button>
                        <Link to="/DengCampTab">
                            <button type='button'>View Campaign Details</button>
                        </Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default DengueCampaigns;
