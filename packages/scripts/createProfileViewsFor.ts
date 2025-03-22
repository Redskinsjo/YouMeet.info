import mongoose from "mongoose";
import process from "process";
import BetaUser from "@youmeet/models/betaUsers";
import ProfileView from "@youmeet/models/profileViews";

mongoose.connect(`${process.env.MONGODB_URI}`);

const views = [
  { date: "2024-04-13T07:00:00.000Z", close: 2 },
  { date: "2024-04-14T07:00:00.000Z", close: 2 },
  { date: "2024-04-15T07:00:00.000Z", close: 1 },
  { date: "2024-04-16T07:00:00.000Z", close: 1 },
  { date: "2024-04-26T07:00:00.000Z", close: 1 },
  { date: "2024-04-27T07:00:00.000Z", close: 1 },
  { date: "2024-05-01T07:00:00.000Z", close: 1 },
  { date: "2024-05-05T07:00:00.000Z", close: 1 },
];

// (async () => {
//   let userId;
//   if (process.argv[2].includes("=")) userId = process.argv[2].split("=")[1];
//   else userId = process.argv[2];

//   if (userId) {
//     console.log("found");
//     const user = await BetaUser.findById(userId);
//     if (!user) return console.log("L'utilisateur n'existe pas");
//     for (let i = 0; i < views.length; i++) {
//       const count = views[i].close;
//       const date = new Date(views[i].date);
//       const newView = new ProfileView({
//         count,
//         userId,
//         createdAt: date,
//         updatedAt: date,
//       });
//       await newView.save();
//     }
//     const created = await ProfileView.find({ userId });
//     console.log(created.length);
//   } else {
//     console.log("Il manque le userId dans la commande");
//   }
//   process.exit();
// })();
