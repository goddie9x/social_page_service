require('dotenv').config();

const express = require('express');
const getAuthAndPutCurrentUserAuthToBody = require('./utils/middlewares/getAuthAndPutCurrentUserAuthToBody');
const connectToDiscoveryServer = require('./utils/configs/discovery');

const app = express();
const PORT = process.env.PORT || 3009;

app.use(express.json());
app.use(getAuthAndPutCurrentUserAuthToBody);

connectToDiscoveryServer();

const server = app.listen(PORT, () => {
    console.log('App running in port ' + PORT);
});
