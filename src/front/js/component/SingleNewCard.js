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
  faTrash,
  faPlay
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
  const [currentCommentNews, setCurrentCommentNews] = useState(null);



  const handleCommentClick = async (uuid) => {
    setCurrentCommentNews(uuid);
    setShowCommentModal(true);
 
    actions.getComments(uuid);

  };

  useEffect(() => {
    setComments(store.singleNewsComments);
  }, [store.singleNewsComments, actions.addComments]);

  const handleSendComment = async () => {
    if (!comment) return;
    const success = await actions.addComments(uuid, comment);
    if (success) {
      setComment("");
    }
  };

  useEffect(() => {
    actions.getSingleNew(uuid);
    actions.getUserLikes()
  }, []);

  useEffect(() => {
    actions.getNumberLike(uuid);
  }, []);


  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const openShareModal = () => setShowShareModal(true);
  const closeShareModal = () => setShowShareModal(false);
  const closeCommentModal = () => setShowCommentModal(false);

  const handleLike = () => {
    const liked = store.likes.includes(uuid);
    if (liked) {
      actions.deleteLike(uuid);
    } else {
      actions.addLike(uuid);
    }
  };


  const likeStyle = store.likes.includes(uuid) ? { color: "#FF0000" } : { color: "#FFFFFF" };

  return (
    <>
      <Card className="Card-bg" style={{ backgroundImage: `url(${store.news.image_url})`, width: '100%', height: '55rem', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <Card.Body style={{WebkitBackdropFilter:'brightness(40%)', backdropFilter: 'brightness(40%)', width: '100%', height: '55rem' }} className="mycardbody">
          <Card.Text className="newspaper">Fuente: {store.news.source}</Card.Text>
          <Card.Title className="titlesinglenew">{store.news.title}</Card.Title>
          <Card.Text className="description">{store.news.description}</Card.Text>
          <div className="d-flex actions2">
            <Button className="showmore" onClick={openModal}>Noticia completa</Button>
            <div className="actions d-flex mt-3 mx-4">
              <div className="d-flex flex-column">
                <div><FontAwesomeIcon onClick={handleLike} size="2xl" icon={faHeart} style={likeStyle} className="action-icon p-2" /></div>
                <div className="mx-auto numberlike">{store.numberlikes.like_count}</div>
              </div>
              <div>
                <FontAwesomeIcon onClick={() => handleCommentClick(uuid)} size="2xl" icon={faComment} style={{ color: "#FFFFFF" }} className="action-icon p-2" />
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
          <Modal.Title className="title comments">
            <h1 className="text-center text-light mt-2">Comentarios:</h1>
          </Modal.Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "70vh",
              overflow: "hidden",
            }}
          >
            <Button
              variant="secondary"
              className="me-3"
              onClick={closeCommentModal}
              style={{
                position: "absolute",
                right: "5px",
                top: "5px",
                padding: "0.5rem",
                height: "40px",
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Modal.Header
              className="text-light d-flex align-items-center justify-content-between"
              style={{
                flexShrink: 0,
              }}
            >
              {currentCommentNews ? (
                <div>
                  <h5>{currentCommentNews.title}</h5>
                </div>
              ) : (
                <p>Cargando datos...</p>
              )}
            </Modal.Header>
            <Modal.Body
              className="modal-body-scrollable-bool text-light"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1rem",
                paddingRight: "2rem",
              }}
            >
              {comments?.comments?.map((comment, index) => (
                <div
                  key={index}
                  className="comment mb-3 d-flex align-items-start"
                >
                  {/* Imagen del usuario */}
                  <img
                    src={comment.img_url || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg"} // Ruta predeterminada si no hay imagen
                    alt={`${comment.username || "Usuario"} avatar`}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />

                  {/* Contenido del comentario */}
                  <div>
                    <p className="text-light mb-1">
                      <strong>{comment.username || "Anónimo"}</strong> -{" "}
                      <small>
                        {new Date(comment.created_at).toLocaleString()}
                      </small>
                    </p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer
              className="footer text-light"
              style={{
                flexShrink: 0,
                borderTop: "1px solid #dee2e6",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >
                <textarea

                  className="form-control2 text-light"
                  placeholder="Escribe tu comentario..."
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    width: "100%",
                    paddingRight: "4rem",
                    boxSizing: "border-box",
                    background: "#0044cc"
                  }}
                ></textarea>

                <Button
                  variant="primary"
                  onClick={handleSendComment}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    padding: "0.5rem 1rem",
                  }}
                >
                  <FontAwesomeIcon icon={faPlay} />
                </Button>
              </div>
            </Modal.Footer>
          </div>
        </Modal>
    </>
  );
}

export { SingleNew };
