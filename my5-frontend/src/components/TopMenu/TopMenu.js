import React from 'react';
import { withCloudContext } from '../Screens/Cloud/CloudContext';
import FileUploader from '../FileUploader/FileUploader';
import FolderCreate from '../FolderCreate/FolderCreate';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TopMenu = ({ navigate }) => {
  const Exit = e => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    window.location.reload(true);
  };

  return (
    <div className="w-100" style={{ overflowX: 'hidden' }}>
      <Row className="mb-4">
        <Button
          onClick={() => navigate('..')}
          className="col-2"
          color="primary"
          type="submit">
          <span style={{ fontSize: '1.2rem' }} className="d-none d-md-inline-block">
            <FontAwesomeIcon icon="chevron-circle-left" />
          </span>
          <span style={{ fontSize: '2rem' }} className="d-inline-block d-md-none">
            <FontAwesomeIcon icon="chevron-circle-left" />
          </span>
          <span
            style={{ fontSize: '1.5rem' }}
            className="d-none d-md-inline-block ml-2">
            Назад
          </span>
        </Button>
        <span
          className="col-8 text-center text-primary"
          style={{
            fontSize: '3rem',
            backgroundColor: '#dddddd',
          }}>
          Файлов мениджър
        </span>
        <Button onClick={Exit} className="col-2" color="primary" type="submit">
          <span
            style={{ fontSize: '1.5rem' }}
            className="d-none d-md-inline-block mr-2">
            Изход
          </span>
          <span style={{ fontSize: '1.2rem' }} className="d-none d-md-inline-block">
            <FontAwesomeIcon icon="sign-out-alt" />
          </span>
          <span style={{ fontSize: '2rem' }} className="d-inline-block d-md-none">
            <FontAwesomeIcon icon="sign-out-alt" />
          </span>
        </Button>
      </Row>
      <Row>
        <Col
          className="text-center"
          xs={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}>
          <span className="mr-3">
            <FolderCreate />
          </span>
          <span className="ml-3">
            <FileUploader />
          </span>
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default withCloudContext(TopMenu);
