export const mongoQuestions = [
  {
    question: "What is MongoDB?",
    answer:
      "MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like documents.",
  },
  {
    question: "What is a document in MongoDB?",
    answer:
      "A document is a basic unit of data in MongoDB, stored as a BSON object, similar to a JSON object.",
  },
  {
    question: "What is a collection in MongoDB?",
    answer:
      "A collection is a group of MongoDB documents, similar to a table in relational databases.",
  },
  {
    question: "What is BSON?",
    answer:
      "BSON is a binary-encoded serialization of JSON-like documents used internally by MongoDB.",
  },
  {
    question: "How is MongoDB different from relational databases?",
    answer:
      "MongoDB is schema-less and document-oriented, while relational databases are schema-based and table-oriented.",
  },
  {
    question: "What is a replica set in MongoDB?",
    answer:
      "A replica set is a group of MongoDB servers that maintain the same data set for high availability.",
  },
  {
    question: "What is sharding in MongoDB?",
    answer:
      "Sharding is the process of distributing data across multiple machines to support large datasets and high throughput.",
  },
  {
    question: "What is the primary key in MongoDB documents?",
    answer:
      "Each document has a unique '_id' field which acts as the primary key.",
  },
  {
    question: "How do you create a database in MongoDB?",
    answer:
      "A database is created when you first store data in it; you don't explicitly create it.",
  },
  {
    question: "How do you insert a document in MongoDB?",
    answer: "Using the insertOne() or insertMany() methods on a collection.",
  },
  {
    question: "How do you find documents in MongoDB?",
    answer:
      "Using the find() method on a collection, with optional query filters.",
  },
  {
    question: "What is the difference between find() and findOne()?",
    answer:
      "find() returns a cursor to multiple documents; findOne() returns a single document.",
  },
  {
    question: "How do you update a document in MongoDB?",
    answer: "Using updateOne(), updateMany(), or findOneAndUpdate() methods.",
  },
  {
    question: "How do you delete documents in MongoDB?",
    answer: "Using deleteOne() or deleteMany() methods.",
  },
  {
    question: "What is the aggregation framework in MongoDB?",
    answer:
      "It's a powerful tool for data aggregation, transformation, and analysis using pipeline stages.",
  },
  {
    question: "What are indexes in MongoDB?",
    answer:
      "Indexes improve query performance by allowing faster data retrieval.",
  },
  {
    question: "What is a compound index?",
    answer: "An index on multiple fields of a document.",
  },
  {
    question:
      "What is the difference between embedded documents and references?",
    answer:
      "Embedded documents store related data inside a single document, while references store only IDs and link to other documents.",
  },
  {
    question: "What is the default storage engine for MongoDB?",
    answer: "WiredTiger.",
  },
  {
    question: "How does MongoDB handle transactions?",
    answer:
      "MongoDB supports multi-document ACID transactions starting from version 4.0.",
  },
  {
    question: "What is a cursor in MongoDB?",
    answer: "A cursor allows traversal over the results of a query.",
  },
  {
    question: "How do you limit the number of results returned by a query?",
    answer: "Using the limit() method.",
  },
  {
    question: "How do you skip documents in a query?",
    answer: "Using the skip() method.",
  },
  {
    question: "What is a TTL index?",
    answer:
      "A Time-To-Live index automatically deletes documents after a certain time.",
  },
  {
    question: "What is the difference between update and replace in MongoDB?",
    answer:
      "Update modifies specified fields; replace replaces the whole document.",
  },
  {
    question: "How do you connect MongoDB with Node.js?",
    answer: "Using the official MongoDB Node.js driver or ODMs like Mongoose.",
  },
  {
    question: "What is Mongoose?",
    answer:
      "Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.",
  },
  {
    question: "What are schema and models in Mongoose?",
    answer:
      "Schema defines the structure of documents; models provide an interface to the database.",
  },
  {
    question: "How do you define a schema in Mongoose?",
    answer: "Using new mongoose.Schema({ fieldName: Type, ... })",
  },
  {
    question: "What is validation in Mongoose?",
    answer: "Validation ensures data meets certain criteria before saving.",
  },
  {
    question: "How do you perform schema validation in Mongoose?",
    answer: "By specifying validators in the schema definition.",
  },
  {
    question: "What is the difference between findById() and findOne()?",
    answer: "findById() searches by _id; findOne() searches by any query.",
  },
  {
    question: "How do you perform pagination in MongoDB?",
    answer: "Using limit() and skip() methods.",
  },
  {
    question:
      "What is the difference between db.collection and db.collection.find()?",
    answer: "db.collection accesses the collection; find() executes a query.",
  },
  {
    question: "How do you create an index in MongoDB?",
    answer: "Using createIndex() method.",
  },
  {
    question: "What is a unique index?",
    answer: "An index that ensures all values in a field are unique.",
  },
  {
    question: "What is the aggregation pipeline?",
    answer: "A sequence of stages that process data records in a collection.",
  },
  {
    question: "What is $match in aggregation?",
    answer:
      "Filters documents to pass only matching documents to the next pipeline stage.",
  },
  {
    question: "What is $group in aggregation?",
    answer:
      "Groups documents by a specified expression, useful for aggregation.",
  },
  {
    question: "What is the difference between find() and aggregate()?",
    answer:
      "find() queries documents; aggregate() performs complex data processing.",
  },
  {
    question: "What is a MongoDB Atlas?",
    answer: "MongoDB Atlas is a cloud-hosted MongoDB service.",
  },
  {
    question: "What is a capped collection?",
    answer:
      "A fixed-size collection that overwrites old data when it reaches its size limit.",
  },
  {
    question: "What is the maximum document size in MongoDB?",
    answer: "16 megabytes.",
  },
  {
    question: "How do you perform text search in MongoDB?",
    answer: "Using text indexes and the $text operator.",
  },
  {
    question: "What is the purpose of the _id field?",
    answer: "It's a unique identifier for each document.",
  },
  {
    question: "Can the _id field be modified?",
    answer: "No, it's immutable once set.",
  },
  {
    question: "How do you backup and restore MongoDB data?",
    answer: "Using mongodump and mongorestore utilities.",
  },
  {
    question: "What is GridFS in MongoDB?",
    answer: "GridFS is a specification for storing and retrieving large files.",
  },
  {
    question: "How do you perform transactions in MongoDB?",
    answer: "By using session objects and the startTransaction() method.",
  },
  {
    question: "What is the difference between $set and $unset?",
    answer: "$set updates or adds fields; $unset removes fields.",
  },
  {
    question: "What is the purpose of explain() in MongoDB?",
    answer: "To show how MongoDB executes a query and analyze performance.",
  },
  {
    question: "What is a projection in MongoDB?",
    answer: "Specifies which fields to include or exclude in query results.",
  },
  {
    question: "How do you handle relations in MongoDB?",
    answer: "Using embedding or referencing.",
  },
  {
    question: "What is the use of $lookup in aggregation?",
    answer: "Performs left outer join with another collection.",
  },
  {
    question: "What is the difference between embedding and referencing?",
    answer:
      "Embedding stores related data within documents; referencing stores references to other documents.",
  },
  {
    question: "What is the oplog?",
    answer: "A special capped collection used for replication.",
  },
  {
    question: "What are the advantages of NoSQL databases like MongoDB?",
    answer:
      "Flexible schema, scalability, and high performance for large volumes of data.",
  },
  {
    question: "How does MongoDB ensure data durability?",
    answer: "Through journaling and replica sets.",
  },
  {
    question: "What is a primary in MongoDB replication?",
    answer: "The main node that accepts writes.",
  },
  {
    question: "What is a secondary in MongoDB replication?",
    answer: "Nodes that replicate data from the primary for redundancy.",
  },
  {
    question: "How does MongoDB handle failover?",
    answer: "Replica set members elect a new primary if the current one fails.",
  },
  {
    question: "What are the data types supported by MongoDB?",
    answer: "String, Number, Boolean, Array, Object, Date, Null, etc.",
  },
  {
    question: "What is the difference between updateOne() and replaceOne()?",
    answer:
      "updateOne() modifies specific fields; replaceOne() replaces the entire document.",
  },
  {
    question: "How do you create a capped collection?",
    answer:
      "Using db.createCollection() with options { capped: true, size: <bytes> }.",
  },
  {
    question: "What is the function of the mongos process?",
    answer: "It acts as a query router in a sharded cluster.",
  },
  {
    question: "What is the difference between a mongod and mongos?",
    answer:
      "mongod is the database process; mongos is the routing service for sharded clusters.",
  },
  {
    question: "What is the WiredTiger storage engine?",
    answer: "A high-performance, transactional storage engine for MongoDB.",
  },
  {
    question: "How do you perform backup in MongoDB Atlas?",
    answer: "Using the built-in automated backups or manual snapshots.",
  },
  {
    question: "What is the aggregation framework?",
    answer:
      "A data processing pipeline that allows transformation and analysis of data.",
  },
  {
    question: "How do you create a text index?",
    answer: "Using db.collection.createIndex({ field: 'text' }).",
  },
  {
    question: "What is an ObjectId?",
    answer: "A 12-byte unique identifier for MongoDB documents.",
  },
  {
    question: "What is the size of ObjectId?",
    answer: "12 bytes.",
  },
  {
    question: "What are the components of ObjectId?",
    answer: "Timestamp, machine identifier, process id, and a counter.",
  },
  {
    question: "How do you perform a case-insensitive search?",
    answer: "Using regular expressions with the 'i' flag or collation.",
  },
  {
    question: "What is the default port number for MongoDB?",
    answer: "27017.",
  },
  {
    question: "What is a deadlock in MongoDB?",
    answer:
      "A situation where two operations wait on each other indefinitely, but MongoDB uses document-level locking to minimize this.",
  },
  {
    question: "How does MongoDB ensure consistency?",
    answer: "Through replica sets and write concern.",
  },
  {
    question: "What is write concern in MongoDB?",
    answer:
      "It defines the level of acknowledgment requested from MongoDB for write operations.",
  },
  {
    question: "What is read preference?",
    answer: "Determines which replica set member to read from.",
  },
  {
    question: "What is the default read preference?",
    answer: "Primary.",
  },
  {
    question: "What is a profiler in MongoDB?",
    answer: "A tool to monitor performance by logging slow queries.",
  },
  {
    question: "What is the difference between capped and uncapped collections?",
    answer:
      "Capped collections have fixed size and preserve insertion order; uncapped collections do not have size limits.",
  },
  {
    question: "How do you rename a collection?",
    answer: "Using db.collection.renameCollection().",
  },
  {
    question: "What is the use of $exists operator?",
    answer: "To check if a field exists or not.",
  },
  {
    question: "How do you check the server status in MongoDB?",
    answer: "Using db.serverStatus().",
  },
];
