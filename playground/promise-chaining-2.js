require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5cf16a7ce366ff77ccf795b9').then((task) => {
    console.log(task)
    return Task.countDocuments(({ completed: false}))
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})