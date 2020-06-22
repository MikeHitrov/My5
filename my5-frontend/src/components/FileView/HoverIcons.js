import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './HoverIcons.module.scss';

const HoverIcons = ({deleteAction, editAction}) => {
  const onClick = e => {
    e.stopPropagation();

    if(e.target.id == "delete"){
      deleteAction();
    } else{
      editAction();
    }
  };

  return (
    <div onClick={onClick} className={`position-absolute ${styles.icons}`}>
      <FontAwesomeIcon id="delete" icon="trash-alt" size="2x" className="text-danger mx-auto d-block" />
      <FontAwesomeIcon id="share" icon="share-alt-square" size="2x" className="text-danger ml-auto d-block" />
    </div>
  );
};

export default HoverIcons;