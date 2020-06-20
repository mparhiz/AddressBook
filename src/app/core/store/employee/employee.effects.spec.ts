import { TestBed, inject } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, Observable, NEVER } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { EmployeeEffects } from './employee.effects';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Actions } from '@ngrx/effects';

describe('EmployeeEffects', () => {
    let actions$: Observable<Action>;
    let mockRouter: Router;
    let newEmployee: Employee;
    let employees: Employee[];
    const employeeService: EmployeeService = new EmployeeService();
    const error = new Observable<never>();
    let routerSpy = {navigate: jasmine.createSpy('navigate')};
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule.withRoutes([]) ],
            providers: [
                EmployeeEffects,
                [provideMockActions(() => actions$)],
                { provide: Router, useValue: routerSpy }
            ]
        });

        mockRouter = TestBed.get(Router);

        employees = [
            { id: 10, firstName: "Alana", lastName: "Hammond", department: "Software Delivery", phone: "123456789" },
            { id: 20, firstName: "Chris", lastName: "Thorburn", department: "Accounting", phone: "123456789" },
            { id: 30, firstName: "Katrina", lastName: "Maguire", department: "HR", phone: "123456789" },
            { id: 40, firstName: "Tony", lastName: "Burge", department: "Software Delivery", phone: "123456789" }
        ];

        newEmployee = {
            id: null,
            firstName: "Tom",
            lastName: "Long",
            department: "Accounting",
            phone: "123"
        };
    });

    it('should get employees', () => {
        const actions = new Actions(
            of({ type: '[Employees] Fetch Request' })
        );

        // create the effect
        const effects = new EmployeeEffects(employeeService, actions, mockRouter);
        
        spyOn(employeeService, 'getAllEmployeesInfo').and.returnValue(of(employees));
        
        // expect remains the same
        effects.fetchEmployeesInfo$.subscribe(action => {
            expect(action).toEqual({
                type: '[Employees] Fetch Success',
                employeesInfo: employees,
            });
        });
    });

    it('should return failur', () => {
        const actions = new Actions(
            of({ type: '[Employees] Fetch Request' })
        );

        const effects = new EmployeeEffects(employeeService, actions, mockRouter);        
        
        spyOn(employeeService, 'getAllEmployeesInfo').and.rejectWith();
        
        effects.fetchEmployeesInfo$.subscribe(action => {
            expect(action.type).toEqual('[Employees] Fetch Failed');
        });
    });

    it('should add an employee', () => {
        const actions = new Actions(
            of({ 
                type: '[Employee] Add Request',
                employee: newEmployee
            })
        );
        
        const effects = new EmployeeEffects(employeeService, actions, mockRouter);

        effects.addEmployeeInfo$.subscribe(action => {
            expect(action.employee.id).toEqual(5);
        });
        effects.fetchEmployeesInfo$.subscribe(action => {
            expect(action.employeesInfo.length).toEqual(5);
        });
    });

    it('should delete an employee', () => {
        const actions = new Actions(
            of({ 
                type: '[Employee] Delete Request',
                employeeId: 2
            })
        );

        const effects = new EmployeeEffects(employeeService, actions, mockRouter);
        
        effects.deleteEmployeeInfo$.subscribe(action => {
            expect(action.type).toEqual('[Employee] Delete Success');
            expect(action.employeesInfo.length).toEqual(3);
        });
    });
});
