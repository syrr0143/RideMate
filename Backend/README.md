CREATE RIDE

POST http://localhost:3000/api/v1/user/create-ride

body ->
{
"pickup":"1600 Amphitheatre Parkway, Mountain View, CA", "destination":"1 Infinite Loop, Cupertino, CA", "vehicleType":"car"
}
and also pass the token in header

response is ->

{
"sucess": true,
"ride": {
"userId": "675c690d0c005288da7cc158",
"pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
"destination": "1 Infinite Loop, Cupertino, CA",
"fare": 238.66500000000002,
"status": "pending",
"duration": 16.87,
"distance": 15.24,
"otp": "883453",
"\_id": "676719798ee92b237b255b08",
"createdAt": "2024-12-21T19:39:38.374Z",
"updatedAt": "2024-12-21T19:39:38.374Z",
"\_\_v": 0
},
"message": "Ride is created successfully"
}




GET ALL FARES

POST http://localhost:3000/api/v1/user/fare-details

body ->
{
"source":"1600 Amphitheatre Parkway, Mountain View, CA", "destination":"1 Infinite Loop, Cupertino, CA"
}
and also pass the token in header

response is ->

{
    "sucess": true,
    "fares": {
        "car": 239,
        "auto": 154,
        "bike": 85
    },
    "message": "fares fetched successfully"
}
