const Category = require('./model')
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus }
            const category = await Category.find();
            res.render('admin/category/view_category', {
                name: req.session.user.name,
                title: 'Category',
                category,
                alert
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/category/create', 
                {
                    name: req.session.user.name,
                    title: 'Add Category'
                }
            );
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { name } = req.body;
            let category = await Category({name});

            await category.save();
            req.flash('alertMessage', "Successfully add new category");
            req.flash('alertStatus', 'success');

            res.redirect('/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;
            let category = await Category.findOne({_id: id});
            
            res.render('admin/category/edit', {
                category,
                name: req.session.user.name,
                title: 'Edit Category'
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await Category.findOneAndUpdate({
                _id: id
            }, { name }, { includeResultMetadata: true });

            req.flash('alertMessage', "Successfully edit category");
            req.flash('alertStatus', 'success');
            
            res.redirect('/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;
            await Category.findOneAndRemove({
                _id: id
            }, { includeResultMetadata: true });

            req.flash('alertMessage', "Successfully delete category");
            req.flash('alertStatus', 'success');
            
            res.redirect('/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    }
}