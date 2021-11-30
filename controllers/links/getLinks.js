const Link = require('../../models/Link');

module.exports = async (req, res) => {
    try {
        const links = await Link.find({ owner:req.user.userId });
        res.json(links);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
};