const Transaction = require('../transaction/model');
const Voucher = require('../voucher/model');
const Category = require('../category/model');
const Player = require('../player/model');

module.exports = {
    index: async (req, res) => {
        try {
            const transactions = await Transaction.countDocuments();
            const players = await Player.countDocuments();
            const vouchers = await Voucher.countDocuments();
            const categories = await Category.countDocuments();

            res.render('admin/dashboard/view_dashboard', {
                count: {
                    transactions,
                    vouchers,
                    categories,
                    players
                },
                name: req.session.user.name,
                title: 'Dashboard'
            });
        } catch (error) {
            console.error('Error', error);
        }
    }
}