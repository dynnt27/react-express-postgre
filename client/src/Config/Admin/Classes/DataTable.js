import Moment from 'moment'
// import { ucFirst } from '../../../Lib/Helpers/Text'

const columns = [{
    Header: 'Class ID',
    accessor: 'classId',
    width: 90
  }, {
    Header: 'Title',
    accessor: 'title'
  }, {
    Header: 'Slots',
    accessor: 'slots'
  }, {
    Header: 'Description',
    accessor: 'description'
  }, {
    Header: 'Activation Code',
    accessor: 'activationCode'
  }, {
    Header: 'Created At',
    accessor: 'createdAt',
    Cell: ({ value }) => Moment(value).format('MM/DD/YYYY hh:mm A'),
    width: 160
  }, {
    Header: 'Updated At',
    accessor: 'updatedAt',
    Cell: ({ value }) => Moment(value).format('MM/DD/YYYY hh:mm A'),
}]

const columnFilters = {
  classId: {
    type: 'string',
    title: 'Class ID'
  },
  title: {
    type: 'string',
    title: 'Title'
  },
  slots: {
    type: 'string',
    title: 'Slots'
  },
  description: {
    type: 'string',
    title: 'Description'
  },
  activationCode: {
    type: 'string',
    title: 'Activation Code'
  },
  createdAt: {
    type: 'string',
    title: 'Created At'
  },
  updatedAt: {
    type: 'string',
    title: 'Updated At'
  }
}

export default {
  columns,
  columnFilters
}
