const templateCategoryJoiValidation = require('./TemplateCategoryJoiValidation');
const templateParagraphJoiValidation = require('./TemplateParagraphJoiValidation');
const TemplateCategoryRoutes = require('./TemplateCategoryRoutes');
const TemplateParagraphRoutes = require('./TemplateParagraphRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    templateCategoryRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, TemplateCategoryRoutes),
    templateParagraphRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, TemplateParagraphRoutes),
    templateCategoryJoiValidation,
    templateParagraphJoiValidation

};
