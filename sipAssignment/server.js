

// const express = require("express");
// const app = express();
// // const redis = require("./redis");
// const cors = require("cors");
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));
// app.use(express.json());

// const investorRoutes = require("./routes/investorRoutes");
// const fundRoutes = require("./routes/fundRoutes");
// const sipRoutes = require("./routes/sipRoutes");

// app.use("/api/investors", investorRoutes);
// app.use("/api/funds", fundRoutes);
// app.use("/api/sips", sipRoutes);



// app.listen(4000, () => {
//     console.log("Server running on port 4000");
// });

const express = require("express");
const client = require('./utility/pgManager.js')
//require("./redis.js")
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors({
  origin:'http://localhost:3000'
}))

app.get("/", (req, res) => {
    res.send("Backend Running");
});

const investorRoutes = require("./routes/investorRoutes");
const fundRoutes = require("./routes/fundRoutes");
const sipRoutes = require("./routes/sipRoutes");

app.use("/api/investors", investorRoutes);
app.use("/api/funds", fundRoutes);
app.use("/api/sips", sipRoutes);
 

app.listen(4000, () => {
    console.log("Server running on port 4000");
});