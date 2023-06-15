const express = require("express");
const router = express.Router();

const { getAllRequestsByStatus, getRequestDetail, createRequest, updateRequestStatus, deleteRequest } = require('../controllers/request.controller.js');
const { protect } = require('../middleware/authMiddleware.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/').get(getAllRequestsByStatus);
router.route('/:id').get(getRequestDetail);
router.route('/create').post(protect, createRequest);
router.route('/:id').patch(protect, updateRequestStatus);
router.route('/:id').delete(protect, deleteRequest);

module.exports = router;