const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee");

// Register endpoint

app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees =>res.json(employees))
    .catch(err => res.json(err))
})

// Delete endpoint

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    EmployeeModel.findByIdAndDelete(id)
      .then(result => {
        if (result) {
          res.json({ message: 'Employee deleted successfully' });
        } else {
          res.status(404).json({ message: 'Employee not found' });
        }
      })
      .catch(err => res.status(500).json({ message: err.message }));
  });

  // Get endpoint
app.get('/employee/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Received get request for ID: ${id}`);
  
    EmployeeModel.findById(id)
      .then(employee => {
        if (employee) {
          console.log(`Employee with ID ${id} found.`);
          res.json(employee);
        } else {
          console.log(`Employee with ID ${id} not found.`);
          res.status(404).json({ message: 'Employee not found' });
        }
      })
      .catch(err => {
        console.error(`Error retrieving employee with ID ${id}:`, err);
        res.status(500).json({ message: err.message });
      });
  });

  // Update endpoint
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    console.log(`Received update request for ID: ${id} with data:`, updatedData);
  
    EmployeeModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
      .then(employee => {
        if (employee) {
          console.log(`Employee with ID ${id} updated successfully.`);
          res.json(employee);
        } else {
          console.log(`Employee with ID ${id} not found.`);
          res.status(404).json({ message: 'Employee not found' });
        }
      })
      .catch(err => {
        console.error(`Error updating employee with ID ${id}:`, err);
        res.status(500).json({ message: err.message });
      });
  });
  

app.listen(3001,()=>{
    console.log("server is running")
})