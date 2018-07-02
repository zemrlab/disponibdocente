import React from 'react';
import {Table, FieldGroup} from 'react-bootstrap';
import ResultRow from './ResultRow';
import ButtonPdf from './componentesDesuso/ButtonPdf';
import { FormControl,Row } from 'react-bootstrap';

const TableResultado = ({resultados,filterHandler=f=>f,getDocenteData=f=>f,...props}) =>
    <div>
        <div  id="resultados_buscar" >
            <Table striped bordered condensed hover responsive>
                <thead>
                    <tr>
                        {
                            (resultados.length>0)?Object.keys(resultados[0] ).map((key)=>
                                <th key={key} className="text-center">{key}</th>
                            ):  null
                        }
                    </tr>
                </thead>
                <tbody>
                        {(resultados.length>0)?resultados.map((n,i)=>
                            <ResultRow key={i} resultado={n}/>) : null
                        }
                </tbody>
            </Table>
        </div>
        {/*<Row>
            <ButtonPdf />
        </Row>*/}
    </div>
export default TableResultado

//docker run --name='alfresco' -it --rm -p 8080:8080 -e 'MAIL_HOST=smtp.gmail.com' -e 'MAIL_PORT=587' -e 'MAIL_USERNAME=alejandro.sonnor@gmail.com' -e 'MAIL_PASSWORD=17Oh07Odgmeeru' -e 'MAIL_FROM_DEFAULT=alejandro.sonnor@gmail.com' -e 'MAIL_SMTP_AUTH=true' gui81/alfresco
/*<tr>
                    {(resultados.length>0)?resultados.map((n,i)=>
                            <ResultRow onClick={getDocenteData} key={i} resultado={n}/>) : <div></div>
                        }
                </tr>



                <tr>
                    <th className="text-center">Nombre
                        <FormControl className="color-fondo"
                                            name='nameFilter'
                                             type="text"
                                             onChange={filterHandler}/>
                    </th>
                    <th className="text-center">Apellido
                        <FormControl className="color-fondo"
                                            name='lastnameFilter'
                                             type="text"
                                             onChange={filterHandler}/>
                    </th>
                    <th className="text-center">DNI
                        <FormControl className="color-fondo"
                                            name='dniFilter'
                                             type="text"
                                             onChange={filterHandler}/>
                    </th>
                    <th className="text-center">Celular
                        <FormControl className="color-fondo"
                                            name='phoneFilter'
                                             type="text"
                                             onChange={filterHandler}/>
                    </th>
                    <th className="text-center">Disponibilidad
                        <FormControl className="color-fondo"
                                            name='dispoFilter'
                                             type="text"
                                             onChange={filterHandler}/>
                    </th>
                </tr>

                */