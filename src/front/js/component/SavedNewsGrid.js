import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from 'react-bootstrap/Card';
import { Row } from "react-bootstrap";
import "../../styles/grid.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFile } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SavedNewsGrid = ({ usergrid}) => {
  const { store, actions } = useContext(Context);
  
  useEffect(() => {
    if (usergrid) {
      actions.getFavouriteNews(usergrid);  
    }
  }, [usergrid]);

  return (
    <div className="gridbox">
      <Row className="d-flex justify-content-center" style={{marginBlockEnd: '60px'}}>
        {store.favouriteNews.map((singleFavorite, index) => (
          <Card className="col-4" key={index} style={{backgroundImage: `url(${singleFavorite.img_url})`}}>
            <FontAwesomeIcon onClick={() => actions.deleteFavouriteNew(singleFavorite.news_id)} className="trash" icon={faTrash} style={{color: "#ffffff"}} />
            <Link to={`/news/${singleFavorite.news_id}`}>
              <FontAwesomeIcon className="filenew" icon={faFile} style={{color: "#ffffff"}} />
            </Link> 
          </Card>
        ))}
      </Row>
    </div>
  );
};

export { SavedNewsGrid };