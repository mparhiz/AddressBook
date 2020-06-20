import { ActionReducer, Action, createReducer, on } from '@ngrx/store';

import * as employeeActions from './employee.actions';
import { Employee } from '../../models/employee.model';

export interface EmployeeState {
    employeesInfo: Employee[];
    serverError: any;
}

export const initialState: EmployeeState = {
    employeesInfo: new Array<Employee>(),
    serverError: undefined
};

const reducer = createReducer(
    initialState,
    on(employeeActions.EmployeesFetchSuccessAction, (state: EmployeeState, action) => {
      return { ...state, employeesInfo: action.employeesInfo };
    }),
    on(employeeActions.EmployeeAddSuccessAction, (state, action) => {
      return { ...state }
    }),
    on(employeeActions.EmployeeDeleteSuccessAction, (state, action) => {
      //const updatedEmpInfo = state.employeesInfo.filter((emp) => emp.id !== action.employeeId);
      //return { ...state, employeesInfo: updatedEmpInfo };
      return { ...state }
    }),
    on(employeeActions.EmployeesFetchFailedAction, (state: EmployeeState, action) => {
      return { ...state, serverError: action.error };
    }),
    on(employeeActions.EmployeeAddFailedAction, (state: EmployeeState, action) => {
        return { ...state, serverError: action.error };
    }),
    on(employeeActions.EmployeeDeleteFailedAction, (state: EmployeeState, action) => {
        return { ...state, serverError: action.error };
    })
  );
  
  export function employeeReducer(state: EmployeeState | undefined, action: Action) {
    return reducer(state, action);
  }
