# JSON to XLSX Microservice

A simple microservice built with Node.js and Express.js that converts JSON data to XLSX spreadsheet files.

## Features

- Accepts an array of JSON objects via a POST request
- Converts the JSON data to an XLSX spreadsheet
- Returns the XLSX file for download
- Handles errors for invalid input

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install express xlsx
```

3. Start the server:

```bash
npm start
```

The server will run on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Documentation

### Generate XLSX File

Converts an array of JSON objects to an XLSX file.

- **URL**: `/generate-xlsx`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**: An array of JSON objects where each object represents a row in the spreadsheet. The keys of the first object will be used as column headers.

#### Example Request

```bash
curl -X POST http://localhost:3000/generate-xlsx \
  -H "Content-Type: application/json" \
  -d '[
    { "ID": 1, "Nome": "Produto A", "Preço": 19.99 },
    { "ID": 2, "Nome": "Produto B", "Preço": 25.50 },
    { "ID": 3, "Nome": "Produto C", "Preço": 12.00 }
  ]' \
  --output dados.xlsx
```

#### Successful Response

- **Status Code**: 200 OK
- **Content-Type**: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- **Content-Disposition**: `attachment; filename="dados.xlsx"`
- **Body**: Binary XLSX file

#### Error Responses

- **Status Code**: 400 Bad Request
  - **Content**: `{ "error": "Invalid request body. Expected a non-empty array of objects." }`
  - **Cause**: The request body is empty, not an array, or an empty array.

- **Status Code**: 500 Internal Server Error
  - **Content**: `{ "error": "Internal server error" }`
  - **Cause**: An unexpected error occurred during processing.

## Dependencies

- [Express.js](https://expressjs.com/) - Web framework for Node.js
- [SheetJS (xlsx)](https://github.com/SheetJS/sheetjs) - Library for parsing and writing Excel files

## Testing

A test script is included to verify the functionality of the microservice:

1. Start the server:
```bash
npm start
```

2. In a separate terminal, run the test script:
```bash
node test.js
```

3. If successful, you should see a message indicating that the XLSX file has been saved as `test-output.xlsx`.

The test script sends a sample JSON array to the microservice and saves the resulting XLSX file to disk.
