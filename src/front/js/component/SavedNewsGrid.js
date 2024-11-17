import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import Card from 'react-bootstrap/Card';
import { Row } from "react-bootstrap";
import "../../styles/grid.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const SavedNewsGrid = () => {
    const {store , actions} = useContext(Context);
    
    useEffect(() => {
        actions.getFavouriteNews()
    }, [store.favouriteNews])

    return(
    <>
        <div className="gridbox">
            <Row className="d-flex justify-content-center"style={{marginBlockEnd:'60px'}}>
                    {store.favouriteNews.map((singleFavorite, index) => {
                        return(
                            <Card className="col-4" key={index} style={{backgroundImage: `url(${singleFavorite.media_url})`}}>
                                <FontAwesomeIcon onClick={() => actions.deleteFavouriteNew(singleFavorite.id)} className="trash" icon={faTrash} style={{color: "#ffffff",}} />
                            </Card>
                        )})}
                </Row>
        </div>
    </>
    )
}

export {SavedNewsGrid}