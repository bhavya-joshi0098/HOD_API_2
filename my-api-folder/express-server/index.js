const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Load JSON file dynamically
const filePath = path.join(__dirname, 'Hod_Records.json');

const getData = () => {
    try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error("Error reading the JSON file:", error);
        return [];
    }
};

// **API Endpoints**

// Get all HOD records
app.get('/api/hods', (req, res) => {
    res.json(getData());
});

// Get a specific HOD by name
app.get('/api/hods/:hodName', (req, res) => {
    const hodName = req.params.hodName;
    const data = getData();
    const hod = data.find(h => h.name === hodName);
    if (!hod) {
        return res.status(404).json({ message: 'HOD not found' });
    }
    res.json(hod);
});

// Get employees under a specific HOD
app.get('/api/hods/:hodName/employees', (req, res) => {
    const hodName = req.params.hodName;
    const data = getData(); // Ensure this returns your HOD data array
    const hod = data.find(h => h.name === hodName);
    
    if (!hod || !hod.employees) { // ✅ Fixed property name
        return res.status(404).json({ message: 'Employees not found' });
    }
    
    res.json(hod.employees); // ✅ Directly access `employees`
});

// Get workers under a specific employee
app.get('/api/hods/:hodName/employees/:empName/workers', (req, res) => {
    const { hodName, empName } = req.params;
    const data = getData();
    const hod = data.find(h => h.name === hodName);
    if (!hod || !hod["employees"]) {
        return res.status(404).json({ message: 'HOD or Employees not found' });
    }

    const employee = hod["employees"].find(emp => emp.name === empName);
    if (!employee || !employee.workers) {
        return res.status(404).json({ message: 'Employee or Workers not found' });
    }

    res.json(employee.workers);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
