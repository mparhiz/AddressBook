import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as employeeActions from './employee.actions';
import { EmployeeService } from '../../services/employee.service';

@Injectable()
export class EmployeeEffects {
    
    fetchEmployeesInfo$ = createEffect(() => this.actions$.pipe(
        ofType(employeeActions.EmployeesFetchAction),
        mergeMap((action) => this.employeeService.getAllEmployeesInfo()
            .pipe(
                map(employeesInfo => employeeActions.EmployeesFetchSuccessAction({employeesInfo})),
                catchError(() => employeeActions.EmployeesFetchFailedAction)
            )
        )
    ));

    addEmployeeInfo$ = createEffect(() => this.actions$.pipe(
        ofType(employeeActions.EmployeeAddAction),
        mergeMap((action) => this.employeeService.addEmployeeInfo(action.employee)
            .pipe(
                map(employee => employeeActions.EmployeeAddSuccessAction({employee})),
                catchError(() => employeeActions.EmployeeAddFailedAction)
            )
        ),
        tap(() => this.router.navigate(["addressbooklist"]))
    ));

    deleteEmployeeInfo$ = createEffect(() => this.actions$.pipe(
        ofType(employeeActions.EmployeeDeleteAction),
        mergeMap((action) => this.employeeService.deleteEmployeeInfo(action.employeeId)
            .pipe(
                map(employeeId => employeeActions.EmployeeDeleteSuccessAction({employeeId})),
                catchError((error) => employeeActions.EmployeeDeleteFailedAction)
            )
        ),
        mergeMap((action) => this.employeeService.getAllEmployeesInfo()
            .pipe(
                map(employeesInfo => employeeActions.EmployeesFetchSuccessAction({employeesInfo})),
                catchError(() => employeeActions.EmployeesFetchFailedAction)
            )
        )
    ));

    constructor(
        private employeeService: EmployeeService,
        private actions$: Actions,
        private router: Router
    ) { }
}
