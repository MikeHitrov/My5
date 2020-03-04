import React from 'react';
import {httpRequest} from '../../utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {withCloudContext} from '../Screens/Cloud/CloudContext';

import {NotificationContainer, NotificationManager} from 'react-notifications';

const forbiddenSymbols = /\*|\?|\/|\\|:|>|<|\||"/gi;
const forbiddenNames = ['.', '..'];

const FolderCreate = ({
  currentPath,
  fetchFs,
  setModalProps,
  setModalComponent,
  setIsModalOpen
}) => {
  const handleCreate = name => {
    if (name.length > 0 && name[0] !== forbiddenNames[0] && (name[0] + name[1] !== '..') && !name.match(forbiddenSymbols)) {
      (async () => {
        await httpRequest(
          process.env.REACT_APP_API + '/files/cloud/folder',
          'POST',
          {
            path: currentPath,
            name
          }
        );

        fetchFs();
        setIsModalOpen(false);
        setModalProps({});
        NotificationManager.success('',`Папката ${name} е създадена успешно!`, 3000);
      })();
    } else{
      NotificationManager.error('Не можете да ползвате символите / \\ : * ? " > < | . ..', 'Грешно име на папка', 3000)
    }
  };

  const showModal = () => {
    setModalComponent('CreateFolder');
    setModalProps({saveFolder: handleCreate});
    setIsModalOpen(true);
  }
  return (
    <>
      <span onClick={showModal} style={{cursor: 'pointer'}}>
        <FontAwesomeIcon className="folder" icon="folder-plus" size="7x" />
      </span>

      <NotificationContainer/>
    </>
  )
};

export default withCloudContext(FolderCreate);
