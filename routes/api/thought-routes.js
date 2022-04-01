const router = require("express").Router();

const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require("../../controllers/thought-controller");

// Thought routes: /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// Get one thought by id, update one thought by id, delete one thought by id
router.route("/:thoughtId").get(getOneThought).put(updateThought).delete(deleteThought);

// Create a reaction to a thought
router.route("/:thoughtId/reactions").post(addReaction);

// Delete a reaction to a thought
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;