const express = require("express");
const router = express.Router();

const { createRequest, getAllRequests, getAllRequestsByStatus, updateRequestStatus, deleteRequest } = require('../controllers/request.controller.js');
const { protect } = require('../middleware/authMiddleware.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/create').post(protect, createRequest);
router.route('/:userid').get(getAllRequests);
router.route('/status/:userid').get(getAllRequestsByStatus);
router.route('/updatestatus/:id').patch(updateRequestStatus);
router.route('/delete/:id').delete(protect, deleteRequest);

module.exports = router;