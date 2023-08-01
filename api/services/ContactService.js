const { isJson } = require('../utils/validate');

const saveContact = async (data) => {
    try {
        if (!isJson(data.addresses)) {
            throw ({
                message: `'addresses' parameter should be stringified JSON`
            });
        }
        data.addresses = JSON.parse(data.addresses);
        if (data.addresses.length === 0) {
            throw ({
                message: `'addresses' length can't be 0`
            });
        }
        let isValidNumbers = true;

        data.addresses.forEach((item) => {
            if (item.phone != undefined) {
                if (!Array.isArray(item.phone)) {
                    isValidNumbers = false;
                }else{
                    item.phone = JSON.stringify(item.phone);
                }
            }
        });
        if (!isValidNumbers) {
            throw ({
                message: `'phone' must be an array of phone numbers`
            });
        }
        const response = await sails.models.contact.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            cpsoNumber: data.cpsoNumber,
            billingNumber: data.billingNumber,
            speciality: data.speciality
        }).fetch().usingConnection(sails.db);
        if (!response) {
            throw ({ message: 'Contact Not created Successfully!' });
        }
        let values = [];
        data.addresses.forEach((item) => {
            item.contactId = response.id;
            values.push(item);
        });
        const responseAddress = await sails.models.contactaddress.createEach(values).fetch().usingConnection(sails.db);
        if (!responseAddress) {
            throw ({ message: 'Contact Address not created Successfuly!' });
        }
        return {
            message: 'New contact has been saved successfully!'
        };
    } catch (error) {
        throw (error);
    }
};

module.exports = {
    saveContact
};
