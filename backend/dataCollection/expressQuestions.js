export const expressQuestions = [
  {
    question: "What is Express.js?",
    answer:
      "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
  },
  {
    question: "How do you create a basic Express server?",
    answer:
      "By requiring Express, creating an app instance, defining routes, and listening on a port. Example: const app = express(); app.get('/', (req, res) => res.send('Hello')); app.listen(3000);",
  },
  {
    question: "What is middleware in Express?",
    answer:
      "Middleware are functions that execute during the lifecycle of a request to the Express server, having access to request and response objects.",
  },
  {
    question: "How do you add middleware to an Express app?",
    answer: "By using app.use() or attaching it to specific routes.",
  },
  {
    question: "What is routing in Express?",
    answer:
      "Routing refers to how an application responds to client requests at various endpoints (URIs) and HTTP methods.",
  },
  {
    question: "How do you handle 404 errors in Express?",
    answer:
      "By adding a middleware at the end that sends a 404 response if no route matches.",
  },
  {
    question: "How to parse JSON request bodies in Express?",
    answer: "By using the built-in middleware express.json() in app.use().",
  },
  {
    question: "How do you access URL parameters in Express?",
    answer: "Using req.params in route handlers.",
  },
  {
    question: "How do you access query parameters in Express?",
    answer: "Using req.query in route handlers.",
  },
  {
    question: "How do you serve static files in Express?",
    answer:
      "By using app.use(express.static('public')) to serve files from the 'public' directory.",
  },
  {
    question:
      "What is the difference between app.use() and app.get() in Express?",
    answer:
      "app.use() is for middleware and can handle all HTTP methods, while app.get() handles only GET requests.",
  },
  {
    question: "How can you create modular route handlers in Express?",
    answer:
      "By using express.Router() to create router instances and exporting them.",
  },
  {
    question: "What is the role of next() in Express middleware?",
    answer:
      "next() passes control to the next middleware function in the stack.",
  },
  {
    question: "How do you handle errors in Express?",
    answer:
      "By defining error-handling middleware with four parameters: (err, req, res, next).",
  },
  {
    question: "How do you redirect a request in Express?",
    answer: "Using res.redirect() method.",
  },
  {
    question: "How do you send JSON response in Express?",
    answer: "Using res.json() method.",
  },
  {
    question: "Can you chain route handlers in Express?",
    answer:
      "Yes, by providing multiple callback functions in route definitions.",
  },
  {
    question: "How do you enable CORS in Express?",
    answer: "By using the cors middleware package: app.use(cors()).",
  },
  {
    question: "What is the use of req.body in Express?",
    answer:
      "req.body contains data sent in the request body, usually in POST or PUT requests.",
  },
  {
    question: "How do you set response headers in Express?",
    answer: "Using res.set() or res.header() methods.",
  },
  {
    question: "How do you handle file uploads in Express?",
    answer: "By using middleware like multer to parse multipart/form-data.",
  },
  {
    question:
      "What is the difference between PUT and PATCH in Express routing?",
    answer:
      "PUT replaces the entire resource, PATCH updates only specified fields.",
  },
  {
    question: "How do you make an Express app listen on a port?",
    answer: "Using app.listen(port, callback).",
  },
  {
    question: "How do you access cookies in Express?",
    answer: "By using cookie-parser middleware and accessing req.cookies.",
  },
  {
    question: "How to handle sessions in Express?",
    answer: "By using express-session middleware to manage user sessions.",
  },
  {
    question: "What is a router-level middleware in Express?",
    answer:
      "Middleware bound to an instance of express.Router(), applies only to routes in that router.",
  },
  {
    question: "How to set template engines in Express?",
    answer: "Using app.set('view engine', 'engine_name') like 'ejs' or 'pug'.",
  },
  {
    question: "How to render HTML pages in Express?",
    answer: "Using res.render() with the configured template engine.",
  },
  {
    question: "How do you capture form data in Express?",
    answer: "By parsing the body using express.urlencoded() middleware.",
  },
  {
    question: "How do you mount middleware at a specific path in Express?",
    answer: "By passing a path to app.use('/path', middleware).",
  },
  {
    question: "Can Express handle WebSockets?",
    answer:
      "No, Express itself doesn’t support WebSockets; you can use libraries like Socket.io.",
  },
  {
    question: "What is the order of middleware execution in Express?",
    answer: "Middleware execute sequentially in the order they are added.",
  },
  {
    question: "How do you limit the size of incoming JSON payload in Express?",
    answer:
      "By passing the limit option to express.json(), e.g., express.json({ limit: '10kb' }).",
  },
  {
    question: "What method is used to send files in Express?",
    answer: "Using res.sendFile() method.",
  },
  {
    question: "How do you handle cross-site scripting (XSS) in Express?",
    answer: "By sanitizing inputs and using security middleware like helmet.",
  },
  {
    question: "How can you debug Express applications?",
    answer:
      "By using console.log, debugger, or packages like morgan and debug.",
  },
  {
    question: "How do you set environment variables for Express apps?",
    answer: "Using process.env or dotenv package to load .env files.",
  },
  {
    question: "How do you test Express routes?",
    answer: "Using testing frameworks like Mocha, Jest, or Supertest.",
  },
  {
    question: "What is the purpose of the res.locals object in Express?",
    answer:
      "res.locals stores variables accessible only to the current request’s view.",
  },
  {
    question: "How do you enable HTTPS in Express?",
    answer:
      "By creating an HTTPS server with Node.js https module and passing Express app.",
  },
  {
    question: "What is the difference between res.send() and res.json()?",
    answer:
      "res.send() can send various types (string, buffer), res.json() sends JSON specifically.",
  },
  {
    question: "How do you implement rate limiting in Express?",
    answer: "By using middleware like express-rate-limit.",
  },
  {
    question: "How do you handle multipart form data in Express?",
    answer: "Using middleware like multer.",
  },
  {
    question: "What is the use of express.Router()?",
    answer: "It creates modular, mountable route handlers.",
  },
  {
    question: "How can you prevent request timeout in Express?",
    answer:
      "By configuring timeout settings or using middleware like connect-timeout.",
  },
  {
    question: "How do you log requests in Express?",
    answer: "Using middleware like morgan.",
  },
  {
    question: "How do you implement authentication in Express?",
    answer: "Using middleware like Passport.js or custom token-based auth.",
  },
  {
    question: "What is the use of next('route') in Express middleware?",
    answer:
      "It skips remaining middleware for the current route and passes control to next route.",
  },
];
