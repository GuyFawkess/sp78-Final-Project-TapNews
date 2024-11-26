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
            <Modal.Header closeButton>
                <Modal.Title className="title-logout">Filtrar Noticias</Modal.Title>
            </Modal.Header>
            <Modal.Body className="">
                <ul>
                    {store.allCategories?.map((category) => (
                        <li key={category} className="text-decoration-none">
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
            <Modal.Footer>
                <Button variant="danger" onClick={clearAll}>Limpiar Todo</Button>
                <Button variant="secondary" onClick={closeModal}>Cerrar</Button>
                <Button variant="primary" onClick={applyFilter}>Aplicar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FiltroModal;