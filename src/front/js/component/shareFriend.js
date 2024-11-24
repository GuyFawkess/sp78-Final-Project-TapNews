import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Card, Row, Col } from "react-bootstrap";
import "../../styles/sharefriend.css";  
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faComments } from '@fortawesome/free-solid-svg-icons';
import TapNewsLogo from '../../../../public/tapnewslogo.png';

const ShareFriend = ({url}) => {
  const { store, actions } = useContext(Context);
  const userId = localStorage.getItem("user_id");
  console.log("URL en ShareFriend:", url);

  useEffect(() => {
    actions.getFriends(userId);
    console.log(store.friends)
  }, [userId]);

  useEffect(() => {
    actions.getAllUsers();
    actions.getAllProfiles();
  }, [userId]);

  if (!store.friends.length || !store.listuser.length) {
    return (
      <div className="loading-container">
        <img className="loading-logo" src={TapNewsLogo} alt="Logo" />
        <hr className="loading-separator" />
        <h5 className="loading-text">Aún no has agregado amistades</h5>
      </div>
    );
  }

  const friendsWithProfiles = store.friends.map(friend => {
    const user = store.listuser.find(user => user.id === friend.friend_id);
    const profile = store.listprofile.find(profile => profile.user_id === friend.friend_id);

    return {
      ...user,
      profile: profile || {}
    };
  });

  return (
    <>
      {friendsWithProfiles.map((friend, index) => {
        const key = `${index}`
        return (
          <Card key={key} className="friend-card" style={{ width: '80%', height: '6rem' }}>
            <Row className="friend-row d-flex justify-content-center pt-4">
              <Col className="friend-col-4">
                <Card.Img className="friend-image" variant="top" src={friend.profile.img_url || 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg'} />
              </Col>
              <Col className="friend-col-4">
                <Card.Title className="friend-username">{friend.username}</Card.Title>
              </Col>
              <Col className="friend-col-3 d-flex flex-column">
              <Link className="friend-link"
                to={`/chat/${friend.id}`}
                 state={{ url: url }}>
                <FontAwesomeIcon className="friend-icon" icon={faComments} size="2xl" style={{ color: "#ffffff" }} />
              </Link>
              </Col>
            </Row>
          </Card>
        );
      })}
    </>
  );
};

export { ShareFriend };
