const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'techstars',
    database: 'companies'
})


app.post('/create', (req, res) => {
    console.log('REQ.BODY', req.body)
    const name = req.body.name
    const state = req.body.state
    const city = req.body.city
    const description = req.body.description
    const foundedDate = req.body.foundedDate
    const newFounder = req.body.newFounder
    const founderPosition = req.body.founderPosition

    db.query('INSERT INTO companyList (name, state, city, foundedDate, description, newFounder, founderPosition) VALUES (?,?,?,?,?,?,?)',
        [name, state, city, foundedDate, description, newFounder, founderPosition],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

// app.post('/addFounder/:id', (req, res) => {
//     console.log('ADD FOUNDER', req.body)
//     const id = req.params.id
//     const newFounder = req.body.newFounder
//     const founderPosition = req.body.founderPosition

//     db.query('INSERT INTO companyList (newFounder = ?, founderPosition = ?) WHERE id = ? VALUES (?,?,?)',
//         [newFounder, founderPosition, id],
//         (err, result) => {
//             if (err) {
//                 console.log('ERR', err)
//             } else {
//                 res.send(result)
//             }
//         })
// })

app.put('/addFounder', (req, res) => {
    console.log('ADD FOUNDER', req.body)
    const id = req.body.id
    const newFounder = req.body.newFounder
    const founderPosition = req.body.founderPosition
    // db.query('ALTER TABLE company ADD founder varchar(255)')
    db.query('UPDATE companyList SET newFounder = ?, founderPosition = ? WHERE id = ?', [newFounder, founderPosition, id], (err, result) => {
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(result)
        }
    })
})

app.get('/companies', (req, res) => {
    db.query("SELECT * FROM companyList", (err, result) => {
        if (err) {
            console.log('ERROR', err)
        } else {
            res.send(result)
        }
    })
})

app.put('/update', (req, res) => {
    console.log('UPDATE', req)
    const id = req.body.id
    const name = req.body.name
    const state = req.body.state
    const city = req.body.city
    const foundedDate = req.body.foundedDate
    const description = req.body.description
    db.query('UPDATE companyList SET name = ?, state = ?, city = ?, foundedDate = ?, description = ? WHERE id = ?', [name, state, city, foundedDate, description, id], (err, result) => {
        console.log('UPDATE RESULT', result)
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(result)
        }
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM companyList WHERE id = ?", id, (err, result) => {
        console.log('DELETED?', result)
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log('Your server is running on port 3001')
})