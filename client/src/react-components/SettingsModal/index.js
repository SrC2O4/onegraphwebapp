import BaseComponent from "./../Base";
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {setState} from 'statezero';
import './style.css';


class SettingsModal extends BaseComponent {
  
  filterState({modalOpen, detailMode, showBestOnly}){
    return{modalOpen, detailMode, showBestOnly};

  }

  handleOpen = () => {
    setState("modalOpen", true);
  };

  handleClose = () => {
    setState("modalOpen", false);
  };

  handleChange = name => event => {
    setState(name,event.target.checked);
  };


  render(){
      return (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
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
                <h2 id="transition-modal-title">设定</h2>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch className="detailMode" checked={this.state.detailMode} onChange={this.handleChange("detailMode")} aria-label="detail mode switch" />}
                    label={this.state.detailMode ?'详细模式':  '省略模式' }
                  />

                <FormControlLabel
                    control={<Switch className="showBestOnly" checked={this.state.showBestOnly} onChange={this.handleChange("showBestOnly")} aria-label="show best only switch" />}
                    label={this.state.showBestOnly ? '只显示最优' : '显示全部'}
                  />
              </FormGroup>
              </div>
            </Fade>
          </Modal>
        </div>
      )
    }

}

export default SettingsModal;
