const HttpError = require("../models/http-error");
const User = require("../models/user-model");
const Raffel = require("../models/raffel-winners-model");

const rafffelWinnerController = async (req, res, next) => {
  const { month } = req.body;

  if (month) {
    let usersArray = [];

    let users;
    try {
      users = await User.find();
    } catch (err) {
      const error = new HttpError("User list not found", 400);
      return next(error);
    }

    ////checking with the db
    let ifMonthRaffeled;
    try {
      ifMonthRaffeled = await Raffel.findOne({ month });
    } catch (err) {
      const error = new HttpError("raffel data fetching error", 500);
      return next(error);
    }
    // if (ifMonthRaffeled) {
    //   console.log(ifMonthRaffeled.winner);
    //   const error = new HttpError(
    //     "Raffel has been drawn for this month please check the winners",
    //     404
    //   );
    //   return next(error);
    // }

    ////checking if the user has completed the questions to enter the raffel
    users.map((data) => {
      const monthFromDateObj = data.date.getMonth();
      if (
        data.admin == false &&
        data.isCompleted == true &&
        monthFromDateObj + 1 === month
      ) {
        usersArray.push(data.email);
      }
    });

    let rafffelWinner;
    if (!usersArray.length == 0) {
      const randomNum = Math.floor(Math.random() * usersArray.length);
      rafffelWinner = await usersArray[randomNum];
    }

    ////saving to the db
    let raffelObject;

    if (!ifMonthRaffeled) {
      raffelObject = new Raffel({
        month,
        raffelStatus: true,
        winner: rafffelWinner,
      });
      try {
        await raffelObject.save();
      } catch (err) {
        const error = new HttpError("no raffel found on the give month", 400);
        return next(error);
      }
    }

    if (!ifMonthRaffeled) {
      res.status(201).json({
        winnerObj: raffelObject,
      });
    } else {
      res.status(201).json({
        winnerObj: ifMonthRaffeled,
      });
    }
  }
  // const error = new HttpError("month not found", 400);
  // return next(error);
};

exports.rafffelWinnerController = rafffelWinnerController;
