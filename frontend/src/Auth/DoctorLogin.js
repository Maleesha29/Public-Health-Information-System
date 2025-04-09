import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import Layout from '../components/Layout';

const DoctorLogin = () => {

    const [error, setError] = useState('');
    const [name, setName] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const addUser = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios.post('http://localhost:4000/api/addLogin', {
                name: name,
                username: username,
                password: password
            })


            console.log('success', response.data);

            navigate('/login');
        } catch (error) {

            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }


    return (
        <div>
            <div>
                <div>
                    <h1>
                        <form>
                            <h1>
                                Register test
                            </h1>

                            <input
                                type='text'
                                placeholder='This name will be display in pages'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <input
                                type='text'
                                placeholder='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <input
                                type='password'
                                placeholder='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            {error && <p>{error}</p>}
                            <button type='submit' onClick={addUser}>
                                Submit
                            </button>
                        </form>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default DoctorLogin

/* */