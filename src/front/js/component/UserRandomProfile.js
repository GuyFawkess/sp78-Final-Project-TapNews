import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Button, Card, ListGroup } from "react-bootstrap";
import "../../styles/profilecard.css";
import { useParams } from "react-router-dom";
import TapNewsLogo from '../../../../public/tapnews.jpg';

const UserRandomProfile = () => {
  const { store, actions } = useContext(Context);
  const { random_id } = useParams();  
  const userId = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [loading2, setLoading2] = useState(true)

 
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await actions.getRandomUser(random_id); 
        await actions.getRandomProfile(random_id); 
        await actions.getRandomFriends(random_id);
        await actions.getRandomFriends(userId)
        await actions.getUserPendingFriends(userId);
        await actions.getFriends(userId)
        setLoading(false);
      } catch (err) {
        setError("Hubo un error al cargar los datos.");
        setLoading(false);
      }
    };

    loadData();
  }, [random_id]); 

  useEffect(() => {
    if (store.friends.includes(random_id)) {
      setIsFriend(true);
      setIsPending(false);  
    } else if (store.pendingFriends.includes(random_id)) {
      setIsPending(true);
      setIsFriend(false);  
    } else {
      setIsFriend(false);
      setIsPending(false);
    }
  }, [store.friends, store.pendingFriends, random_id, handleAddFriend]);

  const user = store.randomUser
  const profile = store.randomProfile
  const friends = store.randomFriends  


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
      await actions.getRandomFriends(random_id);
      await actions.getUserPendingFriends(userId);
      await actions.getFriends(userId)
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
          {!isFriend && !isPending ? (
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
              {isPending ? "Solicitud pendiente" : "Ya sois amigos"}
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