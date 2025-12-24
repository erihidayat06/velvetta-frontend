# Frontend API Integration Summary

This document summarizes the API integrations implemented in the frontend.

## API Service Layer

All API calls are centralized in `src/services/`:

- **`api.js`** - Axios instance with JWT interceptor
- **`authService.js`** - Authentication endpoints
- **`productService.js`** - Product endpoints
- **`talentService.js`** - Talent endpoints
- **`blogService.js`** - Blog endpoints
- **`homeConfigService.js`** - Home configuration endpoints

## Utility Functions

- **`src/utils/imageUrl.js`** - Helper to convert backend image paths to full URLs

## Integrated Components

### 1. Login & Register (`src/components/LoginModal.vue`)
- ✅ **POST** `/api/users/login` - User login
- ✅ **POST** `/api/users/register` - User registration
- ✅ Stores JWT token in localStorage
- ✅ Error handling with user-friendly messages

### 2. Navbar (`src/components/Navbar.vue`)
- ✅ Checks localStorage for authentication state
- ✅ Logout functionality (clears token)
- ✅ Reactive authentication state

### 3. Product List (`src/views/Product.vue`)
- ✅ **GET** `/api/products` - Fetch all products
- ✅ Displays products with images
- ✅ Loading states
- ✅ Image URL handling

### 4. Talent List (`src/views/TalentList.vue`)
- ✅ **GET** `/api/talents` - Fetch all talents
- ✅ Maps talent data (level → category)
- ✅ Displays first image for each talent
- ✅ Loading states

### 5. Talent Detail (`src/views/TalentDetail.vue`)
- ✅ **GET** `/api/talents/:id` - Fetch talent by ID
- ✅ Displays all talent images in carousel
- ✅ Shows HTML description (sanitized by backend)
- ✅ Displays languages and specialties
- ✅ Fetches other talents for "Other Featured Talents" section

### 6. Home Page (`src/views/Home.vue`)
- ✅ **GET** `/api/home-config` - Fetch home configuration
  - Featured talents (exactly 4)
  - Carousel images (desktop + mobile)
- ✅ **GET** `/api/blogs?limit=4` - Fetch latest 4 blogs
- ✅ Responsive carousel (uses mobile images on mobile, desktop on desktop)
- ✅ Dynamic carousel updates on screen resize

### 7. Blog Detail (`src/views/NewsDetail.vue`)
- ✅ **GET** `/api/blogs/:id` - Fetch blog by ID
- ✅ Displays HTML content (sanitized by backend)
- ✅ Shows thumbnail image
- ✅ Loading states

### 8. Featured Talents Component (`src/components/FeaturedTalents.vue`)
- ✅ Uses `getImageUrl` utility for image URLs
- ✅ Displays talents passed as props

## API Base URL Configuration

Set in `.env` file:
```
VITE_API_URL=http://localhost:3000/api
```

Default: `http://localhost:3000/api`

## Image URL Handling

Backend returns relative paths like `/uploads/products/image.webp`

The `getImageUrl()` utility converts these to full URLs:
- If path starts with `http://` or `https://` → returns as is
- Otherwise → prepends API base URL (e.g., `http://localhost:3000/uploads/products/image.webp`)

## Authentication Flow

1. User logs in → JWT token stored in `localStorage.token`
2. Token automatically attached to all API requests via axios interceptor
3. On 401 error → Token cleared, user redirected to login
4. Navbar checks `localStorage.token` for auth state

## Response Format

All API responses follow this structure:
```json
{
  "success": true,
  "data": { ... }
}
```

Frontend checks `response.success` before using `response.data`.

## Error Handling

- Network errors logged to console
- User-friendly error messages in LoginModal
- Loading states on all data-fetching components
- Graceful fallbacks for missing data

## Next Steps

1. Create `.env` file with `VITE_API_URL=http://localhost:3000/api`
2. Ensure backend is running on port 3000
3. Test all API endpoints
4. Add error notifications/toast messages (optional)
5. Add retry logic for failed requests (optional)

