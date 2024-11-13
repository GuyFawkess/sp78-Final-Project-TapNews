import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import {Button, Modal, Card, ListGroup, Form} from "react-bootstrap";
import "../../styles/profilecard.css";

const ProfileCard = () => {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Card style={{width: '100%', height: '26.2rem', backgroundColor: '#0044CC'}}>
        <Card.Img className="mx-auto m-4 profileimage" variant="top" src="https://avatars.githubusercontent.com/u/171564426?v=4" />
          <Card.Body>
            <Card.Title className="username">ADayekh - Alejandro Dayekh</Card.Title>
            <Card.Text className="description">
            Maestro de Primaria. Full Stack Programming Learner. Piloto de dron/Fotografía
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="text-center">Amistades - 47</ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-center"><Button className="editprofile" onClick={() => openModal()}>Editar perfil</Button></ListGroup.Item>
          </ListGroup>
          <hr/>
      </Card>

        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title className="modaltitle">Editar perfil</Modal.Title>
          </Modal.Header>
            <Modal.Body className="form-bg">
              <Form>
                <Form.Group className="mb-3" controlId="Form.ControlInput1">
                  <Form.Label className="label">Nombre de Usuario</Form.Label>
                  <Form.Control type="username" placeholder="Usuario" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Form.ControlInput2">
                  <Form.Label className="label">Correo electrónico</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Form.ControlInput3">
                  <Form.Label className="label">Nombre</Form.Label>
                  <Form.Control type="name" placeholder="Nombre" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="label">Descripción</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
          <Modal.Footer>
            <Button className="close" onClick={closeModal}>
              Cerrar
            </Button>
            <Button className="savechanges" onClick={closeModal}>
              Guardar cambios
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export {ProfileCard};