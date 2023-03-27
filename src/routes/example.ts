import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /example:
 *   get:
 *     description: Get all examples
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/example', (req, res) => {
    res.send('Hello World!');
});

export default router;
