import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Engineer } from './../../models';

namespace EngineerProviderComponent {
  export interface IProps {
    onRegister: (engineer: Engineer) => void;
  }

  export interface IState {
    firstName: string;
    lastName: string;
    middleName: string;
    month: string;
    day: string;
    year: string;
    job: string;
  }
}

export class EngineerProviderComponent extends React.Component<EngineerProviderComponent.IProps, EngineerProviderComponent.IState> {
  private getMonths(): Array<string> {
    return ['Jan Feb Mar Apr May June July Aug Sep Oct Nov Dec'];
  }

  private getDays(): Array<number> {
    let days: Array<number> = new Array<number>();
    for (let index: number = 1; index <= 31; ++index) {
      days.push(index);
    }
    return days;
  }

  private getYears(): Array<number> {
    let years: Array<number> = new Array<number>();
    for (let index: number = 1920; index <= 2017; ++index) {
      years.push(index);
    }
    return years;
  }

  private onRegister(): void {
    this.props.onRegister(
      new Engineer(this.state.firstName,
        this.state.lastName,
        this.state.middleName,
        this.state.day,
        this.state.month,
        this.state.year,
        this.state.job)
    );
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-10 col-sm-9 col-xs-9 col-md-offset-1 col-sm-offset-2 col-xs-offset-2'>
          <div className='x_panel'>
            <div>
              <h1>Register Engineer</h1>
              <div className='clearfix' />
            </div>
            <div className='x_content'>
              <br />
              <form id='demo-form2' data-parsley-validate='' className='form-horizontal form-label-left'>
                <div className='form-group'>
                  <label className='control-label col-md-4 col-sm-3 col-xs-12' htmlFor='first-name'>First/Last/Middle Name <span className='required'>*</span></label>
                  <div className='col-md-2 col-sm-6 col-xs-12'>
                    <input type='text' id='first-name' required={true} className='form-control col-md-7 col-xs-12'
                      onChange={(event) => this.setState({ firstName: event.target.value })} />
                  </div>
                  <div className='col-md-2 col-sm-6 col-xs-12'>
                    <input type='text' id='last-name' name='last-name' required={true} className='form-control col-md-7 col-xs-12'
                      onChange={(event) => this.setState({ lastName: event.target.value })} />
                  </div>
                  <div className='col-md-2 col-sm-6 col-xs-12'>
                    <input type='text' id='middle-name' className='form-control col-md-7 col-xs-12' name='middle-name'
                      onChange={(event) => this.setState({ middleName: event.target.value })} />
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='middle-name' className='control-label col-md-4 col-sm-3 col-xs-12'>Date of Birth <span className='required'>*</span></label>
                  <div className='col-md-2 col-sm-3 col-xs-6'>
                    <select name='month' id='month' className='form-control col-md-7 col-xs-12'
                      onChange={(event) => this.setState({ month: event.target.value })}>
                      {this.getMonths().map((month, index) => <option value={index} key={index}>{month}</option>)}
                    </select>
                  </div>
                  <div className='col-md-2 col-sm-3 col-xs-6'>
                    <select name='day' id='day' className='form-control col-md-7 col-xs-12'
                      onChange={(event) => this.setState({ day: event.target.value })}>
                      {this.getDays().map((day, index) => <option value={day} key={index}>{day}</option>)}
                    </select>
                  </div>
                  <div className='col-md-2 col-sm-3 col-xs-6'>
                    <select name='year' id='year' className='form-control col-md-7 col-xs-12'
                      onChange={(event) => this.setState({ year: event.target.value })}>
                      {this.getYears().map((year, index) => <option value={year} key={index}>{year}</option>)}
                    </select>
                  </div>
                </div>

                <div className='form-group'>
                  <label className='control-label col-md-4 col-sm-3 col-xs-12' htmlFor='gender'>Job <span className='required'>*</span></label>
                  <div className='col-md-6 col-sm-6 col-xs-12'>
                    <input type='text' id='job' required={true} className='form-control col-md-7 col-xs-12'
                      onChange={(event) => this.setState({ job: event.target.value })} />
                  </div>
                </div>

                <div className='form-group'>
                  <div className='col-md-6 col-sm-6 col-xs-12 col-md-offset-6'>
                    <button className='btn btn-primary' type='button' onClick={this.onRegister.bind(this)}>Register</button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}