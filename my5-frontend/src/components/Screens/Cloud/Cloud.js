import React, { useEffect, useState, useRef } from 'react';
import { Container, Progress, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../Modal/Modal';
import { httpRequest } from '../../../utils';

import { protect, useInterval } from '../../../utils';
import FileExplorer from '../../FileExplorer/FileExplorer';
import { CloudContext } from './CloudContext';
import TopMenu from '../../TopMenu/TopMenu';
import Version from '../../Modals/Versions';

import { Map } from 'immutable';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';

const REFRESH_RATE = 5000;

const Cloud = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [fs, setFs] = useState({ root: [] });
  const [beingUploaded, setBeingUploaded] = useState(Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState('');
  const [modalProps, setModalProps] = useState({});
  const beingUploadedRef = useRef(beingUploaded);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = path => {
    if (path.startsWith('/')) {
      setCurrentPath(path);
    } else {
      const newPath = path
        .split('/')
        .reduce(
          (acc, value) => {
            if (value === '..') {
              return acc.slice(null, -1);
            } else if (!!value) {
              return [...acc, value];
            } else {
              return acc;
            }
          },
          currentPath === '/' ? [''] : currentPath.split('/')
        )
        .join('/');

      setCurrentPath(newPath === '' ? '/' : newPath);
    }
  };

  const fetchFs = async () => {
    const tree = await httpRequest(process.env.REACT_APP_API + '/files');
    setFs(tree);
  };

  useEffect(() => {
    fetchFs();
  }, []);

  useInterval(() => {
    fetchFs();
  }, REFRESH_RATE);

  useEffect(
    () => {
      beingUploadedRef.current = beingUploaded;
    },
    [beingUploaded]
  );

  const updateProgress = (fileName, progress, cancelToken) => {
    setBeingUploaded(
      beingUploadedRef.current.set(fileName, { progress, cancelToken })
    );
  };

  const finishUpload = fileName => {
    fetchFs();
    setBeingUploaded(beingUploadedRef.current.remove(fileName));
  };

  const context = {
    currentPath,
    setCurrentPath,
    beingUploaded,
    setBeingUploaded,
    updateProgress,
    finishUpload,
    // parentID,
    navigate,
    fetchFs,
    isModalOpen,
    setIsModalOpen,
    modalProps,
    setModalProps,
    modalComponent,
    setModalComponent,
    fs
  };

  return (
    <CloudContext.Provider value={context}>
      <TopMenu />
      <Breadcrumbs />
      <Container fluid>
        <FileExplorer />
      </Container>
      <Modal />
      <div
        className="px-2 py-1"
        style={{
          position: 'fixed',
          background: '#eee',
          zIndex: 1,
          bottom: 0,
          right: 0,
          width: '40%',
        }}>
        {beingUploaded.entrySeq().map(([key, value]) => {
          return (
            <>
              <Row>
                <Col xs="2" md="1">
                  <FontAwesomeIcon
                    className="font-15"
                    onClick={() => value.cancelToken.cancel()}
                    icon="window-close"
                  />
                </Col>
                <Col xs="10" md="11">
                  <p>{key}</p>
                </Col>
              </Row>
              <Row>
                <Col xs="2" md="1"><span className="text-dark">{value.progress}%</span></Col>
                <Col xs="10" md="11"><Progress value={value.progress} /></Col>
              </Row>
            </>
          );
        })}
      </div>
      <div
        className="px-2 py-1"
        style={{
          position: 'fixed',
          background: 'transparent',
          zIndex: 1,
          bottom: 0,
          left: 0,
          width: '40%'
        }}>
        <Version isOpen={isOpen} setIsOpen={setIsOpen}></Version>
        <Button className='w-200' color='link' onClick={() => setIsOpen(true)}>Версия 1.23</Button>
      </div>

    </CloudContext.Provider>
  );
};
export default protect(Cloud);