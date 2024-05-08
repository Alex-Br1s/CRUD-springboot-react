const url = import.meta.env.VITE_GENERAL_API
import {CustomerData} from '../types/CustomerData'

export async function getAllCustomers () {
    const response = await fetch(url + 'customers')
    const data = await response.json()
    return data

}

export async function deleteCustomerById (id:number) {
    const response = await fetch(url + 'customers/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
    console.log(response)
    if(response.status === 200) {
        console.log("El cliente se elimino con exito")
    }
}

export async function addCustomer(customer: CustomerData): Promise<void> {
    const response = await fetch(url + 'customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    });
    
    if (response.ok) {
        console.log("El cliente se creó con éxito");
    } else {
        throw new Error("Error al crear el cliente");
    }
}

export async function updateCustomer(editCustomer: CustomerData): Promise<void> {
    const response = await fetch(url + 'customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editCustomer),
    });
    
    if (response.ok) {
        console.log("El cliente se actualizo con éxito");
    } else {
        throw new Error("Error al crear el cliente");
    }
}

