const Transaction = require('./model');
const {formatToIDR} = require('../../helper');
const config = require('../../config');

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus }
            const transactions = await Transaction.find()
            .populate('player');
            
            res.render('admin/transaction/view_transaction', {
                transactions,
                alert,
                config,
                formatToIDR,
                name: req.session.user.name,
                title: 'Transaction'
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/transaction');
        }
    },
    actionStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.query;

            await Transaction.findOneAndUpdate({
                _id: id
            }, {status}, { includeResultMetadata: true });

            req.flash('alertMessage', "Successfully update transactions");
            req.flash('alertStatus', 'success');
            
            res.redirect('/transaction');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/transaction');
        }
    }
}