const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const { PrismaClient } = require('@prisma/client');
const redis = require('redis');

const app = express();
const prisma = new PrismaClient();
const redisClient = redis.createClient();

app.use(bodyParser.json());
app.use('/api', apiRoutes(prisma, redisClient));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 

const express = require('express');

module.exports = (prisma, redisClient) => {
    const router = express.Router();

    router.get('/data', async (req, res) => {
        try {
            const data = await prisma.data.findMany();
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    });

    router.post('/data', async (req, res) => {
        const { name } = req.body;
        try {
            const newData = await prisma.data.create({
                data: { name },
            });
            res.status(201).json(newData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create data' });
        }
    });

    return router;
};