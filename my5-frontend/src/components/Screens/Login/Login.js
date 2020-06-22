import React, { useState, useCallback } from 'react';
import { Container, Form, Row, Col, Input, Button } from 'reactstrap';
import styles from './Login.module.scss';
import { protect } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Readmore from '../../Modals/Readmore';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = useCallback(async e => {
    e.preventDefault();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

<<<<<<< HEAD
=======
    console.log(process.env.REACT_APP_API)
>>>>>>> 7956183d54df45bce15b31ba6400274422f30a71
    const res = await fetch(process.env.REACT_APP_API + '/login', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        identifier,
        password
      })
    });

    const jwt = await res.text();
    
    if (res.ok && password != '12345') {
      localStorage.setItem('jwt', jwt);
      window.location.replace('/');
    } else if (res.ok && password == '12345') {
      localStorage.setItem('jwt', jwt);
      window.location.replace('/changePassword');
    } else if (res.status === 401) {
      NotificationManager.error('', 'Грешно име или парола!', 3000);
    }
  }, [identifier, password]);

  return (
    <Container className={`${styles.container} p-5`}>
      <img className="mx-auto d-block" src="/Logo.png" alt='Logo' />
      <Readmore isOpen={isOpen} setIsOpen={setIsOpen}></Readmore>
      <Button className='w-100 text-center' color='link' onClick={() => setIsOpen(true)}>Иновативно хранилище за файлове</Button>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Row>
          <Col xs="1">
            <FontAwesomeIcon icon="user" />
		  </Col>
		  <Col xs="11">
            <Input
              min="0"
              type="number"
              name="identifier"
              placeholder="Идентификационен номер"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col xs="1">
            <FontAwesomeIcon icon="lock" />
		  </Col>
		  <Col xs="11">
            <Input
              type="password"
              placeholder="Парола"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <Button
              disabled={!identifier || !password}
              color="primary"
              type="submit">
              Вход
            </Button>
          </Col>
        </Row>
      </Form>

      <NotificationContainer />
    </Container>
  );
};

export default protect(Login, true);
