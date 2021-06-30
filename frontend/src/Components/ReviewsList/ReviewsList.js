import React, { useEffect, useState } from 'react'
import { getReviews, addReview, updateReview, deleteReview } from '../../Services/reviewService';
import Input from '../Input/Input'
import './ReviewsList.scss'

export default function ReviewsList(props) {
    const [reviews, setReviews] = useState([]);
    const [modalType, setModalType] = useState('add');
    const [showModal, setShowModal] = useState(false);
    const [editedReview, setEditedReview] = useState({});
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsMounted(true);
        updateList();
        return () => { setIsMounted(false) }
    }, [isMounted]);

    function updateList() {
        getReviews()
            .then((result) => {
                setReviews(result);
            })
            .then((error) => {
                setError(error);
            })
    }

    if (error) {
        return <div>{error}</div>;
    }

    function addNewClicked(type, showHide, reviewId) {
        setModalType(type);
        setShowModal(showHide);

        if (type === 'edit') {
            setEditedReview(reviews.filter(p => p.id === reviewId)[0])
        }
    }

    async function addNewReview(event) {
        event.preventDefault();
        event.stopPropagation();

        const formData = new FormData(event.target);
        const data = {
            'id': editedReview.id || null,
            'title': formData.get('title'),
            'shortDescription': formData.get('shortDescription'),
            'description': formData.get('description'),
            'postedOn': new Date(),
        }

        formData.forEach(function(val, key, fD){
            formData.delete(key)
        });

        let result = false;
        if (modalType === 'add') {
            result = await addReview(data);
        } else {
            result = await updateReview(data);
        }
        
        if (result) {
            addNewClicked('add', false);
            updateList();
        }
    }

    async function deleteReviewDialog(id) {
        var r = window.confirm("Confirm delete");
        if (r === true) {
            await deleteReview(id);
            updateList();
        }
    }

    return (
        <div className="ReviewsList-container">
            <table>
                <thead>
                    <tr>
                        <th className="col-2">Name</th>
                        <th className="col-2">Short Description</th>
                        <th className="col-2">Description</th>
                        <th className="col-2">Posted On</th>
                        <th className="col-2">Edit</th>
                        <th className="col-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(r => {
                        return <tr key={r.id}>
                            <td className="col-2">{r.title}</td>
                            <td className="col-2">{r.shortDescription}</td>
                            <td className="col-2">{r.description}</td>
                            <td className="col-2">{r.postedOn}</td>
                            <td className="col-2 link green" onClick={() => addNewClicked('edit', true, r.id)}>
                                    Edit <i className="fas fa-edit"></i> </td>
                            <td className="col-2 link red" onClick={() => deleteReviewDialog(r.id)}>
                                    Delete <i className="fas fa-trash-alt"></i></td>
                        </tr>
                    })}

                    <tr>
                        <td className="link green" colSpan="5" onClick={() => addNewClicked('add', true)}>
                                Add new Review <i className="fas fa-plus"></i></td>
                    </tr>
                </tbody>
            </table>

            <div className={"modal " + (showModal ? 'shown' : 'hidden')}>
                {modalType === 'add' ?
                    <form onSubmit={addNewReview}>
                        <h2>Add new phone</h2>
                        <div className='close-modal' onClick={(e) => { e.preventDefault(); addNewClicked('add', false) }}>X</div>
                        <Input type="text" placeholder="Title" name="title" required defaultValue=""></Input>
                        <Input type="textarea" placeholder="Short description" name="shortDescription" required defaultValue=""></Input>
                        <Input type="textarea" placeholder="Description" name="description" required defaultValue=""></Input>
                        {/* <Input type="submit" className="green-background"  value="add"></Input> */}
                        <input type="submit" className="button" placeholder="Add" value="Add"></input>
                    </form>
                    :
                    <form onSubmit={addNewReview}>
                        <h2>Edit phone</h2>
                        <div className='close-modal' onClick={(e) => { e.preventDefault(); addNewClicked('add', false) }}>X</div>
                        <Input type="text" placeholder="Title" name="title" required defaultValue={editedReview.title}></Input>
                        <Input type="textarea" placeholder="Short Description" name="shortDescription" required 
                            defaultValue={editedReview.shortDescription}></Input>
                        <Input type="textarea" placeholder="Description" name="description" required 
                            defaultValue={editedReview.description}></Input>
                        <input type="submit" className="button" placeholder="Edit" value="Edit"></input>
                    </form>
                }
            </div>
        </div>
    )
}