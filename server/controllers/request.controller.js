const asyncHandler = require('express-async-handler');
const Request = require('../models/request.js');
const User = require('../models/user.js');

// TODO get all requests
// TODO make sure that they can only access their requests and no one else

// TODO need to implement requestee
// To get the requestee, probably when a button is clicked it automatically gets the profile and uses it as an input
const createRequest = async(req, res) => {
    const newTitle = req.body.title;
    const newDescrip = req.body.description;
    const newRequester = req.user.id;
    // const newRequestee = req.user.requestee;

    const newRequest = new Request({
    title: newTitle,
    description: newDescrip,
    requester: newRequester,
    // requestee: newRequestee
    });

    try {
        await newRequest.save();
        res.status(200).json({
            title: newTitle,
            description: newDescrip,
            status: newRequest.status,
            requester: newRequester,  
            // requestee: newRequestee
        });
    }
    catch(error) {
        res.status(500).json({ message: error.message });
        }
};

const getAllRequestsByStatus = async (req, res) => {
    const requests = await Request.find({ status: req.body.status, requestee: req.user.id })
    res.status(200).json(requests)
};
const getRequestDetail = async (req, res) => {};

const updateRequestStatus = async (req, res) => {
    const updateRequestStatus = await Request.findByIdAndUpdate(req.params.id, {
        status: req.body.status
      });
    res.status(200).json(updateRequestStatus);
    res.send(updateRequestStatus);
};

const deleteRequest = async (req, res) => {
    const request = await Request.findById(req.params.id)
    await request.deleteOne()
    res.status(200).json({ message: "deleted successfully!!"})
};

module.exports = {
    getAllRequestsByStatus,
    getRequestDetail,
    createRequest,
    updateRequestStatus,
    deleteRequest
}