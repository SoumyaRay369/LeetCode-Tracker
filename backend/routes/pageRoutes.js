import express from 'express'
const router = express.Router()
import problemModel from '../database/models/problemSchema.js'

router.post('/addProblemStatement', async (req, res) => {
    const { problemName } = req.body
    const today = new Date()
    const date = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear()
    await problemModel.create({ problemStatement: problemName, date: date })
    res.json({
        message: "New problem successfully added"
    })

})

router.get('/getListForDate', async (req, res) => {
    let { dateString } = req.query;

    
    const [day, month, year] = dateString.split('/');
    const paddedDate = String(day).padStart(2, '0') + '/' +
        String(month).padStart(2, '0') + '/' +
        year;

    const listOfProblems = await problemModel.find({ date: paddedDate });
    res.json({ listOfProblems: listOfProblems });
});

router.get('/getListForMonth', async (req, res) => {
    const { monthNumber } = req.query;
    const allProblems = await problemModel.find({});
    const filteredProblems = allProblems.filter(problem => {
        const dateParts = problem.date.split('/');
        return dateParts[1] === String(monthNumber).padStart(2, '0');
    });
    res.json({ listOfProblems: filteredProblems });
})

router.get('/getListForYear', async (req, res) => {
    const { year } = req.query;
    const allProblems = await problemModel.find({});
    const filteredProblems = allProblems.filter(problem => {
        const dateParts = problem.date.split('/');
        return dateParts[2] === String(year);
    });
    res.json({ listOfProblems: filteredProblems });
})



export default router