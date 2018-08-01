import * as Types from '../../Actions/Admin/Classes/Types'

const DEFAULT_STATE = { queryString: '' }

export default function(state=DEFAULT_STATE, action) {
  switch(action.type) {
    case Types.ADMIN_CLASSES_SAVE_QUERY:
      return action.AdminClasses
    default:
      return state
  }
}
