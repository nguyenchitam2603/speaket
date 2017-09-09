import { connect } from 'react-redux';

import { IAppState } from './../../models';
import { EngineerViewComponent } from './../../components/dashboard/content/engineer/engineerView.component';

function mapStateToProps(state) {
  return {
    engineers: state.engineers
  }
}

export const EngineerViewContainer = connect<any, any, any>(
  mapStateToProps,
  null
)(EngineerViewComponent);
