const Link = require('../../models/Link');

module.exports = async (req, res) => {
    try {
        const links = await Link.findById(req.params.id);
        res.json(links);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
};