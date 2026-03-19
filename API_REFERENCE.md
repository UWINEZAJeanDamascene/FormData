# API Reference

Quick reference for all available API endpoints.

## Base URL

```
http://localhost:3001
```

## Authentication

Currently no authentication is required. For production, implement JWT or OAuth.

---

## Inventory Endpoints

### Get All Items

```http
GET /api/inventory
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "productId": "PROD-001",
      "productName": "Wireless Mouse",
      "category": "Electronics",
      "quantity": 150,
      "unitPrice": 29.99,
      "totalValue": 4498.50,
      "date": "2026-03-15",
      "supplierName": "TechSupply Co.",
      "customerName": "General Stock",
      "recordedBy": "John Doe",
      "status": "Active",
      "reorderLevel": 50,
      "location": "Warehouse A-12",
      "notes": "Popular item, fast moving",
      "lastModified": "2026-03-19T10:30:00.000Z"
    }
  ],
  "message": "Items retrieved successfully"
}
```

### Get Single Item

```http
GET /api/inventory/:id
```

**Parameters:**
- `id` (path) - MongoDB ObjectId of the item

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "productId": "PROD-001",
    ...
  },
  "message": "Item retrieved successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Item not found"
}
```

### Get Items by Category

```http
GET /api/inventory/category/:category
```

**Parameters:**
- `category` (path) - Category name (case-insensitive)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "message": "Items retrieved successfully"
}
```

### Create New Item

```http
POST /api/inventory
```

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

**Required Fields:**
- `productId` - Unique product identifier
- `productName` - Name of the product
- `category` - Product category
- `quantity` - Stock quantity (number ≥ 0)
- `unitPrice` - Price per unit (number ≥ 0)
- `supplierName` - Supplier name
- `recordedBy` - Person recording the entry
- `reorderLevel` - Minimum stock level (number ≥ 0)

**Optional Fields:**
- `customerName` - Customer or destination
- `status` - "Active", "Discontinued", or "Out of Stock" (default: "Active")
- `location` - Storage location
- `notes` - Additional notes
- `date` - Date (auto-generated if not provided)

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "productId": "PROD-001",
    "totalValue": 4498.50,  // Auto-calculated
    ...
  },
  "message": "Item created successfully"
}
```

**Error Response (400 - Duplicate):**
```json
{
  "success": false,
  "message": "Product ID already exists"
}
```

**Error Response (400 - Missing Fields):**
```json
{
  "success": false,
  "message": "Missing required fields"
}
```

### Update Item

```http
PUT /api/inventory/:id
```

**Parameters:**
- `id` (path) - MongoDB ObjectId of the item

**Request Body:**
```json
{
  "productName": "Updated Product Name",
  "quantity": 200,
  "unitPrice": 35.99,
  ...
}
```

> **Note:** You can include only the fields you want to update. `totalValue` is auto-calculated.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    ...
  },
  "message": "Item updated successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Item not found"
}
```

### Delete Item

```http
DELETE /api/inventory/:id
```

**Parameters:**
- `id` (path) - MongoDB ObjectId of the item

**Response (200):**
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Item not found"
}
```

---

## Statistics Endpoint

### Get Inventory Statistics

```http
GET /api/inventory/stats
```

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

**Fields:**
- `totalItems` - Total number of unique products
- `totalValue` - Sum of all totalValue fields
- `totalQuantity` - Sum of all quantities
- `lowStockItems` - Count of items where quantity ≤ reorderLevel

---

## System Endpoints

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-03-19T10:30:00.000Z",
  "database": "connected"
}
```

### API Information

```http
GET /
```

**Response:**
```json
{
  "success": true,
  "message": "Inventory Management API",
  "version": "1.0.0",
  "database": "MongoDB",
  "endpoints": {
    "inventory": "/api/inventory",
    "health": "/health"
  }
}
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (only in development mode)"
}
```

---

## Examples

### cURL Examples

```bash
# Get all items
curl http://localhost:3001/api/inventory

# Get single item
curl http://localhost:3001/api/inventory/65f1a2b3c4d5e6f7g8h9i0j1

# Get items by category
curl http://localhost:3001/api/inventory/category/Electronics

# Create item
curl -X POST http://localhost:3001/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PROD-999",
    "productName": "New Product",
    "category": "Electronics",
    "quantity": 100,
    "unitPrice": 50.00,
    "supplierName": "Supplier Inc",
    "recordedBy": "Admin",
    "reorderLevel": 25
  }'

# Update item
curl -X PUT http://localhost:3001/api/inventory/65f1a2b3c4d5e6f7g8h9i0j1 \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 150
  }'

# Delete item
curl -X DELETE http://localhost:3001/api/inventory/65f1a2b3c4d5e6f7g8h9i0j1

# Get statistics
curl http://localhost:3001/api/inventory/stats

# Health check
curl http://localhost:3001/health
```

### JavaScript/Fetch Examples

```javascript
// Get all items
const response = await fetch('http://localhost:3001/api/inventory');
const data = await response.json();

// Create item
const response = await fetch('http://localhost:3001/api/inventory', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    productId: 'PROD-999',
    productName: 'New Product',
    category: 'Electronics',
    quantity: 100,
    unitPrice: 50.00,
    supplierName: 'Supplier Inc',
    recordedBy: 'Admin',
    reorderLevel: 25
  })
});
const data = await response.json();

// Update item
const response = await fetch('http://localhost:3001/api/inventory/65f1a2b3c4d5e6f7g8h9i0j1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    quantity: 150
  })
});
const data = await response.json();

// Delete item
const response = await fetch('http://localhost:3001/api/inventory/65f1a2b3c4d5e6f7g8h9i0j1', {
  method: 'DELETE'
});
const data = await response.json();
```

---

## Notes

- All timestamps are in ISO 8601 format
- The `totalValue` field is automatically calculated as `quantity × unitPrice`
- The `id` field is MongoDB's ObjectId converted to string
- The `lastModified` field is automatically updated on every change
- Category filtering is case-insensitive
