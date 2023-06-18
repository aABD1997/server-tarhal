const express = require("express");
const router = express.Router();
const guideController = require("../controllers/guideController");
const upload = require("../middleware/uploadMiddleware");
const authAdmin = require('../middleware/auth/authAdmin')
// GET all guides
router.get("/", guideController.getAllGuides);

// GET a single guide by ID
router.get("/:id", guideController.getGuideById);

router.get("/city/:id", guideController.getGuidesByCitytId);


// POST create a new guide
router.post("/", upload.single("image"), guideController.createGuide);

// PUT update a guide by ID
router.put("/:id", upload.single("image"), guideController.updateGuide);

// DELETE a guide by ID
router.delete("/:id", authAdmin,guideController.deleteGuide);

module.exports = router;
