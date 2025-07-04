const http = require('http');
const fs = require('fs');

// Test data
const testData = [
  { "ID": 1, "Nome": "Produto A", "Preço": 19.99 },
  { "ID": 2, "Nome": "Produto B", "Preço": 25.50 },
  { "ID": 3, "Nome": "Produto C", "Preço": 12.00 }
];

// Options for the HTTP request
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/generate-xlsx',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(testData))
  }
};

console.log('Sending test request to generate XLSX file...');

// Make the request
const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  // Check if the response is successful
  if (res.statusCode === 200) {
    // Create a write stream to save the file
    const fileStream = fs.createWriteStream('test-output.xlsx');
    
    // Pipe the response to the file
    res.pipe(fileStream);
    
    // When the file is done being written
    fileStream.on('finish', () => {
      console.log('XLSX file has been saved as test-output.xlsx');
    });
  } else {
    // If there's an error, log the response body
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.error('Error response:', data);
    });
  }
});

// Handle request errors
req.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

// Write the data to the request body
req.write(JSON.stringify(testData));

// End the request
req.end();

console.log('Test script completed. Check for test-output.xlsx file.');