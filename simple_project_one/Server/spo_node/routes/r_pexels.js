const express = require('express');
const {jsonPexels} = require('../controllers/c_pexels');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', jsonPexels);

module.exports = router;
