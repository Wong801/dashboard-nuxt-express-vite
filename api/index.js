const express = require('express');
const { json, urlencoded } = require('body-parser');

const app = express();

app.use(urlencoded({ extended: false }));

app.use(json())

const user = require('./routes/user');

app.use('/user', user)

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
