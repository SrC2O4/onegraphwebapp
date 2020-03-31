import React from 'react';
import BaseComponent from "../Base";
import MaterialTable from 'material-table';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {setState} from 'statezero';


class EfficiencyTableModal extends BaseComponent{
    
    filterState({stages}){
        return ({stages})
    }

    handleOpen = () => {
        setState("listOpen", true);
      };
    
      handleClose = () => {
        setState("listOpen", false);
      };
    
    render(){
        return( 
            <Modal aria-labelledby="transition-modal-stages"
            className='Stagesmodal'
            open={this.state.listOpen}
            onClose={this.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}>
            <Fade in={this.state.listOpen}>
              <div className='Stagespaper'>
            <MaterialTable 
            title="关卡效率一览" 
            columns={{columns:[{title:'副本',field:'code'},{title:'效率',field:'efficiency'}]}} 
            data={this.state.stages}>
            </MaterialTable>
            </div>
            </Fade>

            </Modal>
        )
    }

} export default EfficiencyTableModal;

