const express = require('express');
const xlsx = require('xlsx');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to generate XLSX file from JSON
app.post('/generate-xlsx', (req, res) => {
  try {
    // Check if request body is empty or not an array
    if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid request body. Expected a non-empty array of objects.' 
      });
    }

    // Create a new workbook
    const workbook = xlsx.utils.book_new();
    
    // Convert JSON data to worksheet
    const worksheet = xlsx.utils.json_to_sheet(req.body);
    
    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');
    
    // Generate XLSX file buffer
    const xlsxBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    // Set response headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="dados.xlsx"');
    
    // Send the file
    res.send(xlsxBuffer);
  } catch (error) {
    console.error('Error generating XLSX:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});