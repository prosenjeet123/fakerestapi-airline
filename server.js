const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = process.env.PORT || 3000;

app.get('/passengers', (req, res) => {
  const { search, page, size } = req.query;
  let passengers = [];

  for (let i = 0; i < 10000; i++) {
    const passenger = {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      // Add more fields as per your requirements
    };
    passengers.push(passenger);
  }

  // Apply search query if provided
  if (search) {
    const filteredPassengers = passengers.filter(
      (passenger) =>
        passenger.name.toLowerCase().includes(search.toLowerCase()) ||
        passenger.email.toLowerCase().includes(search.toLowerCase())
      // Add more fields for search as per your requirements
    );
    passengers = filteredPassengers;
  }

  // Apply pagination if provided
  const pageSize = size ? parseInt(size) : 10;
  const currentPage = page ? parseInt(page) : 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const paginatedPassengers = passengers.slice(startIndex, endIndex);

  res.json({
    totalPassengers: passengers.length,
    pageSize,
    currentPage,
    data: paginatedPassengers,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
