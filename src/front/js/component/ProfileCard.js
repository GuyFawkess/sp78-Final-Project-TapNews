import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Card, ListGroup, Form } from "react-bootstrap";
import "../../styles/profilecard.css";
import TapNewsLogo from '/workspaces/sp78-Final-Project-TapNews/public/1729329195515-removebg-preview.png';

const ProfileCard = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [description, setDescription] = useState(store.profile?.description || "");
  const [imageUrl, setImageUrl] = useState(store.profile?.img_url || "");
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openModal2 = () => setShowModal2(true);
  const closeModal2 = () => setShowModal2(false);

  useEffect(() => {
    if (userId) {
      actions.getProfile(userId);
      actions.getUser(userId);
      actions.getFriends(userId);
    } else {
      navigate("/login"); 
    }
  }, []);

  if (!store.user || !store.profile || !store.friends || !store.user.username) {
    return (
      <div className="loading">
        <img className="logo-3" src={TapNewsLogo} alt="Loading..." />
      </div>
    );
  }

  const handleSaveChanges = async () => {

    const updatedProfile = {
      description,
      image_url: imageUrl,
    };
    await actions.modifyProfile(userId, updatedProfile);
    setShowModal(false);
  };

  return (
    <>
      <Card style={{ width: '100%', backgroundColor: '#0044CC' }}>
        <Card.Img
          className="mx-auto m-4 profileimage"
          variant="top"
          src={store.profile.img_url || 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg'}
        />
        <Card.Body>
          <Card.Title className="text-center username">{store.user.username}</Card.Title>
          <Card.Text className="text-center description">{store.profile.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="text-center">
            Amistades - {store.friends && store.friends.length ? store.friends.length : ""}
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-center">
            <Button className="editprofile" onClick={openModal}>Editar perfil</Button>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-center">
            <Button className="logoutbutton" onClick={openModal2}>Cerrar sesión</Button>
          </ListGroup.Item>
          <ListGroup.Item className="text-center gridtitle">Noticias guardadas</ListGroup.Item>
        </ListGroup>
      </Card>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="modaltitle">Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body className="form-bg">
          <Form>
            <Form.Group className="mb-3" controlId="imageUrl">
              <Form.Label className="label">Imagen de perfil</Form.Label>
              <Form.Control
                type="url"
                placeholder="URL de la imagen"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label className="label">Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="close" onClick={closeModal}>Cerrar</Button>
          <Button className="savechanges" onClick={handleSaveChanges}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal2} onHide={closeModal2} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className="title-logout">Cierre de sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-logout">¿Seguro que quieres cerrar sesión?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal2}>Cerrar</Button>
          <Link to="/login">
            <Button className="reallogout" onClick={() => { 
              actions.logout();
              closeModal2();
            }}>
              Cerrar sesión
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ProfileCard };