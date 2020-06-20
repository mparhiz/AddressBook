import { createAction, props } from '@ngrx/store';
import { Employee } from '../../models/employee.model';

// actions
//----- Fetch Employees
export const EmployeesFetchAction = createAction(
    '[Employees] Fetch Request'
);
export const EmployeesFetchSuccessAction = createAction(
    '[Employees] Fetch Success',
    props<{ employeesInfo: Employee[] }>()
);
export const EmployeesFetchFailedAction = createAction(
    '[Employees] Fetch Failed',
    props<{ error: any }>()
);

//----- Add Employees
export const EmployeeAddAction = createAction(
    '[Employee] Add Request',
    props<{ employee: Employee }>()
);
export const EmployeeAddSuccessAction = createAction(
    '[Employee] Add Success',
    props<{ employee: Employee }>()
);
export const EmployeeAddFailedAction = createAction(
    '[Employee] Add Failed',
    props<{ error: any }>()
);

//----- Update Employees
export const EmployeeUpdateAction = createAction(
    '[Employee] Update Request',
    props<{ employee: Employee }>()
);
export const EmployeeUpdateSuccessAction = createAction(
    '[Employee] Update Success',
    props<{ employee: Employee }>()
);
export const EmployeeUpdateFailedAction = createAction(
    '[Employee] Update Failed',
    props<{ error: any }>()
);

//----- Delete Employees
export const EmployeeDeleteAction = createAction(
    '[Employee] Delete Request',
    props<{ employeeId: number }>()
);
export const EmployeeDeleteSuccessAction = createAction(
    '[Employee] Delete Success',
    props<{ employeeId: number }>()
);
export const EmployeeDeleteFailedAction = createAction(
    '[Employee] Delete Failed',
    props<{ error: any }>()
);
