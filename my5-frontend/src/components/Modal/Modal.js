import React, {useCallback} from 'react';
import {Modal} from 'reactstrap';
import {withCloudContext} from '../Screens/Cloud/CloudContext';
import * as modals from '../Modals';

const ModalRoot = ({
  isModalOpen,
  setIsModalOpen,
  modalComponent,
  modalProps,
  setModalProps,
}) => {
  const dismiss = useCallback(() => {
    setIsModalOpen(false);
    setModalProps({});
  }, []);

  const Element = modals[modalComponent];
  return (
    <Modal size="xl" isOpen={isModalOpen} toggle={dismiss}>
      {!!Element && (
        <Element
          {...modalProps}
          dismiss={dismiss}
        />
      )}
    </Modal>
  );
};

export default withCloudContext(ModalRoot);
