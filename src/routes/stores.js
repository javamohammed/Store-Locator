const express = require('express')
const { getStores, AddStore} = require('../controllers/stores')
const route = express.Router()

route.get("/api/v1/stores", getStores);
route.post("/api/v1/stores", AddStore);

module.exports = route