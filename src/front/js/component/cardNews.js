import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import "../../styles/card.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faHeart, faSave, faShare } from '@fortawesome/free-solid-svg-icons'
function BasicExample() {

  const [description, setDescription] = useState(false)
  const {store , actions} = useContext(Context);

  const visibility_description = () => {
    setDescription(!description); 
  };

    return (
      <>
      {store.topnews.map((singleNew, index) => {
        return(
            <Card className=" Card-bg" key={index} style={{backgroundImage: `url(${singleNew.image_url})`, width: '27rem', height: '55rem', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                <div className="actions d-flex flex-column" style={{backdropFilter: description ? 'brightness(30%)' : 'brightness(60%)'}}>
                    <FontAwesomeIcon size="2xl" icon={faHeart} style={{color: "#FFFFFF",}} className="like p-2" aria-controls="basic-navbar-nav"/>
                    <FontAwesomeIcon size="2xl" icon={faBookmark} style={{color: "#FFFFFF",}} className="like p-2" aria-controls="basic-navbar-nav"/>
                    <FontAwesomeIcon size="2xl" icon={faComment} style={{color: "#FFFFFF",}} className="comment p-2" aria-controls="basic-navbar-nav"/>
                    <FontAwesomeIcon size="2xl" icon={faShare} style={{color: "#FFFFFF",}} className="share p-2" aria-controls="basic-navbar-nav"/>
                </div>
              <Card.Body style={{backdropFilter: description ? 'brightness(40%)' : 'brightness(70%)', marginTop: description ? '150%' : '180%'}} className="mycardbody">
                <Card.Title className="title" onClick={() => visibility_description()}>{singleNew.title}</Card.Title>
                <Card.Text className="description"  style={{ visibility: description ? 'visible' : 'hidden' }}>
                  {singleNew.description}
                </Card.Text>
              </Card.Body>
            </Card>
      )})}
      </>
    );
  }
  
  export default BasicExample;