import _ from 'lodash'
import Paths from '../../Paths'


const initData = {
  title: '',
  slots: '',
  description: '',
  activationCode: '',
}

const schema = {
  type: 'object',
  required: [
    'title',
    'slots',
    'description',
    'activationCode',
  ],
  properties: {
    title: {
      type: 'string',
      title: 'title'
    },
    slots: {
      type: 'integer',
      title: 'slots'
    },
    description: {
      type: 'string',
      title: 'description',
    },
    activationCode: {
      type: 'string',
      title: 'activationCode',
    },
  }
}


const uiSchema = {
  'ui:rootFieldId': 'user',
  title: {
    'ui:emptyValue': '',
  },
  slots: {
    'ui:widget': 'updown'
  },
  description: {
    'ui:widget': 'textarea'
  },
  activationCode: {
    'ui:emptyValue': '',
  },
}

export default {
  initData,
  schema,
  uiSchema
}
