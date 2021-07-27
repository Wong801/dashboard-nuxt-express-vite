const express = require('express');
const { json, urlencoded } = require('body-parser');

const app = express();

app.use(urlencoded({ extended: false }));

app.use(json())

const user = require('./routes/user');
const post = require('./routes/post');

app.use('/user', user);
app.use('/post', post);

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
