var express = require("express"),
mongoose = require("mongoose"),
autoIncrement = require("mongoose-auto-increment"),
Joi = require("joi"),
app = express();
jwt = require("jsonwebtoken");

let mongoURI = "mongodb+srv://Julia:123321@cluster0.qpdgpqx.mongodb.net/?retryWrites=true&w=majority";
let jwtKey = "SECRET";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose
  .connect(mongoURI)
  .then(() => console.log("db connection successful"))
  .catch(err => console.log(err));

const conn = mongoose.createConnection(mongoURI);
autoIncrement.initialize(conn);
app.use(express.json());

//////////////////Employee
var employeeSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  MiddleName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Gender: { type: String, required: true },
  DOB: { type: Date, required: true },
  DateOfJoining: { type: Date, required: true },
  TerminateDate: { type: Date },
  Deleted: { type: Boolean },
  Photo: { type: String },
  ContactNo: { type: String, required: true },
  EmployeeCode: { type: String, required: true },
  Account: { type: Number, required: true },
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  position: [{ type: mongoose.Schema.Types.ObjectId, ref: "Position" }],
  department: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
  salary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Salary" }],
  education: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
  familyInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "FamilyInfo" }],
  workExperience: [
    { type: mongoose.Schema.Types.ObjectId, ref: "WorkExperience" }
  ],
  leaveApplication: [
    { type: mongoose.Schema.Types.ObjectId, ref: "LeaveApplication" }
  ],
  BloodGroup: { type: String },
  EmergencyContactNo: { type: String },
  Hobbies: { type: String },
  PANcardNo: { type: String },
  PermanetAddress: { type: String },
  PresentAddress: { type: String }
});
employeeSchema.plugin(autoIncrement.plugin, {
  model: "Employee",
  field: "EmployeeID"
});

var Employee = mongoose.model("Employee", employeeSchema);

const EmployeePersonalInfoValidation = Joi.object().keys({
  BloodGroup: Joi.string()
    .max(10)
    .required(),
  DOB: Joi.date().required(),

  ContactNo: Joi.string()
    .max(20)
    .required(),
  Email: Joi.string()
    .max(200)
    .required(),
  EmergencyContactNo: Joi.string()
    .max(20)
    .required(),
  Gender: Joi.string()
    .max(100)
    .required(),
  Hobbies: Joi.string()
    .max(1000)
    .required(),
  PANcardNo: Joi.string()
    .max(50)
    .required(),
  PermanetAddress: Joi.string()
    .max(200)
    .required(),
  PresentAddress: Joi.string()
    .max(200)
    .required()
});

////////////education
var educationSchema = new mongoose.Schema({
  SchoolUniversity: { type: String, required: true },
  Degree: { type: String, required: true },
  Grade: { type: String, required: true },
  PassingOfYear: { type: String, required: true }
});
educationSchema.plugin(autoIncrement.plugin, {
  model: "Education",
  field: "EducationID"
});

var Education = mongoose.model("Education", educationSchema);

const EducationValidation = Joi.object().keys({
  SchoolUniversity: Joi.string()
    .max(200)
    .required(),
  Degree: Joi.string()
    .max(200)
    .required(),
  Grade: Joi.string()
    .max(50)
    .required(),
  PassingOfYear: Joi.string()
    .max(10)
    .required()
});

/////////////////familyInfo
var familyInfoSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Relationship: { type: String, required: true },
  DOB: { type: Date, required: true },
  Occupation: { type: String, required: true }
});
familyInfoSchema.plugin(autoIncrement.plugin, {
  model: "FamilyInfo",
  field: "FamilyInfoID"
});

var FamilyInfo = mongoose.model("FamilyInfo", familyInfoSchema);

const FamilyInfoValidation = Joi.object().keys({
  Name: Joi.string()
    .max(200)
    .required(),
  Relationship: Joi.string()
    .max(200)
    .required(),
  DOB: Joi.date().required(),
  Occupation: Joi.string()
    .max(100)
    .required()
});

////////////WorkExperience workExperience
var workExperienceSchema = new mongoose.Schema({
  CompanyName: { type: String, required: true },
  Designation: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true }
});
workExperienceSchema.plugin(autoIncrement.plugin, {
  model: "WorkExperience",
  field: "WorkExperienceID"
});

var WorkExperience = mongoose.model("WorkExperience", workExperienceSchema);

const WorkExperienceValidation = Joi.object().keys({
  CompanyName: Joi.string()
    .max(200)
    .required(),
  Designation: Joi.string()
    .max(200)
    .required(),
  FromDate: Joi.date().required(),
  ToDate: Joi.date().required()
});

////////////LeaveApplication
var leaveApplicationSchema = new mongoose.Schema({
  Leavetype: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true },
  Reasonforleave: { type: String, required: true },
  Status: { type: String, required: true },
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
});
leaveApplicationSchema.plugin(autoIncrement.plugin, {
  model: "LeaveApplication",
  field: "LeaveApplicationID"
});

var LeaveApplication = mongoose.model(
  "LeaveApplication",
  leaveApplicationSchema
);

const LeaveApplicationValidation = Joi.object().keys({
  Leavetype: Joi.string()
    .max(100)
    .required(),

  FromDate: Joi.date().required(),
  ToDate: Joi.date().required(),
  Reasonforleave: Joi.string()
    .max(100)
    .required(),
  Status: Joi.number()
    .max(1)
    .required()
});


//////////////////Role
var roleSchema = new mongoose.Schema({
  RoleName: { type: String, required: true },
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});
roleSchema.plugin(autoIncrement.plugin, {
  model: "Role",
  field: "RoleID"
});

var positionSchema = new mongoose.Schema({
  PositionName: { type: String, required: true },
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});
positionSchema.plugin(autoIncrement.plugin, {
  model: "Position",
  field: "PositionID"
});

var Position = mongoose.model("Position", positionSchema);

/////Portal
var portalSchema = new mongoose.Schema({
  CreatedBy: { type: String },
  CreatedDate: { type: Date, default: Date.now },
  Deleted: { type: Boolean },
  ModifiedBy: { type: String },
  ModifiedDate: { type: Date },
  PortalName: { type: String, required: true },
  Status: { type: Number, required: true }
});
portalSchema.plugin(autoIncrement.plugin, {
  model: "Portal",
  field: "ID"
});

var Portal = mongoose.model("Portal", portalSchema);

const PortalValidation = Joi.object().keys({
  _id: Joi.optional(),
  ID: Joi.optional(),
  CreatedBy: Joi.optional(),
  CreatedDate: Joi.optional(),
  Deleted: Joi.optional(),
  ModifiedBy: Joi.optional(),
  ModifiedDate: Joi.optional(),
  PortalName: Joi.string()
    .max(200)
    .required(),
  Status: Joi.number()
    .max(1)
    .required()
});

var projectSchema = new mongoose.Schema({
  CreatedBy: { type: String },
  CreatedDate: { type: Date, default: Date.now },
  Deleted: { type: Boolean },
  EmpFullName: { type: String },
  EstimatedCost: { type: Number },
  EstimatedTime: { type: Number },
  ModifiedBy: { type: String },
  ModifiedDate: { type: Date },
  ProjectDesc: { type: String },
  ProjectTitle: { type: String, required: true },
  ProjectURL: { type: String },
  Remark: { type: String },
  ResourceID: { type: Number },
  Status: { type: Number, required: true },
  portals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Portal" }]
});
projectSchema.plugin(autoIncrement.plugin, {
  model: "Project",
  field: "ID"
});

var Project = mongoose.model("Project", projectSchema);

const ProjectValidation = Joi.object().keys({
  _id: Joi.optional(),
  ID: Joi.optional(),
  CreatedBy: Joi.optional(),
  CreatedDate: Joi.optional(),
  Deleted: Joi.optional(),
  EmpFullName: Joi.string()
    .max(200)
    .optional(),
  EstimatedCost: Joi.optional(),
  EstimatedTime: Joi.optional(),
  ModifiedBy: Joi.optional(),
  ModifiedDate: Joi.optional(),
  ProjectDesc: Joi.string()
    .max(2000)
    .optional(),
  ProjectTitle: Joi.string()
    .max(200)
    .required(),
  ProjectURL: Joi.string()
    .max(1000)
    .optional(),
  Remark: Joi.string()
    .max(2000)
    .optional(),
  ResourceID: Joi.optional(),
  Status: Joi.number()
    .max(10)
    .required(),
  portal: Joi.optional(),
  Portal_ID: Joi.optional()
});

/////////////company////////////
var companySchema = new mongoose.Schema({
  CompanyName: { type: String, required: true },
  Address: { type: String, required: true },
  PostalCode: { type: Number, required: true },
  Website: { type: String, required: true },
  Email: { type: String, required: true },
  ContactPerson: { type: String, required: true },
  ContactNo: { type: String, required: true },
  FaxNo: { type: String, required: true },
  PanNo: { type: String, required: true },
  GSTNo: { type: String, required: true },
  CINNo: { type: String, required: true },
  Deleted: { type: Boolean },
  city: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }]
});
citySchema.plugin(autoIncrement.plugin, {
  model: "Company",
  field: "CompanyID"
});

app.get("/", (req, res) => {
  res.send("employee management system API 😀");
});

app.get("/api", (req, res) => {
  res.send("employee management system API 😀");
});

app.get("/api/position", verifyAdminHR, (req, res) => {
  Position.find()
    .populate("company")
    .exec(function (err, role) {
      res.send(role);
    });
});

app.get("/api/admin/portal", verifyAdmin, (req, res) => {
  Portal.find()
    .populate({ path: "projects" })
    .exec(function (err, portalData) {
      if (err) {
        res.send("err");
        console.log(err);
      }
      res.send(portalData);
    });
});

app.post("/api/admin/portal", verifyAdmin, (req, res) => {
  Joi.validate(req.body, PortalValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newPortal;
      newPortal = {
        PortalName: req.body.PortalName,
        Status: req.body.Status
      };

      Portal.create(newPortal, function (err, portalData) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(portalData);
          console.log("new Portal Saved");
        }
      });
      console.log(req.body);
    }
  });
});

app.put("/api/admin/portal/:id", verifyAdmin, (req, res) => {
  Joi.validate(req.body, PortalValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updatePortal;
      updatePortal = {
        PortalName: req.body.PortalName,
        Status: req.body.Status
      };
      Portal.findByIdAndUpdate(req.body._id, updatePortal, function (
        err,
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(updatePortal);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/admin/portal/:id", verifyAdmin, (req, res) => {
  Portal.findByIdAndRemove({ _id: req.params.id }, function (err, portal) {
    if (!err) {
      console.log("portal deleted");
      res.send(portal);
      Project.deleteMany({ portals: { _id: portal._id } }, function (err) {
        if (err) {
          res.send("error");
          console.log(err);
        }
      });
      console.log("new Portal Saved");
    } else {
      console.log("error");
      res.send("err");
    }
  });
  console.log("delete");
  console.log(req.params.id);
});

///*********bid */

app.get("/api/admin/project-bid", verifyAdmin, (req, res) => {
  Project.find()
    .populate("portals")
    .exec(function (err, project) {
      if (err) {
        console.log(err);
        res.send("err");
      } else {
        res.send(project);
      }
    });
});

app.post("/api/admin/project-bid", verifyAdmin, (req, res) => {
  Joi.validate(req.body, ProjectValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let project;
      project = {
        ProjectTitle: req.body.ProjectTitle,
        ProjectURL: req.body.ProjectURL,
        ProjectDesc: req.body.ProjectDesc,
        portals: req.body.Portal_ID,
        EstimatedTime: req.body.EstimatedTime,
        EstimatedCost: req.body.EstimatedCost,
        ResourceID: req.body.ResourceID,
        Status: req.body.Status,
        Remark: req.body.Remark
      };
      Project.create(project, function (err, project) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(project);
          console.log("new project Saved");
        }
      });
      console.log(req.body);
    }
  });
});

app.put("/api/admin/project-bid/:id", verifyAdmin, (req, res) => {
  Joi.validate(req.body, ProjectValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updateProject;
      updateProject = {
        ProjectTitle: req.body.ProjectTitle,
        ProjectURL: req.body.ProjectURL,
        ProjectDesc: req.body.ProjectDesc,
        portals: req.body.Portal_ID,
        EstimatedTime: req.body.EstimatedTime,
        EstimatedCost: req.body.EstimatedCost,
        ResourceID: req.body.ResourceID,
        Status: req.body.Status,
        Remark: req.body.Remark
      };

      Project.findByIdAndUpdate(req.params.id, updateProject, function (
        err,
        Project
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(updateProject);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/admin/project-bid/:id", verifyAdmin, (req, res) => {
  Project.findByIdAndRemove({ _id: req.params.id }, function (err, project) {
    if (err) {
      console.log("error");
      res.send("err");
    } else {
      console.log("project deleted");
      res.send(project);
    }
  });
  console.log("delete");
  console.log(req.params.id);
});

////////////////////////////personal info
app.put("/api/personal-info/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, EmployeePersonalInfoValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newEmployee;

      newEmployee = {
        BloodGroup: req.body.BloodGroup,
        ContactNo: req.body.ContactNo,
        DOB: req.body.DOB,
        Email: req.body.Email,
        EmergencyContactNo: req.body.EmergencyContactNo,
        Gender: req.body.Gender,
        Hobbies: req.body.Hobbies,
        PANcardNo: req.body.PANcardNo,
        PermanetAddress: req.body.PermanetAddress,
        PresentAddress: req.body.PresentAddress
      };
      Employee.findByIdAndUpdate(
        req.params.id,
        {
          $set: newEmployee
        },
        function (err, numberAffected) {
          console.log(numberAffected);
          res.send(newEmployee);
        }
      );
    }

    console.log("put");
    console.log(req.body);
  });
});

////////////////////education

app.post("/api/education/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, EducationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newEducation;

          newEducation = {
            SchoolUniversity: req.body.SchoolUniversity,
            Degree: req.body.Degree,
            Grade: req.body.Grade,
            PassingOfYear: req.body.PassingOfYear
          };

          Education.create(newEducation, function (err, education) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              employee.education.push(education);
              employee.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(education);
                }
              });
              console.log("new Education Saved");
            }
          });
          console.log(req.body);
        }
      });
    }
  });
});

app.put("/api/education/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, EducationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newEducation;

      newEducation = {
        SchoolUniversity: req.body.SchoolUniversity,
        Degree: req.body.Degree,
        Grade: req.body.Grade,
        PassingOfYear: req.body.PassingOfYear
      };

      Education.findByIdAndUpdate(req.params.id, newEducation, function (
        err,
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(newEducation);
        }
      });
    }
    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/education/:id/:id2", verifyEmployee, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      Education.findByIdAndRemove({ _id: req.params.id2 }, function (
        err,
        education
      ) {
        if (!err) {
          console.log("education deleted");
          Employee.update(
            { _id: req.params.id },
            { $pull: { education: req.params.id2 } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(education);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log("delete");
      console.log(req.params.id);
    }
  });
});

//////////////////////////familyInfo

app.post("/api/family-info/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, FamilyInfoValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newFamilyInfo;

          newFamilyInfo = {
            Name: req.body.Name,
            Relationship: req.body.Relationship,
            DOB: req.body.DOB,
            Occupation: req.body.Occupation
          };

          FamilyInfo.create(newFamilyInfo, function (err, familyInfo) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              employee.familyInfo.push(familyInfo);
              employee.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(familyInfo);
                }
              });
              console.log("new familyInfo Saved");
            }
          });
          console.log(req.body);
        }
      });
    }
  });
});

app.put("/api/family-info/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, FamilyInfoValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newFamilyInfo;

      newFamilyInfo = {
        Name: req.body.Name,
        Relationship: req.body.Relationship,
        DOB: req.body.DOB,
        Occupation: req.body.Occupation
      };

      FamilyInfo.findByIdAndUpdate(req.params.id, newFamilyInfo, function (
        err,
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(newFamilyInfo);
        }
      });
    }
    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/family-info/:id/:id2", verifyEmployee, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      FamilyInfo.findByIdAndRemove({ _id: req.params.id2 }, function (
        err,
        familyInfo
      ) {
        if (!err) {
          console.log("FamilyInfo deleted");
          Employee.update(
            { _id: req.params.id },
            { $pull: { familyInfo: req.params.id2 } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(familyInfo);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log("delete");
      console.log(req.params.id);
    }
  });
});

//////////////////////////WorkExperience workExperience
app.post("/api/work-experience/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, WorkExperienceValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newWorkExperience;

          newWorkExperience = {
            CompanyName: req.body.CompanyName,
            Designation: req.body.Designation,
            FromDate: req.body.FromDate,
            ToDate: req.body.ToDate
          };

          WorkExperience.create(newWorkExperience, function (
            err,
            workExperience
          ) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              employee.workExperience.push(workExperience);
              employee.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(workExperience);
                }
              });
              console.log("new WorkExperience Saved");
            }
          });
          console.log(req.body);
        }
      });
    }
  });
});

app.put("/api/work-experience/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, WorkExperienceValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newWorkExperience;

      newWorkExperience = {
        CompanyName: req.body.CompanyName,
        Designation: req.body.Designation,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate
      };

      WorkExperience.findByIdAndUpdate(
        req.params.id,
        newWorkExperience,
        function (err, workExperience) {
          if (err) {
            res.send("error");
          } else {
            res.send(newWorkExperience);
          }
        }
      );
    }
    console.log("put");
    console.log(req.body);
  });
});

app.delete("/api/Work-experience/:id/:id2", verifyEmployee, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      WorkExperience.findByIdAndRemove({ _id: req.params.id2 }, function (
        err,
        workExperience
      ) {
        if (!err) {
          console.log("WorkExperience deleted");
          Employee.update(
            { _id: req.params.id },
            { $pull: { workExperience: req.params.id2 } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(workExperience);
            }
          );
        } else {
          console.log(err);
          res.send("error");
        }
      });
      console.log("delete");
      console.log(req.params.id);
    }
  });
});

////////////LeaveApplication leaveApplication leave-application-emp
app.get("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  console.log(req.params.id);
  Employee.findById(req.params.id)
    .populate({
      path: "leaveApplication"
    })
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send(employee);
      }
    });
});

app.post("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, LeaveApplicationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newLeaveApplication;
          newLeaveApplication = {
            Leavetype: req.body.Leavetype,
            FromDate: req.body.FromDate,
            ToDate: req.body.ToDate,
            Reasonforleave: req.body.Reasonforleave,
            Status: req.body.Status,
            employee: req.params.id
          };

          LeaveApplication.create(newLeaveApplication, function (
            err,
            leaveApplication
          ) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              employee.leaveApplication.push(leaveApplication);
              employee.save(function (err, data) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  console.log(data);
                  res.send(leaveApplication);
                }
              });
              console.log("new leaveApplication Saved");
            }
          });
          console.log(req.body);
        }
      });
    }
  });
});

app.put("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, LeaveApplicationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newLeaveApplication;

      newLeaveApplication = {
        Leavetype: req.body.Leavetype,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate,
        Reasonforleave: req.body.Reasonforleave,
        Status: req.body.Status,
        employee: req.params.id
      };

      LeaveApplication.findByIdAndUpdate(
        req.params.id,
        newLeaveApplication,
        function (err, leaveApplication) {
          if (err) {
            res.send("error");
          } else {
            res.send(newLeaveApplication);
          }
        }
      );
    }
    console.log("put");
    console.log(req.body);
  });
});

app.delete(
  "/api/leave-application-emp/:id/:id2",
  verifyEmployee,
  (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
      if (err) {
        res.send("error");
        console.log(err);
      } else {
        LeaveApplication.findByIdAndRemove({ _id: req.params.id2 }, function (
          err,
          leaveApplication
        ) {
          if (!err) {
            console.log("LeaveApplication deleted");
            Employee.update(
              { _id: req.params.id },
              { $pull: { leaveApplication: req.params.id2 } },
              function (err, numberAffected) {
                console.log(numberAffected);
                res.send(leaveApplication);
              }
            );
          } else {
            console.log(err);
            res.send("error");
          }
        });
        console.log("delete");
        console.log(req.params.id);
      }
    });
  }
);

/////////////////////login
app.post("/api/login", (req, res) => {
  Joi.validate(
    req.body,
    Joi.object().keys({
      email: Joi.string()
        .max(200)
        .required(),
      password: Joi.string()
        .max(100)
        .required()
    }),
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err.details[0].message);
      } else {
        Employee.findOne(
          { Email: req.body.email },
          "Password _id Account FirstName LastName",
          function (err, document) {
            if (err || document == null) {
              res.send("false");
            } else {
              if (document.Password == req.body.password) {
                emp = {
                  _id: document._id,
                  Account: document.Account,
                  FirstName: document.FirstName,
                  LastName: document.LastName
                };
                var token = jwt.sign(emp, jwtKey);
                res.send(token);
              } else {
                res.sendStatus(400);
              }
            }
          }
        );
      }
    }
  );
});

// middleware
function verifyAdmin(req, res, next) {
  console.log(req.headers["authorization"]);
  const Header = req.headers["authorization"];
  if (typeof Header !== "undefined") {
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(authData);
        if (authData.Account == 1) {
          next();
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

function verifyEmployee(req, res, next) {
  console.log(req.headers["authorization"]);
  const Header = req.headers["authorization"];

  if (typeof Header !== "undefined") {
    jwt.verify(Header, jwtKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (authData._id == req.params.id) {
          console.log(authData);
          if (authData.Account == 3) {
            next();
          } else {
            res.sendStatus(403);
          }
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
var port = 4000;
if (port & 4000) {
  app.listen(port, 4000, () => {
    console.log("started");
  });
} else
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
