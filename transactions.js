var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth } = require('../middlewares/auth');
const { deposit, withdraw, filterTransactions } = require('../controllers/transactionController')


router.post('/deposit', auth, body('amount').isNumeric().toFloat().custom((value) => {
    if (value <= 0) {
        throw new Error('nagative amount is provided');
    }

    return true;
}), async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = req.user.id;
    const { amount } = req.body;
    try {
        const out = await deposit(amount, id);
        if (out) {
            return res.status(200).json({ data: { ...out } })
        }
    } catch (e) {
        res.status(400).json({ errros: [e.messeage] });
    }
});

router.post('/withdraw', auth, body('amount').isNumeric().toFloat().custom((value) => {
    if (value <= 0) {
        throw new Error('nagative amount is provided');
    }

    return true;
}), async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = req.user.id;
    const { amount } = req.body;
    try {
        const out = await withdraw(amount, id);
        if (out) {
            return res.status(200).json({ data: { ...out } })
        }
    } catch (e) {
        res.status(400).json({ errros: [e.messeage] });
    }
});

router.get('/all', auth, async (req, res, next) => {
    const { type } = req.query;
    const id = req.user.id;
    try {
        const transactions = await filterTransactions(type, id);
        return res.status(200).json({ data: transactions });
    } catch (e) {
        res.status(400).json({ errros: [e.messeage] });
    }
})

module.exports = router;
