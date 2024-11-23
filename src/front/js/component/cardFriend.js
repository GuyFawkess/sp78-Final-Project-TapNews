import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Card, Modal, Button, Row, Col } from "react-bootstrap";
import "../../styles/cardfriend.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faComments } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import TapNewsLogo from '/workspaces/sp78-Final-Project-TapNews/public/1729329195515-removebg-preview.png';

const FriendCard = () => {
  const { store, actions } = useContext(Context);
  const [show, setShow] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const userId = localStorage.getItem("user_id");


  const handleClose = () => setShow(false);
  const handleShow = (friendId) => {
    setSelectedFriendId(friendId);
    setShow(true);
  };


  useEffect(() => {
    actions.getFriends(userId);
    console.log(store.friends)
  }, [userId]);


  useEffect(() => {
    actions.getAllUsers();
    actions.getAllProfiles();
  }, [userId]);

  if (!store.friends.length || !store.listuser.length) {
    return (<div style={{position: 'absolute', top: '0', bottom:'0', right:'0', left: '0'}} className="loading">
      <img className="logo-2" src={TapNewsLogo} />
      <hr className="separate"></hr>
      <h5 className="textnofriend">Aún no has agregado amistades</h5>
      </div>);
  }

  const friendsWithProfiles = store.friends.map(friend => {
    const user = store.listuser.find(user => (user.id) === (friend.friend_id));
    const profile = store.listprofile.find(profile => (profile.user_id) === (friend.friend_id));

    return {
      ...user,
      profile: profile || {}
    };
  });


  return (
    <>
      {friendsWithProfiles.map((friend, index) => {
        const key = `${friend.id}-${index}`
        return (
          <Card key={key} className="friendcard" style={{ width: '100%', height: '10rem' }}>
            <Row className="row d-flex justify-content-center pt-4">
              <Col className="col-4">
                <Card.Img className="friendimage" variant="top" src={friend.profile.img_url || 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg'} />
              </Col>
              <Col className="col-4">
                <Card.Title className="frienduser">{friend.username}</Card.Title>
              </Col>
              <Col className="col-3 d-flex flex-column">
                <Link className="mx-auto" to={`/friends/${friend.id}`}>
                  <FontAwesomeIcon className="pb-2" icon={faCircleUser} size="2xl" style={{ color: "#ffffff" }} />
                </Link>
                <Link className="mx-auto" to={`/chat/${friend.id}`}>
                  <FontAwesomeIcon className="pb-2" icon={faComments} size="2xl" style={{ color: "#ffffff" }} />
                </Link>
                <FontAwesomeIcon className="pb-2" onClick={() => handleShow(friend.id)} icon={faCircleXmark} size="2xl" style={{ color: "#ffffff" }} />
              </Col>
            </Row>
          </Card>
        );
      })}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className="text-title">Borrar amistad</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-modal">¿Seguro que quieres eliminar esta amistad?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button className="delete" onClick={() => {
            actions.deleteFriend(userId, selectedFriendId); // Llamada a eliminar amistad
            handleClose();
          }}>
            Eliminar definitivamente
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { FriendCard };