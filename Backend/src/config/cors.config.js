const corsOptions = {
  origin: "http://localhost:5173", // Allow specific origin
  methods: "GET,POST,PUT,DELETE,PATCH", // Allow specific methods
  credentials: true, // Allow cookies to be sent with requests
};

export { corsOptions };
