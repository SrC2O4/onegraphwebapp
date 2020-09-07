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
import {FormattedMessage} from 'react-intl';

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
  
  filterState({modalOpen, detailMode, showBestOnly, considerEventStages,considerEventStagesEN,considerEventStagesTW, server, ifEventNow, eventType,eventTypeEN,eventTypeTW, userTheme,currentTheme}){
    return{modalOpen, detailMode, showBestOnly, considerEventStages,considerEventStagesEN,considerEventStagesTW, server, ifEventNow, eventType,eventTypeEN,eventTypeTW, userTheme,currentTheme};

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
      let serverTag;
      if(this.state.server === 'CN'){
        serverTag = ''
      } else if(this.state.server === 'JP/EN/KR' ) {
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
                <h2 id="transition-modal-settings"><FormattedMessage id='settings'/></h2>
                <FormGroup>
                  <FormControlLabel
                    control={<BlueSwitch className="detailMode" checked={this.state.detailMode} onChange={this.handleChange("detailMode")} aria-label="detail mode switch" />}
                    label={this.state.detailMode ?<FormattedMessage id='settings1'/>:  <FormattedMessage id='settings4'/> }
                  />

                <FormControlLabel
                    control={<BlueSwitch className="showBestOnly" checked={this.state.showBestOnly} onChange={this.handleChange("showBestOnly")} aria-label="show best only switch" />}
                    label={this.state.showBestOnly ? <FormattedMessage id='settings5'/> : <FormattedMessage id='settings2'/>}
                  />

                  {this.state['eventType'+serverTag]==="Casual" && <FormControlLabel
                    control={<BlueSwitch className="considerEventStages" checked={this.state['considerEventStages'+serverTag]} onChange={this.handleChange("considerEventStages"+serverTag)} aria-label="event stages switch" />}
                    label={this.state['considerEventStages'+serverTag] ? <FormattedMessage id='settings3'/> : <FormattedMessage id='settings6'/>}
                  />}
                </FormGroup>
                <h2 id="transition-modal-settings"><FormattedMessage id='theme'/></h2>
                <RadioGroup aria-label="gender" name="gender1" value={this.state.userTheme} onChange={this.themeChange("userTheme")}>
          <FormControlLabel value="system" control={<BlueRadio color="default" />} label={<FormattedMessage id='theme1'/>} />
                  <FormControlLabel value="light" control={<BlueRadio color="default" />} label={<FormattedMessage id='theme2'/>} />
                  <FormControlLabel value="dark" control={<BlueRadio color="default" />} label={<FormattedMessage id='theme3'/>} />
                </RadioGroup>
                <div style={{width:'100%',height:'1px',paddingLeft:'4px',paddingRight:'4px',marginTop:'4px',marginBottom:'4px',backgroundColor:this.state.currentTheme==='dark'?'#f5f5f5':'#1e1e1e'}} />
              </div>
            </Fade>
          </Modal>
        </div>
      )
    }

}

export default SettingsModal;
