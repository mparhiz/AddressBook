import { TestBed, getTestBed } from '@angular/core/testing';
import { EmployeeService } from "./employee.service";
import { Employee } from '../models/employee.model';

describe('EmployeeService', () => {
    let Services: EmployeeService;
    let injector: TestBed;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [EmployeeService],
        });

        injector = getTestBed();
        Services = injector.get(EmployeeService);
    });

    const dummyEmployeeListResponse = [
        { id: 1, firstName: "Alana", lastName: "Hammond", department: "Software Delivery", phone: "123456789" },
        { id: 2, firstName: "Chris", lastName: "Thorburn", department: "Accounting", phone: "123456789" },
        { id: 3, firstName: "Katrina", lastName: "Maguire", department: "HR", phone: "123456789" },
        { id: 4, firstName: "Tony", lastName: "Burge", department: "Software Delivery", phone: "123456789" }
    ];

    it('getAllEmployeesInfo() should return data', () => {
        Services.getAllEmployeesInfo().subscribe((res) => {
            expect(res).toEqual(dummyEmployeeListResponse);
        });
    });

    it('addEmployeeInfo() should add an employee info', () => {
        const newEmployee: Employee = {
            id: null,
            firstName: 'George',
            lastName: 'Bluth',
            department: 'HR',
            phone: '1234'
        }
        Services.addEmployeeInfo(newEmployee).subscribe((res) => {
            expect(res.id).toEqual(5);
        });
        Services.getAllEmployeesInfo().subscribe((res) => {
            expect(res.length).toEqual(5);
        });
    });

    it('deleteEmployeeInfo() should delete an employee info', () => {
        const deleteEmployeeId = 2;

        Services.deleteEmployeeInfo(deleteEmployeeId).subscribe((res) => {
            expect(res).toEqual(2);
        });
        Services.getAllEmployeesInfo().subscribe((res) => {
            expect(res.length).toEqual(3);
        });
    });

});
