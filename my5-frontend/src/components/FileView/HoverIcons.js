import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './HoverIcons.module.scss';

const HoverIcons = ({deleteAction}) => {
  const onClick = e => {
    e.stopPropagation();
    deleteAction();
  };
  return (
    <div onClick={onClick} className={`position-absolute ${styles.icons}`}>
      <FontAwesomeIcon icon="trash-alt" size="2x" className="text-danger mx-auto d-block" />
    </div>
  );
};

export default HoverIcons;