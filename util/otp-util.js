//API keys for the otp
require("dotenv").config();

const serviceId = process.env.SERVICE_ID;
const accountId = process.env.ACCOUNT_ID;
const authId = process.env.AUTH_ID;

//Global variables
const client = require("twilio")(accountId, authId);

module.exports = {
  doSms: (number) => {
    return new Promise(async (res, rej) => {
      let otp;
      try {
        otp = await client.verify.services(serviceId).verifications.create({
          to: `+91${number}`,
          channel: "sms",
        });
      } catch (err) {
        rej(err);
      }
      res(otp);
    });
  },
  otpVerify: (number, otp) => {
    return new Promise(async (res, rej) => {
      let verify;
      try {
        verify = await client.verify
          .services(serviceId)
          .verificationChecks.create({
            to: `+91${number}`,
            code: otp,
          });
      } catch (err) {
        rej(err);
      }
      res(verify);
    });
  },
};
