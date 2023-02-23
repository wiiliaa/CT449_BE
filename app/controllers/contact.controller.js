const { NextRequest } = require("next/server");
const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");

const MongoDB = require("../utils/mongodb.util");


exports.create = (req, res) => {
    res.send({ message: "create handler" });
};


exports.update = (req, res) => {
    res.send({ message: "update handler" });
};
exports.delete = (req, res) => {
    res.send({ message: "delete handler" });
};
exports.deleteAll = (req, res) => {
    res.send({ message: "delete all handler" });
};
exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handler" });
};



exports.create = async (req, res, next) => {
    if (!req.body?.name){
        return next(new ApiError(400, "Name can not be empty"));        
    }
    try {
        const contactService = new ContactService(MongoDB,client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } 
    catch (error){
        return next(
            new ApiError(500, "An error occurred wile creating the contact")
        );
    }
};

exports.finAll = async (req, res, next) => {
    let document= [];

    try{
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if(name){
            document = await contactService.findByName(name);
        } else {
            document = await contactService.fin({})
        }
    } catch (error){
        return next(
            new ApiError(500, "An error occured while retrieving contacts")
        );
    }
    return res.send(documents);
}


exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);

        if(!document){
            return next(new ApiError(404, " Contact not found"))
        }
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(
                500, `Error retrieving contact with id=$(req.params.id)`
            )
        )
    }
}

exports.update = async (req,res,next) => {
    if (Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"))
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "Contact not found"))
        } 
        return res.send({ message: "Contact was update successfully"})
    } catch (error){
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        )
    }

    exports.delete = async (req, res, next) => {
        try {
            const contactService = new ContactService(MongoDB.client);
            const document = await contactService.delete(req.params.id);
    
            if(!document){
                return next(new ApiError(404, " Contact not found"))
            }
            return res.send({message: " Contact was deleted successfully"});
        } catch (error){
            return next(
                new ApiError(
                    500, `Could nott delete contact with id=$(req.params.id)`
                )
            )
        }
    }

    exports.findAllFavorite = async (_req,res,next) => {
        try{
            const contactService = new ContactService(MongoDB.client);
            const document = await contactService.findAllFavorite();
            return res.send(documents)
        }catch ( error)
        {return next (new ApiError(500, "An error occurred while retrieving favorite contacts"))}
    }

    exports.delete = async (_req, res, next) => {
        try {
            const contactService = new ContactService(MongoDB.client);
            const document = await contactService.deleteAll();
    
            if(!document){
                return next(new ApiError(404, " Contact not found"))
            }
            return res.send({message: " Contact was deleted successfully"});
        } catch (error){
            return next(
                new ApiError(
                    500, `Could nott delete contact with id=$(req.params.id)`
                )
            )
        }
    }

}