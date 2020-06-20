import * as fromEmployee from './employee.reducer';
import * as employeeActions from './employee.actions';
import { Employee } from '../../models/employee.model';

describe('employeeReducer', () => {
    const employeeInfo10 = new Employee();
    const employeeInfo20 = new Employee();
    const employeeInfo30 = new Employee();

    beforeAll(() => {
        employeeInfo10.id = 10;
        employeeInfo10.firstName = 'Tony';

        employeeInfo20.id = 20;
        employeeInfo20.firstName = 'Steve';

        employeeInfo30.id = 30;
        employeeInfo30.firstName = 'Mick';
    });

    it('should return initial state first', () => {

        const action = {} as any;

        const result = fromEmployee.employeeReducer(undefined, action);
        expect(result).toBe(fromEmployee.initialState);
    });

    it('should add one employee info', () => {

        const employeesInfo = [employeeInfo10];
        const state = fromEmployee.initialState;
        const action = employeeActions.EmployeesFetchSuccessAction({ employeesInfo });

        const result: fromEmployee.EmployeeState = fromEmployee.employeeReducer(state, action);

        expect(result.employeesInfo.length).toEqual(1);

        expect(result.employeesInfo[0].id).toEqual(10);
        expect(result.employeesInfo[0].firstName).toEqual('Tony');
    });

    it('should add two employee info', () => {

        const employeesInfo = [employeeInfo20, employeeInfo30];
        const state = fromEmployee.initialState;
        const action = employeeActions.EmployeesFetchSuccessAction({ employeesInfo });

        const result: fromEmployee.EmployeeState = fromEmployee.employeeReducer(state, action);

        expect(result.employeesInfo.length).toEqual(2);

        expect(result.employeesInfo[0].id).toEqual(20);
        expect(result.employeesInfo[0].firstName).toEqual('Steve');
        expect(result.employeesInfo[1].id).toEqual(30);
        expect(result.employeesInfo[1].firstName).toEqual('Mick');
    });

    // it('should add three household devices of two properties to proper device map positions', () => {

    //     let action = new employeeActions.DevicesFetchSuccessAction({ propertyId: 2, devices: [employeeInfo10, employeeInfo20] });
    //     const result1: fromEmployee.State = fromEmployee.employeeReducer(undefined, action);

    //     action = new employeeActions.DevicesFetchSuccessAction({ propertyId: 3, devices: [employeeInfo30] });
    //     const result2: fromEmployee.State = fromEmployee.employeeReducer(result1, action);

    //     // Should have two properties now
    //     expect(result2.devicesPerProperty.count()).toEqual(2);

    //     // First must have 2 devices
    //     const prop2Devices = result2.devicesPerProperty.get(2);
    //     expect(prop2Devices.length).toEqual(2);

    //     // Second must have 1 device
    //     const prop3Devices = result2.devicesPerProperty.get(3);
    //     expect(prop3Devices.length).toEqual(1);

    //     expect(prop2Devices[0].deviceId).toEqual('20');
    //     expect(prop2Devices[0].name).toEqual('Test Device 20');
    //     expect(prop2Devices[1].deviceId).toEqual('21');
    //     expect(prop2Devices[1].name).toEqual('Test Device 21');
    //     expect(prop3Devices[0].deviceId).toEqual('30');
    //     expect(prop3Devices[0].name).toEqual('Test Device 30');
    // });

});