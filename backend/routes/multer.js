const multer = require("multer");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

module.exports.store_image = multer.diskStorage({
  destination: function (req, file, cb) {
    // checking the mime type
    const isvalid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime TYPE");
    if (isvalid) {
      error = null;
    }

    cb(null, 'images')
  },

  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('_');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
})
