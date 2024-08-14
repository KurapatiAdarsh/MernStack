import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', {
        name,
        email,
        password
      });
      console.log('Registration Successful:', response.data);
    } catch (error) {
      if (error.response) {
        console.log('Error Response:', error.response.data);
      } else if (error.request) {
        console.log('Error Request:', error.request);
      } else {
        console.log('Error Message:', error.message);
      }
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="name"><strong>Name</strong></label>
            <input
              type="text"
              placeholder='Enter Name'
              autoComplete='off'
              name='name'
              className='form-control rounded-0'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder='Enter Email'
              autoComplete='off'
              name='email'
              className='form-control rounded-0'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              placeholder='Enter Password'
              autoComplete='off'
              name='password'
              className='form-control rounded-0'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Register</button>
        </form>
        <p>Already have an account?</p>
        <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
      </div>
    </div>
  );
}
