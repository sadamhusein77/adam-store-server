module.exports = {
    isLoginAdmin: (req, res, next) => {
        if(!req.session.user) {
            req.flash('alertMessage', 'Session has been expired, kindly re-login');
            req.flash('alertStatus', 'danger');
            return res.redirect('/');
        }

        next();
    }
}