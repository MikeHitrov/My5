import React, { useState, useCallback } from "react";
import { Container, Form, Row, Col, Input, Button } from "reactstrap";
import styles from "./ChangePassword.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { httpRequest } from "../../../utils";

const ChangePasword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = useCallback(async e => {
    e.preventDefault();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    if (password !== confirmPassword) {
      NotificationManager.error("", "Паролите трябва да са еднакви!", 3000);
    } else {
      const res = await httpRequest(
        process.env.REACT_APP_API + "/changePassword",
        "PUT",
        {
          password
        }
      );

      console.log('res', res)
      window.location.replace("/");
      // if (res.ok) {
      // } else {
      //   NotificationManager.error(
      //     "",
      //     "В момента не може да се извърши операцията!",
      //     3000
      //   );
      // }
    }
  });

  return (
    <Container className={`${styles.container} p-5`}>
      <img className="mx-auto d-block" src="/Logo.png" alt="Logo" />
      <h1 align="center">Смяна на парола</h1>
      <Form className={styles.form} onSubmit={handleSubmit}>
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
          <Col xs="1">
            <FontAwesomeIcon icon="lock" />
          </Col>
          <Col xs="11">
            <Input
              type="password"
              placeholder="Повтори паролата"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <Button
              disabled={!password || !confirmPassword}
              color="primary"
              type="submit"
            >
              Смени парола
            </Button>
          </Col>
        </Row>
      </Form>

      <NotificationContainer />
    </Container>
  );
};

export default ChangePasword;
