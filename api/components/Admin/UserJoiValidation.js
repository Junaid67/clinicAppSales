const Joi = require('joi');
const roleEnumType = { doctor: 2, assistant: 3 };

const signUpValidation = Joi.object()
    .keys({
        body: Joi.object({
            name: Joi.string().strict().label('Name').required(),
            email: Joi.string().strict().label('Email').required(),
            password: Joi.string().strict().min(8).label('Password').required(),
            phone: Joi.string().strict().label('Phone').required(),
            userId: Joi.string().strict().label('UserId').required(),
            organizationId: Joi.string().strict().required().label('organizationId'),
            roleId: Joi.number().valid(roleEnumType.doctor, roleEnumType.assistant).required().label('roleId 2 for Doctor and 3 for Assistant')
        }).unknown(true),
    });

const updateUserValidation = Joi.object()
    .keys({
        query: Joi.object({
            userId: Joi.required().label('UserId'),
        }),
        body: Joi.object({
            name: Joi.string().strict().label('Name'),
            email: Joi.string().strict().label('Email'),
            password: Joi.string().strict().min(8).label('Password'),
            phone: Joi.string().strict().label('Phone'),
            userId: Joi.string().strict().label('UserId'),
            organizationId: Joi.string().strict().required().label('organizationId'),
        }).unknown(true),
    });
const resetPasswordValidation = Joi.object()
    .keys({
        body: Joi.object({
            adminId: Joi.number().strict().label('adminId').required(),
            password: Joi.string().strict().min(8).label('Password').required()
        }).unknown(true),
    });
    const resetPhysicianPasswordValidation = Joi.object()
    .keys({
        body: Joi.object({
            userId: Joi.number().strict().label('userId').required(),
            password: Joi.string().strict().min(8).label('Password').required()
        }).unknown(true),
    });

const loginValidation = Joi.object()
    .keys({
        body: Joi.object({
            email: Joi.string().strict().label('Email').required(),
            password: Joi.string().strict().min(8).label('Password').required()
        }).unknown(true),
    });

const getUserByOrgIdValidation = Joi.object()
    .keys({
        query: Joi.object({
            organizationId: Joi.required().label('organizationId'),
        }).unknown(true),
    });

const userLoginValidation = Joi.object()
    .keys({
        body: Joi.object({
            userId: Joi.string().strict().label('userId').required(),
            organizationId: Joi.string().strict().label('organizationId').required(),
            password: Joi.string().strict().min(8).label('Password').required()
        }).unknown(true),
    });
const deleteUserValidation = Joi.object()
    .keys({
        query: Joi.object({
            userId: Joi.required().label('userId')
        }).unknown(true),
    });

const createOrganizationValidation = Joi.object()
    .keys({
        body: Joi.object({
            name: Joi.string().strict().label('Name').required(),
            email: Joi.string().strict().label('Email').required(),
            password: Joi.string().strict().min(8).label('Password').required(),
            organizationId: Joi.string().strict().label('organizationId').required(),
            status: Joi.number().strict().label('status').required(),
            validTill: Joi.string().strict().label('validTill').required()
        }).unknown(true),
    });
const updateOrganizationValidation = Joi.object()
    .keys({
        query: Joi.object({
            id: Joi.required().label('id'),
        }),
        body: Joi.object({
            name: Joi.string().strict().label('Name'),
            email: Joi.string().strict().label('Email'),
            organizationId: Joi.string().strict().label('organizationId').required(),
            status: Joi.number().strict().label('status'),
            validTill: Joi.string().strict().label('validTill')
        }).unknown(true),
    });
    const updatePhysicianProfileValidation = Joi.object()
    .keys({
        body: Joi.object({
            name: Joi.string().strict().label('Name').required(),
            email: Joi.string().strict().label('Email').required(),
            password: Joi.string().strict().min(8).label('Password').required(),
            phone: Joi.string().strict().label('Phone').required(),
            userId: Joi.string().strict().label('UserId').required(),
            organizationId: Joi.string().strict().required().label('organizationId').required(),
        }).unknown(true),
    });
module.exports = {
    signUpValidation,
    loginValidation,
    getUserByOrgIdValidation,
    updateUserValidation,
    resetPasswordValidation,
    userLoginValidation,
    createOrganizationValidation,
    updateOrganizationValidation,
    deleteUserValidation,
    updatePhysicianProfileValidation,
    resetPhysicianPasswordValidation
}