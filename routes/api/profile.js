const express = require("express");
const router = express.Router();
const profileValidator = require("../../validation/profile");
const experiencevalidator = require("../../validation/experience");
const educationValidator = require("../../validation/education");
const {
  getUserProfile,
  createUserProfile,
  addExperience,
  addEducation,
  removeExperience,
  removeEducation,
  deleteAccount,
  updateEducation,
} = require("../../controller/profile");
const passport = require("passport");
const { Passport } = require("passport");
const clearCache = require("../../middleware/cleanCache");

// @route GET api/profile
// @desc  get user profile
// @access protected
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);

// @route POST api/profile/create
// @desc  CREATE user profile
// @access protected
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  profileValidator,
  createUserProfile
);

// @route POST api/profile/experience
// @desc  add experience to the profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  experiencevalidator,
  addExperience
);

// @route POST api/profile/education
// @desc  add experience to the profile
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  educationValidator,
  addEducation
);

// @route DELETE api/profile/experience/:id
// @desc  delete experience based on Id
// @access Private
router.delete(
  "/experience/:id",
  passport.authenticate("jwt", { session: false }),
  removeExperience
);

// @route DELETE api/profile/education/:id
// @desc  delete education based on Id
// @access Private
router.delete(
  "/education/:id",
  passport.authenticate("jwt", { session: false }),
  clearCache,
  removeEducation
);

// @route DELETE api/profile/:id
// @desc  delete account based on Id
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteAccount
);

// @route Put api/profile/education/:educationId
// @desc  Update education details
// @access Private

router.put(
  "/education/:educationId",
  passport.authenticate("jwt", { session: false }),
  educationValidator,
  updateEducation
);

module.exports = router;
