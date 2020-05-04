import BaseComponent from "./../Base";
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import memory from "../../actions/memory";
import { setUserTheme } from "../../actions/theme";
import {setState} from 'statezero';
import './style.css';

const BlueRadio = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const BlueSwitch = withStyles({
  switchBase: {
    color: blue[400],
    '&$checked': {
     color: blue[600],
    },
    '&$checked + $track': {
      backgroundColor: blue[600],
    },
  },
  checked: {},
  track: {},
})(Switch);

class SettingsModal extends BaseComponent {
  
  filterState({modalOpen, detailMode, showBestOnly, considerEventStages, ifEventNow, eventType, userTheme}){
    return{modalOpen, detailMode, showBestOnly, considerEventStages, ifEventNow, eventType, userTheme};

  }

  handleOpen = () => {
    setState("modalOpen", true);
    memory.setItem("modalOpen",true);
  };

  handleClose = () => {
    setState("modalOpen", false);
    memory.setItem("modalOpen",false);
  };

  handleChange = name => event => {
    setState(name,event.target.checked);
    memory.setItem(name,event.target.checked);
  };

  themeChange = name => event => {
    setUserTheme(event.target.value);
    memory.setItem(name,event.target.value);
  };


  render(){
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
                <h2 id="transition-modal-settings">图表设定</h2>
                <FormGroup>
                  <FormControlLabel
                    control={<BlueSwitch className="detailMode" checked={this.state.detailMode} onChange={this.handleChange("detailMode")} aria-label="detail mode switch" />}
                    label={this.state.detailMode ?'详细模式':  '省略模式' }
                  />

                <FormControlLabel
                    control={<BlueSwitch className="showBestOnly" checked={this.state.showBestOnly} onChange={this.handleChange("showBestOnly")} aria-label="show best only switch" />}
                    label={this.state.showBestOnly ? '只显示最优' : '显示全部'}
                  />

                  {this.state.eventType==="Casual" && <FormControlLabel
                    control={<BlueSwitch className="considerEventStages" checked={this.state.considerEventStages} onChange={this.handleChange("considerEventStages")} aria-label="event stages switch" />}
                    label={this.state.considerEventStages ? '包含活动图' : '仅考虑主线'}
                  />}
                </FormGroup>
                <h2 id="transition-modal-settings">主题设定</h2>
                <RadioGroup aria-label="gender" name="gender1" value={this.state.userTheme} onChange={this.themeChange("userTheme")}>
                  <FormControlLabel value="system" control={<BlueRadio color="default" />} label="系统跟随" />
                  <FormControlLabel value="light" control={<BlueRadio color="default" />} label="浅色模式" />
                  <FormControlLabel value="dark" control={<BlueRadio color="default" />} label="深色模式" />
                </RadioGroup>
              </div>
            </Fade>
          </Modal>
        </div>
      )
    }

}

export default SettingsModal;
