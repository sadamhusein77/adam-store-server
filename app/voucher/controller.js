const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const {formatToIDR} = require('../../helper');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus }
            const voucher = await Voucher.find()
            .populate('category')
            .populate('nominals')
            
            res.render('admin/voucher/view_voucher', {
                voucher,
                alert,
                config
            });
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    viewCreate: async (req, res) => {
        try {
            const category = await Category.find();
            const nominal = await Nominal.find();
            res.render('admin/voucher/create', {
                category,
                nominal,
                formatToIDR
            });
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { name, category, nominals } = req.body;
            if(!req.file) {
                const voucher = await Voucher({name, category, nominals});
                await voucher.save();
                req.flash('alertMessage', "Successfully add new voucher");
                req.flash('alertStatus', 'success');

                return res.redirect('/voucher');
            }
    
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);
    
            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
    
            src.pipe(dest)
    
            src.on('end', async () => {
                try {
                    const voucher = await Voucher({name, category, nominals, thumbnail: filename});
                    await voucher.save();
                    req.flash('alertMessage', "Successfully add new voucher");
                    req.flash('alertStatus', 'success');
    
                    res.redirect('/voucher');
                } catch (error) {
                    req.flash('alertMessage', `${err.message}`);
                    req.flash('alertStatus', 'danger');
                    res.redirect('/voucher');
                }
            });
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;

            const category = await Category.find();
            const nominal = await Nominal.find();
            let voucher = await Voucher.findOne({_id: id})
            .populate('category')
            .populate('nominals')
            
            res.render('admin/voucher/edit', {
                voucher,
                category,
                nominal,
                formatToIDR,
                config
            });
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, category, nominals } = req.body;
            if(!req.file) {
                const voucher = await Voucher.findOneAndUpdate({_id: id}, {name, category, nominals}, { includeResultMetadata: true })
                await voucher.save();
                req.flash('alertMessage', "Successfully add new voucher");
                req.flash('alertStatus', 'success');

                return res.redirect('/voucher');
            }
    
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);
    
            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
    
            src.pipe(dest)
    
            src.on('end', async () => {
                try {
                    const voucher = await Voucher.findOne({_id: id});
                    let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`
                    if(fs.existsSync(currentImage)) {
                        fs.unlinkSync(currentImage);
                    }

                    await Voucher.findOneAndUpdate({_id: id}, {name, category, nominals, thumbnail: filename}, { includeResultMetadata: true })

                    req.flash('alertMessage', "Successfully edit voucher");
                    req.flash('alertStatus', 'success');
    
                    res.redirect('/voucher');
                } catch (error) {
                    req.flash('alertMessage', `${err.message}`);
                    req.flash('alertStatus', 'danger');
                    res.redirect('/voucher');
                }
            });
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;
            const voucher = await Voucher.findOneAndRemove({
                _id: id
            }, { includeResultMetadata: true });

            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`
            if(fs.existsSync(currentImage)) {
                fs.unlinkSync(currentImage);
            }

            req.flash('alertMessage', "Successfully delete voucher");
            req.flash('alertStatus', 'success');
            
            res.redirect('/voucher');
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    },
    actionStatus: async (req, res) => {
        try {
            const { id } = req.params;
            let voucher = await Voucher.findOne({_id: id});
            let status = voucher.status === 'Y' ? 'N' : 'Y';

            voucher = await Voucher.findOneAndUpdate({
                _id: id
            }, {status}, { includeResultMetadata: true });

            req.flash('alertMessage', "Successfully update voucher");
            req.flash('alertStatus', 'success');
            
            res.redirect('/voucher');
        } catch (error) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    }
}