import _ from 'lodash'
import DB from '../models'
import { filters, pageCount, orderBy } from '../helpers/ActiveRecord'


export function find(options) {
  const { res, where, returnData } = options

  return DB.Class
    .findOne({ 
      where
    })
    .then(Class => {
      const json = Class ? jsonClass(Class) : null

      if (returnData) return { object: Class, json }

      return res.status(Class ? 200 : 404).send(json)
    })
    .catch(error => {
      console.log(error)

      return returnData ? error : res.status(400).send(error)
    })
}


export function list(options) {
  const { res, query, returnData, jsonData } = options
  const { filtered, sorted, limit, page } = query

  return DB.Class
    .findAll({
      order: orderBy(sorted, ['classId', 'asc']),
      offset: (page - 1) * limit,
      limit,
    })
    .then(Classes => {
      const data = jsonData ? jsonClasses(Classes) : Classes

      if (returnData) return data

      return res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)

      return returnData ? error : res.status(400).send(error)
    })
}

export function create(options) {
  const { res, body } = options
  const { title, slots, description, activationCode } = body

  DB.Class
    .create({
      title,
      slots,
      description,
      activationCode,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(Class => {
      const { classId } = Class
      return res.status(Class ? 201 : 400).send({classId})
    })
    .catch(error => {
      console.log(error)

      return res.status(400).send(error)
    })
}

export function destroy(options) {
  const { res, classId } = options

  find({
      res,
      where: { classId },
      returnData: true
    })
    .then(Class => {
      DB.Class
        .destroy({ where: { classId } })
        .then(() => {
          return res.status(200).send()
        })
        .catch(error => {
          console.log(error)

          return res.status(400).send(error)
        })
    })
    .catch(error => {
      console.log(error)

      return res.status(400).send(error)
    })
}

export function update(options) {
  const { res, classId, body } = options
  const { title, slots, description, activationCode } = body
  find({
      res,
      where: { classId },
      returnData: true
    }).then(Class => {
      DB.Class
        .update({
          title,
          slots,
          description,
          activationCode,
          updatedAt: new Date()
        }, {
          where: { classId }
        })
        .then(Class => {
          const { classId } = Class
          return res.status(Class ? 201 : 400).send({classId})
        })
        .catch(error => {
          console.log(error)

          return res.status(400).send(error)
        })
    })
      
    .catch(error => {
      console.log(error)

      return res.status(400).send(error)
    })
}


export function pages({ query }) {
  return DB.Class
    .count({
      col: 'classId',
      where: filters(query.filtered)
    })
    .then(count => {
      return pageCount(query, count)
    })
}

function jsonClasses(Classes) {
  return _.map(Classes, Class => {
      return jsonClass(Class)
    })
}

function jsonClass(Class) {
  return {
    classId: Class.classId,
    createdAt: Class.createdAt,
    updatedAt: Class.updatedAt,
    title: Class.title,
    description: Class.description,
    slots: Class.slots,
    activationCode: Class.activationCode,
  }
}