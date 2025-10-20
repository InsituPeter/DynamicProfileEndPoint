# Express Cat Fact API Server

A simple Node.js Express server that provides user information along with a random cat fact. This application demonstrates basic API development with error handling, rate limiting, and CORS support.

## Features

- **User Profile Endpoint**: Returns user information from environment variables
- **Cat Facts Integration**: Fetches random cat facts from an external API
- **Rate Limiting**: Protects the API with request rate limiting (1000 requests per minute)
- **CORS Support**: Enabled for cross-origin requests
- **Error Handling**: Custom error handling with HTTP status codes
- **Timeout Protection**: 5-second timeout for external API calls

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
USER_EMAIL=your_email@example.com
USER_NAME=Your Name
BACKEND_STACK=Node.js/Express
```

## Dependencies

- `express` - Web server framework
- `cors` - Cross-Origin Resource Sharing middleware
- `axios` - HTTP client for external API calls
- `express-rate-limit` - Rate limiting middleware
- `http-status-codes` - HTTP status code constants
- `dotenv` - Environment variable management

## API Endpoints

### GET /me

Returns user information along with a random cat fact.

**Request:**
```
GET /me
```

**Response (Success - 200):**
```json
{
  "status": "success",
  "user": {
    "email": "your_email@example.com",
    "name": "Your Name",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-19T12:34:56.789Z",
  "fact": "Cats have over 230 bones in their body..."
}
```

**Response (Error - 503):**
```json
{
  "message": "Failed to fetch cat fact"
}
```

## Usage

Start the server:
```bash
npm start
```

The server will run on the port specified in your `.env` file (default: 5000).

Test the endpoint:
```bash
curl http://localhost:5000/me
```

## Rate Limiting

The API implements rate limiting with the following constraints:
- **Window**: 1 minute
- **Max Requests**: 1000 per minute per IP address

When the limit is exceeded, you'll receive:
```json
{
  "message": "Too many requests from this IP, please try again later"
}
```

## Error Handling

The server includes comprehensive error handling:

- **Custom Errors**: Thrown with specific HTTP status codes
- **Service Unavailable (503)**: Returned when the cat fact API is unavailable
- **Not Found (404)**: Returned for undefined routes
- **Internal Server Error (500)**: Default error for unhandled exceptions

## File Structure

- `app.js` - Main application file with Express setup and endpoints
- `errors.js` - Custom error class for standardized error handling
- `.env` - Environment variables (not included in repo)

## License

MIT
