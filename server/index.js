const express = require("express");
const path = require("path");
const app = express();

const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
        user: "root",
        host: "localhost",
        password: "pierce1234",
        database: "test"
})

// start CRUD

app.get('/fishingCatProfile', (req, res) => {
        db.query("SELECT * FROM profile", (err, result) => {
                if (err) {
                        console.log(err);
                }
                else {
                        res.send(result);
                }
        });
});

app.post('/insert', (req,res) => {
        const deviceIMEI = req.body.deviceIMEI;
        const name = req.body.name;
        const age = req.body.age;
        const weight = req.body.weight
        const sex = req.body.sex;
        const installationDate = req.body.installationDate;

        db.query("INSERT INTO profile (deviceIMEI, name, age, weight, sex, installationDate) VALUES (?,?,?,?,?,?)",
        [deviceIMEI, name, age, weight, sex, installationDate],
        (err, result) => {
                if (err) {
                        console.log(err)
                }
                else {
                        res.send("Value Insert")
                }
        });
});

app.put('/update', (req,res) => {
        const id = req.body.id;
        const deviceIMEI = req.body.deviceIMEI;
        const name = req.body.name;
        const age = req.body.age;
        const weight = req.body.weight
        const sex = req.body.sex;
        const installationDate = req.body.installationDate;
        db.query("UPDATE profile SET deviceIMEI = ?, name = ?, age = ?, weight = ?, sex = ?, installationDate = ? WHERE id = ?",
        [deviceIMEI, name, age, weight, sex, installationDate, id],
        (err, result) => {
                if (err) {
                        console.log(err)
                }
                else {
                        res.send("Value Insert")
                }
        });
});

app.delete('/delete/:id', (req, res) => {
        const id = req.params.id
        db.query("DELETE FROM profile WHERE id = ?",
        id,
        (err, result) => {
                if (err) {
                        console.log(err)
                }
                else {
                        res.send("Value Insert")
                }
        })
})

// end CRUD

// get MAPS location (lat & lng)

app.get('/fishingCatLocation', (req, res) => {
        db.query("SELECT * FROM location",
        (err, result) => {
                if (err) {
                        console.log(err);
                }
                else {
                        res.send(result);
                }
        });
});

app.delete('/deleteLocation/:deviceIMEI', (req, res) => {
        const deviceIMEI = req.params.deviceIMEI;
        db.query("DELETE FROM location WHERE deviceIMEI = ?",
        deviceIMEI,
        (err, result) => {
                if (err) {
                        console.log(err)
                }
                else {
                        res.send("Value Insert")
                }
        })
})



// app.get('/FilterLocation/:deviceIMEI', (req, res) => {
//         const deviceIMEI = req.params.deviceIMEI;
//         db.query("SELECT * FROM location WHERE deviceIMEI = ?",
//         deviceIMEI,
//         (err, result) => {
//                 if (err) {
//                         console.log(err)
//                 }
//                 else {
//                         res.send("Value Insert")
//                 }
//         })
// })

// app.get('/fishingCatProfile', (req, res) => {
//         db.all("SELECT * FROM profile", (err, result) => {
//                 if (err) {
//                         console.log(err);
//                 }
//                 else {
//                         res.send(result);
//                 }
//         });
// });

// app.post('/insert', (req, res) => {
//         const deviceIMEI = req.body.deviceIMEI;
//         const name = req.body.name;
//         const age = req.body.age;
//         const weight = req.body.weight;
//         const sex = req.body.sex;
//         const installationDate = req.body.installationDate;

//         db.run("INSERT INTO profile (name, age, weight) VALUES (?,?,?,?,?,?)", [deviceIMEI, name, age, weight, sex, installationDate],
//         (err, result) => {
//                 if (err) {
//                         console.log(err);
//                 }
//                 else {
//                         res.send("Value inserted")
//                 }
//         })
// })

// app.put('/update', (req, res) => {
//         const id = req.body.id;
//         const deviceIMEI = req.body.deviceIMEI;
//         const name = req.body.name;
//         const age = req.body.age;
//         const weight = req.body.weight;
//         const sex = req.body.sex;
//         const installationDate = req.body.installationDate;

//         db.run("UPDATE profile SET deviceIMEI = ?, name = ?, age = ?, weight = ?, sex = ?, installationDate = ? WHERE id = ?",
//         [deviceIMEI, name, age, weight, sex, installationDate, id],
//         (err, result) => {
//                 if (err) {
//                         console.log(err);
//                 }
//                 else {
//                         res.send(result);
//                 }
//         })
// })

// app.delete('/delete/:id', (req, res) => {
//         const id = req.params.id;
//         db.run("DELETE FROM profile WHERE id = ?", id, (err,result) => {
//                 if (err) {
//                         console.log(err);
//                 }
//                 else {
//                         res.send(result);
//                 }
//         })
// })


// app.use(express.static(path.join(__dirname, "../tiger_fish/build")));

// app.get("/*", (req, res) => {
//         res.sendFile(path.join(__dirname, "./index.html"))
// });

// const PORT = process.env.PORT || 8501;

// app.listen(PORT, () => {
//         console.log(`Server started on port ${PORT}`)
// });

// const express = require('express');
// const path = require("path");
// const app = express();
// const sqlite3 = require("sqlite3").verbose();

// let db = new sqlite3.Database('test.db', sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connected to the SQlite database.');
// });


// app.use(express.static(path.join(__dirname, "../tiger_fish/build")));

// app.get("/*", (req, res) => {
//         res.sendFile(path.join(__dirname, "./index.html"))
// });

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
});