require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5cf16a7ce366ff77ccf795b9').then((task) => {
//     console.log(task)
//     return Task.countDocuments(({ completed: false}))
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('5cf15fa31a00e1725bd9cb29').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
