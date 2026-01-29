const Newsletter = require("../models/newsletter");

async function subscribeEmail(req, res) {
    const { email } = req.body;

    if(!email) {
        return res.status(400).send({message: "Email is required"});
    }

    const newsletter = new Newsletter({
        email: email.toLowerCase()
     });

     try {
        await newsletter.save();
        res.status(201).send({message: "Email subscribed successfully"});
     } catch (error) {
        res.status(500).send({message: "Email already registered"});
     }
    
}

async function getEmails(req, res) {
    const { page = 1, limit = 10 } = req.query;

    try {
        const emails = await Newsletter.paginate({}, { page, limit });
        res.status(200).send(emails);
    } catch (error) {
        res.status(500).send({message: "Error fetching emails"});
    }
}

async function deleteEmail(req, res) {
    const { id } = req.params;

    try {
        await Newsletter.findByIdAndDelete(id);
        res.status(200).send({message: "Email deleted successfully"});
    } catch (error) {
        res.status(500).send({message: "Error deleting email"});
    }
}

module.exports = {
    subscribeEmail,
    getEmails,
    deleteEmail,
}