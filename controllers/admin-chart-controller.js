const QuickChart = require("quickchart-js");
const HttpError = require("../models/http-error");

const ShoppingFrequency = require("../models/shoppingFrequency.model");
const ShoppingItem = require("../models/shoppingItem.model");
const ShoppingMethod = require("../models/methodOfTransport-Q-model");
const satisfied = require("../models/satisfy_Q");
const preferOnline = require("../models/prefferOnline-Q");
const preferVisiting = require("../models/visiting-pref-Q");

const adminChartController = async (req, res, next) => {
  ////init items
  let shoppingFrequencyData;
  let shoppingItemData;
  let shoppingMethodData;
  let satisfiedData;
  let prefferedOnlineData;
  let prefferVisitingData;

  try {
    /////get items from db
    shoppingFrequencyData = await ShoppingFrequency.find();
    shoppingItemData = await ShoppingItem.find();
    shoppingMethodData = await ShoppingMethod.find();
    satisfiedData = await satisfied.find();
    prefferedOnlineData = await preferOnline.find();
    prefferVisitingData = await preferVisiting.find();
  } catch (err) {
    const error = new HttpError("fetching data failed", 400);
    return next(error);
  }

  ///map response
  const shoppingFrequencyResponseData = shoppingFrequencyData.map((data) =>
    data.toObject({ getters: true })
  );
  const shoppingItemResponseData = shoppingItemData.map((data) =>
    data.toObject({ getters: true })
  );
  const shoppingmethodResponseData = shoppingMethodData.map((data) =>
    data.toObject({ getters: true })
  );
  const satisfiedResponseData = satisfiedData.map((data) =>
    data.toObject({ getters: true })
  );
  const prefferedOnlineResponseData = prefferedOnlineData.map((data) =>
    data.toObject({ getters: true })
  );
  const prefferedVisitingResponseData = prefferVisitingData.map((data) =>
    data.toObject({ getters: true })
  );

  //map values into an array
  const shopping_frequency_data = shoppingFrequencyResponseData.map(
    (data) => data.value
  );

  const shopping_item_data = shoppingItemResponseData.map((data) => data.value);

  const shopping_method_data = shoppingmethodResponseData.map(
    (data) => data.value
  );
  const satisfied_method_data = satisfiedResponseData.map((data) => data.value);
  const prefferedOnline_method_data = prefferedOnlineResponseData.map(
    (data) => data.value
  );
  const prefferedVisiting_method_data = prefferedVisitingResponseData.map(
    (data) => data.value
  );

  ///data sorted ////////Shopping frequency

  let month_1_3 = 0;
  let month_3_5 = 0;
  let month_5_7 = 0;
  let moreThan_7 = 0;

  for (let i = 0; i < shopping_frequency_data.length; i++) {
    if (shopping_frequency_data[i] === 1) {
      month_1_3++;
    } else if (shopping_frequency_data[i] === 2) {
      month_3_5++;
    } else if (shopping_frequency_data[i] === 3) {
      month_5_7++;
    } else if (shopping_frequency_data[i] === 4) {
      moreThan_7++;
    }
  }
  ///data sorted ////////Shopping items

  let FMCG = 0;
  let GM = 0;
  let FURNITURE = 0;

  for (let i = 0; i < shopping_item_data.length; i++) {
    if (shopping_item_data[i] === 1) {
      FMCG++;
    } else if (shopping_item_data[i] === 2) {
      GM++;
    } else if (shopping_item_data[i] === 3) {
      FURNITURE++;
    }
  }
  ///data sorted ////////Shopping method

  let personal = 0;
  let hire = 0;
  let public = 0;

  for (let i = 0; i < shopping_method_data.length; i++) {
    if (shopping_method_data[i] === 1) {
      personal++;
    } else if (shopping_method_data[i] === 2) {
      hire++;
    } else if (shopping_method_data[i] === 3) {
      public++;
    }
  }
  ///data sorted ////////Satisfaction and  prefference

  let yes = 0;
  let no = 0;
  let Average = 0;
  let visitYes = 0;
  let visitNo = 0;
  let visitAvg = 0;
  let onlineYes = 0;
  let onlineNo = 0;
  let onlineAvg = 0;

  for (let i = 0; i < satisfied_method_data.length; i++) {
    if (satisfied_method_data[i] === 1) {
      yes++;
    } else if (satisfied_method_data[i] === 2) {
      no++;
    } else if (satisfied_method_data[i] === 3) {
      Average++;
    }
  }
  for (let i = 0; i < prefferedOnline_method_data.length; i++) {
    if (prefferedOnline_method_data[i] === 1) {
      onlineYes++;
    } else if (prefferedOnline_method_data[i] === 2) {
      onlineNo++;
    } else if (prefferedOnline_method_data[i] === 3) {
      onlineAvg++;
    }
  }
  for (let i = 0; i < prefferedVisiting_method_data.length; i++) {
    if (prefferedVisiting_method_data[i] === 1) {
      visitYes++;
    } else if (prefferedVisiting_method_data[i] === 2) {
      visitNo++;
    } else if (prefferedVisiting_method_data[i] === 3) {
      visitAvg++;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  const shopping_frequency = new QuickChart();
  shopping_frequency
    .setConfig({
      type: "line",
      data: {
        labels: [
          "1-3 times/month",
          "3-5 times/month ",
          "5-7 times/month",
          "above 7 times",
        ],
        datasets: [
          {
            label: "shopping Frequancy",
            data: [month_1_3, month_3_5, month_5_7, moreThan_7],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
        ],
      },
    })
    .setWidth(600)
    .setHeight(300)
    .setBackgroundColor("transparent");

  const ShoppingFrequency_URL = shopping_frequency.getUrl();

  /////////////////////////////////////////////////////////////////////////////////
  const shopping_method = new QuickChart();
  shopping_method
    .setConfig({
      type: "pie",
      data: {
        labels: ["personal", "hired ", "public"],
        datasets: [
          {
            label: "Method of transport",
            data: [personal, hire, public],
            backgroundColor: ["#ebbcdc", "#55fa91", "#f7ffad"],
          },
        ],
      },
    })
    .setWidth(600)
    .setHeight(300)
    .setBackgroundColor("transparent");

  const ShoppingMethod_Url = shopping_method.getUrl();

  ///////////////////////////////////////////////////////////////////////////////////
  const shopping_item = new QuickChart();
  shopping_item
    .setConfig({
      type: "bar",
      data: {
        labels: ["FMCG", "GM", "FURNITURE"],
        datasets: [{ label: "Shopping sections", data: [FMCG, GM, FURNITURE] }],
      },
    })
    .setWidth(600)
    .setHeight(300)
    .setBackgroundColor("transparent");

  const ShoppingItem_URL = shopping_item.getUrl();

  ///////////////////////////////////////////////////////////////////////////////////
  const Satisfy_Pref = new QuickChart();
  Satisfy_Pref.setConfig({
    type: "bar",
    data: {
      labels: ["Yes", "No", "Average"],
      datasets: [
        {
          label: "Satisfied with health rules",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
          data: [yes, no, Average],
        },
        {
          label: "Interest in online shopping",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
          data: [onlineYes, onlineNo, onlineAvg],
        },
        {
          label: "delivering is better than visiting premises",
          backgroundColor: "#efff57",
          borderColor: "#e7ff03",
          borderWidth: 1,
          data: [visitYes, visitNo, visitAvg],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Customer Preferences",
      },
      plugins: {
        datalabels: {
          anchor: "center",
          align: "center",
          color: "#666",
          font: {
            weight: "normal",
          },
        },
      },
    },
  })
    .setWidth(600)
    .setHeight(300)
    .setBackgroundColor("transparent");

  const Satisfy_Pref_URL = Satisfy_Pref.getUrl();

  ////////response//////////
  res.json([
    ShoppingFrequency_URL,
    ShoppingItem_URL,
    ShoppingMethod_Url,
    Satisfy_Pref_URL,
  ]);
};

module.exports = adminChartController;
