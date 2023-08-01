/**
 * NotesDataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const helpers = require("../utils/validate");
const { getTemplate } = require("../../views/templates/template");
const { getPDFBuffer } = require("../utils/getPdfBuffer");
const chromium = require("chrome-aws-lambda");

module.exports = {
  createNotesData: async (req, res) => {
    const { body } = req;
    try {
      const response = await sails.models.notesdata
        .create(body)
        .fetch()
        .usingConnection(sails.db);
      res.ok(response);
    } catch (error) {
      res.error(error);
    }
  },
  getNotesData: async (req, res) => {
    try {
      const response = await sails.models.notesdata
        .find()
        .usingConnection(sails.db);
      res.ok(response);
    } catch (error) {
      res.error(error);
    }
  },
  updateNotesData: async (req, res) => {
    const { body } = req;
    try {
      const response = await sails.models.notesdata
        .updateOne({ id: body.id })
        .set(body)
        .usingConnection(sails.db);
      if (!response) {
        return res.error({
          message: `Cannot get updateNotesData with id: ${body.id}`,
        });
      }
      res.ok(response);
    } catch (error) {
      res.error(error);
    }
  },
  deleteNotesData: async (req, res) => {
    const {
      query: { notesdataId },
    } = req;
    try {
      const response = await sails.models.notesdata
        .destroyOne({ id: notesdataId })
        .usingConnection(sails.db);
      if (response) {
        res.ok({ mesage: "NotesData  Deleted Successfully!" });
      } else {
        res.ok({ mesage: `NotesData Not Found With this Id: ${notesdataId}` });
      }
    } catch (error) {
      res.error(error);
    }
  },
  checkNoteTemplate: async (req, res) => {
    const { body } = req;
    console.log("logo:" + body.logo);
    try {
      const html = getTemplate(
        {
          signImg: body.sign,
          logoImg: body.logo,
          logoWidth: body.logoWidth,
          logoHeight: body.logoHeight,
          pName: "Jane Doe",
          pDOB: "01-01-1995",
          pHCN: "0000",
          toName: "Dr. John Doe",
          toAddress: "123 Street",
          toCity: "Toronto",
          toProvince: "Ontario",
          toPhone: "0000000",
          toFax: "000000",
          toCC: "000000",
        },
        {
          note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
          headP: body.headerHTML,
          footerP: body.footerHTML,
          flag: 0,
        }
      );
      // console.log(response);
      const buf = Buffer.from(html, "utf8");
      buf.toString();
      const options = {
        format: "A4",
        printBackground: true,
        margin: { top: "1in", right: "1in", bottom: "1in", left: "1in" },
      };
      const pdf = await getPDFBuffer(html, options);
      //   console.log(`data:application/pdf;base64, ${pdf.toString("base64")}`);
      // "data:application/pdf;base64," +
      res.ok({ pdf: `data:application/pdf;base64, ${pdf.toString("base64")}` });
    } catch (error) {
      res.error(error);
    }
  },
};
