import React, { useEffect, useState } from 'react'
import { getPhones, addPhone, updatePhone, deletePhone } from '../../Services/phoneService';
import Input from '../Input/Input'
import './PhonesList.scss'

export default function PhonesList(props) {
    const [phones, setPhones] = useState([]);
    const [modalType, setModalType] = useState('add');
    const [showModal, setShowModal] = useState(false);
    const [editedPhone, setEditedPhone] = useState({});
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsMounted(true);
        updateList();
        return () => { setIsMounted(false) }
    }, [isMounted]);

    function updateList() {
        getPhones()
            .then((result) => {
                setPhones(result);
            })
            .then((error) => {
                setError(error);
            })
    }

    if (error) {
        return <div>{error}</div>;
    }

    function addNewClicked(type, showHide, phoneId) {
        setModalType(type);
        setShowModal(showHide);

        if (type === 'edit') {
            setEditedPhone(phones.filter(p => p.id === phoneId)[0])
        }
    }

    async function addNewPhone(event) {
        event.preventDefault();
        event.stopPropagation();

        const formData = new FormData(event.target);
        const data = {
            'id': editedPhone.id || null,
            'name': formData.get('phoneName'),
            'description': formData.get('description'),
            'defaultImage': formData.get('defaultImage'),
            'images': [formData.get('defaultImage')],
            'price': formData.get('price') - 0,
        }

        formData.forEach(function(val, key, fD){
            formData.delete(key)
        });

        let result = false;
        if (modalType === 'add') {
            result = await addPhone(data);
        } else {
            result = await updatePhone(data);
        }
        
        if (result) {
            addNewClicked('add', false);
            updateList();
        }
    }

    function deletePhoneDialog(id) {
        var r = window.confirm("Confirm delete");
        if (r === true) {
            deletePhone(id);
            updateList();
        }
    }

    return (
        <div className="PhonesList-container">
            <table>
                <thead>
                    <tr>
                        <th className="col-3">Name</th>
                        <th className="col-3">Description</th>
                        <th className="col-2">Price</th>
                        <th className="col-2">Edit</th>
                        <th className="col-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {phones.map(p => {
                        return <tr key={p.name}>
                            <td className="col-3">{p.name}</td>
                            <td className="col-3">{p.description}</td>
                            <td className="col-2">{p.price}</td>
                            <td className="col-2 link green" onClick={() => addNewClicked('edit', true, p.id)}>Edit <i className="fas fa-edit"></i> </td>
                            <td className="col-2 link red" onClick={() => deletePhoneDialog(p.id)}>Delete <i className="fas fa-trash-alt"></i></td>
                        </tr>
                    })}

                    <tr>
                        <td className="link green" colSpan="5" onClick={() => addNewClicked('add', true)}>Add new phone <i className="fas fa-plus"></i></td>
                    </tr>
                </tbody>
            </table>

            <div className={"modal " + (showModal ? 'shown' : 'hidden')}>
                {modalType === 'add' ?
                    <form onSubmit={addNewPhone}>
                        <h2>Add new phone</h2>
                        <div className='close-modal' onClick={(e) => { e.preventDefault(); addNewClicked('add', false) }}>X</div>
                        <Input type="text" placeholder="Phone name" name="phoneName" required defaultValue=""></Input>
                        <Input type="textarea" placeholder="Description" name="description" required defaultValue=""></Input>
                        <Input type="url" placeholder="Default image" name="defaultImage" required defaultValue=""></Input>
                        <Input type="number" placeholder="Price" name="price" required defaultValue=""></Input>
                        {/* <Input type="submit" className="green-background"  value="add"></Input> */}
                        <input type="submit" className="button" placeholder="Add" value="Add"></input>
                    </form>
                    :
                    <form onSubmit={addNewPhone}>
                        <h2>Edit phone</h2>
                        <div className='close-modal' onClick={(e) => { e.preventDefault(); addNewClicked('add', false) }}>X</div>
                        <Input type="text" placeholder="Phone name" name="phoneName" required defaultValue={editedPhone.name}></Input>
                        <Input type="textarea" placeholder="Description" name="description" required defaultValue={editedPhone.description}></Input>
                        <Input type="url" placeholder="Default image" name="defaultImage" required defaultValue={editedPhone.defaultImage}></Input>
                        <Input type="number" placeholder="Price" name="price" required defaultValue={editedPhone.price}></Input>
                        <input type="submit" className="button" placeholder="Edit" value="Edit"></input>
                    </form>
                }
            </div>
        </div>
    )
}