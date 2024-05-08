import React, { useState, useEffect } from 'react';
import { getAllEmployee, deleteEmployeeById, addEmployee, updateEmployee } from '../employee/employee-api';


interface EmployeeData {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    salary: string;
}

const Employee: React.FC = () => {
    const [modalAddEmployee, setModalAddEmployee] = useState(false);
    const [modalUpdateEmployee, setModalUpdateEmploye] = useState(false);

    const [editingEmployee, setEditingEmployee] = useState<EmployeeData | null>(null)
    const [employee, setEmployee] = useState<EmployeeData[]>([]);
    const [dataEmployee, setDataEmployee] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        salary: '',
    });

    useEffect(() => {
        getAllEmployee()
            .then((response) => {
                setEmployee(response);
            })
            .catch((error) => {
                console.error("Error al obtener los clientes: ", error);
            });
    }, []);

    const handleDeleteCustomer = (id: number) => {
        deleteEmployeeById(id)
            .then(() => {
                setEmployee(employee.filter((employe) => employe.id !== id));
            })
            .catch((error) => {
                console.error("Error al eliminar el cliente: ", error);
            });
    };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        const { name, value } = event.target

        //?Si el modal esta abierto es decir esta en true quiere decir que quiero editar en lugar de crear
        if(modalUpdateEmployee){
            //?Ademas si en el estado editingEmployee hay un empleado a editar 
            if(editingEmployee){
                //?Guardamos una copia de los datos del empleado y vamos actualizando dependiendo el input
                const updateEmployee = {...editingEmployee, [name]: value}
                setEditingEmployee(updateEmployee)
            }
        }
        else{
            setDataEmployee({...dataEmployee, [name]: value});
        }
    };
    
    const handleUpdateSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if(editingEmployee !== null) {
            try {
                await updateEmployee(editingEmployee)

                const response = await getAllEmployee()
                setEmployee(response)

                setModalUpdateEmploye(false)
            } catch (error) {
                console.error("Error al actualizar el cliente: ", error)
            }
        }
    }
    
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        addEmployee(dataEmployee)  
        setModalAddEmployee(false);
        window.location.reload()
    };
    
    const handleUpdateEmployee = (employee: EmployeeData) => {
        setEditingEmployee(employee);
        setModalUpdateEmploye(true)
    }

    return (
        <div>
            <header className="w-full flex justify-center items-start">
                <div className="w-3/4 mt-5">
                    <button onClick={() => setModalAddEmployee(true)} className="mb-4 bg-indigo-500 text-white px-4 py-2 rounded">
                        Agregar usuario
                    </button>
                    <table className="w-full bg-gray-100 border-collapse">
                        <thead>
                            <tr>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">
                                    Nombre
                                </th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">
                                    Apellido
                                </th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">
                                    Email
                                </th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">
                                    Teléfono
                                </th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">
                                    Dirección
                                </th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">
                                    Salario
                                </th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map((employe) => (
                                <tr key={employe.id} className="bg-white hover:bg-gray-100">
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {employe.firstname}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {employe.lastname}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {employe.email}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {employe.phone}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {employe.address}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {employe.salary}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        <a href="#" onClick={() => handleUpdateEmployee(employe)} className="text-gray-600 py-1 rounded-md px-3 mr-2 bg-sky-300">
                                            Editar
                                        </a>
                                        <a href="#" onClick={() => handleDeleteCustomer(employe.id)} className="text-white py-1 rounded-md px-2 bg-red-600">
                                            Eliminar
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </header>

            {modalAddEmployee && (
                <div className="py-12 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                    <form onSubmit={handleSubmit} role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                            <div className="w-full flex justify-start text-gray-600 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width="52" height="52" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                    <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                                </svg>
                            </div>
                            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                                Agregar nuevo usuario
                            </h1>

                            {/* Inputs del formulario */}
                            <label htmlFor="nombre" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nombre</label>
                            <input
                                id="firstname"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="firstname"
                                value={dataEmployee.firstname}
                                onChange={handleInputChange}
                                placeholder="James"
                            />

                            <label htmlFor="apellido" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Apellido</label>
                            <input
                                id="lastname"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="lastname"
                                value={dataEmployee.lastname}
                                onChange={handleInputChange}
                                placeholder="Gonzales"
                            />

                            <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                            <input
                                id="email"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="email"
                                value={dataEmployee.email}
                                onChange={handleInputChange}
                                placeholder="email@example.com"
                            />

                            <label htmlFor="telefono" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Teléfono</label>
                            <input
                                id="phone"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="phone"
                                value={dataEmployee.phone}
                                onChange={handleInputChange}
                                placeholder="123456789"
                            />

                            <label htmlFor="direccion" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Dirección</label>
                            <input
                                id="address"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="address"
                                value={dataEmployee.address}
                                onChange={handleInputChange}
                                placeholder="Calle 123"
                            />

                            <label htmlFor="salario" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Salario</label>
                            <input
                                id="salary"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="salary"
                                value={dataEmployee.salary}
                                onChange={handleInputChange}
                                placeholder="Calle 123"
                            />

                            <div className="flex items-center justify-start w-full">
                                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">
                                    Agregar
                                </button>

                                <button
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                                    onClick={() => setModalAddEmployee(false)}
                                    type="button"
                                >
                                    Cancelar
                                </button>
                            </div>

                            <button
                                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                                onClick={() => setModalAddEmployee(false)}
                                aria-label="close modal"
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
                {modalUpdateEmployee && (
                <div className="py-12 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                    <form onSubmit={handleUpdateSubmit} role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                            <div className="w-full flex justify-start text-gray-600 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width="52" height="52" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                    <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                                </svg>
                            </div>
                            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                                Actualizar empleado
                            </h1>

                            {/* Inputs del formulario */}
                            <label htmlFor="nombre" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nombre</label>
                            <input
                                id="firstname"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="firstname"
                                value={editingEmployee ? editingEmployee.firstname : ''}
                                onChange={handleInputChange}
                                placeholder="James"
                            />

                            <label htmlFor="apellido" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Apellido</label>
                            <input
                                id="lastname"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="lastname"
                                value={ editingEmployee ? editingEmployee.lastname : '' }
                                onChange={handleInputChange}
                                placeholder="Gonzales"
                            />

                            <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                            <input
                                id="email"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="email"
                                value={ editingEmployee ? editingEmployee.email : '' }
                                onChange={handleInputChange}
                                placeholder="email@example.com"
                            />

                            <label htmlFor="telefono" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Teléfono</label>
                            <input
                                id="phone"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="phone"
                                value={ editingEmployee ? editingEmployee.phone : '' }
                                onChange={handleInputChange}
                                placeholder="123456789"
                            />

                            <label htmlFor="direccion" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Dirección</label>
                            <input
                                id="address"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="address"
                                value={ editingEmployee ? editingEmployee.address : '' }
                                onChange={handleInputChange}
                                placeholder="Calle 123"
                            />

                            <label htmlFor="salario" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Salario</label>
                            <input
                                id="salary"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="salary"
                                value={ editingEmployee ? editingEmployee.salary : '' }
                                onChange={handleInputChange}
                                placeholder="Calle 123"
                            />

                            <div className="flex items-center justify-start w-full">
                                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">
                                    Agregar
                                </button>

                                <button
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                                    onClick={() => setModalUpdateEmploye(false)}
                                    type="button"
                                >
                                    Cancelar
                                </button>
                            </div>

                            <button
                                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                                onClick={() => setModalUpdateEmploye(false)}
                                aria-label="close modal"
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Employee;

