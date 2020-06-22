import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './HoverIcons.module.scss';

<<<<<<< HEAD
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
=======
const HoverIcons = ({deleteAction}) => {
  const onClick = e => {
    e.stopPropagation();
    deleteAction();
  };
  return (
    <div onClick={onClick} className={`position-absolute ${styles.icons}`}>
      <FontAwesomeIcon icon="trash-alt" size="2x" className="text-danger mx-auto d-block" />
>>>>>>> 7956183d54df45bce15b31ba6400274422f30a71
    </div>
  );
};

export default HoverIcons;