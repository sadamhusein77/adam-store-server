module.exports = {
    index: async (req, res) => {
        try {
            res.render('index');
        } catch (error) {
            console.error('Error', error);
        }
    }
}