const {createClient} = require('pexels');
const mongo = require('../mongo');

const pexels = createClient(process.env.PEXELS_API);
const mongoCli = mongo.MONGO_CLIENT;
let imgCount = 30;

async function updatePexels(){
  let data = [];

  await pexels.photos.curated({ per_page: imgCount }).then(phos => {//이미지 요청
    for(let i=0; i<imgCount; i++){
      let infos = {
        id: i+1,
        photographer: phos.photos[i].photographer,
        photo: phos.photos[i].src.portrait,
      };
      data.push(infos);
    }
  });

  try{//몽고 처리
    await mongoCli.connect();
    const db = await mongoCli.db("spo_nodejs");
    const pi = await db.collection("pexelsImg");
    console.log('mongodb connected (updatePexels) OK!');
    const r = await pi.deleteMany({});
    console.log(`Deleted ${r.deletedCount} documents`);
    const result = await pi.insertMany(data);
    console.log(`${result.insertedCount} documents were inserted`);
  } catch(err){
    console.error("mongodb (updatePexels) FAIL!"+err);
  } finally{
    await mongoCli.close();
    console.log('mongodb close (updatePexels) OK!');
  }
}

exports.getPexelsImg = () => {
  setTimeout(updatePexels, 5000);
  setInterval(updatePexels, 1000*3600*24);
};
