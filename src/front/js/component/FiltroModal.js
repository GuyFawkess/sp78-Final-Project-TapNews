import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Modal, Button } from "react-bootstrap";
import "../../styles/filter.css";
const FiltroModal = ({ showModal, closeModal }) => {
    const { store, actions } = useContext(Context);
    const [selectedCategories, setSelectedCategories] = useState(store.categories || []);

    const handleCategoryClick = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category)); 
        } else {
            setSelectedCategories([...selectedCategories, category]); 
        }
    }

    const applyFilter = () => {
        actions.setCategories(selectedCategories);
        closeModal();
    }

    const clearAll = () => {
        setSelectedCategories([]);
    };

    const labels = ['General', 'Ciencia', 'Deportes', 'Economía', 'Salud', 'Ocio', 'Tecnología', 'Política', 'Alimentación', 'Turismo'];

    const isSelected = (category) => {
        return selectedCategories.includes(category);
    };

    return (
        <Modal show={showModal} onHide={closeModal} animation={false}>
            <Modal.Header closeButton style={{ backgroundColor: '#0079FF' }}>
                <Modal.Title className="text-white">Filtrar Noticias</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#008AF3' }}>
                <div className="d-flex flex-wrap">
                    {store.allCategories?.map((category, index) => (
                        <Button
                            key={category}
                            className={`filter-button mx-2 my-1 text-capitalize ${isSelected(category) ? 'selected' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {labels[index]}
                        </Button>
                    ))}
                </div>
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
