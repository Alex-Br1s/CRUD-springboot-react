const url = import.meta.env.VITE_GENERAL_API
import { SupplierData } from "../types/SupplierData"

export async function getAllSupplier () {
    const response = await fetch(url + 'supplier')
    const data = await response.json()
    console.log(data)
    return data
}

export async function deleteSupplierById (id: number) {
    const response = await fetch(url + 'supplier' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },   
    })
    if(response.status == 200) {
        console.log('Se creo el provedor con éxito')
    }
}

export async function addSupplier(supplier: SupplierData): Promise<void> {
    const response = await fetch(url + 'supplier', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(supplier)
    })
    if(response.status == 200) {
        console.log('El provedor se creo con éxito')
    }else {
        throw new Error('Error al crear el provedor')
    }
}

export async function updateSupplier(supplier: SupplierData){
    const response = await fetch(url + 'supplier', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(supplier)
    })
    if(response.status == 200) {
        console.log('El provedor se actualizo con éxito')
    }else {
        throw new Error('Error al actualiza el provedor')
    }
}