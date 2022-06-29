function dateFormate(req, res, next) {
    const { talk: { watchedAt } } = req.body;

    const regex = /\d{2}\/\d{2}\/\d{4}/;
    const testData = regex.test(watchedAt);

    if (!testData) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    } 

    next();
}
module.exports = dateFormate;