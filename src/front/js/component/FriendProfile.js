import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Button, Modal, Card, ListGroup, Form } from "react-bootstrap";
import "../../styles/profilecard.css";
import { useParams } from "react-router-dom";
import TapNewsLogo from '/workspaces/sp78-Final-Project-TapNews/public/1729329195515-removebg-preview.png'


const FriendProfile = () => {
  const { store, actions } = useContext(Context);
  const { friend_id } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await actions.getUser(friend_id); 
        await actions.getProfile(friend_id); 
        await actions.getFriends(friend_id); 
        setLoading(false); 
      } catch (err) {
        setError("Hubo un error al cargar los datos."); 
        setLoading(false);
      }
    };

    loadData();
  }, []); 

  if (loading) {
    return  (<div className="loading">
      <img className="logo-3" src={TapNewsLogo} alt="Loading..." />
          </div>);
  }

  if (error) {
    return <div>{error}</div>;
  }

  const user = store.user || {};
  const profile = store.profile || {};
  const friends = store.friend || [];
  console.log(store.user)
  return (
    <>
      <Card style={{ width: '100%', backgroundColor: '#0044CC' }}>
        <Card.Img className="mx-auto m-4 profileimage" variant="top" src={profile.img_url || 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg'} />
        <Card.Body>
          <Card.Title className="text-center username">{user.username || 'Usuario no disponible'}</Card.Title>
          <Card.Text className="text-center description">
            {profile.description || 'Descripción no disponible'}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="text-center">Amistades - {friends.length}</ListGroup.Item>
          <ListGroup.Item className="text-center gridtitle">Noticias guardadas</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
}

export { FriendProfile };