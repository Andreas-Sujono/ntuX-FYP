/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { matchSorter } from 'match-sorter';

import styles from './styles.module.scss';

const TagSelectorMenu = ({
  position,
  closeMenu,
  handleSelection,
  useTags2,
}) => {
  const MENU_HEIGHT = useTags2 ? 100 : 200;
  const allowedTags = React.useMemo(
    () =>
      useTags2
        ? [
            {
              id: 'paragraph',
              tag: 'p',
              label: 'Paragraph',
            },
            {
              id: 'image',
              tag: 'img',
              label: 'Image',
            },
            {
              id: 'video',
              tag: 'iframe',
              label: 'Embed youtube',
            },
            {
              id: 'code',
              tag: 'pre',
              label: 'Code',
            },
          ]
        : [
            {
              id: 'heading',
              tag: 'h2',
              label: 'Heading',
            },
            {
              id: 'subheading',
              tag: 'h3',
              label: 'Subheading',
            },
            {
              id: 'paragraph',
              tag: 'p',
              label: 'Paragraph',
            },
            {
              id: 'image',
              tag: 'img',
              label: 'Image',
            },
            {
              id: 'video',
              tag: 'iframe',
              label: 'Embed youtube',
            },
            {
              id: 'video',
              tag: 'video',
              label: 'Upload Video',
            },
            {
              id: 'file',
              tag: 'file',
              label: 'Upload Other File',
            },
          ],
    [useTags2],
  );
  const [tagList, setTagList] = useState(allowedTags);
  const [selectedTag, setSelectedTag] = useState(0);
  // const [command, setCommand] = useState('');

  // If the tag selector menu is display outside the top viewport,
  // we display it below the block
  const isMenuOutsideOfTopViewport = position.y - MENU_HEIGHT < 110;
  const y = !isMenuOutsideOfTopViewport
    ? position.y - MENU_HEIGHT
    : position.y + MENU_HEIGHT / 3 - 80;
  const x = position.x;

  // Filter tagList based on given command
  // useEffect(() => {
  //   setTagList(matchSorter(allowedTags, command, { keys: ['tag'] }));
  // }, [command]);

  // Attach listener to allow tag selection via keyboard
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === 'Enter') {
  //       e.preventDefault();
  //       handleSelection(tagList[selectedTag].tag);
  //     } else if (e.key === 'Tab' || e.key === 'ArrowDown') {
  //       e.preventDefault();
  //       const newSelectedTag =
  //         selectedTag === tagList.length - 1 ? 0 : selectedTag + 1;
  //       setSelectedTag(newSelectedTag);
  //     } else if (e.key === 'ArrowUp') {
  //       e.preventDefault();
  //       const newSelectedTag =
  //         selectedTag === 0 ? tagList.length - 1 : selectedTag - 1;
  //       setSelectedTag(newSelectedTag);
  //     } else if (e.key === 'Backspace') {
  //       if (command) {
  //         setCommand(command.slice(0, -1));
  //       } else {
  //         console.log('close menu');
  //         closeMenu();
  //       }
  //     } else {
  //       setCommand(command + e.key);
  //     }
  //   };
  //   document.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [tagList, selectedTag]);

  return (
    <div
      className={styles.menuWrapper}
      style={{
        top: y,
        left: x,
        justifyContent: !isMenuOutsideOfTopViewport ? 'flex-end' : 'flex-start',
      }}
    >
      <div className={styles.menu}>
        {tagList.map((tag, key) => {
          return (
            <div
              key={key}
              data-tag={tag.tag}
              className={
                tagList.indexOf(tag) === selectedTag
                  ? [styles.item, styles.selectedTag].join(' ')
                  : styles.item
              }
              role="button"
              tabIndex="0"
              onClick={() => handleSelection(tag.tag)}
            >
              {tag.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagSelectorMenu;
