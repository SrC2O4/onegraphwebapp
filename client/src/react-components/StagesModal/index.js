import BaseComponent from "./../Base";
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {setState} from 'statezero';
import Tooltip from '@material-ui/core/Tooltip';
import '../MaterialTable/materials.css';
import '../MaterialTable/chip.css';
import {FormattedMessage} from 'react-intl';

class StagesModal extends BaseComponent {

    filterState({stageModalOpen, itemToRender,considerEventStages}){
      return{stageModalOpen, itemToRender,considerEventStages};
  
    }
  
    handleOpen = () => {
      setState("stageModalOpen", true);
    };
  
    handleClose = () => {
      setState("stageModalOpen", false);
    };

    render(){
        return (
          <div>
            <Modal
              aria-labelledby="transition-modal-stages"
              className='modal'
              open={this.state.stageModalOpen}
              onClose={this.handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={this.state.stageModalOpen}>
                <div className='paper'>
                <h2 id="transition-modal-title"><FormattedMessage id={this.state.itemToRender.id}/></h2>
                    <span className={'material spriteMT-4 material-MT-'+this.state.itemToRender.id}></span>
                  <div style={{display: "inline-block"}}>
                        
                        <p><FormattedMessage id='creditStore'/></p>
                        <p className = {'CreditValue'+this.state.considerEventStages?this.state.itemToRender.Notes.event:this.state.itemToRender.Notes.normal}>{this.state.considerEventStages?this.state.itemToRender.credit_store_value.event:this.state.itemToRender.credit_store_value.normal}</p>
                    </div>
                    <br/>
                    {(this.state.considerEventStages?this.state.itemToRender.lowest_ap_stages.event:this.state.itemToRender.lowest_ap_stages.normal).map((stages) => {
                        return (
                        <div className = 'stageWrapper'>
                            <div style={{marginBlockEnd:'1%' }}>
                                {stages.extra_drop.length >0 && stages.extra_drop.map((loots)=>{
                                        return (
                                            <Tooltip title = {<span><FormattedMessage id='extraDrop'/>: <FormattedMessage id={loots.id}/></span>} arrow>
                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                            </Tooltip>)
                                    })
                                }
                                <p className = 'lowestAPStage'>{stages.code}</p>

                                <div style = {{display: 'inline', position: 'absolute'}}> 
                                    {/* TODO: refine here!!! */}
                                    <Tooltip title={<FormattedMessage id='dropRate'/>} arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                    <Tooltip title={<FormattedMessage id='efficiency'/>} arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                    <Tooltip title={<FormattedMessage id='expected'/>} arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                    
                                </div>
                            </div>
                        </div>
                        )
                    })}
                    {(this.state.considerEventStages?this.state.itemToRender.balanced_stages.event:this.state.itemToRender.balanced_stages.normal).map((stages) => {
                        return (
                        <div className = 'stageWrapper'>
                            <div style={{marginBlockEnd:'1%' }}>
                                {stages.extra_drop.length >0 && stages.extra_drop.map((loots)=>{
                                        return (
                                            <Tooltip title = {<span><FormattedMessage id='extraDrop'/>: <FormattedMessage id={loots.id}/></span>} arrow>
                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                            </Tooltip>
                                        )})
                                }
                                <p className = 'balancedStage'>{stages.code}</p>

                            <div style = {{display: 'inline', position: 'absolute'}}> 
                                    {/* TODO: refine here!!! */}
                                    <Tooltip title={<FormattedMessage id='dropRate'/>} arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                    <Tooltip title={<FormattedMessage id='efficiency'/>} arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                    <Tooltip title={<FormattedMessage id='expected'/>} arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                      </div>
                            </div>
                        </div>
                        )
                    })}

                    {(this.state.considerEventStages?this.state.itemToRender.drop_rate_first_stages.event:this.state.itemToRender.drop_rate_first_stages.normal).map((stages) => {
                        return (
                        <div className = 'stageWrapper'>
                            <div style={{marginBlockEnd:'1%' }}>
                                {stages.extra_drop.length >0 &&stages.extra_drop.map((loots)=>{
                                        return (
                                        <Tooltip title = {<span><FormattedMessage id='extraDrop'/>: <FormattedMessage id={loots.id}/></span>} arrow>
                                           <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                        </Tooltip>)})
                                }
                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                <div style = {{display: 'inline', position: 'absolute'}}> 
                                    {/* TODO: refine here!!! */}
                                    <Tooltip title={<FormattedMessage id='dropRate'/>} arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                    <Tooltip title={<FormattedMessage id='efficiency'/>} arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                    <Tooltip title={<FormattedMessage id='expected'/>} arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                      </div>
                            </div>
                        </div>
                        )
                    })}
                    </div>
              </Fade>
            </Modal>
          </div>
        )
      }
  
  }
  
  export default StagesModal;
  