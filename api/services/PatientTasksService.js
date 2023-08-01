
const createPatientActivity = async (body, req) => {
    try {
        const activity = await sails.models.patienttasks.create(body).fetch().usingConnection(sails.db);
        if (body.formData != undefined && body.formData != "") {
            let typeId = JSON.parse(body.formData);

            if (typeId.formTypeId != undefined && typeId.formTypeId == 1) {
                //consent form
                await sails.models.patientswaitlist.create({
                    activityId: activity.id,
                    patientId: body.patientId,
                    formtypeId: typeId.id,
                    type: 1,
                    status: 0
                }).usingConnection(sails.db);
                console.log(`Patient with id ${body.patientId} added to consent waitlist.`);

            } else if (
                typeId.formTypeId != undefined &&
                typeId.formTypeId == 2
            ) {
                await sails.models.patientswaitlist.create({
                    activityId: activity.id,
                    patientId: body.patientId,
                    formtypeId: typeId.id,
                    type: 2,
                    status: 0
                }).usingConnection(sails.db);
                console.log(`Patient with id ${body.patientId} added to consent waitlist.`);
            } else if (
                typeId.form_type_id != undefined &&
                typeId.form_type_id == 3
            ) {

                //Req form
                await sails.models.patientswaitlist.create({
                    activityId: activity.id,
                    patientId: body.patientId,
                    formtypeId: typeId.id,
                    type: 3,
                    status: 0
                }).usingConnection(sails.db);
                console.log(`Patient with id ${body.patientId} added to consent waitlist.`);
            }
        }

        if (!activity) {
            return;
        }
        console.log(
            `Patient activity with id ${activity.id} has been inserted successfully!`
        );
        return {
            id: activity.id,
            noteUrl: activity.notePdf || "",
            imageToPdfUrl: activity.noteDrawnPdf || "",
            formUrl: activity.formPdf || "",
            prescriptionUrl: activity.prescriptionPdf || "",
        };
    } catch (error) {
        throw error;
    }
};

const updatePatientActivity = async (body, req) => {
    try {
        const activity = await sails.models.patienttasks.updateOne({ appointmentId: req.body.appointmentId }).set({
            ...body
        }).usingConnection(sails.db);
        if(!activity){
            return;
        }
        console.log(
            `Patient activity with id ${activity.id} has been updated successfully!`
        );
        return {
            // id: activity.id,
            noteUrl: activity.notePdf || "",
            imageToPdfUrl: activity.noteDrawnPdf || "",
            formUrl: activity.formPdf || "",
            prescriptionUrl: activity.prescriptionPdf || "",
        };
    } catch (error) {
        throw error;
    }
};
module.exports = {
    createPatientActivity,
    updatePatientActivity
}