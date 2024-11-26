import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Card, Modal, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart,
  faComment,
  faShare,
  faXmark,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { ShareFriend } from "./shareFriend";  
import "../../styles/singlenewcard.css";

const SingleNew = () => {
  const { store, actions } = useContext(Context);
  const { uuid } = useParams(); 
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState(""); 
  const [comments, setComments] = useState([]);
  const [currentNews, setCurrentNews] = useState({});
  

  useEffect(() => {
    actions.getSingleNew(uuid);
  }, []);

  useEffect(() => {
    actions.getNumberLike(uuid);
  }, [store.numberlikes]);


  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const openShareModal = () => setShowShareModal(true);
  const closeShareModal = () => setShowShareModal(false);

  const openCommentModal = () => setShowCommentModal(true);
  const closeCommentModal = () => setShowCommentModal(false);

  const handleLike = () => {
    const liked = store.likes.includes(uuid);
    if (liked) {
      actions.deleteLike(uuid);
    } else {
      actions.addLike(uuid);
    }
  };


  const handleSendComment = async () => {
    if (comment.trim() === "") return; 

    const success = await actions.addComments(uuid, comment);
    if (success) {
      setComments((prev) => [
        ...prev,
        { content: comment, user_id: store.user_id }, 
      ]);
      setComment(""); 
    } else {
      console.error("No se pudo agregar el comentario.");
    }
  };

  const likeStyle = store.likes.includes(uuid) ? { color: "#FF0000" } : { color: "#FFFFFF" };

  useEffect(() => {
    if (store.news.uuid === uuid) {
      setCurrentNews(store.news);
      setComments(store.news.comments || []);
    }
  }, [store.news, uuid]);
  return (
    <>
      <Card className="Card-bg" style={{ backgroundImage: `url(${store.news.image_url})`, width: '100%', height: '55rem', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <Card.Body style={{ backdropFilter: 'brightness(40%)', width: '100%', height: '55rem' }} className="mycardbody">
          <Card.Text className="newspaper">Fuente: {store.news.source}</Card.Text>
          <Card.Title className="titlesinglenew">{store.news.title}</Card.Title>
          <Card.Text className="description">{store.news.description}</Card.Text>
          <div className="d-flex actions2">
            <Button className="showmore" onClick={openModal}>Noticia completa</Button>
            <div className="actions d-flex mt-4 mx-4">
              <div className="d-flex flex-column">
                <div><FontAwesomeIcon onClick={handleLike} size="2xl" icon={faHeart} style={likeStyle} className="action-icon p-2" /></div>
                <div className="mx-auto numberlike">{store.numberlikes.like_count}</div>
              </div>
              <div>
                <FontAwesomeIcon onClick={openCommentModal} size="2xl" icon={faComment} style={{ color: "#FFFFFF" }} className="action-icon p-2" />
              </div>
              <div>
                <FontAwesomeIcon onClick={openShareModal} size="2xl" icon={faShare} style={{ color: "#FFFFFF" }} className="action-icon p-2" />
              </div>
              <div>
              <FontAwesomeIcon onClick={() => actions.deleteFavouriteNew(uuid)}  className="action-icon p-2" size="2xl" icon={faTrash} style={{color: "#ffffff"}} />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

   
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header className="title-modal" closeButton>
          <Modal.Title>Visitar noticia del medio</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-new">Para acceder al texto completo de la noticia deberás salir de la aplicación. ¿Seguro que quieres completar esta acción?</Modal.Body>
        <Modal.Footer>
          <Button className="close" onClick={closeModal}>Cerrar</Button>
          <Link to={store.news.url}><Button className="visitnew" onClick={closeModal}>Visitar medio</Button></Link>
        </Modal.Footer>
      </Modal>

      <Modal className="modalshare" show={showShareModal} onHide={closeShareModal}>
        <Modal.Header>
          <Modal.Title>Compartir noticia</Modal.Title>
        </Modal.Header>
        <Modal.Body className="scrollable">
          <ShareFriend url={store.news.url}></ShareFriend>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeShareModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

   
      <Modal show={showCommentModal} onHide={closeCommentModal}>
        <Modal.Header className="text-light d-flex align-items-center justify-content-between">
          <h5>Comentarios</h5>
        </Modal.Header>
        <Modal.Body className="modal-body-scrollable-bool text-light" style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          <div className="comment-container">
            {comments.map((comment, idx) => (
              <p key={idx} className="comment-item">
                <strong>Usuario {comment.user_id}:</strong> {comment.content}
              </p>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <textarea
            className="form-control"
            placeholder="Escribe tu comentario..."
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <Button variant="primary" onClick={handleSendComment}>
            Enviar comentario
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { SingleNew };
