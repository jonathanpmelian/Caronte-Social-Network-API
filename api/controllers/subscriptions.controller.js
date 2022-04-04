const SubscriptionModel = require("../models/subscription.model");
const UserModel = require("../models/user.model");

async function addSubscription(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id)
    const userSubscribe = await UserModel.findById(req.params.userId)
    const index = userSubscribe.subscribers.findIndex(elem => {
      return elem._id.toString() === user.id
    })
    if (userSubscribe.premium && index === -1) {
      req.body.available = true;
      req.body.price = req.body.type === "Anual" ? 110 : req.body.type
        === "Monthly" ? 10 : 4;
      req.body.user = req.params.userId
      const subscription = await SubscriptionModel.create(req.body);
      user.subscriptions.push(subscription);
      userSubscribe.subscribers.push(user.id)
      userSubscribe.influence++
      await user.save()
      await userSubscribe.save()

      return res.status(200).json(subscription)
    } else {
      res.status(403).send(`User is not Premium`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(`Error adding subscription ${err}`)

  }
}

async function getAllSubscriptions(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id);

    res.status(200).json(user.subscriptions);
  } catch (err) {
    console.log(err)
    res.status(500).send(`Error getting all subscriptions ${err}`)
  }
}




module.exports = { addSubscription, getAllSubscriptions }