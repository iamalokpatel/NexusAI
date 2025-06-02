export const nodeQuestions = [
  {
    question: "What is Node.js?",
    answer:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows executing JavaScript code server-side.",
  },
  {
    question: "How does Node.js handle asynchronous operations?",
    answer:
      "Node.js uses an event-driven, non-blocking I/O model with an event loop to handle asynchronous operations efficiently.",
  },
  {
    question: "What is the event loop in Node.js?",
    answer:
      "The event loop is a mechanism that handles asynchronous callbacks and executes them after the call stack is empty.",
  },
  {
    question: "How do you create a simple HTTP server in Node.js?",
    answer:
      "Using the built-in http module: require('http').createServer((req, res) => { res.end('Hello'); }).listen(3000);",
  },
  {
    question: "What is the purpose of the package.json file in Node.js?",
    answer:
      "It holds metadata about the project and manages dependencies, scripts, and project configurations.",
  },
  {
    question: "How do you install a package using npm?",
    answer: "By running the command npm install <package-name>.",
  },
  {
    question: "What is a callback function in Node.js?",
    answer:
      "A callback is a function passed as an argument to another function, executed after a task completes.",
  },
  {
    question: "What are Promises in Node.js?",
    answer:
      "Promises are objects representing the eventual completion or failure of an asynchronous operation.",
  },
  {
    question: "How do you handle errors in asynchronous code in Node.js?",
    answer:
      "Using error-first callbacks, try-catch with async/await, or Promise.catch() methods.",
  },
  {
    question:
      "What is the difference between synchronous and asynchronous code in Node.js?",
    answer:
      "Synchronous code blocks execution until completion, asynchronous code allows other operations to run while waiting.",
  },
  {
    question: "How do you read a file asynchronously in Node.js?",
    answer:
      "Using the fs module: fs.readFile('file.txt', 'utf8', (err, data) => { ... });",
  },
  {
    question: "What is the role of modules in Node.js?",
    answer:
      "Modules help organize code into reusable blocks and manage dependencies.",
  },
  {
    question: "How do you export a function from a Node.js module?",
    answer: "By assigning the function to module.exports or exports.",
  },
  {
    question: "How do you import a module in Node.js?",
    answer:
      "Using require('module-name') for CommonJS or import statement for ES modules.",
  },
  {
    question: "What are streams in Node.js?",
    answer:
      "Streams are objects that let you read or write data piece by piece, useful for handling large data.",
  },
  {
    question:
      "What is the difference between process.nextTick() and setImmediate()?",
    answer:
      "process.nextTick() queues callbacks to execute immediately after the current operation, setImmediate() queues callbacks for the next event loop iteration.",
  },
  {
    question: "How do you create a child process in Node.js?",
    answer:
      "Using the child_process module: require('child_process').spawn() or .exec().",
  },
  {
    question: "What is the global object in Node.js?",
    answer:
      "It is the global namespace object, similar to window in browsers, accessible anywhere without require.",
  },
  {
    question: "How can you handle uncaught exceptions in Node.js?",
    answer:
      "By listening to the 'uncaughtException' event on the process object.",
  },
  {
    question: "What is the difference between __dirname and process.cwd()?",
    answer:
      "__dirname is the directory of the current module, process.cwd() is the current working directory where the process was started.",
  },
  {
    question: "What is the purpose of the Buffer class in Node.js?",
    answer: "Buffers are used to handle binary data directly in memory.",
  },
  {
    question: "How do you debug a Node.js application?",
    answer:
      "Using the --inspect flag with node and debugging tools like Chrome DevTools or VSCode debugger.",
  },
  {
    question: "How do you handle environment variables in Node.js?",
    answer:
      "Using process.env or packages like dotenv to load variables from a .env file.",
  },
  {
    question: "What is the use of the package-lock.json file?",
    answer:
      "It locks down the versions of installed dependencies to ensure consistent installs.",
  },
  {
    question: "How do you make HTTP requests in Node.js?",
    answer:
      "Using the built-in http/https modules or external libraries like axios or node-fetch.",
  },
  {
    question: "What is event emitter in Node.js?",
    answer: "It is a class that facilitates emitting and listening for events.",
  },
  {
    question: "How do you create a custom event emitter?",
    answer:
      "By extending the EventEmitter class and using emit() and on() methods.",
  },
  {
    question: "What is middleware in Node.js context?",
    answer:
      "Functions that process requests/responses in frameworks like Express.",
  },
  {
    question: "How do you handle file uploads in Node.js?",
    answer:
      "By using middleware like multer with Express or processing raw streams.",
  },
  {
    question: "What is the role of cluster module in Node.js?",
    answer:
      "It allows creating child processes to utilize multiple CPU cores for better performance.",
  },
  {
    question: "What is callback hell?",
    answer:
      "It refers to deeply nested callbacks making code hard to read and maintain.",
  },
  {
    question: "How do you avoid callback hell?",
    answer: "By using Promises, async/await syntax, or modularizing code.",
  },
  {
    question: "What is the difference between require() and import?",
    answer: "require() is CommonJS module syntax, import is ES module syntax.",
  },
  {
    question: "How do you create a REST API with Node.js?",
    answer:
      "Typically by using frameworks like Express to handle HTTP routes and requests.",
  },
  {
    question: "What is npm?",
    answer:
      "Node Package Manager, used to install and manage Node.js packages.",
  },
  {
    question: "How do you update npm to the latest version?",
    answer: "By running npm install -g npm.",
  },
  {
    question: "What is the role of the main field in package.json?",
    answer: "It specifies the entry point file of the module.",
  },
  {
    question: "How do you handle CORS in Node.js?",
    answer: "By setting appropriate headers or using the cors middleware.",
  },
  {
    question: "How can you optimize performance in Node.js?",
    answer:
      "By using asynchronous code, clustering, caching, and efficient algorithms.",
  },
  {
    question: "What is the difference between setTimeout and setImmediate?",
    answer:
      "setTimeout schedules execution after at least a specified delay, setImmediate schedules execution on the next event loop tick.",
  },
  {
    question: "How do you exit a Node.js process?",
    answer: "By calling process.exit().",
  },
  {
    question: "How do you handle signals in Node.js?",
    answer: "By listening to process events like 'SIGINT' or 'SIGTERM'.",
  },
  {
    question: "How can you create a timer in Node.js?",
    answer: "Using setTimeout() or setInterval() functions.",
  },
  {
    question:
      "What is the difference between synchronous and asynchronous file operations?",
    answer:
      "Synchronous operations block the event loop until completion, asynchronous operations do not.",
  },
  {
    question: "How do you handle large data streams in Node.js?",
    answer:
      "Using stream API to read/write data in chunks instead of loading it all at once.",
  },
  {
    question:
      "What is the difference between local and global modules in Node.js?",
    answer:
      "Local modules are installed in project node_modules folder, global modules are installed system-wide.",
  },
  {
    question: "How do you secure a Node.js application?",
    answer:
      "By validating inputs, using HTTPS, sanitizing data, and applying security best practices and middleware.",
  },
  {
    question: "How do you manage dependencies in Node.js?",
    answer: "Using npm or yarn to install, update, and remove packages.",
  },
  {
    question: "What are native addons in Node.js?",
    answer: "Modules written in C or C++ to extend Node.js functionality.",
  },
  {
    question: "How do you perform unit testing in Node.js?",
    answer: "By using testing frameworks like Mocha, Jest, or Jasmine.",
  },
];
