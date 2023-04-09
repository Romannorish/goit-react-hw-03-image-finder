import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styles'


const modalRoot = document.querySelector('#modal-root');

export default class Modal extends React.Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    onModalClick: PropTypes.func.isRequired,
  }

  
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onModalClick();
    }
  };

  onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClick();
    }
  };

  render() {
    const { largeImage, alt } = this.props;

    return createPortal(
      <Overlay onClick={this.onBackDropClick}>
        <ModalWindow>
          <img src={largeImage} alt={alt} />
        </ModalWindow>
      </Overlay>,
      modalRoot,
    );
  }
}
