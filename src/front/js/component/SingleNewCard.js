import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Card, Modal, Button} from "react-bootstrap";
import {useParams , Link} from "react-router-dom";
import "../../styles/singlenewcard.css";
const SingleNew = () => {
    const { store, actions } = useContext(Context);
    const { uuid } = useParams(); 
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    useEffect(() => {
        actions.getSingleNew(uuid);
    }, []);

    console.log(store.news)
    return(
        <>
            <Card className=" Card-bg" style={{backgroundImage: `url(${store.news.media_url})`, width: '100%', height: '55rem', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
              <Card.Body style={{backdropFilter:'brightness(40%)', width: '100%', height: '55rem'}} className="mycardbody">
              <Card.Text className="newspaper">Fuente: {store.news.newspaper}</Card.Text>
                <Card.Title className="titlesinglenew">{store.news.title}</Card.Title>
                <Card.Text className="description">
                  {store.news.content}
                </Card.Text>
                <Button className="showmore" onClick={openModal}>Noticia completa</Button>
              </Card.Body>
            </Card>

            <Modal show={showModal} onHide={closeModal}>
        <Modal.Header className="title-modal" closeButton>
          <Modal.Title >Visitar noticia del medio</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-new">Para acceder al texto completo de la noticias deberás salir de la aplicación. ¿Seguro que quieres completar esta acción?</Modal.Body>
        <Modal.Footer>
          <Button className="close" onClick={closeModal}>Cerrar</Button>
          <Link to={store.news.url}><Button className="visitnew" onClick={closeModal}>Visitar medio</Button></Link>
        </Modal.Footer>
      </Modal>
        
        </>
    )
}

export {SingleNew};