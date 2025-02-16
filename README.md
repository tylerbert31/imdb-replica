# TMDB - Tyler's Movie Database

A modern IMDB clone built with NextJS and TypeScript, providing a seamless movie browsing experience.

## 🌐 Live Demo

Visit the live application at [tmdb-ap1.tylerbert.cc](https://tmdb-ap1.tylerbert.cc/)

## 🛠️ Tech Stack

- NextJS
- TypeScript
- Upstash Redis
- TMDB API
- AWS Amplify

## ✨ Additional Features

### 📱 User Experience

- **Infinite Scroll**: Seamlessly load more movies as you scroll
- **Mobile Responsive**: Fully responsive design that works on all devices
- **Loading States + Animations**: Smooth loading transitions using Framer Motion animations

### ⚡ Performance

- **Redis Caching**: Server-side external caching for API responses
- **Node-cache**: In-memory caching for faster repeated requests

## 🚀 Getting Started

### Prerequisites

Before running the application, you'll need:

1. TMDB API Keys - [TMDB](https://www.themoviedb.org/settings/api/request)
2. Upstash Redis API Keys - [Upstash Redis](https://console.upstash.com/redis)
3. Node.js installed on your machine

### Installation

1. Clone the repository

```bash
git clone https://github.com/tylerbert31/imdb-replica.git
cd imdb-replica
```

2. Install dependencies

```bash
npm install
```

3. Setup environment variables

```bash
cp .env.sample .env
```

Then edit `.env` with your API keys

4. Run the development server

```bash
npm run dev
```

5. For production preview

```bash
npm run preview
```

## 📚 API Documentation

All API responses follow this format:

```json
{
  "message": "Success/Error message", // Only included for error responses
  "data": {} // Actual response data for successful requests
}
```

---

## 🔍 Search API

### Method: GET

**Endpoint:** `/api/search`

**Query Parameters:**

- `query` (required): Movie name to search
- `page` (optional): Page number for pagination, defaults to 1

**Example Request:**

```
GET /api/search?query=inception&page=1
```

**Success Response:**

`Status: 200 OK`

```json
{
  "page": 1,
  "results": [
    {
      "id": 123,
      "title": "Movie Title",
      "overview": "Movie description",
      "poster_path": "/path/to/poster.jpg",
      "release_date": "2024-03-20",
      "vote_average": 8.5
    }
  ],
  "total_pages": 10,
  "total_results": 100
}
```

**Error Response:**

`Status: 400 Bad Request`

```json
{
  "message": "missing '?query=movie_name' parameter"
}
```

### Method: POST

**Endpoint:** `/api/search`

**Request Body:**

```json
{
  "query": "inception",
  "page": 1
}
```

**Success Response:**

`Status: 200 OK`

```json
{
  "page": 1,
  "results": [
    {
      "id": 123,
      "title": "Movie Title",
      "overview": "Movie description",
      "poster_path": "/path/to/poster.jpg",
      "release_date": "2024-03-20",
      "vote_average": 8.5
    }
  ],
  "total_pages": 10,
  "total_results": 100
}
```

**Error Responses:**

`Status: 400 Bad Request`

```json
{
  "message": "Invalid request body"
}
```

---

## 🎬 Movie Details API

### Method: GET

**Endpoint:** `/api/detail`

**Query Parameters:**

- `movie_id` (required): ID of the movie to fetch details

**Example Request:**

```
GET /api/detail?movie_id=123
```

**Success Response:**

`Status: 200 OK`

```json
{
  "id": 123,
  "title": "Movie Title",
  "overview": "Movie description",
  "release_date": "2024-03-20",
  "vote_average": 8.5,
  "credits": {
    // Cast and crew information
  },
  "videos": {
    // Related videos
  },
  "images": {
    // Movie images
  }
}
```

**Error Response:**

`Status: 400 Bad Request`

```json
{
  "message": "missing '?movie_id=movie_id' parameter"
}
```

### Method: POST

**Endpoint:** `/api/detail`

**Request Body:**

```json
{
  "movie_id": "123"
}
```

**Success Response:**

`Status: 200 OK`

```json
{
  "id": 123,
  "title": "Movie Title",
  "overview": "Movie description",
  "release_date": "2024-03-20",
  "vote_average": 8.5,
  "credits": {
    // Cast and crew information
  },
  "videos": {
    // Related videos
  },
  "images": {
    // Movie images
  }
}
```

**Error Response:**

`Status: 400 Bad Request`

```json
{
  "message": "missing 'movie_id' parameter"
}
```

---

For implementation details, refer to:

- [Search Routes](/src/app/api/search/route.ts)
- [Details Routes](/src/app/api/detail/route.ts)

## 🚀 Deployment

The application is deployed on AWS Amplify in the AP Southeast 1 region.

## 👨‍💻 Developer

**Tyler Bert Baring**

- GitHub: [@tylerbert31](https://github.com/tylerbert31)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
