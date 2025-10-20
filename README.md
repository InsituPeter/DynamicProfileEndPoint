# Dynamic Profile Endpoint

A lightweight Node.js Express server that provides user information along with a random cat fact. This application demonstrates clean API development with proper error handling, rate limiting, CORS support, and environment-based configuration.

## Features

- **User Profile Endpoint** (`/me`): Returns user information stored in environment variables
- **Cat Facts Integration**: Fetches random cat facts from the Cat Fact API with timeout protection
- **Rate Limiting**: Protects the API with 1000 requests per minute per IP address
- **CORS Support**: Enabled for cross-origin requests
- **Custom Error Handling**: Standardized error responses with HTTP status codes
- **Environment Configuration**: Secure configuration management with dotenv
- **AWS Elastic Beanstalk Ready**: Includes EB configuration files

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
PORT=8080
USER_EMAIL=your_email@example.com
USER_NAME=Your Name
BACKEND_STACK=Node.js/Express
```

## Dependencies

- `express` (^5.1.0) - Web application framework
- `cors` (^2.8.5) - Cross-Origin Resource Sharing middleware
- `axios` (^1.12.2) - HTTP client for external API calls
- `express-rate-limit` (^8.1.0) - Rate limiting middleware
- `http-status-codes` (^2.3.0) - HTTP status code constants
- `dotenv` (^17.2.3) - Environment variable management
- `mongoose` (^8.19.1) - MongoDB object modeling (included in dependencies)
- `nodemon` (^3.1.10) - Development dependency for auto-reload

## API Endpoints

### GET /me

Returns user profile information along with a random cat fact.

**Request:**
```
GET http://localhost:8080/me
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
  "timestamp": "2025-10-20T12:34:56.789Z",
  "fact": "Cats have over 230 bones in their body..."
}
```

**Response (Service Unavailable - 503):**
```json
{
  "message": "Failed to fetch cat fact"
}
```

**Response (Not Found - 404):**
```json
{
  "message": "Route not found"
}
```

## Getting Started

### Development Mode

Start the development server with auto-reload:
```bash
npm run dev
```

### Production Mode

Start the server:
```bash
npm start
```

The server will run on the port specified in your `.env` file (default: 8080).

### Testing the Endpoint

```bash
curl http://localhost:8080/me
```

## Rate Limiting

The API implements rate limiting with the following constraints:

- **Time Window**: 1 minute
- **Max Requests**: 1000 per IP address per minute
- **Standard Headers**: Rate limit information included in response headers

When the limit is exceeded, the server responds with:
```json
{
  "message": "Too many requests from this IP, please try again later"
}
```

## Error Handling

The server includes comprehensive error handling:

- **Custom Error Class**: Standardized error responses with custom status codes
- **Service Unavailable (503)**: Returned when the external Cat Fact API is unavailable
- **Not Found (404)**: Returned for undefined or unregistered routes
- **Internal Server Error (500)**: Default error handler for unhandled exceptions
- **Timeout Protection**: 5-second timeout for external API calls

## Project Structure

```
.
├── app.js              # Main application file with Express server setup
├── errors.js           # Custom error class for standardized error handling
├── package.json        # Project metadata and dependencies
├── .env                # Environment variables (not committed to repo)
└── .elasticbeanstalk/  # AWS Elastic Beanstalk configuration
```

## Configuration

The `.gitignore` file excludes the following from version control:

- `/node_modules` - Dependencies installed locally
- `.env` - Environment variables and secrets
- `.elasticbeanstalk/` - AWS Elastic Beanstalk configuration files

## Deployment

This application is configured for AWS Elastic Beanstalk deployment. The `.elasticbeanstalk` directory contains configuration templates for EB environments.

## Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with nodemon
- `npm test` - Run tests (currently not configured)

## Troubleshooting

**Port Already in Use**
If port 8080 is already in use, specify a different port:
```bash
PORT=3000 npm start
```

**Missing Environment Variables**
Ensure all required environment variables are set in your `.env` file. The server will use undefined values if variables are missing.

**Cannot Fetch Cat Fact**
Verify your internet connection and that the Cat Fact API (`https://catfact.ninja/fact`) is accessible. The API has a 5-second timeout.

## Notes

- The application uses the free Cat Fact Ninja API for demonstration purposes
- Environment variables are essential for proper operation
- Rate limiting is applied globally to all endpoints
- CORS is enabled for all origins by default

## License

ISC
