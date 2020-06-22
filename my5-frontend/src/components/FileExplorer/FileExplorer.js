import React, {useMemo} from 'react';
import FileView from '../FileView/FileView';
import {Row, Col} from 'reactstrap';

import {httpRequest} from '../../utils';
import {withCloudContext} from '../Screens/Cloud/CloudContext';

const sortFn = (a, b) =>
  a.type === 'DIR' && b.type === 'FILE' ? -1 : a.type === b.type ? 0 : 1;

const api = process.env.REACT_APP_API;

const FileExplorer = ({
  currentPath,
  navigate,
  setIsModalOpen,
  setModalProps,
  setModalComponent,
  fetchFs,
  fs
}) => {
  const subItems = useMemo(
    () => {
      const [, ...path] = currentPath.split('/');
      return path.reduce((acc, value) => {
        const child = acc.find(f => f.name === value);
        if (!!child && child.type === 'DIR') {
          return child.children;
        } else {
          return acc;
        }
      }, fs.root);
    },
    [fs, currentPath]
  );

  const initDownload = async file => {
    try {
      const token = await httpRequest(api + '/files/cloud/getToken', 'post', {
        path: currentPath + '/' + file
      });
      const downloadUrl = api + '/files/cloud/download?token=' + token;
      window.location.href = downloadUrl;
    } catch (error) {}
  };

  const deleteAction = (file, type) => {
    const deleteFn = async () => {
      try {
        await httpRequest(api + '/files/cloud/file', 'delete', {
          path: currentPath + '/' + file
        });

        setIsModalOpen(false);
        fetchFs();
      } catch (error) {}
    };

    setModalProps({deleteFn, name: file, type});
    setModalComponent('ConfirmDelete');
    setIsModalOpen(true);
  };

  return (
    <Row>
      {subItems.sort(sortFn).map((child, i) => (
        <Col xs="12" sm="6" md="4" lg="3" xl="2" key={i}>
          <div className="mb-3 w-100">
            <FileView
              onClick={() =>
                (child.type === 'DIR' ? navigate : initDownload)(child.name)
              }
              className="my-0 mx-auto"
              onDeleteAction={() => deleteAction(child.name, child.type)}
              type={child.type}
              text={child.name}
<<<<<<< HEAD
              currentPath={currentPath}
              file={file}
=======
>>>>>>> 7956183d54df45bce15b31ba6400274422f30a71
            />
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default withCloudContext(FileExplorer);
