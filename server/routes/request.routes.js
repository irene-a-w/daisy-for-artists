const express = require("express");
const router = express.Router();

const { createRequest, getAllRequests, getAllRequestsByStatus, updateRequestStatus, deleteRequest } = require('../controllers/request.controller.js');
const { protect } = require('../middleware/authMiddleware.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/create').post(protect, createRequest);
router.route('/').get(getAllRequests);
router.route('/status').get(getAllRequestsByStatus);
router.route('/:id').patch(protect, updateRequestStatus);
router.route('/:id').delete(protect, deleteRequest);

module.exports = router;