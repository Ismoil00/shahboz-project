import { loginSchema } from "../assets/loginSchema";
// import { userProfileSchema } from "../data/schemas/userProfile";
// import { newWebsite } from "../data/schemas/newWebsite";
// import { userContactSchema } from "../data/schemas/userContacts";
// import { userServiceSchema } from "../data/schemas/userServices";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";

export const ajv = new Ajv({ allErrors: true });
addErrors(ajv); // to enable custom error messages
addFormats(ajv); // to add formats for ajv

ajv.addSchema(loginSchema, "login");
// ajv.addSchema(userProfileSchema, "userProfile");
// ajv.addSchema(newWebsite, "newWebsite");
// ajv.addSchema(userContactSchema, "userContacts");
// ajv.addSchema(userServiceSchema, "userServices");
