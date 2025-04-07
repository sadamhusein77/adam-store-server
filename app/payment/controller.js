const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus }
            const payment = await Payment.find()
            .populate('banks')
            
            res.render('admin/payment/view_payment', {
                payment,
                alert,
                name: req.session.user.name,
                title: 'Payment'
            });
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    viewCreate: async (req, res) => {
        try {
            const bank = await Bank.find();
            res.render('admin/payment/create', {
                bank,
                name: req.session.user.name,
                title: 'Add Payment'
            });
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { type, banks } = req.body;
            let payment = await Payment({ type, banks});
            await payment.save();

            req.flash('alertMessage', "Successfully add payment");
            req.flash('alertStatus', 'success');
            res.redirect('/payment');
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;

            let payment = await Payment.findOne({_id: id})
            .populate('banks');

            const banks = await Bank.find();
            
            res.render('admin/payment/edit', {
                payment,
                banks,
                name: req.session.user.name,
                title: 'Edit Payment'
            });
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { type, banks } = req.body;
            await Payment.findOneAndUpdate({_id: id}, { type, banks}, { includeResultMetadata: true })

            req.flash('alertMessage', "Successfully edit payment");
            req.flash('alertStatus', 'success');

            res.redirect('/payment');
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;
            await Payment.findOneAndRemove({
                _id: id
            }, { includeResultMetadata: true });

            req.flash('alertMessage', "Successfully delete payment");
            req.flash('alertStatus', 'success');
            
            res.redirect('/payment');
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    },
    actionStatus: async (req, res) => {
        try {
            const { id } = req.params;
            let payment = await Payment.findOne({_id: id});
            let status = payment.status === 'Y' ? 'N' : 'Y';

            payment = await Payment.findOneAndUpdate({
                _id: id
            }, {status}, { includeResultMetadata: true });

            req.flash('alertMessage', "Successfully update payment");
            req.flash('alertStatus', 'success');
            
            res.redirect('/payment');
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/payment');
        }
    }
}