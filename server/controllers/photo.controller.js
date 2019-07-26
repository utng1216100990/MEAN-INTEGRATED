const Photo = require('../models/photo');
const photoCtrl = {};
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const fs = require('fs-extra');

/* METHODS */
photoCtrl.getPhotos = async (req, res) => {
    const photos = await Photo.find();
    res.json(photos);
};

photoCtrl.createPhoto = async (req, res) => {
    const { title, description } = req.body;
    console.log(req.file);
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result);

    const photo = new Photo({
        title,
        description,
        imageURL: result.url,
        public_id: result.public_id
    });
    await photo.save();
    await fs.unlink(req.file.path);
    res.json({ status: "Photo saved!" });
};

photoCtrl.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.json(photo);
};

photoCtrl.editPhoto = async (req, res) => {
    const { id } = req.params;
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const photo = {
        title: req.body.title,
        description: req.body.description,
        imageURL: result.url,
        public_id: result.public_id
    };
    await Photo.findByIdAndUpdate(id, { $set: photo }, { new: true });
    await fs.unlink(req.file.path);
    res.json({ status: "Photo updated!" })
};

photoCtrl.deletePhoto = async (req, res) => {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    console.log(result);
    res.json({ status: "Photo deleted!" });
};

module.exports = photoCtrl;