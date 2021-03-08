const mongoose = require("mongoose");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const profile = require("../validation/profile");
const redis = require("redis");
const util = require("util");

exports.getUserProfile = async (req, res, next) => {
  const errors = {};
  const redisUrl = "redis://127.0.0.1:6379";
  const client = redis.createClient(redisUrl);
  client.on("error", (error) => console.log(error));
  const getAsync = util.promisify(client.get).bind(client);
  //console.log(client);
  try {
    //Do we have any cached data in redis related
    //to this query
    const cachedProfile = await getAsync(req.user.id);

    //if yes, then respond to the request right away and return
    if (cachedProfile) {
      console.log("serving from cache");
      return res.status(200).json(JSON.parse(cachedProfile));
    }
    //if no, we need to respond to request and update the cache to store the data
    console.log("serving from database");
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      errors.noProfile = "There is no profile for this user";
      return res.status(404).json(errors);
    }
    client.set(req.user.id, JSON.stringify(profile));
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createUserProfile = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("this is running");
    let errObj = {};
    errors = errors.array();
    for (let i of errors) {
      errObj[i.param] = i.msg;
    }
    return res.status(400).json(errObj);
  }

  const profileFields = {};
  profileFields.social = {};
  profileFields.user = req.user.id;

  for (let field in req.body) {
    if (
      field == "youtube" ||
      field == "facebook" ||
      field == "instagram" ||
      field == "twitter" ||
      field == "linkedin"
    ) {
      profileFields.social[field] = req.body[field] ? req.body[field] : "";
    } else if (field === "skills") {
      profileFields.skills = req.body.skills.split(",");
    } else if (
      field === "handle" ||
      field === "company" ||
      field === "website" ||
      field === "location" ||
      field === "status" ||
      field === "bio" ||
      field === "githubUserName"
    ) {
      profileFields[field] = req.body[field] ? req.body[field] : "";
    }
  }

  //find the profile

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      if (updatedProfile) {
        res.json(updatedProfile);
      }
    } else {
      const exists = await Profile.findOne({ handle: profileFields.handle });
      if (exists) {
        errors.handle = "That handle already exists";
        return res.status(4000).json(errors);
      }
      const newProfile = new Profile(profileFields);
      newProfile
        .save()
        .then((result) => {
          res.status(200).json({
            message: "Created Successfully",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addExperience = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("this is running");
    let errObj = {};
    errors = errors.array();
    for (let i of errors) {
      errObj[i.param] = i.msg;
    }
    return res.status(400).json(errObj);
  }

  try {
    const userProfile = await Profile.findOne({ user: req.user.id });
    if (userProfile) {
      const newExp = {};
      for (let field in req.body) {
        if (
          field === "title" ||
          field === "company" ||
          field === "location" ||
          field === "from" ||
          field === "to" ||
          field === "current" ||
          field === "description"
        ) {
          newExp[field] = req.body[field] ?? req.body[field];
        } else {
          continue;
        }
      }
      //adding the experience to the profile
      userProfile.experience.unshift(newExp);
      userProfile
        .save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => console.log(err));
    } else {
      res.status(400).json({
        message: "No profile found maybe create one",
      });
    }
  } catch (error) {
    console.log(err);
  }
};

exports.addEducation = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("this is running");
    let errObj = {};
    errors = errors.array();
    for (let i of errors) {
      errObj[i.param] = i.msg;
    }
    return res.status(400).json(errObj);
  }

  try {
    const userProfile = await Profile.findOne({ user: req.user.id });
    if (userProfile) {
      const newEdu = {};
      for (let field in req.body) {
        if (
          field === "school" ||
          field === "degree" ||
          field === "fieldOfStudy" ||
          field === "from" ||
          field === "to" ||
          field === "current" ||
          field === "description"
        ) {
          newEdu[field] = req.body[field] ?? req.body[field];
        } else {
          continue;
        }
      }
      //adding the experience to the profile
      userProfile.education.unshift(newEdu);
      userProfile
        .save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => console.log(err));
    } else {
      res.status(400).json({
        message: "No profile found maybe create one",
      });
    }
  } catch (error) {
    console.log(err);
  }
};

exports.removeExperience = async (req, res, next) => {
  const expId = req.params.id;
  if (!expId) {
    return res.status(400).json({ error: "Id not define" });
  }
  try {
    const userProfile = await Profile.findOne({ user: req.user.id });
    if (!userProfile) {
      return res
        .status(400)
        .json({ error: "no user profile found please try after login" });
    }
    const filterExp = userProfile.experience.filter(
      (exp) => exp._id.toString() !== expId.toString()
    );
    userProfile.experience = filterExp;
    userProfile
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
//Removing Education Qualification
exports.removeEducation = async (req, res, next) => {
  const eduId = req.params.id;
  if (!eduId) {
    return res.status(400).json({ error: "Id not define" });
  }
  try {
    const userProfile = await Profile.findOne({ user: req.user.id });
    if (!userProfile) {
      return res
        .status(400)
        .json({ error: "no user profile found please try after login" });
    }
    const filterEdu = userProfile.education.filter(
      (edu) => edu._id.toString() !== eduId.toString()
    );
    userProfile.education = filterEdu;
    userProfile
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

//Delele Account
exports.deleteAccount = async (req, res, next) => {
  const { id } = req.user;
  console.log(id);
  try {
    const profile = await Profile.findOne({ user: id });
    if (profile) {
      await profile.remove();
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Account Deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
