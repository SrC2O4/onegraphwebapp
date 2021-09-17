import BaseComponent from "./../Base";
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import memory from "../../actions/memory";
import { setState } from 'statezero';
import './style.css';
import { FormattedMessage } from 'react-intl';

class OldEventsModal extends BaseComponent {

  filterState({ oldmodalOpen,server}) {
    return { oldmodalOpen,server };

  }

  handleOpen = () => {
    setState("oldmodalOpen", true);
    memory.setItem("oldmodalOpen", true);
  };

  handleClose = () => {
    setState("oldmodalOpen", false);
    memory.setItem("oldmodalOpen", false);
  };

  render() {
    let serverTag;
    if (this.state.server === 'CN') {
      serverTag = ''
    } else if (this.state.server === 'JP/EN/KR') {
      serverTag = 'EN'
    } else {
      serverTag = 'TW'
    }
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-settings"
          className='modal'
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.modalOpen}>
            <div className='paper'>
              <h2 id="transition-modal-settings"><FormattedMessage id='oldeventtitle' /></h2>
              <Button variant="outlined">Default</Button>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  }

}

export default SettingsModal;
