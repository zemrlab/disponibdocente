import React from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'react-bootstrap'
import fotoHombre from '../media/imagenHombre.jpg';
import fotoMujer from '../media/ImagenMujer.jpg';

const PhotoPanel = ({photo,profesor}) =>
    <Panel bsStyle="primary">
        <Panel.Heading>
            <Panel.Title componentClass="h3">Fotografia</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
            <div>

                <img align="centered" width="75%" src={photo} alt={'NO FOTO'}/>
            </div>
        </Panel.Body>
    </Panel>


export default PhotoPanel

PhotoPanel.propTypes = {
    photo: PropTypes.string
}

/*{
                    (profesor.genero!=='')?((profesor.genero==='M')?photo=fotoHombre:photo=fotoMujer):""
                }*/