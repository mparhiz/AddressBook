
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { of, Observable } from 'rxjs';

@Injectable()
export class EmployeeService {
    // mock employee info data
    employeeInfoList: Employee[] = [
        { id: 1, firstName: "Alana", lastName: "Hammond", department: "Software Delivery", phone: "123456789" },
        { id: 2, firstName: "Chris", lastName: "Thorburn", department: "Accounting", phone: "123456789" },
        { id: 3, firstName: "Katrina", lastName: "Maguire", department: "HR", phone: "123456789" },
        { id: 4, firstName: "Tony", lastName: "Burge", department: "Software Delivery", phone: "123456789" }
    ];

    constructor() { }

    getAllEmployeesInfo(): Observable<Employee[]> {
        const employees = this.employeeInfoList;
        return of(employees);
    }

    addEmployeeInfo(employee: Employee): Observable<Employee> {
        const maxId = this.employeeInfoList.map(emp => emp.id).sort((a,b) => b - a)[0];
        const newEmployee = {...employee, id: maxId +1};
        let employees = [ ...this.employeeInfoList ];
        employees.push(newEmployee);
        this.employeeInfoList = employees;
        return of(newEmployee);
    }

    deleteEmployeeInfo(employeeId: number): Observable<number> {
        this.employeeInfoList = this.employeeInfoList.filter((emp) => emp.id !== employeeId);
        return of(employeeId);
    }
}
