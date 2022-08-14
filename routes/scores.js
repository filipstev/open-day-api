const express = require('express');
const router = express.Router();

const { getScores,postScore } = require('../controllers/score');

router.route('/').get(getScores).post(postScore);

module.exports = router;
