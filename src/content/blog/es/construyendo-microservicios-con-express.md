---
title: Construyendo microservicios con express
date: 2022-11-18
views: 5689
translations:
  en: building-microservices-with-express
---

Express.js **proporciona** *una* excelente base para construir microservicios escalables. En esta publicación, exploraremos cómo crear una arquitectura de microservicios utilizando Express.

## Introducción a los microservicios con Express

Al construir microservicios con Express, puedes utilizar varios métodos de comunicación:

- HTTP/REST
- Colas de mensajes (RabbitMQ, Kafka)
- gRPC
- WebSockets

## Configurando un microservicio

Así es como puedes crear un microservicio básico con Express:

```javascript
// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas del servicio de usuarios
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Obtener usuario de la base de datos
  const user = { id: userId, name: 'John Doe', email: 'john@example.com' };
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Microservicio ejecutándose en el puerto ${PORT}`);
});
