import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Button, Card, ListGroup } from "react-bootstrap";
import "../../styles/profilecard.css";
import { useParams } from "react-router-dom";
import TapNewsLogo from '/workspaces/sp78-Final-Project-TapNews/public/1729329195515-removebg-preview.png';

const UserRandomProfile = () => {
  const { store, actions } = useContext(Context);
  const { random_id } = useParams();  
  const userId = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFriend, setIsFriend] = useState(false); 

  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await actions.getUser(random_id); 
        await actions.getProfile(random_id); 
        await actions.getFriends(random_id); 
        setLoading(false);
      } catch (err) {
        setError("Hubo un error al cargar los datos.");
        setLoading(false);
      }
    };

    loadData();
  }, []); 


  const user = store.user || {};
  const profile = store.profile || {};
  const friends = store.friends || []; 
  

  useEffect(() => {
    if (friends.length > 0) {
      setIsFriend(friends.some(friend => friend.id === random_id));
    }
  }, [friends, random_id]);

  if (loading) {
    return (
      <div style={{position: 'absolute', top: '0', bottom:'0', right:'0', left: '0'}} className="loading">
        <img className="logo-3" src={TapNewsLogo} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleAddFriend = async () => {
    try {
      await actions.addFriend(userId, random_id); 
      setIsFriend(true); 
    } catch (err) {
      setError("Hubo un error al añadir el amigo.");
    }
  };

  return (
    <>
      <Card style={{ width: '100%', backgroundColor: '#0044CC' }}>
        <Card.Img 
          className="mx-auto m-4 profileimage" 
          variant="top" 
          src={profile.img_url || 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg'} 
        />
        <Card.Body>
          <Card.Title className="text-center username">
            {user.username || 'Usuario no disponible'}
          </Card.Title>
          <Card.Text className="text-center description">
            {profile.description || 'Descripción no disponible'}
          </Card.Text>
          {!isFriend ? (
            <Button 
              variant="primary" 
              className="w-100"
              onClick={handleAddFriend}
            >
              Añadir amigo
            </Button>
          ) : (
            <Button 
              variant="secondary" 
              className="w-100" 
              disabled
            >
              Ya eres amigo
            </Button>
          )}
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="text-center">Amistades - {friends.length}</ListGroup.Item>
          <ListGroup.Item className="text-center gridtitle">Noticias guardadas</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
}

export {UserRandomProfile};