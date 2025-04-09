const Bank = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus }
            const bank = await Bank.find();
            
            res.render('admin/bank/view_bank', {
                name: req.session.user.name,
                title: 'Bank',
                bank,
                alert
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');
        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/bank/create',
                {
                    name: req.session.user.name,
                    title: 'Add Bank'
                }
            );
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { name, nameBank, noRekening } = req.body;
            let bank = await Bank({ name, nameBank, noRekening});
            await bank.save();

            req.flash('alertMessage', "Successfully add bank account");
            req.flash('alertStatus', 'success');
            res.redirect('/bank');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;

            let bank = await Bank.findOne({_id: id});
            
            res.render('admin/bank/edit', {
                bank,
                name: req.session.user.name,
                title: 'Edit Bank'
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, nameBank, noRekening } = req.body;
            await Bank.findOneAndUpdate({_id: id}, {name, nameBank, noRekening}, { includeResultMetadata: true })

            req.flash('alertMessage', "Successfully edit bank");
            req.flash('alertStatus', 'success');

            res.redirect('/bank');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;
            await Bank.findOneAndRemove({
                _id: id
            }, { includeResultMetadata: true });

            req.flash('alertMessage', "Successfully delete bank");
            req.flash('alertStatus', 'success');
            
            res.redirect('/bank');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/bank');
        }
    }
}