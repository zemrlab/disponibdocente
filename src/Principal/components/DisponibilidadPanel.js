import React from 'react'
import PropTypes from 'prop-types'
import {Panel,Col,Label,Row} from 'react-bootstrap'
import DisponibilidadHoraria from './DisponibilidadHoraria'
import "./cssComponents/DisponibilidadPanel.css"

const DisponibilidadPanel = ({rows=[],columns=[],selection=[],enabled=[],onSelect= f=>f,editable=false,estadoEditar=true,changeEdit=f=>f,...props}) =>
    <Panel bsStyle="primary">
        <Panel.Heading>
            <Panel.Title componentClass="h3">Disponibilidad Horaria</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
                <Col md={10}>
                        <DisponibilidadHoraria rows={rows} columns={columns} selection={selection} enabled={enabled}
                                       onSelect={onSelect} editable={editable} estadoEditar={estadoEditar} changeEdit={changeEdit} {...props}/>
                </Col>
                <Col md={2} >
                    <Row className="leyenda">
                        <Col md={8} className="labelleyenda">
                            <p >Libre</p>
                        </Col>
                        <Col md={2} className="labelleyenda">
                            <div className="Llibre" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} className="labelleyenda">
                            <p >Ocupado</p>
                        </Col>
                        <Col md={2} className="labelleyenda">
                            <div className="Locupado" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} className="labelleyenda">
                            <p >Deshabilitado</p>
                        </Col>
                        <Col md={2} className="labelleyenda">
                            <div className="Ldesahibilitado" />
                        </Col>
                    </Row>
                </Col>
       </Panel.Body>
    </Panel>

export default DisponibilidadPanel

DisponibilidadPanel.propTypes = {
  columns: PropTypes.array,
  enabled: PropTypes.array,
  onSelect: PropTypes.func,
  rows: PropTypes.array,
  selection: PropTypes.array
}