import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import {Card, ListGroup, Row, Col } from "react-bootstrap";
import "../../styles/cardfriend.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faComments} from '@fortawesome/free-solid-svg-icons'
const FriendCard = () => {

  const {store , actions} = useContext(Context);

    return(
      <>
      {store.userexample.map((singleUser, index) => {
        return(
        <Card key={index} className="friendcard" style={{ width: '100%', height:'10rem'}}>
            <Row className="row d-flex justify-content-center pt-4">
                <Col className="col-4"><Card.Img className="friendimage" variant="top" src={singleUser.img_url}/></Col>
                <Col className="col-4">          
                    <Card.Title className="frienduser">{singleUser.username}</Card.Title>
                </Col>
                <Col className="col-3 d-flex flex-column pt-2">          
                    <FontAwesomeIcon className="pb-3" icon={faCircleUser} size="2xl"style={{color: "#ffffff",}} />
                    <FontAwesomeIcon icon={faComments} size="2xl" style={{color: "#ffffff",}} />
                </Col>
            </Row>
      </Card>
      )})}
      </>
    )
}


export {FriendCard};