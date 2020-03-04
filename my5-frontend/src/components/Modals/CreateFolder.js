import React, {useState, useCallback} from 'react';
import {
  Row,
  Col,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button
} from 'reactstrap';

const CenteredTitle = ({children}) => <h5 className="w-100">{children}</h5>;

const CreateFolder = ({dismiss, saveFolder}) => {
  const [name, setName] = useState('');
  const onSave = useCallback(() => {
    saveFolder(name)
  }, [name]);
  return (
    <>
      <ModalHeader tag={CenteredTitle} className="text-center" toggle={dismiss}>
        Моля, въведете име на папка:
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md={{size: 6, offset: 3}} sm="12">
            <Input onChange={e => setName(e.target.value)} value={name} />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onSave} className="my-0 mx-auto" color="primary">
          Запази
        </Button>
      </ModalFooter>
    </>
  );
};

export default CreateFolder;
