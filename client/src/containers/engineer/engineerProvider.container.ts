import { connect, Dispatch } from 'react-redux';

import { Engineer } from './../../models';
import { EngineerProviderComponent } from './../../components/dashboard/content/engineer/engineerProvider.component';
import { registerEngineer } from './../../actions';

function mapDispatchToProps(dispatch: Dispatch<{}>) {
  return {
    onRegister: (engineer: Engineer) => {
      dispatch(registerEngineer(engineer));
    }
  }
}

export const EngineerProviderContainer = connect<any, any, any>(
  null,
  mapDispatchToProps
)(EngineerProviderComponent);
