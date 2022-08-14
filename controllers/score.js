const asyncWrapper = require('../errors/asyncWrapper.js');
const axios = require('axios')

function sortByScore(a, b) {
  if(a.score < b.score) return -1;
  if(a.score > b.score) return 1;
  return 0;
}
const getScores = asyncWrapper(async (req, res, next) => {
  try {
    const prijave = await axios.get(process.env.FIREBASE_URL)
    const array = [];

    Object.keys(prijave.data).forEach((key) => {
      array.push({ime: prijave.data[key].ime, score:prijave.data[key].score});
    });

    const sortedScores = array.sort(sortByScore)

    res
      .status(200)
      .json({ success: true, msg: 'Uspesno ucitani skorovi', data: sortedScores });
  } catch(err){
      res
      .status(400)
      .json({ success: false, msg: 'Doslo je do greske' });
  }
  
});

const postScore = asyncWrapper(async (req, res, next) => {
  const {ime, score} = req.body

  try {
    await axios.post(process.env.FIREBASE_URL, {ime,score})
  } catch(err){
      res
      .status(400)
      .json({ success: false, msg: 'Doslo je do greske'});
  }
    
  res
    .status(200)
    .json({ success: true, msg: 'Uspesno postovan score'});
});


module.exports = {
  getScores,
  postScore
};
