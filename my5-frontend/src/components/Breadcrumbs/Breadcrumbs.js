import React from 'react';
import {withCloudContext} from '../Screens/Cloud/CloudContext';
import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = ({currentPath, navigate}) => {
  const pathArr = currentPath.split('/').slice(1).filter(v => !!v);

  return (
    <div className="px-5 py-2">
      <span
        color="link"
        onClick={() => navigate('/')}
        className={`${styles.crumb} p-0`}>
        Начало {currentPath !== '/' && <>/ {' '}</>} 
      </span>
      {pathArr.map((path, i) => {
        const active = i === pathArr.length - 1
        return (
          <span
            color="link"
            onClick={() =>
              !active &&
              navigate('/' + pathArr.slice(0, i + 1).join('/'))
            }
            className={`${styles.crumb} ${active ? styles.active : ''} p-0`}
            key={pathArr.slice(0, i + 1).join('/')}>
            {path} {!active && <>/ {' '}</>} 
          </span>
        );
      })}
    </div>
  );
};

export default withCloudContext(Breadcrumbs);
