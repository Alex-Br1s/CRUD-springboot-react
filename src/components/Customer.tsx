import React, { useState, useEffect } from 'react';
import { getAllCustomers, deleteCustomerById, addCustomer, updateCustomer } from '../customers/customers-api';

interface CustomerData {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
}

const Customer: React.FC = () => {
    const [modalAddCustomer, setModalAddCustomer] = useState(false);
    const [modalUpdateCustomer, setModalUpdateCustomer] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<CustomerData | null>(null);
    console.log(editingCustomer)

    const [customers, setCustomers] = useState<CustomerData[]>([]);
    const [dataCustomer, setDataCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
    });

    console.log(dataCustomer.firstname)

    useEffect(() => {
        getAllCustomers()
            .then((response) => {
                setCustomers(response);
            })
            .catch((error) => {
                console.error("Error al obtener los clientes: ", error);
            });
    }, []);

    const handleDeleteCustomer = (id: number) => {
        deleteCustomerById(id)
            .then(() => {
                setCustomers(customers.filter((customer) => customer.id !== id));
            })
            .catch((error) => {
                console.error("Error al eliminar el cliente: ", error);
            });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (modalUpdateCustomer) {
        // Cuando estás en el modal de actualización, trabaja directamente con `editingCustomer`
        // Crea una copia de `editingCustomer` si es no nulo
        if (editingCustomer) {
            const updatedCustomer = { ...editingCustomer, [name]: value };
            setEditingCustomer(updatedCustomer);
        }
    } else {
        // Cuando estás en el modal de agregar cliente, actualiza `dataCustomer`
        setDataCustomer({...dataCustomer, [name]: value,});
    }
};

    
    
    const handleUpdateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (editingCustomer !== null) {
        try {
            await updateCustomer(editingCustomer);

            const response = await getAllCustomers();
            setCustomers(response);

            setModalUpdateCustomer(false);
        } catch (error) {
            console.error("Error al actualizar el cliente: ", error);
        }
    }
};

    

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        addCustomer(dataCustomer)  
        setModalAddCustomer(false);
        window.location.reload()
    };
    
    const handleUpdateCustomer = (customer: CustomerData) => {
        console.log(customer)
        setEditingCustomer(customer)
        console.log(editingCustomer)
        setModalUpdateCustomer(true)
    }

    return (
        <div>
            <header className="w-full flex justify-center items-start">
                <div className="w-3/4 mt-5">
                    <button onClick={() => setModalAddCustomer(true)} className="mb-4 bg-indigo-500 text-white px-4 py-2 rounded">
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
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id} className="bg-white hover:bg-gray-100">
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {customer.firstname}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {customer.lastname}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {customer.email}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {customer.phone}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {customer.address}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        <a href="#" onClick={() => handleUpdateCustomer(customer)} className="text-gray-600 py-1 rounded-md px-3 mr-2 bg-sky-300">
                                            Editar
                                        </a>
                                        <a href="#" onClick={() => handleDeleteCustomer(customer.id)} className="text-white py-1 rounded-md px-2 bg-red-600">
                                            Eliminar
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </header>

            {modalAddCustomer && (
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
                                value={dataCustomer.firstname}
                                onChange={handleInputChange}
                                placeholder="James"
                            />

                            <label htmlFor="apellido" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Apellido</label>
                            <input
                                id="lastname"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="lastname"
                                value={dataCustomer.lastname}
                                onChange={handleInputChange}
                                placeholder="Gonzales"
                            />

                            <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                            <input
                                id="email"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="email"
                                value={dataCustomer.email}
                                onChange={handleInputChange}
                                placeholder="email@example.com"
                            />

                            <label htmlFor="telefono" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Teléfono</label>
                            <input
                                id="phone"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="phone"
                                value={dataCustomer.phone}
                                onChange={handleInputChange}
                                placeholder="123456789"
                            />

                            <label htmlFor="direccion" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Dirección</label>
                            <input
                                id="address"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="address"
                                value={dataCustomer.address}
                                onChange={handleInputChange}
                                placeholder="Calle 123"
                            />

                            <div className="flex items-center justify-start w-full">
                                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">
                                    Agregar
                                </button>

                                <button
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                                    onClick={() => setModalAddCustomer(false)}
                                    type="button"
                                >
                                    Cancelar
                                </button>
                            </div>

                            <button
                                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                                onClick={() => setModalAddCustomer(false)}
                                aria-label="close modal"
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setModalAddCustomer(false)} className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {modalUpdateCustomer && (
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
                                Actualizar cliente
                            </h1>

                            {/* Inputs del formulario */}
                            <label htmlFor="nombre" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nombre</label>
                            <input
                                id="firstname"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="firstname"
                                value={editingCustomer ? editingCustomer.firstname : ''}
                                onChange={handleInputChange}
                                placeholder="James"
                            />

                            <label htmlFor="apellido" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Apellido</label>
                            <input
                                id="lastname"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="lastname"
                                value={editingCustomer ? editingCustomer.lastname : ''}
                                onChange={handleInputChange}
                                placeholder="Gonzales"
                            />

                            <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                            <input
                                id="email"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="email"
                                value={editingCustomer ? editingCustomer.email : ''}
                                onChange={handleInputChange}
                                placeholder="email@example.com"
                            />

                            <label htmlFor="telefono" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Teléfono</label>
                            <input
                                id="phone"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="phone"
                                value={editingCustomer ? editingCustomer.phone : ''}
                                onChange={handleInputChange}
                                placeholder="123456789"
                            />

                            <label htmlFor="direccion" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Dirección</label>
                            <input
                                id="address"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="address"
                                value={editingCustomer ? editingCustomer.address : ''}
                                onChange={handleInputChange}
                                placeholder="Calle 123"
                            />

                            <div className="flex items-center justify-start w-full">
                                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">
                                    Agregar
                                </button>

                                <button
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                                    onClick={() => setModalUpdateCustomer(false)}
                                    type="button"
                                >
                                    Cancelar
                                </button>
                            </div>

                            <button
                                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                                onClick={() => setModalAddCustomer(false)}
                                aria-label="close modal"
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=> setModalUpdateCustomer(false)} className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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

export default Customer;

