const express = require("express");
const router = express.Router();
const Contacts = require("../../model/index");
const {
  validCreateContact,
  validUpdateContact,
  validObjectId,
} = require("./validation");
const handleError = require("../../helper/handle-error");

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await Contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        allContacts,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", validObjectId, async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
});

// router.post("/", validCreateContact, async (req, res, next) => {
//   try {
//     const contact = await Contacts.addContact(req.body);
//     return res.status(201).json({
//       status: "success",
//       code: 201,
//       data: {
//         contact,
//       },
//     });
//   } catch (e) {
//     next(e);
//   }
// });

router.post(
  "/",
  validCreateContact,
  handleError(async (req, res, next) => {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  })
);

router.put(
  "/:id",
  validObjectId,
  validUpdateContact,
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(req.params.id, req.body);
      if (contact) {
        return res.json({
          status: "success",
          code: 200,
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          data: "Not Found",
        });
      }
    } catch (e) {
      next(e);
    }
  }
);

router.delete("/:id", validObjectId, async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "Contact Delete",
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
});

router.patch(
  "/:id",
  validObjectId,
  validUpdateContact,
  async (req, res, next) => {
    try {
      if (req.body) {
        const contact = await Contacts.updateStatusContact(
          req.params.id,
          req.body
        );
        if (contact) {
          return res.json({
            status: "success",
            code: 200,
            data: {
              contact,
            },
          });
        } else {
          return res.status(404).json({
            status: "error",
            code: 404,
            data: "Not found",
          });
        }
      } else {
        return res.status(400).json({
          status: "error",
          code: 400,
          message: "missing field favorite",
        });
      }
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
