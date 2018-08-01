import * as Classes from '../lib/Classes'

export default {
  list(req, res) {
    Promise
      .all([
        Classes.list({
          res,
          query: req.query,
          returnData: true,
          jsonData: true
        }),
        Classes.pages({ query: req.query })
      ])
      .then(promises => {
        res.status(200).send({
          rows: promises[0],
          pages: promises[1]
        })
      })
      .catch(error => {
        res.status(400).send(error)
      })
  },

  create(req, res) {
    Classes.create({
      res,
      body: req.body
    })
  },

  update(req, res) {
    Classes.update({
      res,
      body: req.body,
      classId: req.params.classId
    })
  },

  destroy(req, res) {
    Classes.destroy({
      res,
      classId: req.params.classId
    })
  },

  find(req, res) {
    Classes.find({
      res,
      where: {
        classId: req.params.classId
      }
    })
  },
  
}