import { ArrowRightOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { Redirect,useHistory } from "react-router";
import { SocketContext } from '../context/SocketContext';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { useHideMenu } from '../hook/useHideMenu';

const { Title, Text } = Typography;

export const Escritorio = () => {

  useHideMenu(false);
  const history = useHistory();
  const { socket } = useContext( SocketContext );
  const [usuario] = useState(getUsuarioStorage());
  const [ticket, setTicket] = useState(null);


  const salir = () => {
    localStorage.clear();
    history.push('/ingresar');
  }

  const siguienteTicket = () => {
    console.log(usuario);
    socket.emit('siguiente-ticket-trabajar', usuario, (ticket)=>{
      setTicket(ticket);
    });
  }

  if(!usuario.agente || !usuario.escritorio){
    return <Redirect to="/ingresar"/>
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{usuario.agente}</Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text type="success" >Escritorio {usuario.escritorio}</Text>
        </Col>
        <Col span={4} align="right">
          <Button
            shape="round"
            type="danger"
            onClick={salir}
          >
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider/>

      {
        ticket && (
        <Row>
          <Col>
            <Text>Esta atendiendo el ticket No : </Text>
            <Text style={{fontSize:30}} type="danger">{ticket.number}</Text>
          </Col>
        </Row>
        )
      }

      <Row>
        <Col offset={18} span={6} align="right">
          <Button onClick={siguienteTicket} shape="round" type="primary">
            <ArrowRightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  )
}
