const Joi = require('joi');

const createNotesDataValidation = Joi.object()
    .keys({
        body: Joi.object({
            title: Joi.string().strict().label('title').required(),
            // headH: Joi.string().strict().label('headH').required(),
            headP: Joi.string().strict().label('headP').required(),
            // footerH: Joi.string().strict().label('footerH').required(),
            footerP: Joi.string().strict().label('footerP').required(),
            sign: Joi.string().strict().label('sign').required(),
            logo: Joi.string().strict().label('logo').required(),
            logoWidth: Joi.number().strict().label('logoWidth').required(),
            logoHeight: Joi.number().strict().label('logoHeight').required(),
        }).unknown(true),
    });

const updateNotesDataValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            title: Joi.string().strict().label('title'),
            headH: Joi.string().strict().label('headH'),
            headP: Joi.string().strict().label('headP'),
            footerH: Joi.string().strict().label('footerH'),
            footerP: Joi.string().strict().label('footerP'),
            sign: Joi.string().strict().label('sign'),
            logo: Joi.string().strict().label('logo'),
            logoWidth: Joi.string().strict().label('logoWidth'),
            logoHeight: Joi.string().strict().label('logoHeight'),
        }).unknown(true),
    });

const deleteNotesDataValidation = Joi.object()
    .keys({
        query: Joi.object({
            notesdataId: Joi.required().label('notesdataId')
        }).unknown(true),
    });
 const checkNoteTemplateValidation= Joi.object()
 .keys({
     body: Joi.object({
        sign: Joi.string().strict().label('sign').required(),
        logo: Joi.string().strict().label('logo').required(),
        logoWidth: Joi.string().strict().label('logoWidth'),
        logoHeight: Joi.string().strict().label('logoHeight'),
        headerHTML: Joi.string().strict().label('headerHTML'),
        footerHTML: Joi.string().strict().label('footerHTML'),
    }).unknown(true),
});

module.exports = {
    createNotesDataValidation,
    updateNotesDataValidation,
    deleteNotesDataValidation,
    checkNoteTemplateValidation

}