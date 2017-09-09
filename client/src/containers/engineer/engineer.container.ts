import { connect, Dispatch } from 'react-redux';

import { registerEngineer } from './../../actions';
import { EngineerComponent } from './../../components/dashboard/content/engineer/engineer.component';
import { IAppState, Engineer } from './../../models';

function mapStateToProps(state: IAppState) {
  return {
    engineers: state.engineers
  }
}

function mapDispatchToProps(dispatch: Dispatch<{}>) {
  return {
    onRegister: (engineer: Engineer) => {
      dispatch(registerEngineer(engineer));
    }
  }
}

export const EngineerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EngineerComponent as any);