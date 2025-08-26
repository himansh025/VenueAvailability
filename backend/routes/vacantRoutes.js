const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb")
// const uri = "mongodb://localhost:27017";
const client = new MongoClient(process.env.MONGO_URI);


router.post("", async (req, res) => {
  try {
    console.log("Server for vacant Venue : ", req.body);

    await client.connect();
    const db = client.db("Venue");
    const tt = db.collection("timetable");

    var AllTheoryVenueList = [
      "ET-101","ET-102","ET-103","ET-201","ET-202","ET-203",
      "ET-301","ET-302","ET-303","ET-401","ET-310","ET-402",
      "ET-403","ET-501","ET-502","ET-503","ET-412","ET-510",
      "ET-410","ET-505"
    ];

    var AllLabVenueList = [
      "MTCL-3","ETCC-607","PHCL","LANG-LAB","ETCC-407","ETCC-507",
      "ETCC-607","MTCL-2","ETCC-207","ETCC-307"
    ];

    const { reqday } = req.body;
    if (!reqday) {
      return res.status(400).json({ message: "Day not defined" });
    }

    let timetable = await tt.find({ day: reqday }).toArray();
    if (!timetable) {
      return res.status(500).json({ message: "Database collection not found" });
    }

    // Result object: each lecture index → available venues
    let result = [];

    for (let lectureindex = 0; lectureindex <= 6; lectureindex++) {
      // Clone original lists for each lecture slot
      let freeTheory = [...AllTheoryVenueList];
      let freeLab = [...AllLabVenueList];

      for (const clss of timetable) {
        let busyvenue = clss?.["timetable"]?.[lectureindex]?.[2];
        if (busyvenue) {
          let theoryIndex = freeTheory.indexOf(busyvenue);
          if (theoryIndex !== -1) {
            freeTheory.splice(theoryIndex, 1);
          }

          let labIndex = freeLab.indexOf(busyvenue);
          if (labIndex !== -1) {
            freeLab.splice(labIndex, 1);
          }
        }
      }

      result[lectureindex] = {
        availableTheory: freeTheory,
        availableLab: freeLab
      };
    }

    console.log("Server Response : ", result);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});


module.exports = router;
