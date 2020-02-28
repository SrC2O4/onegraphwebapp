import BaseComponent from "./../Base";
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {setState} from 'statezero';
import Tooltip from '@material-ui/core/Tooltip';
import './../MaterialTable/sprite.css'

class StagesModal extends BaseComponent {

    filterState({stageModalOpen, itemToRender}){
      return{stageModalOpen, itemToRender};
  
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
                <h2 id="transition-modal-title">{this.state.itemToRender.name}</h2>
                    <span className={'sprite spriteMT-4 sprite-MT-'+this.state.itemToRender.id}></span>
                  <div style={{display: "inline-block"}}>
                        
                        <p>信用商店价值：</p>
                        <p className = {'CreditValue'+this.state.itemToRender.Notes}>{this.state.itemToRender.credit_store_value}</p>
                    </div>
                    <br/>
                    {this.state.itemToRender.lowest_ap_stages.map((stages) => {
                        return (
                        <div className = 'stageWrapper'>
                            <div style={{marginBlockEnd:'1%' }}>
                                {stages.extra_drop.length >0 && stages.extra_drop.map((loots)=>{
                                        return (
                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                <span className={'sprite extraDropWrap sprite-MT-'+loots.id}></span>
                                            </Tooltip>)
                                    })
                                }
                                <p className = 'lowestAPStage'>{stages.code}</p>

                                <div style = {{display: 'inline', position: 'absolute'}}> 
                                    {/* TODO: refine here!!! */}
                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                
                                </div>
                            </div>
                        </div>
                        )
                    })}
                    {this.state.itemToRender.balanced_stages.map((stages) => {
                        return (
                        <div className = 'stageWrapper'>
                            <div style={{marginBlockEnd:'1%' }}>
                                {stages.extra_drop.length >0 && stages.extra_drop.map((loots)=>{
                                        return (
                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                <span className={'sprite extraDropWrap sprite-MT-'+loots.id}></span>
                                            </Tooltip>
                                        )})
                                }
                                <p className = 'balancedStage'>{stages.code}</p>

                            <div style = {{display: 'inline', position: 'absolute'}}> 
                                    {/* TODO: refine here!!! */}
                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                </div>
                            </div>
                        </div>
                        )
                    })}

                    {this.state.itemToRender.drop_rate_first_stages.map((stages) => {
                        return (
                        <div className = 'stageWrapper'>
                            <div style={{marginBlockEnd:'1%' }}>
                                {stages.extra_drop.length >0 &&stages.extra_drop.map((loots)=>{
                                        return (
                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                           <span className={'sprite extraDropWrap sprite-MT-'+loots.id}></span>
                                        </Tooltip>)})
                                }
                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                <div style = {{display: 'inline', position: 'absolute'}}> 
                                    {/* TODO: refine here!!! */}
                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
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
  