---
title: Building Microservices with Express
date: 2022-11-18
views: 5689
translations:
  es: construyendo-microservicios-con-express
---

Express.js provides an excellent foundation for building scalable microservices. In this post, we'll explore how to create a microservice architecture using Express.

## Introduction to Express Microservices

When building microservices with Express, you can use various communication methods:

- HTTP/REST
- Message Queues (RabbitMQ, Kafka)
- gRPC
- WebSockets

## Setting Up a Microservice

Here's how to create a basic microservice with Express:

```javascript
// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// User service routes
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Fetch user from database
  const user = { id: userId, name: 'John Doe', email: 'john@example.com' };
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Microservice running on port ${PORT}`);
});
