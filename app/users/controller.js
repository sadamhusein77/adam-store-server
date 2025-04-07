const User = require('../users/model');
const bcrypt = require('bcryptjs');

module.exports = {
    viewSignin: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };

            if(!req.session.user) {
                return res.render('admin/users/view_signin', {
                    alert,
                    title: 'Signin'
                });
            }

            res.redirect('/dashboard');
            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/');
        }
    },
    actionSignin: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log('pass', password)
            const check = await User.findOne({ email });
            

            if(!check || !check?.status === 'Y') {
                req.flash('alertMessage', 'Wrong email or password');
                req.flash('alertStatus', 'danger');
                return res.redirect('/');
            }

            const checkPassword = await bcrypt.compare(password, check.password);
            if(!checkPassword) {
                req.flash('alertMessage', 'Wrong email or password');
                req.flash('alertStatus', 'danger');
                return res.redirect('/');
            }

            req.session.user = {
                id: check._id,
                email: check.email,
                status: check.status,
                name: check.name
            }

            res.redirect('/dashboard');

        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/');
        }
    },
    actionLogout : (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
}