import React, { useState } from 'react';
import styles from './FileView.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HoverIcons from './HoverIcons';

/*
try {
		    ${const genImage = async () => {
			imageIcon = await imageThumbnail(text, imageOptions)}
			{imageIcon}
		}
		} catch (err) {
			<FontAwesomeIcon
						icon={iconType}
						size="6x"
						className={`mx-auto d-block ${fType === 'dir' ? 'folder' : fileColor}`}
					  />
		}

*/

const FileView = ({ type, text, onDeleteAction, className, ...props }) => {
  const [hover, setHover] = useState(false);
  const fType = type.toLowerCase();
  /*
  const imageThumbnail = require('image-thumbnail');
  let imageOptions = { width: 100, height: 100, responseType: 'base64' }
  */
  let iconType = '';
  let fileColor = '';
  let imageIcon = false;

  if (fType === 'dir') {
    iconType = 'folder'
  } else {
    let extension = text.substr(text.lastIndexOf('.') + 1)
    switch (extension) {
      case 'jpg': case 'jpeg': case 'bmp': case 'png': case 'gif': case 'tif': case 'tiff': case 'eps': case 'svg':
        iconType = 'file-image'
        fileColor = 'file-image'
        break;
      case 'docx': case 'doc': case 'rtf': case 'dot': case 'dotx': case 'odt':
        iconType = 'file-word'
        fileColor = 'file-word'
        break;
      case 'xlsx': case 'xls': case 'csv': case 'xlt': case 'xltx': case 'ods':
        iconType = 'file-excel'
        fileColor = 'file-excel'
        break;
      case 'pptx': case 'ppt': case 'ppsx': case 'pps': case 'odp':
        iconType = 'file-powerpoint'
        fileColor = 'file-powerpoint'
        break;
      case 'pdf':
        iconType = 'file-pdf'
        fileColor = 'file-pdf'
        break;
      case 'sql': case 'cs': case 'php': case 'py': case 'cpp': case 'js': case 'java': case 'htm': case 'html': case 'css': case 'scss':
        iconType = 'file-code'
        fileColor = 'file-code'
        break;
      case 'txt':
        iconType = 'file-alt'
        fileColor = 'file-alt'
        break;
      case 'zip': case 'rar': case '7z': case 'gzip': case 'gz': case 'rzip':
        iconType = 'file-archive'
        fileColor = 'file-archive'
        break;
      case 'mp3': case 'ac3': case 'aac': case 'aif': case 'aiff': case 'flc': case 'flac': case 'm4a': case 'ogg': case 'ra': case 'wav': case 'wma': case 'opus':
        iconType = 'file-audio'
        fileColor = 'file-audio'
        break;
      case 'avi': case 'mp4': case 'mpg': case 'mpeg': case 'm4v': case 'mkv': case 'ts': case 'wmv': case 'webm': case 'flv': case 'f4v': case 'mov': case 'qt': case 'mts': case 'm2ts': case 'asf': case 'rv': case '3gp': case 'ogv':
        iconType = 'file-video'
        fileColor = 'file-video'
        break;
      default:
        iconType = 'file'
        fileColor = 'file-other'
        break;
    }
  }
  return (
    <>
      <div
        {...props}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`rounded position-relative pt-2 ${styles.box} ${
          !!className ? className : ''
          }`}>
        {hover && <HoverIcons deleteAction={onDeleteAction} />}
	    <FontAwesomeIcon
			icon={iconType}
			size="6x"
			className={`mx-auto d-block ${fType === 'dir' ? 'folder' : fileColor}`}
		/>
        <div className={`${styles.bottomHalf} mt-2`}>
          <p className={`text-center ${styles.text}`}>{text}</p>
        </div>
      </div>
    </>
  );
};

export default FileView;