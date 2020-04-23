const Snap = require("../models/Snap");
const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("GET request sent to /snaps");

  const filter = { ...req.query };
  console.log(filter);

  console.log(req.user);
  Snap.find(filter)
    .then(snapList => {
      let score = 0;

      if (req.user) {
        score = req.user.score;
      }
      res.json({ snapList: snapList, score: score });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/", (req, res, next) => {
  console.log("POST request sent to /snaps");
  const newSnap = req.body;
  const currentDate = new Date();
  const expiryDate = new Date(currentDate.getTime() + 86400000);
  Snap.create({
    title: newSnap.title,
    description: newSnap.description,
    category: newSnap.category,
    user: req.user._id,
    location: newSnap.location,
    address: newSnap.address,
    image: newSnap.image,
    expireAt: expiryDate
  })
    .then(snapDocument => {
      // console.log(snapDocument);

      User.updateOne(
        { _id: req.user._id },
        {
          $push: {
            snaps: [snapDocument._id]
          },
          $inc: {
            score: 155
          }
        }
      )
        .then(response => {
          console.log(response);
          res.json(snapDocument);
        })

        .catch(err => console.log(err));

      //TODO: need to calculte score of the user
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id", (req, res, next) => {
  // console.log(req.params.id);

  Snap.findById(req.params.id)
    .then(snapDocument => {
      res.json(snapDocument);
    })
    .catch(err => {
      console.log(err);
    });
});

router.patch("/:id", (req, res, next) => {
  console.log("Patch called");
  const editedSnap = req.body;

  Snap.findById(req.params.id)
    .then(snapDocument => {
      if (snapDocument.user._id.toString() !== req.user._id.toString()) {
        console.log(typeof snapDocument.user._id);
        console.log(typeof req.user._id);
        console.log("Only the owner of a snap can edit the snap");
        return res
          .status(400)
          .json({ message: "Only the owner of a snap can edit the snap" });
      }

      Snap.updateOne(
        { _id: snapDocument._id },
        {
          title: editedSnap.title,
          description: editedSnap.description,
          category: editedSnap.category,
          location: editedSnap.location,
          address: editedSnap.address
        }
      )
        .then(response => {
          console.log(response);
          res.json();

          //TODO - update the score / category count
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));
});

router.delete("/:id", (req, res, next) => {
  Snap.findById(req.params.id)
    .then(snapDocument => {
      //check if snap was created by the logged in user. If not, the snap cannot be deleted
      if (snapDocument.user.toString() !== req.user._id.toString()) {
        // console.log("not the same");
        return res
          .status(400)
          .json({ message: "Only the owner of a snap can delete the snap" });
      }

      //delete the snap in the database
      Snap.deleteOne({ _id: snapDocument._id })
        .then(() =>
          User.updateOne(
            { _id: snapDocument.user },
            {
              $pull: {
                snaps: snapDocument._id
              },
              $inc: { score: -155 }

              //TODO - update the score / category count
            }
          )
        )
        .then(response => {
          // console.log(response);
          res.json({ message: "User updated" });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;

// for testing purposes:
/* title:should be deleted friday afternoon at 15:21
description:test
category:free
location:berlin
image:image */
