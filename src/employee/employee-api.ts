const url = import.meta.env.VITE_GENERAL_API
import { EmployeeData } from "../types/EmployeData"

export async function getAllEmployee () {
    const response = await fetch(url + 'employees')
    const data = await response.json()
    console.log(data)
    return data
}

export async function deleteEmployeeById(id: number) {
    const response = await fetch(url + 'employees/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        
    if(response.status == 200) {
        console.log('Se elimino el empleado')
    }
}

export async function addEmployee(employees: EmployeeData): Promise<void> {
    const response = await fetch(url + 'employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employees)
    })
    if(response.status == 200) {
        console.log('El empleado se creo con éxito')
    }else {
        throw new Error('Error al crear el empleado')
    }
}

export async function updateEmployee(employee: EmployeeData) {
    const response = await fetch(url + 'employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
    if(response.status == 200) {
        console.log('El empleado se actualizo con exito')
    }else{
        throw new Error('Error al actualizar el empleado')
    }
}