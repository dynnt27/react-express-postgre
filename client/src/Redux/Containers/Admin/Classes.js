import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../Actions/Admin/Classes'
import ClassesDataTable from '../../../Components/DataTable/Admin/Classes'

function mapStateToProps({ AdminClasses }) {
  return { AdminClasses }
  // return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
  // return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesDataTable)
