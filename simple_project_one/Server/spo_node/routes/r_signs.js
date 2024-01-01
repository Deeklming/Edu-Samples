const express = require('express');
const {signUp, signIn, signOut} = require('../controllers/c_signs');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);

module.exports = router;
