import React from 'react';
import BaseComponent from "../Base";
// import MaterialTable from 'material-table';
import {TableContainer, Paper, Table, TableRow, TableCell, TableHead, TableBody} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {setState} from 'statezero';
import './style.css'
import { FormattedMessage } from 'react-intl';

class EfficiencyTableModal extends BaseComponent{
    
    filterState({stages,listOpen}){
        return ({stages,listOpen})
    }

    handleOpen = () => {
        setState("listOpen", true);
      };
    
      handleClose = () => {
        setState("listOpen", false);
      };
    
    render(){
        return( 
            <Modal aria-labelledby="material-table"
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
                {/* <MaterialTable 
                title="关卡效率一览" 
                columns={[{title:'副本',field:'code'},{title:'效率',field:'efficiency', type: "numeric"}]}
                data={this.state.stages}/> */}
<TableContainer component = {Paper} >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell><FormattedMessage id='stageText'/></TableCell>
            <TableCell numeric><FormattedMessage id='effiText'/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.stages.map(n => {
            return (
              <TableRow>
                <TableCell>
                  {n.code}
                </TableCell>
                <TableCell numeric>{(n.efficiency).toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
            </Fade>

            </Modal>
        )
    }

} export default EfficiencyTableModal;

