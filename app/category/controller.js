const Category = require('./model')
module.exports = {
    index: async (req, res) => {
        try {
            const category = await Category.find();
            res.render('admin/category/view_category', {
                category
            });
        } catch (error) {
            console.error('Error', error);
        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/category/create');
        } catch (error) {
            console.error('Error', error);
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { name } = req.body;
            let category = await Category({name});

            await category.save();
            res.redirect('/category');
        } catch (error) {
            console.error('Error', error);
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;
            let category = await Category.findOne({_id: id});
            
            res.render('admin/category/edit', {
                category
            });
        } catch (error) {
            console.error('Error', error);
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await Category.findOneAndUpdate({
                _id: id
            }, { name }, { includeResultMetadata: true });
            
            res.redirect('/category');
        } catch (error) {
            console.error('Error', error);
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;
            await Category.findOneAndRemove({
                _id: id
            }, { includeResultMetadata: true });
            
            res.redirect('/category');
        } catch (error) {
            console.error('Error', error);
        }
    }
}