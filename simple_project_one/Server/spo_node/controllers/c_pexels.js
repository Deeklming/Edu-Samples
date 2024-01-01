const mongo = require('../mongo');
const mongoCli = mongo.MONGO_CLIENT;

exports.jsonPexels = async (req, res, next) => {
  let imgdata = [];
  let opts = {
    projection: { _id: 0, id: 1, photographer: 1, photo: 1 },
  };

  try{
    await mongoCli.connect();
    const db = await mongoCli.db("spo_nodejs");
    const pi = await db.collection("pexelsImg");
    console.log('mongodb connected (jsonPexels) OK!');
    let data = await pi.find({}, opts);
    await data.forEach((ele)=>{
      imgdata.push(ele);
    });
    res.json(imgdata);
  } catch(err){
    console.error("mongodb (jsonPexels) FAIL!"+err);
    next(err);
  } finally{
    await mongoCli.close();
    console.log('mongodb close (jsonPexels) OK!');
  }
};