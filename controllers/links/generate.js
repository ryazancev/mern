const config = require('config');
const shortid = require('shortid');
const Link = require('../../models/Link');

module.exports = async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');

        // с фронта будем получать from
        const { from } = req.body;
        const code = shortid.generate();

        const existing = await Link.findOne({ from });

        if (existing) {
            return res.json({ link: existing });
        }

        const to = baseUrl + '/t/' + code;

        const link = new Link({
            code, to, from, owner: req.user.userId
        });

        await link.save();

        res.status(201).json({ link });

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
};