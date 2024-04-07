import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import multer from "multer";
import csv from "csv-parser";
import { UserInfo } from "./userDetails.js";
import { AppointmentInfo } from "./appointmentDetails.js";
const User = mongoose.model("UserInfo");
const Appointment = mongoose.model("AppointmentInfo");

const JWT_SECRET =
  "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM`1234567890-=[];',./~!@#$%^&*()_+{}|:<>?";
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const mongoUrl =
  "mongodb+srv://harsh:harsh@harsh.aclscmk.mongodb.net/?retryWrites=true&w=majority&appName=harsh";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

app.listen(5000, () => {
  console.log("Server Started");
});

app.post("/register", async (req, res) => {
  const { fname, lname, email, password, mobile, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    const oldUserMobile = await User.findOne({ mobile });

    if (oldUser || oldUserMobile) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      mobile,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "440m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.post("/registerDoctor", async (req, res) => {
  const {
    fname,
    lname,
    email,
    password,
    mobile,
    userType,
    age,
    sex,
    degree,
    collegeDetails,
    languageSpoken,
    addressOfClinic,
    speciality,
  } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    const oldUserMobile = await User.findOne({ mobile });

    if (oldUser || oldUserMobile) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      mobile,
      userType,
      age,
      sex,
      degree,
      collegeDetails,
      languageSpoken,
      addressOfClinic,
      speciality,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/getAllAdminUsers", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    try {
      const adminUsers = await User.find({ userType: "Admin" });
      res.send({ status: "ok", data: adminUsers });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ status: "error", message: "Internal Server Error" });
    }
  } catch (error) {}
});

app.post("/doctor/:id", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const { id } = req.params;
    User.findOne({ _id: id })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.post("/registerAppointment", async (req, res) => {
  const { userId, DoctorId, dateOfAppointment, timeOfAppointment } = req.body;

  try {
    await Appointment.create({
      userId,
      DoctorId,
      dateOfAppointment,
      timeOfAppointment,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/SeeDoctorAppointment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allAppointmentData = await Appointment.find({ DoctorId: id });
    res.send({ status: "ok", data: allAppointmentData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
});

app.post("/SeePatientAppointment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allAppointmentData = await Appointment.find({ userId: id });
    res.send({ status: "ok", data: allAppointmentData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
});

app.get("/api/search/:uniqueID", (req, res) => {
  const { uniqueID } = req.params;
  const results = [];

  fs.createReadStream("drugsComTest_raw.csv")
    .pipe(csv({}))
    .on("data", (data) => {
      if (data.uniqueID === uniqueID) {
        results.push(data);
      }
    })
    .on("end", () => {
      if (results.length === 0) {
        res.status(404).json({ message: "No matching records found." });
      } else {
        res.json(results);
      }
    })
    .on("error", (error) => {
      console.error("Error occurred while searching:", error);
      res.status(500).json({ message: "Internal server error." });
    });
});
app.post("/api/allData", (req, res) => {
  const results = [];

  fs.createReadStream("drugsComTest_raw.csv")
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      res.json(results);
    })
    .on("error", (error) => {
      console.error("Error occurred while reading CSV:", error);
      res.status(500).json({ message: "Internal server error." });
    });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("pdf"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./", req.file.originalname);

    fs.renameSync(tempPath, targetPath);

    res.status(200).send("File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file.");
  }
});
