/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Chip from '@mui/material/Chip';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import styles from './styles.module.scss';
import TagSelectorMenu from '../tagSelectorMenu';
import ActionMenu from '../actionMenu';
import DragHandleIcon from '../../images/draggable.svg';
import { setCaretToEnd, getCaretCoordinates, getSelection } from '../../utils';
import { createId, download } from '../../../../utils';

const CMD_KEY = '/';

// library does not work with hooks
class EditableBlock extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDragHandleClick = this.handleDragHandleClick.bind(this);
    this.openActionMenu = this.openActionMenu.bind(this);
    this.closeActionMenu = this.closeActionMenu.bind(this);
    this.openTagSelectorMenu = this.openTagSelectorMenu.bind(this);
    this.closeTagSelectorMenu = this.closeTagSelectorMenu.bind(this);
    this.handleTagSelection = this.handleTagSelection.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.addPlaceholder = this.addPlaceholder.bind(this);
    this.calculateActionMenuPosition =
      this.calculateActionMenuPosition.bind(this);
    this.calculateTagSelectorMenuPosition =
      this.calculateTagSelectorMenuPosition.bind(this);
    this.contentEditable = React.createRef();
    this.fileInput = null;
    this.state = {
      htmlBackup: null,
      html: '',
      tag: 'p',
      imageUrl: '',
      videoUrl: '',
      placeholder: false,
      previousKey: null,
      isTyping: false,
      tagSelectorMenuOpen: false,
      tagSelectorMenuPosition: {
        x: null,
        y: null,
      },
      actionMenuOpen: false,
      actionMenuPosition: {
        x: null,
        y: null,
      },
      name: '',
      type: '',
    };
  }

  // To avoid unnecessary API calls, the block component fully owns the draft state
  // i.e. while editing we only update the block component, only when the user
  // finished editing (e.g. switched to next block), we update the page as well
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

  componentDidMount() {
    // Add a placeholder if the first block has no sibling elements and no content
    const hasPlaceholder = this.addPlaceholder({
      block: this.contentEditable.current,
      position: this.props.position,
      content: this.props.html || this.props.imageUrl,
    });
    this.blockId = 'p' + createId();
    if (!hasPlaceholder) {
      this.setState({
        ...this.state,
        html: this.props.html,
        tag: this.props.tag,
        imageUrl: this.props.imageUrl,
        videoUrl: this.props.videoUrl,
        name: this.props.name,
        type: this.props.type,
      });
    }
    [].forEach.call(
      document.querySelectorAll(`p[contenteditable="true"]`),
      function (el) {
        const isExist = el.getAttribute('data-hasPasteListener');
        if (isExist) return;

        el.addEventListener(
          'paste',
          function (e) {
            e.preventDefault();

            var text = e.clipboardData.getData('text/plain');
            document.execCommand('insertHTML', false, text);
          },
          false,
        );
        el.setAttribute('data-hasPasteListener', true);
      },
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // update the page on the server if one of the following is true
    // 1. user stopped typing and the html content has changed & no placeholder set
    // 2. user changed the tag & no placeholder set
    // 3. user changed the image & no placeholder set
    const stoppedTyping = prevState.isTyping && !this.state.isTyping;
    const hasNoPlaceholder = !this.state.placeholder;
    const htmlChanged = this.props.html !== this.state.html;
    const tagChanged = this.props.tag !== this.state.tag;
    const imageChanged = this.props.imageUrl !== this.state.imageUrl;
    const videoChanged = this.props.videoUrl !== this.state.videoUrl;
    if (
      ((stoppedTyping && htmlChanged) || tagChanged || imageChanged) &&
      hasNoPlaceholder
    ) {
      this.props.updateBlock({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
        videoUrl: this.state.videoUrl,
        name: this.state.name,
        type: this.state.type,
      });
    }
  }

  componentWillUnmount() {
    // In case, the user deleted the block, we need to cleanup all listeners
    document.removeEventListener('click', this.closeActionMenu, false);
  }

  handleChange(e) {
    this.setState({ ...this.state, html: e.target.value });
  }

  handleFocus() {
    // If a placeholder is set, we remove it when the block gets focused
    if (this.state.placeholder) {
      this.setState({
        ...this.state,
        html: '',
        placeholder: false,
        isTyping: true,
      });
    } else {
      this.setState({ ...this.state, isTyping: true });
    }
  }

  handleBlur(e) {
    // Show placeholder if block is still the only one and empty
    const hasPlaceholder = this.addPlaceholder({
      block: this.contentEditable.current,
      position: this.props.position,
      content: this.state.html || this.state.imageUrl,
    });
    if (!hasPlaceholder) {
      this.setState({ ...this.state, isTyping: false });
    }
  }

  handleKeyDown(e) {
    if (e.key === CMD_KEY) {
      // If the user starts to enter a command, we store a backup copy of
      // the html. We need this to restore a clean version of the content
      // after the content type selection was finished.
      this.setState({ htmlBackup: this.state.html });
    } else if (e.key === 'Backspace' && !this.state.html) {
      this.props.deleteBlock({ id: this.props.id });
    } else if (
      e.key === 'Enter' &&
      this.state.previousKey !== 'Shift' &&
      !this.state.tagSelectorMenuOpen
    ) {
      // If the user presses Enter, we want to add a new block
      // Only the Shift-Enter-combination should add a new paragraph,
      // i.e. Shift-Enter acts as the default enter behaviour
      e.preventDefault();
      this.props.addBlock({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
        ref: this.contentEditable.current,
      });
    }
    // We need the previousKey to detect a Shift-Enter-combination
    this.setState({ previousKey: e.key });
  }

  // The openTagSelectorMenu function needs to be invoked on key up. Otherwise
  // the calculation of the caret coordinates does not work properly.
  handleKeyUp(e) {
    if (e.key === CMD_KEY) {
      this.openTagSelectorMenu('KEY_CMD');
    }
  }

  handleMouseUp() {
    const block = this.contentEditable.current;
    const { selectionStart, selectionEnd } = getSelection(block);
    if (selectionStart !== selectionEnd) {
      this.openActionMenu(block, 'TEXT_SELECTION');
    }
  }

  handleDragHandleClick(e) {
    const dragHandle = e.target;
    this.openActionMenu(dragHandle, 'DRAG_HANDLE_CLICK');
  }

  openActionMenu(parent, trigger) {
    const { x, y } = this.calculateActionMenuPosition(parent, trigger);
    this.setState({
      ...this.state,
      actionMenuPosition: { x: x, y: y },
      actionMenuOpen: true,
    });
    // Add listener asynchronously to avoid conflicts with
    // the double click of the text selection
    setTimeout(() => {
      document.addEventListener('click', this.closeActionMenu, false);
    }, 10);
  }

  closeActionMenu() {
    this.setState({
      ...this.state,
      actionMenuPosition: { x: null, y: null },
      actionMenuOpen: false,
    });
    document.removeEventListener('click', this.closeActionMenu, false);
  }

  openTagSelectorMenu(trigger) {
    const { x, y } = this.calculateTagSelectorMenuPosition(trigger);
    this.setState({
      ...this.state,
      tagSelectorMenuPosition: { x: x, y: y },
      tagSelectorMenuOpen: true,
    });
    setTimeout(() => {
      document.addEventListener('click', this.closeTagSelectorMenu, false);
    }, 5);
  }

  closeTagSelectorMenu() {
    this.setState({
      ...this.state,
      htmlBackup: null,
      tagSelectorMenuPosition: { x: null, y: null },
      tagSelectorMenuOpen: false,
    });
    document.removeEventListener('click', this.closeTagSelectorMenu, false);
  }

  // Convert editableBlock shape based on the chosen tag
  // i.e. img = display <div><input /><img /></div> (input picker is hidden)
  // i.e. every other tag = <ContentEditable /> with its tag and html content
  handleTagSelection(tag) {
    if (tag === 'img') {
      this.setState({ ...this.state, tag: tag }, () => {
        this.closeTagSelectorMenu();
        if (this.fileInput) {
          // Open the native file picker
          this.fileInput.click();
        }
        // Add new block so that the user can continue writing
        // after adding an image
        this.props.addBlock({
          id: this.props.id,
          html: '',
          tag: 'p',
          imageUrl: '',
          ref: this.contentEditable.current,
        });
      });
    } else if (tag === 'iframe') {
      this.setState({ ...this.state, tag: tag }, () => {
        this.closeTagSelectorMenu();
        // Add new block so that the user can continue writing

        const url = prompt('Enter the URL of the iframe:');
        this.setState(
          { ...this.state.state, videoUrl: url, imageUrl: url },
          () => {
            // after adding an video
            this.props.addBlock({
              id: this.props.id,
              html: '',
              tag: 'p',
              imageUrl: '',
              ref: this.contentEditable.current,
            });
          },
        );
      });
    } else {
      if (this.state.isTyping) {
        // Update the tag and restore the html backup without the command
        this.setState({ tag: tag, html: this.state.htmlBackup }, () => {
          setCaretToEnd(this.contentEditable.current);
          this.closeTagSelectorMenu();
        });
      } else {
        this.setState({ ...this.state, tag: tag }, () => {
          this.closeTagSelectorMenu();
        });
      }
    }
  }

  async handleImageUpload() {
    if (this.fileInput && this.fileInput.files[0]) {
      const imageFile = this.fileInput.files[0];
      const formData = new FormData();
      formData.append('image', imageFile);
      try {
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_API}/pages/images`,
        //   {
        //     method: 'POST',
        //     credentials: 'include',
        //     body: formData,
        //   },
        // );
        // const data = await response.json();
        //upload image here
        const imageUrl =
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png';
        this.setState({ ...this.state, imageUrl: imageUrl });
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Show a placeholder for blank pages
  addPlaceholder({ block, position, content }) {
    const isFirstBlockWithoutHtml = position === 1 && !content;
    const isFirstBlockWithoutSibling = !block.parentElement.nextElementSibling;
    if (isFirstBlockWithoutHtml && isFirstBlockWithoutSibling) {
      this.setState({
        ...this.state,
        html: 'Type a page title...',
        tag: 'h1',
        imageUrl: '',
        placeholder: true,
        isTyping: false,
      });
      return true;
    } else {
      return false;
    }
  }

  // If we have a text selection, the action menu should be displayed above
  // If we have a drag handle click, the action menu should be displayed beside
  calculateActionMenuPosition(parent, initiator) {
    const rect = parent.getBoundingClientRect();
    switch (initiator) {
      case 'TEXT_SELECTION': {
        const { x: endX, y: endY } = getCaretCoordinates(false); // fromEnd
        const { x: startX, y: startY } = getCaretCoordinates(true); // fromStart
        const middleX = startX + (endX + startX) / 2;
        return { x: middleX, y: startY };
      }
      case 'DRAG_HANDLE_CLICK': {
        const x = rect.x + 74;
        const y = rect.y + 70;
        return { x: x, y: y };
      }
      default:
        return { x: null, y: null };
    }
  }

  // If the user types the "/" command, the tag selector menu should be display above
  // If it is triggered by the action menu, it should be positioned relatively to its initiator
  calculateTagSelectorMenuPosition(initiator) {
    switch (initiator) {
      case 'KEY_CMD': {
        const { x: caretLeft, y: caretTop } = getCaretCoordinates(true);
        return { x: caretLeft, y: caretTop };
      }
      case 'ACTION_MENU': {
        const { x: actionX, y: actionY } = this.state.actionMenuPosition;
        return { x: actionX - 60, y: actionY - 10 };
      }
      default:
        return { x: null, y: null };
    }
  }

  isValidYoutube = (url) => {
    if (url.startsWith('https://www.youtube.com/embed/')) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <div className={styles.draggable}>
        {this.state.tag !== 'img' &&
          this.state.tag !== 'iframe' &&
          this.state.tag !== 'video' &&
          this.state.tag !== 'file' && (
            <ContentEditable
              innerRef={this.contentEditable}
              data-position={this.props.position}
              data-tag={this.state.tag}
              html={this.state.html}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
              onKeyUp={this.handleKeyUp}
              onMouseUp={this.handleMouseUp}
              tagName={this.state.tag}
              className={[
                styles.block,
                this.state.isTyping ||
                this.state.actionMenuOpen ||
                this.state.tagSelectorMenuOpen
                  ? styles.blockSelected
                  : null,
                this.state.placeholder ? styles.placeholder : null,
                this.blockId,
              ].join(' ')}
              disabled={this.props.isDisabled}
            />
          )}
        {this.state.tag === 'img' && (
          <div
            data-position={this.props.position}
            data-tag={this.state.tag}
            ref={this.contentEditable}
            className={[
              styles.image,
              this.state.actionMenuOpen || this.state.tagSelectorMenuOpen
                ? styles.blockSelected
                : null,
            ].join(' ')}
          >
            <input
              id={`${this.props.id}_fileInput`}
              name={this.state.tag}
              type="file"
              onChange={this.handleImageUpload}
              ref={(ref) => (this.fileInput = ref)}
              hidden
            />
            {!this.state.imageUrl && (
              <label
                htmlFor={`${this.props.id}_fileInput`}
                className={styles.fileInputLabel}
              >
                No Image Selected. Click To Select.
              </label>
            )}
            {this.state.imageUrl && (
              <img
                src={this.state.imageUrl}
                alt={/[^\/]+(?=\.[^\/.]*$)/.exec(this.state.imageUrl)[0]}
                style={{
                  maxWidth: '1000px',
                  marginRight: 'auto',
                  maxHeight: '500px',
                }}
              />
            )}
          </div>
        )}
        {this.state.tag === 'iframe' && (
          <div
            data-position={this.props.position}
            data-tag={this.state.tag}
            ref={this.contentEditable}
            className={[
              styles.iframe,
              this.state.actionMenuOpen || this.state.tagSelectorMenuOpen
                ? styles.blockSelected
                : null,
            ].join(' ')}
          >
            {(!this.state.imageUrl ||
              !this.isValidYoutube(this.state.imageUrl)) && (
              <label
                htmlFor={`${this.props.id}_fileInput`}
                className={styles.fileInputLabel}
              >
                No video Selected.
              </label>
            )}
            {this.state.imageUrl && this.isValidYoutube(this.state.imageUrl) && (
              <iframe
                height="400"
                src={this.state.imageUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: '100%',
                  maxWidth: '700px',
                  maxHeight: '800px',
                }}
              ></iframe>
            )}
          </div>
        )}

        {this.state.tag === 'video' && (
          <div
            data-position={this.props.position}
            data-tag={this.state.tag}
            ref={this.contentEditable}
            className={[
              styles.iframe,
              this.state.actionMenuOpen || this.state.tagSelectorMenuOpen
                ? styles.blockSelected
                : null,
            ].join(' ')}
          >
            {/* <input
              id={`${this.props.id}_fileInput`}
              name={this.state.tag}
              type="file"
              onChange={this.handleImageUpload}
              ref={(ref) => (this.videoInput = ref)}
              hidden
            /> */}
            {!this.state.imageUrl && (
              <label
                htmlFor={`${this.props.id}_fileInput`}
                className={styles.fileInputLabel}
              >
                No video Selected.
              </label>
            )}
            {this.state.imageUrl && (
              <video controls>
                <source src={this.state.imageUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        {this.state.tag === 'file' && (
          <div
            data-position={this.props.position}
            data-tag={this.state.tag}
            ref={this.contentEditable}
            className={[
              styles.file,
              this.state.actionMenuOpen || this.state.tagSelectorMenuOpen
                ? styles.blockSelected
                : null,
            ].join(' ')}
            style={{
              display: 'inline-block',
            }}
          >
            {/* <input
              id={`${this.props.id}_fileInput`}
              name={this.state.tag}
              type="file"
              onChange={this.handleImageUpload}
              ref={(ref) => (this.otherFileInput = ref)}
              hidden
            /> */}
            {!this.state.imageUrl && (
              <label
                htmlFor={`${this.props.id}_fileInput`}
                className={styles.fileInputLabel}
              >
                No file Selected.
              </label>
            )}
            {this.state.imageUrl && (
              <Chip
                icon={<AttachFileIcon />}
                label={this.state.name}
                onClick={() => {
                  download(this.state.imageUrl, this.state.name);
                }}
                sx={{ ml: 1 }}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default EditableBlock;
