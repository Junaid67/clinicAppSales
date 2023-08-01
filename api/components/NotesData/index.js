const notesDataJoiValidation = require('./NotesDataJoiValidation');
const NotesDataRoutes = require('./NotesDataRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    notesDataRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, NotesDataRoutes),
    notesDataJoiValidation
};
