# Database Schema Design

## 1. Core Entities

### User & Auth
- `users`: id, name, email, password, role (ADMIN_PUSAT, ADMIN_REGIONAL, SUPPLIER, PENGELOLA), status.

### Audit Logs (New)
- `audit_logs`: id, user_id, action (CREATE, UPDATE, DELETE, LOGIN, etc.), entity_name (e.g., 'Stock', 'Payment'), entity_id, old_values (JSONB), new_values (JSONB), ip_address, user_agent, timestamp.

### Supplier Management
- `suppliers`: id, name, contact_person, phone, address, documents (PDF URLs), rating, status.
- `supplier_products`: id, supplier_id, product_name, unit (kg, pcs, liter), base_price.

### Inventory & Warehouse
- `warehouses`: id, name, location, capacity.
- `products`: id, name, category (Protein, Karbohidrat, Sayur, Lainnya), unit, min_stock_threshold.
- `stocks`: id, warehouse_id, product_id, quantity, last_updated.
- `stock_movements`: id, product_id, warehouse_id, type (IN, OUT, ADJUST), quantity, reason, user_id.

### Menu & Nutrition
- `menus`: id, name, description, target_calories, target_protein.
- `recipe_items`: id, menu_id, product_id, quantity.
- `daily_plans`: id, warehouse_id, menu_id, target_portions, date.

### Logistics & Distribution
- `distribution_points`: id, name, location, contact_info, coordinates (lat, lng).
- `shipments`: id, warehouse_id, distribution_point_id, total_portions, status (PENDING, SHIPPED, DELIVERED, CANCELLED), estimated_arrival, actual_arrival.
- `delivery_proofs`: id, shipment_id, image_url, signed_by.

### Financials
- `budgets`: id, region_id, total_amount, allocated_amount, remaining_amount.
- `expenditures`: id, budget_id, category, amount, description, date, invoice_url.
- `payments`: id, supplier_id, amount, status, transaction_date.
