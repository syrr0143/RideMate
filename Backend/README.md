# RideMate Backend API Documentation

## Base URL

```
http://localhost:3000/api/v1
```

## Endpoints

### User Endpoints

#### Sign Up User

- **URL**: `/user/signup`
- **Method**: `POST`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "user": {
      "_id": "user_id",
      "fullName": "John Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input or missing required fields.
  - `409 Conflict`: Email already exists.

#### Login User

- **URL**: `/user/login`
- **Method**: `POST`
- **Description**: Log in an existing user.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "user": {
      "_id": "user_id",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "token": "auth_token"
    }
  }
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input or missing required fields.
  - `401 Unauthorized`: Incorrect email or password.

#### User Profile

- **URL**: `/user/profile`
- **Method**: `GET`
- **Description**: Get the profile of the logged-in user.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "User profile obtained",
    "user": {
      "_id": "user_id",
      "fullName": "John Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
- **Errors**:
  - `401 Unauthorized`: Authentication failed or token missing/invalid.

#### Log Out User

- **URL**: `/user/logout`
- **Method**: `POST`
- **Description**: Log out the logged-in user.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```
- **Errors**:
  - `401 Unauthorized`: Authentication failed or token missing/invalid.

#### Generate New Token

- **URL**: `/user/get-token`
- **Method**: `POST`
- **Description**: Generate a new authentication token.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "New token generated",
    "token": "new_auth_token"
  }
  ```
- **Errors**:
  - `401 Unauthorized`: Authentication failed or token missing/invalid.

#### Create Ride

- **URL**: `/user/create-ride`
- **Method**: `POST`
- **Description**: Create a new ride.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Request Body**:
  ```json
  {
    "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
    "destination": "1 Infinite Loop, Cupertino, CA",
    "vehicleType": "car"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "ride": {
      "userId": "user_id",
      "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
      "destination": "1 Infinite Loop, Cupertino, CA",
      "fare": 238.67,
      "status": "pending",
      "duration": 16.87,
      "distance": 15.24,
      "otp": "883453",
      "_id": "ride_id",
      "createdAt": "2024-12-21T19:39:38.374Z",
      "updatedAt": "2024-12-21T19:39:38.374Z"
    },
    "message": "Ride is created successfully"
  }
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input or missing required fields.
  - `401 Unauthorized`: Authentication failed or token missing/invalid.

#### Get All Fares

- **URL**: `/user/fare-details`
- **Method**: `POST`
- **Description**: Get fare details for a ride.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Request Body**:
  ```json
  {
    "source": "1600 Amphitheatre Parkway, Mountain View, CA",
    "destination": "1 Infinite Loop, Cupertino, CA"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "fares": {
      "car": 239,
      "auto": 154,
      "bike": 85
    },
    "message": "Fares fetched successfully"
  }
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input or missing required fields.
  - `401 Unauthorized`: Authentication failed or token missing/invalid.

### Captain Endpoints

#### Sign Up Captain

- **URL**: `/captain/signup`
- **Method**: `POST`
- **Description**: Register a new captain.
- **Request Body**:
  ```json
  {
    "fullName": "Jane Doe",
    "email": "jane.doe@example.com",
    "password": "password123",
    "vehicle": {
      "color": "red",
      "capacity": 4,
      "numberPlate": "ABC123",
      "vehicleType": "car"
    }
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Captain registered successfully",
    "captain": {
      "_id": "captain_id",
      "fullName": "Jane Doe",
      "email": "jane.doe@example.com"
    }
  }
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input or missing required fields.
  - `409 Conflict`: Email already exists.

#### Login Captain

- **URL**: `/captain/login`
- **Method**: `POST`
- **Description**: Log in an existing captain.
- **Request Body**:
  ```json
  {
    "email": "jane.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Captain logged in successfully",
    "captain": {
      "_id": "captain_id",
      "fullName": "Jane Doe",
      "email": "jane.doe@example.com",
      "token": "auth_token"
    }
  }
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input or missing required fields.
  - `401 Unauthorized`: Incorrect email or password.

#### Captain Profile

- **URL**: `/captain/profile`
- **Method**: `GET`
- **Description**: Get the profile of the logged-in captain.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Captain profile obtained",
    "captain": {
      "_id": "captain_id",
      "fullName": "Jane Doe",
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "red",
        "capacity": 4,
        "numberPlate": "ABC123",
        "vehicleType": "car"
      }
    }
  }
  ```
- **Errors**:
  - `401 Unauthorized`: Authentication failed or token missing/invalid.

#### Log Out Captain

- **URL**: `/captain/logout`
- **Method**: `POST`
- **Description**: Log out the logged-in captain.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```
- **Errors**:
  - `401 Unauthorized`: Authentication failed or token missing/invalid.

#### Confirm Ride by Captain

- **URL**: `/captain/confirm-ride`
- **Method**: `POST`
- **Description**: Confirm a ride by the captain.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Request Body**:
  ```json
  {
    "rideId": "ride_id"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "ride": {
      "_id": "ride_id",
      "status": "accepted",
      "captain": "captain_id"
    },
    "message": "Ride confirmed successfully"
  }
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input or missing required fields.
  - `401 Unauthorized`: Authentication failed or token missing/invalid.

#### Get All Available Rides

- **URL**: `/captain/available-rides`
- **Method**: `GET`
- **Description**: Get all available rides for the captain.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Response**:
  ```json
  {
    "success": true,
    "rideAvailable": [
      {
        "_id": "ride_id",
        "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
        "destination": "1 Infinite Loop, Cupertino, CA",
        "fare": 238.67,
        "status": "pending",
        "duration": 16.87,
        "distance": 15.24
      }
    ],
    "message": "Ride found successfully"
  }
  ```
- **Errors**:
  - `401 Unauthorized`: Authentication failed or token missing/invalid.

#### Confirm Ride by OTP

- **URL**: `/captain/confirm-otp`
- **Method**: `POST`
- **Description**: Confirm a ride by OTP.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Request Body**:
  ```json
  {
    "rideId": "ride_id",
    "otp": "otp_code"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "OTP verification successful"
  }
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input or missing required fields.
  - `401 Unauthorized`: Authentication failed or token missing/invalid.
  - `404 Not Found`: Ride not found or OTP incorrect.

#### Finish Ride

- **URL**: `/captain/finish-ride`
- **Method**: `POST`
- **Description**: Finish a ride.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Request Body**:
  ```json
  {
    "rideId": "ride_id"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Ride completed successfully"
  }
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input or missing required fields.
  - `401 Unauthorized`: Authentication failed or token missing/invalid.
  - `404 Not Found`: Ride not found.

### Map Endpoints

#### Get Coordinates

- **URL**: `/user/get-coordinates`
- **Method**: `POST`
- **Description**: Get coordinates for a given address.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Request Body**:
  ```json
  {
    "address": "1600 Amphitheatre Parkway, Mountain View, CA"
  }
  ```
- **Response**:
  ```json
  {
    "latitude": 37.4224764,
    "longitude": -122.0842499,
    "place_name": "1600 Amphitheatre Parkway, Mountain View, CA"
  }
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input or missing required fields.
  - `401 Unauthorized`: Authentication failed or token missing/invalid.

#### Get Distance and ETA

- **URL**: `/user/distance-eta`
- **Method**: `POST`
- **Description**: Get distance and estimated time of arrival (ETA) between two locations.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Request Body**:
  ```json
  {
    "origin": "1600 Amphitheatre Parkway, Mountain View, CA",
    "destination": "1 Infinite Loop, Cupertino, CA"
  }
  ```
- **Response**:
  ```json
  {
    "distance": "15.24 km",
    "eta": "16.87 mins"
  }
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input or missing required fields.
  - `401 Unauthorized`: Authentication failed or token missing/invalid.

#### Get Location Suggestions

- **URL**: `/user/location-suggestion`
- **Method**: `POST`
- **Description**: Get location suggestions based on a query.
- **Headers**: `Authorization: Bearer <auth_token>`
- **Request Body**:
  ```json
  {
    "query": "Mountain View"
  }
  ```
- **Response**:
  ```json
  [
    {
      "place_name": "Mountain View, CA, USA",
      "coordinates": {
        "latitude": 37.3860517,
        "longitude": -122.0838511
      }
    },
    {
      "place_name": "Mountain View, AR, USA",
      "coordinates": {
        "latitude": 35.8689653,
        "longitude": -92.1115165
      }
    }
  ]
  ```
- **Errors**:
  - `400 Bad Request`: Invalid input or missing required fields.
  - `401 Unauthorized`: Authentication failed or token missing/invalid.

## Error Handling

All endpoints return appropriate HTTP status codes and error messages in case of failures. Common error responses include:

- **400 Bad Request**: Invalid input or missing required fields.
- **401 Unauthorized**: Authentication failed or token missing/invalid.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: An unexpected error occurred on the server.

## Authentication

Most endpoints require authentication via JWT tokens. Include the token in the `Authorization` header as follows:

```
Authorization: Bearer <auth_token>
```

## Notes

- Replace `<auth_token>` with the actual token received after login.
- Ensure to handle sensitive data securely and avoid exposing API keys or tokens in public repositories.

This documentation provides a comprehensive overview of the available API endpoints, their usage, and expected responses. Make sure to replace placeholder values with actual data as needed.

```

```
