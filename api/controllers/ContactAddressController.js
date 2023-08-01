/**
 * ContactAddressController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    updateAddress: async (req, res) => {
        const { body } = req;
        try {

            // let isValidNumbers = true;
            // if (body.phone != undefined) {
            //     if (!Array.isArray(body.phone)) {
            //         isValidNumbers = false;
            //     } else {
            //         body.phone = JSON.stringify(body.phone);
            //     }
            // }

            // if (!isValidNumbers) {
            //     throw ({
            //         message: `'phone' must be an array of phone numbers`
            //     });
            // }
            // console.log(body)
            const response = await sails.models.contactaddress.updateOne({ id: body.id }).set(body).usingConnection(sails.db);
            if (!response) {
                return res.error({ message: `Cannot get updateAddress with id: ${body.id}` });
            }
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteAddress: async (req, res) => {
        const { query: { contactAddressId } } = req;
        try {
            const response = await sails.models.contactaddress.destroyOne({ id: contactAddressId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'Contact Address Deleted Successfully!' });
            } else {
                res.ok({ mesage: `Contact Address Not Found With this Id: ${contactAddressId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }

};

