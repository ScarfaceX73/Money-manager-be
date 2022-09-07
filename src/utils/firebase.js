const { initializeApp, applicationDefault } = require("firebase-admin/app");
const firebaseAdmin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const { Admin } = require("mongodb");
const serviceAccount = require("../firebase-service-account.json");

const firebaseApp = initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});


const verifyUser = async (req) => {
  const userIdToken = req?.headers?.authorization;
  const isValid = await getAuth(firebaseApp).verifyIdToken(userIdToken);
  if (isValid) {
    return true;
  }
  return false;
};

const getUserId = async (req) => {
  const userIdToken = req?.headers?.authorization;
  const userDetails =
    (await getAuth(firebaseApp).verifyIdToken(userIdToken)) ?? {};
  const userId = userDetails?.uid ?? "";
  return userId;
};

module.exports = { verifyUser, getUserId };
