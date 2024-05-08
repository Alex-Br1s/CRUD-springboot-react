import React, { useState, useEffect } from 'react';
import { getAllSupplier, deleteSupplierById, addSupplier, updateSupplier } from '../Supplier/supplier-api';


interface SupplierData {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    web: string;
    contact: string;
}

const Supplier: React.FC = () => {
    const [modalAddSupplier, setModalAddSupplir] = useState(false);
    const [modalUpdateSupplier, setModalUpdateSupplir] = useState(false);
 
    const [editingSupplier, setEditingSupplir] = useState<SupplierData | null>(null);
    const [supplier, setSupplier] = useState<SupplierData[]>([]);
    const [dataSupplier, setDataSupplier] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        web: '',
        contact: '',
    });

    useEffect(() => {
        getAllSupplier()
            .then((response) => {
                setSupplier(response);
            })
            .catch((error) => {
                console.error("Error al obtener los clientes: ", error);
            });
    }, []);

    const handleDeleteCustomer = (id: number) => {
        deleteSupplierById(id)
            .then(() => {
                setSupplier(supplier.filter((supplier) => supplier.id !== id));
            })
            .catch((error) => {
                console.error("Error al eliminar el cliente: ", error);
            });
    };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;

        if(modalUpdateSupplier){
            if(editingSupplier !== null) {
                setEditingSupplir({...editingSupplier, [name]: value})
            }
        }else {
            setDataSupplier({...dataSupplier, [name]: value})
        }
    };
    

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        addSupplier(dataSupplier)  
        setModalAddSupplir(false);
        window.location.reload()
    };
    
    const handleUpdateSupplier = (supplier:SupplierData) => {
        setEditingSupplir(supplier)
        setModalUpdateSupplir(true)
    }

    const handleUpdateSubmit = async(event: React.FormEvent) => {
        event.preventDefault()
        if(editingSupplier){
            const {name, email, phone, address, web, contact} = editingSupplier
            
            if(!name || !email || !phone || !address || !web || !contact) {
                alert('Todos los campos son obligatorios. Por favor, complete todos los campos.')
                return
            }
            try {
                if(editingSupplier !== null) {
                    await updateSupplier(editingSupplier)
                    const updatedSuppliers = await getAllSupplier()
                setSupplier(updatedSuppliers)
                setModalUpdateSupplir(false)
            }
        } catch (error) {
            throw new Error('Error al actualizar el usuario ' + error)
        }
    }
}

    return (
        <div>
            <header className="w-full flex justify-center items-start">
                <div className="ml-16 mt-5">
                    <button onClick={() => setModalAddSupplir(true)} className="mb-4 bg-indigo-500 text-white px-4 py-2 rounded">
                        Agregar usuario
                    </button>
                    <table className=" bg-gray-100 border-collapse">
                        <thead>
                            <tr>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">
                                    Nombre
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
                                    Web
                                </th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">
                                    Contact
                                </th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {supplier.map((supplier) => (
                                <tr key={supplier.id} className="bg-white hover:bg-gray-100">
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {supplier.name}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {supplier.email}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {supplier.phone}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {supplier.address}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {supplier.web}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        {supplier.contact}
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border border-gray-300">
                                        <a href="#" onClick={() => handleUpdateSupplier(supplier)} className="text-gray-600 py-1 rounded-md px-3 mr-2 bg-sky-300">
                                            Editar
                                        </a>
                                        <a href="#" onClick={() => handleDeleteCustomer(supplier.id)} className="text-white py-1 rounded-md px-2 bg-red-600">
                                            Eliminar
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </header>

            {modalAddSupplier && (
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
                                id="name"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="name"
                                value={dataSupplier.name}
                                onChange={handleInputChange}
                                placeholder="James"
                            />
                            <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                            <input
                                id="email"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="email"
                                value={dataSupplier.email}
                                onChange={handleInputChange}
                                placeholder="email@example.com"
                            />

                            <label htmlFor="telefono" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Teléfono</label>
                            <input
                                id="phone"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="phone"
                                value={dataSupplier.phone}
                                onChange={handleInputChange}
                                placeholder="123456789"
                            />

                            <label htmlFor="direccion" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Dirección</label>
                            <input
                                id="address"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="address"
                                value={dataSupplier.address}
                                onChange={handleInputChange}
                                placeholder="Calle 123"
                            />

                            <label htmlFor="web" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Web</label>
                            <input
                                id="web"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="web"
                                value={dataSupplier.web}
                                onChange={handleInputChange}
                                placeholder="https://www.google.com"
                            />
                            <label htmlFor="contacto" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Contacto</label>
                            <input
                                id="contact"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="contact"
                                value={dataSupplier.contact}
                                onChange={handleInputChange}
                                placeholder="Contacto"
                            />

                            <div className="flex items-center justify-start w-full">
                                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">
                                    Agregar
                                </button>

                                <button
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                                    onClick={() => setModalAddSupplir(false)}
                                    type="button"
                                >
                                    Cancelar
                                </button>
                            </div>

                            <button
                                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                                onClick={() => setModalAddSupplir(false)}
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

            {modalUpdateSupplier && (
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
                                Actualizar provedor
                            </h1>

                            {/* Inputs del formulario */}
                            <label htmlFor="nombre" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nombre</label>
                            <input
                                id="name"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="name"
                                value={editingSupplier ? editingSupplier.name : ''}
                                onChange={handleInputChange}
                                placeholder="James"
                            />
                            <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                            <input
                                id="email"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="email"
                                value={editingSupplier ? editingSupplier.email : ''}
                                onChange={handleInputChange}
                                placeholder="email@example.com"
                            />

                            <label htmlFor="telefono" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Teléfono</label>
                            <input
                                id="phone"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="phone"
                                value={editingSupplier ? editingSupplier.phone : ''}
                                onChange={handleInputChange}
                                placeholder="123456789"
                            />

                            <label htmlFor="direccion" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Dirección</label>
                            <input
                                id="address"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="address"
                                value={editingSupplier ? editingSupplier.address : ''}
                                onChange={handleInputChange}
                                placeholder="Calle 123"
                            />

                            <label htmlFor="web" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Web</label>
                            <input
                                id="web"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="web"
                                value={editingSupplier ? editingSupplier.web : ''}
                                onChange={handleInputChange}
                                placeholder="https://www.google.com"
                            />
                            <label htmlFor="contacto" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Contacto</label>
                            <input
                                id="contact"
                                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                name="contact"
                                value={editingSupplier ? editingSupplier.contact : ''}
                                onChange={handleInputChange}
                                placeholder="Contacto"
                            />

                            <div className="flex items-center justify-start w-full">
                                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">
                                    Agregar
                                </button>

                                <button
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                                    onClick={() => setModalUpdateSupplir(false)}
                                    type="button"
                                >
                                    Cancelar
                                </button>
                            </div>

                            <button
                                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                                onClick={() => setModalUpdateSupplir(false)}
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

export default Supplier;

