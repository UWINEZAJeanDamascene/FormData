# Inventory Management Backend API

A RESTful API built with Node.js, Express, and MongoDB for managing inventory items.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or remote instance)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/inventory_db
```

4. Make sure MongoDB is running:
```bash
# For local MongoDB installation
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. Seed the database with sample data (optional but recommended):
```bash
npm run seed
```

6. Start the server:
```bash
# Production mode
npm start

# Development mode (auto-reload)
npm run dev
```

The API will be available at `http://localhost:3001`

## 📚 API Endpoints

### Inventory Items

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inventory` | Get all inventory items |
| GET | `/api/inventory/:id` | Get a specific item by ID |
| GET | `/api/inventory/category/:category` | Get items by category |
| POST | `/api/inventory` | Create a new item |
| PUT | `/api/inventory/:id` | Update an existing item |
| DELETE | `/api/inventory/:id` | Delete an item |

### Statistics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inventory/stats` | Get inventory statistics |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |
| GET | `/` | API information |

## 📋 Request/Response Examples

### Create Item (POST /api/inventory)

**Request Body:**
```json
{
  "productId": "PROD-001",
  "productName": "Wireless Mouse",
  "category": "Electronics",
  "quantity": 150,
  "unitPrice": 29.99,
  "supplierName": "TechSupply Co.",
  "customerName": "General Stock",
  "recordedBy": "John Doe",
  "status": "Active",
  "reorderLevel": 50,
  "location": "Warehouse A-12",
  "notes": "Popular item, fast moving"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "productId": "PROD-001",
    "productName": "Wireless Mouse",
    "category": "Electronics",
    "quantity": 150,
    "unitPrice": 29.99,
    "totalValue": 4498.50,
    "date": "2026-03-19",
    "supplierName": "TechSupply Co.",
    "customerName": "General Stock",
    "recordedBy": "John Doe",
    "status": "Active",
    "reorderLevel": 50,
    "location": "Warehouse A-12",
    "notes": "Popular item, fast moving",
    "lastModified": "2026-03-19T10:30:00.000Z"
  },
  "message": "Item created successfully"
}
```

### Get Statistics (GET /api/inventory/stats)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalItems": 25,
    "totalValue": 125750.50,
    "totalQuantity": 2150,
    "lowStockItems": 3
  },
  "message": "Statistics retrieved successfully"
}
```

## 🗄️ Database Schema

### Inventory Collection

```javascript
{
  productId: String (required, unique),
  productName: String (required),
  category: String (required),
  quantity: Number (required, min: 0),
  unitPrice: Number (required, min: 0),
  totalValue: Number (auto-calculated),
  date: String (required),
  supplierName: String (required),
  customerName: String,
  recordedBy: String (required),
  status: String (enum: ['Active', 'Discontinued', 'Out of Stock']),
  reorderLevel: Number (required, min: 0),
  location: String,
  notes: String,
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3001 |
| NODE_ENV | Environment (development/production) | development |
| CORS_ORIGIN | Allowed CORS origin | http://localhost:5173 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/inventory_db |

## 🔧 MongoDB Setup

### Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)

2. Start MongoDB:
```bash
mongod
```

3. The default connection string is:
```
mongodb://localhost:27017/inventory_db
```

### Docker MongoDB

Run MongoDB in a Docker container:
```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:latest
```

### MongoDB Atlas (Cloud)

1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/inventory_db
```

## 🧪 Testing the API

### Using cURL

```bash
# Get all items
curl http://localhost:3001/api/inventory

# Create an item
curl -X POST http://localhost:3001/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PROD-001",
    "productName": "Test Product",
    "category": "Electronics",
    "quantity": 100,
    "unitPrice": 25.99,
    "supplierName": "Test Supplier",
    "recordedBy": "Admin",
    "reorderLevel": 20
  }'

# Get statistics
curl http://localhost:3001/api/inventory/stats

# Health check
curl http://localhost:3001/health
```

### Using Postman or Thunder Client

Import the API endpoints and test them using your preferred API client.

## 📊 Features

- ✅ Full CRUD operations
- ✅ MongoDB integration with Mongoose
- ✅ Automatic totalValue calculation
- ✅ Input validation
- ✅ Error handling
- ✅ CORS support
- ✅ Request logging
- ✅ Category filtering
- ✅ Statistics endpoint
- ✅ Health check endpoint
- ✅ Graceful shutdown
- ✅ Database indexing for performance

## 🔒 Security Notes

For production deployment:

1. Add authentication/authorization (JWT, OAuth)
2. Implement rate limiting
3. Add input sanitization
4. Use environment variables for sensitive data
5. Enable HTTPS
6. Add request validation middleware
7. Implement API versioning
8. Add logging and monitoring
9. Set up database backups

## 📝 License

This project is open source and available for educational purposes.