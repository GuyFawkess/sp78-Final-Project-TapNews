import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Modal, Button } from "react-bootstrap";


const FiltroModal = ({ showModal, closeModal }) => {
    const { store, actions } = useContext(Context);
    const [selectedCategories, setSelectedCategories] = useState(store.categories || []);

    // ADD AND REMOVE CATEGORY
    const handleCheckboxChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category))
        } else {
            setSelectedCategories([...selectedCategories, category])
        };
    }

    const applyFilter = () => {
        actions.setCategories(selectedCategories)
        closeModal()
    }

    const clearAll = () => {
        setSelectedCategories([]);
    };

    return (
        <Modal show={showModal} onHide={closeModal} animation={false}>
            <Modal.Header closeButton style={{ backgroundColor: '#0079FF' }}>
                <Modal.Title className="text-white">Filtrar Noticias</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#008AF3' }}>
                <ul>
                    {store.allCategories?.map((category) => (
                        <li key={category} className="text-decoration-none text-white">
                            <label className="text-capitalize">
                                <input
                                    className="mx-2"
                                    type="checkbox"
                                    value={category}
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCheckboxChange(category)}
                                />
                                {category}
                            </label>
                        </li>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#0095D0' }} className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <Button variant="danger" onClick={clearAll}>Limpiar Todo</Button>
                </div>
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="mx-2" onClick={closeModal}>Cerrar</Button>
                    <Button variant="primary" onClick={applyFilter}>Aplicar</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default FiltroModal;