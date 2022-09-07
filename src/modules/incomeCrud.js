const { ObjectId } = require("mongodb");
const mongo = require("../connect");
const { getUserId } = require("../utils/firebase");

module.exports.createIncome = async (req, res) => {
  try {
    const uId = await getUserId(req);
    const incomeDocument = {
      user_id: uId,
      type: "income",
      ...(req?.body ?? {}),
    };
    console.log(incomeDocument);
    await mongo.selectedDb.collection("income").insertOne(incomeDocument);
    res.status(200).send({ message: "Income added" });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.getIncome = async (req, res, next) => {
  try {
    const uId = await getUserId(req);
    const incomeData = await mongo.selectedDb
      .collection("income")
      .find({ user_id: { $eq: uId } })
      .toArray();
    res.send(incomeData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports.updateIncome = async (req, res, next) => {
  try {
    const uId = await getUserId(req);
    const updatedData = await mongo.selectedDb
      .collection("income")
      .findOneAndUpdate(
        { _id: ObjectId(req.params.incomeId) },
        { $set: { ...req.body.income } },
        { returnOriginal: true }
      );
    res.send(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports.deleteIncome = async (req, res, next) => {
  try {
    const uId = await getUserId(req);
    const deletedData = await mongo.selectedDb
      .collection("income")
      .remove({ _id: ObjectId(req.params.incomeId) });
    res.send(deletedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
