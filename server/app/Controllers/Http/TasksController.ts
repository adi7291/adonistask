// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Task from 'App/Models/Task'

// export default class TasksController {
//      public async index({ response }) {
//             const posts = await Task.all()

//             return response.ok(posts)
//         }
//     }

//import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index({ response }) {
    // //fetch tasks from db
    // const tasks = await Task.query().paginate(1,5);
    // //return a jason response

    // return response.status(200).json({
    //   message : ["successfully fetched your latest tasks."],
    //   data : tasks

    // })

    try {
      //fetch tasks from db
      const tasks = await Task.query().paginate(1, 5)
      //return a jason response

      return response.status(200).json({
        message: ['successfully fetched your latest tasks.'],
        data: tasks,
      })
    } catch (error) {
      //fetch tasks from db
      const tasks = await Task.query().paginate(1, 5)
      //return a jason response

      return response.status(200).json({
        message: ['Network error'],
        data: tasks,
      })
    }
  }

  public async create({ request, response }) {
    //grab the request
    const taskData = request.body()

    try {
      //creating a task
      const newTask = await Task.create({ title: taskData.title, task: taskData.task })
      response.status(202).json({
        message: ['Successfully created task'],

        data: newTask,
      })
    } catch (error) {
      response.status(422).json({
        message: ['please fill out all required fields'],

        data: {},
      })
    }
  }

  public async updateProgress({ request, response, params }) {
    try {
      //check if task exist

      const dbTask = await Task.findOrFail(params.id)

      //grab our request
      const taskData = request.post()

      //update the tasks
      dbTask.completed =JSON.parse(taskData.status)

      //save the updated task
      dbTask.save()

      //return response
      response.status(201).json({
        message: ['Successfully updated task'],

        data: dbTask,
      })

    } catch (error) {
      response.status(422).json({
        message: ['please check your details and try again'],

        data: {},
      })
    }
  }

  public async fetchTask({ params, response }) {
    //this is the same code for delete code
    try {
      const dbTask = await Task.findOrFail(params.id)

      //await dbTask.delete()
      response.status(200).json({
        messages: ['Successfully fetched  the task'],
        data: dbTask,
      })
    } catch (error) {
      response.status(404).json({ messages: ['Task does not exist'] })
    }
  }

  public async deleteTask({ params, response }) {
    //chect  if task exist in db
    try {
      const dbTask = await Task.findOrFail(params.id)

      await dbTask.delete()
      response.status(200).json({
        messages: ['Successfully deleted the task'],
      })
    } catch (error) {
      response.status(404).json({ messages: ['Task does not exist'] })
    }
    //delete the task
    //return a response
  }
}
