import React from 'react';
import {Input} from 'reactstrap';
import axios, {CancelToken} from 'axios';
import {withCloudContext} from '../Screens/Cloud/CloudContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const FileUploader = ({currentPath, updateProgress, finishUpload}) => {
  const makeHandleProgress = (fileName, cancelToken) => progressEvent => {
    const progress = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100
    );
    updateProgress(fileName, progress, cancelToken);
  };

  const uploadFile = e => {
    const fd = new FormData();
    const file = e.target.files[0];
    fd.append('path', currentPath);
    fd.append('file', file);

    updateProgress(file.name, 0);
    const cancelSource = CancelToken.source();
    axios
      .post(process.env.REACT_APP_API + '/files/cloud/file', fd, {
        cancelToken: cancelSource.token,
        headers: {
          'X-Session-ID': localStorage.getItem('jwt'),
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: makeHandleProgress(file.name, cancelSource)
      })
      .then(() => {
        finishUpload(file.name);
        NotificationManager.success('',`${file.name} е качен успешно!`, 3000);
      }).catch(err => {
        if(axios.isCancel(err)){
          finishUpload(file.name)
        }
      });
  };

  return (
    <label style={{cursor: 'pointer'}}>
      <FontAwesomeIcon className="file" icon="cloud-upload-alt" size="7x" />{' '}
      <Input type="file" style={{display: 'none'}} onChange={uploadFile} />
      <NotificationContainer/>
    </label>
  );
};

export default withCloudContext(FileUploader);
