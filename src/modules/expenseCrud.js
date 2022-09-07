const { ObjectId } = require("mongodb");
const mongo = require("../connect");
const { getUserId } = require("../utils/firebase");

module.exports.createExpense = async (req, res, next) => {
  try {
    const uId = await getUserId(req);
    const expenseDocument = {
      user_id: uId,
      type: "expense",
      ...(req?.body ?? {}),
    };
    console.log(expenseDocument);
    await mongo.selectedDb.collection("expense").insertOne(expenseDocument);
    res.status(200).send({ message: "Expense added" });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.getExpense = async (req, res, next) => {
  try {
    const uId = await getUserId(req);
    const expenseData = await mongo.selectedDb
      .collection("expense")
      .find({ user_id: { $eq: uId } })
      .toArray();
    res.send(expenseData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports.updateExpense = async (req, res, next) => {
  try {
    const uId = await getUserId(req);
    const updatedData = await mongo.selectedDb
      .collection("expense")
      .findOneAndUpdate(
        { _id: ObjectId(req.params.expenseId) },
        { $set: { ...req.body.expense } },
        { returnOriginal: true }
      );
    res.send(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports.deleteExpense = async (req, res, next) => {
  try {
    const uId = await getUserId(req);
    const deletedData = await mongo.selectedDb
      .collection("expense")
      .remove({ _id: ObjectId(req.params.expenseId) });
    res.send(deletedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
