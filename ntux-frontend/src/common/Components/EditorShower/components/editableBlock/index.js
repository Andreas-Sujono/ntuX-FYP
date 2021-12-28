/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import React from 'react';
import ContentEditable from 'react-contenteditable';
import styles from './styles.module.scss';

// library does not work with hooks
class EditableBlock extends React.Component {
  constructor(props) {
    super(props);

    this.contentEditable = React.createRef();
    this.fileInput = null;
    this.state = {
      htmlBackup: null,
      html: '',
      tag: 'p',
      imageUrl: '',
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
    };
  }

  // To avoid unnecessary API calls, the block component fully owns the draft state
  // i.e. while editing we only update the block component, only when the user
  // finished editing (e.g. switched to next block), we update the page as well
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

  componentDidMount() {
    // // Add a placeholder if the first block has no sibling elements and no content
    // const hasPlaceholder = this.addPlaceholder({
    //   block: this.contentEditable.current,
    //   position: this.props.position,
    //   content: this.props.html || this.props.imageUrl,
    // });
    // if (!hasPlaceholder) {
    this.setState({
      ...this.state,
      html: this.props.html,
      tag: this.props.tag,
      imageUrl: this.props.imageUrl,
    });
    // }
  }

  render() {
    return (
      <div className={styles.draggable}>
        {this.state.tag !== 'img' && (
          <ContentEditable
            innerRef={this.contentEditable}
            data-position={this.props.position}
            data-tag={this.state.tag}
            html={this.state.html}
            // onChange={this.handleChange}
            // onFocus={this.handleFocus}
            // onBlur={this.handleBlur}
            // onKeyDown={this.handleKeyDown}
            // onKeyUp={this.handleKeyUp}
            // onMouseUp={this.handleMouseUp}
            tagName={this.state.tag}
            className={[
              styles.block,
              this.state.isTyping ||
              this.state.actionMenuOpen ||
              this.state.tagSelectorMenuOpen
                ? styles.blockSelected
                : null,
              this.state.placeholder ? styles.placeholder : null,
            ].join(' ')}
          />
        )}
      </div>
    );
  }
}

export default EditableBlock;
