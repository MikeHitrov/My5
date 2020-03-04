import React from 'react';
import {ModalHeader, ModalFooter, Button} from 'reactstrap';

const CenteredTitle = ({children}) => <h5 className="w-100">{children}</h5>

const ConfirmDelete = ({deleteFn, dismiss, name, type}) => {
  return (
    <>
      <ModalHeader tag={CenteredTitle} className="text-center" toggle={dismiss}>
        {type === 'FILE' && (
          <>
            Сигурни ли сте, че искате да изтриете файла <br />
            <span className="font-weight-bold">{name}</span>?
          </>
        )}
        {type === 'DIR' && (
          <>
            Сигурни ли сте, че искате да изтриете папката <br />
            <span className="font-weight-bold">{name}</span><br /> и всичко в нея?
          </>
        )}
      </ModalHeader>
      <ModalFooter>
        <Button color="danger" onClick={deleteFn}>
          Да
        </Button>
        <Button color="primary" onClick={dismiss}>
          Нe
        </Button>
      </ModalFooter>
    </>
  );
};

export default ConfirmDelete;
