const app = require('./app');

app.listen(app.get('port'), () => {
  console.log("spo server start!");
  console.log(app.get('port'), 'port listening...');
});
