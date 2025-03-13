const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateLiting} = require("../middleware.js");

const listingcontroller = require("../controllers/listings.js");
const multer  = require('multer');
const {storage } = require("../cloudConfig.js");
const upload = multer({ storage });



router.route("/")
    .get(wrapAsync( listingcontroller.index ))
    .post(isLoggedIn, upload.single('listing[image][url]'), validateLiting, wrapAsync( listingcontroller.createListing));

// New Route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

router.route("/:id")
    .get(wrapAsync( listingcontroller.showListing ))
    .put(isLoggedIn, isOwner, upload.single('listing[image][url]'), validateLiting, wrapAsync( listingcontroller.updateListing ))
    .delete(isLoggedIn, isOwner, wrapAsync( listingcontroller.destroyListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingcontroller.renderEditForm ));

module.exports = router;