import React from 'react';
import './style.css';
import BaseComponent from "./../Base";
import { getT1Materials, getT2Materials, getT3Materials, getT4Materials, getT5Materials, getCatalyst, getGacha, getPlan, getMisc} from '../../actions/material';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import StagesModal from "./../StagesModal";
import {setState} from 'statezero';
import { IconButton } from '@material-ui/core';


class MaterialTable extends BaseComponent{
    
    filterState({t5Material, t4Material, t3Material, t2Material, t1Material, catalyst, gacha,plan, misc, detailMode, showBestOnly,stageModalOpen,itemToRender}){
         
        return {t5Material, t4Material, t3Material, t2Material, t1Material, catalyst, gacha,plan, misc,detailMode, showBestOnly,stageModalOpen, itemToRender};
    }
    handleChange = name => event =>{
        setState("itemToRender",  name)
        setState("stageModalOpen", true)

    }

    // TODO: refractor the layout with Table element loooollllll
    // TODO: Use cookie to store the preference of the user
    // TODO: 
   
    render(){
           
        getT1Materials();      
        getT2Materials();
        getT3Materials();
        getT4Materials();
        getT5Materials(); 
        getCatalyst(); 
        getGacha();
        getPlan();
        getMisc();

        return(
            // The 3 tier 5 materials
            
            <div className = 'outLayer'>
             
                <h2 style={{textAlign: "right", marginRight: "1%"}}>上次数据更新时间：{new Date(this.state.gacha.last_updated).toLocaleString('en-US', {timeZone: "Asia/Shanghai"})}</h2>
                <div className = 'catalyst'>
                    <div className = 'catalystDiv' style = {{width: '100px'}}>
                        <h4 > 黄票商店</h4>
                        <br/>
                        <Tooltip title = "芯片助剂" arrow>
                        <img alt = "" className = 'MT-4' src= {require('./static/ESS-32001.png')}/>
                        </Tooltip>
                        <p className = 'CatalystValue'> {this.state.catalyst.golden_ticket_value}</p>
                    </div>
                    <div className = 'catalystDiv' style = {{width: '160px'}}>
                        <h4> 绿票商店-二层</h4>
                        <br/>
                        <Tooltip title = "寻访凭证" arrow>
                            <img alt = ""  className = 'MT-4' src= {require('./static/GACHATICKET.png')}/>
                        </Tooltip>
                        <p className = {'GachaValue'}> {this.state.gacha.green_ticket_value}</p>
                        <Tooltip title = "招聘许可" arrow>
                        <img alt = ""  className = 'MT-4' src= {require('./static/MISC-7001.png')}/>
                        </Tooltip>
                        <p className = {'PlanValue'}> {this.state.plan.green_ticket_value}</p>
                    </div> 
                </div> {/*Catalyst ends*/}
                
                {/* All Tier 5 materials */}
                <div className='M5Materials'>
                    {
                        this.state.t5Material.map((item) => {
                            if (this.state.t5Material.indexOf(item) <1){
                                return (
                                <div className = 'MT-5-wrapper'>
                                    <Tooltip title = {item.name} arrow>
                                    <img alt = "" className = 'MT-5' src= {require('./static/MT-'+item.id+'.png')}/>
                                    </Tooltip>
                                    <br/><br/><br/><br/><br/><br/>
                                </div>
                                )
                            } else {
                                return (
                                    <div className = 'MT-5-wrapper'>
                                        <Tooltip title = {item.name} arrow>
                                        <img alt = "" className = 'MT-5' src= {require('./static/MT-'+item.id+'.png')}/>
                                        </Tooltip>
                                        <br/><br/><br/><br/><br/><br/>
                                    </div>
                                    )
                            }
                        } )
                    }
                </div>

                {/* All the tier 4 materials */}
                <div className = 'M4Materials'>
                {
                        this.state.t4Material.map((item) => {
                            return (
                            <div className = 'MT-4-wrapper'>
                                <Tooltip title = {item.name} arrow>
                                <img alt = "" className = 'MT-4' src= {require('./static/MT-'+item.id+'.png')}/> 
                                </Tooltip>
                                <p className = {'M4Values'+item.Notes}>{item.golden_ticket_value}</p>

                            </div>
                            
                            )
                        } )
                    }
                </div>
                
                 {/* All the tier 3 materials */}
                 <div className = 'M3Materials'>
                {
                        this.state.t3Material.map((item) => {
                            return (
                            <div className = 'MT-3-wrapper'>
                                <Tooltip title = {item.name} arrow>
                                <img alt = "" className = 'MT-4' src= {require('./static/MT-'+item.id+'.png')}/>
                                 </Tooltip>
                                <p className = {'M4Values'+item.Notes}>{`${item.green_ticket_value}`}</p>
                                {/* The stages where ap costs least to accomplish the goal */}
                                {/* TODO: maybe make it a function to avoid duplications fot too many times */}
                                <div className = 'stageWrapper'>
                                    {item.lowest_ap_stages.length===0 && <h4 style={{display: 'inline', marginLeft: '4%'}}>建议合成</h4>}
                                    
                                    {item.lowest_ap_stages.map((stages) => {
                                        return (
                                        <div className = 'stageWrapper'>
                                            <div style={{display: 'inline'}}>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <img alt = "" src= {require('./static/MT-'+loots.id+'.png')} className = 'extraDropWrap' style = {{width: '15px'}}></img>
                                                            </Tooltip>)
                                                    })
                                                }
                                                <p className = 'lowestAPStage'>{stages.code}</p>

                                                {this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                    {/* TODO: refine here!!! */}
                                                   <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>
                                                }
                                            </div>
                                        </div>
                                        )
                                    })}
                                    {!this.state.showBestOnly && item.balanced_stages.map((stages) => {
                                        return (
                                        <div className = 'stageWrapper'>
                                            <div style={{display: 'inline'}}>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <img alt = "" src= {require('./static/MT-'+loots.id+'.png')} className = 'extraDropWrap' style = {{width: '15px'}}></img>
                                                            </Tooltip>
                                                        )})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                               {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                    {/* TODO: refine here!!! */}
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                </div>}
                                            </div>
                                        </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&item.drop_rate_first_stages.map((stages) => {
                                        return (
                                        <div className = 'stageWrapper'>
                                            <div style={{display: 'inline'}}>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                            <img alt = "" src= {require('./static/MT-'+loots.id+'.png')} className = 'extraDropWrap' style = {{width: '15px'}}></img>
                                                        </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                    {/* TODO: refine here!!! */}
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                </div>}
                                            </div>
                                        </div>
                                        )
                                    })}
                                    </div>
                            </div>
                            
                            )
                        } )
                    }
                </div>
                <br className = 'dividers'/>


                {/* All the tier 2 materials */}
                <div className='creditOverall'>
                    <h3 style = {{marginLeft: '20%', display: 'inline-block'}}> 信用商店</h3>   
                    <div>
                    <div className = 'M2Materials'>
                    {
                        this.state.t2Material.map((item) => {
                            return (
                            <div className = 'MT-3-wrapper'>
                                <Tooltip title = {item.name} arrow>
                                <img alt = "" className = 'MT-4' src= {require('./static/MT-'+item.id+'.png')}/>
                                 </Tooltip>
                                <p className = {'M4Values'+item.Notes}>{`${item.credit_store_value}`}</p>
                                {/* The stages where ap costs least to accomplish the goal */}
                                {/* TODO: maybe make it a function to avoid duplications fot too many times */}
                                <div style = {{display: 'inline'}}>
                                    {item.lowest_ap_stages.map((stages) => {
                                        if(item.lowest_ap_stages.length >=2){
                                            if(item.lowest_ap_stages.indexOf(stages) ===1){
                                                return (
                                                    <div className = 'stageWrapper'>
                                                        <div style={{display: 'inline'}}>
                                                            {stages.extra_drop.map((loots)=>{
                                                                    return (
                                                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                            <img alt = "" src= {require('./static/MT-'+loots.id+'.png')} className = 'extraDropWrap' style = {{width: '15px'}}></img>
                                                                        </Tooltip>)})
                                                            }
                                                            <p className = 'lowestAPStage'>{stages.code}</p>

                                                        {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                        <Tooltip title="其他副本……" arrow placement='top'>
                                                        <IconButton>
                                                        <KeyboardArrowRightIcon onClick={this.handleChange(item)} style={{marginLeft:'25px'}}/>
                                                        </IconButton></Tooltip>
                                                    </div>
                                                    
                                                )
                                            }
                                        } else{
                                            return (
                                                <div className = 'stageWrapper'>
                                                    <div style={{display: 'inline'}}>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <img alt = "" src= {require('./static/MT-'+loots.id+'.png')} className = 'extraDropWrap' style = {{width: '15px'}}></img>
                                                                    </Tooltip>)})
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>

                                                    {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                </div>
                                                )}
                                    })}
                                    {!this.state.showBestOnly &&item.balanced_stages.map((stages) => {
                                        return (
                                        <div className = 'stageWrapper'>
                                            <div style={{display: 'inline'}}>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <img alt = "" src= {require('./static/MT-'+loots.id+'.png')} className = 'extraDropWrap' style = {{width: '15px'}}></img>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                               { this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                    {/* TODO: refine here!!! */}
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&item.drop_rate_first_stages.map((stages) => {
                                        return (
                                        <div className = 'stageWrapper'>
                                            <div style={{display: 'inline'}}>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <img alt = "" src= {require('./static/MT-'+loots.id+'.png')} className = 'extraDropWrap' style = {{width: '15px'}}></img>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                    {/* TODO: refine here!!! */}
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        </div>
                                        )
                                    })}
                                    </div>
                            </div>
                            
                            )
                        } )
                    }
                </div>

                    {/* All the tier 1 materials */}
                    <div className = 'M2Materials'>
                    {
                        this.state.t1Material.map((item) => {
                            return (
                            <div className = 'MT-3-wrapper'>
                                <Tooltip title = {item.name} arrow>
                                <img alt = "" className = 'MT-4' src= {require('./static/MT-'+item.id+'.png')}/>
                                 </Tooltip>
                                <p className = {'M4Values'+item.Notes}>{`${item.credit_store_value}`}</p>
                                {/* The stages where ap costs least to accomplish the goal */}
                                {/* TODO: maybe make it a function to avoid duplications fot too many times */}
                                <div style = {{display: 'inline'}}>
                                {item.lowest_ap_stages.map((stages) => {
                                        if(item.lowest_ap_stages.length >=2){
                                            if(item.lowest_ap_stages.indexOf(stages) ===1){
                                                return (
                                                    <div className = 'stageWrapper'>
                                                        <div style={{display: 'inline'}}>
                                                            {stages.extra_drop.map((loots)=>{
                                                                    return (
                                                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                            <img alt = "" src= {require('./static/MT-'+loots.id+'.png')} className = 'extraDropWrap' style = {{width: '15px'}}></img>
                                                                        </Tooltip>)})
                                                            }
                                                            <p className = 'lowestAPStage'>{stages.code}</p>

                                                        {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                        <Tooltip title="其他副本……" arrow placement='top'>
                                                            <IconButton>
                                                                <KeyboardArrowRightIcon onClick={this.handleChange(item)} style={{marginLeft:'25px'}}/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                    
                                                )
                                            }
                                        } else{
                                            return (
                                                <div className = 'stageWrapper'>
                                                    <div style={{display: 'inline'}}>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <img alt = "" src= {require('./static/MT-'+loots.id+'.png')} className = 'extraDropWrap' style = {{width: '15px'}}></img>
                                                                    </Tooltip>)})
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>

                                                    {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                </div>
                                                )}
                                    })}
                                    {!this.state.showBestOnly &&item.balanced_stages.map((stages) => {
                                        return (
                                        <div className = 'stageWrapper'>
                                            <div style={{display: 'inline'}}>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                            <img alt = "" src= {require('./static/MT-'+loots.id+'.png')} className = 'extraDropWrap' style = {{width: '15px'}}></img>
                                                        </Tooltip>)})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                               { this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                    {/* TODO: refine here!!! */}
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                </div>}
                                            </div>
                                        </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&item.drop_rate_first_stages.map((stages) => {
                                        return (
                                        <div className = 'stageWrapper'>
                                            <div style={{display: 'inline'}}>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                            <img alt = "" src= {require('./static/MT-'+loots.id+'.png')} className = 'extraDropWrap' style = {{width: '15px'}}></img>
                                                        </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                    {/* TODO: refine here!!! */}
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                </div>}
                                            </div>
                                        </div>
                                        )
                                    })}

                                    </div>
                            </div>
                            
                            )
                        } )
                    }
                    </div>
                    </div>
                    <div className = 'miscDiv'>
                    
                    {
                        this.state.misc.map((item) => {
                            return (
                            <div className = 'Credit-wrapper'>
                                <Tooltip title = {item.name} arrow>
                                <img alt = "" className = 'MT-4' src= {require('./static/MISC-'+item.id+'.png')}/>
                                 </Tooltip>
                                <p className = {'CreditValue'+item.Notes}>{item.credit_store_value}</p>
                            </div>
                            
                            )
                        } )
                    }
                    </div>
                    <div>
                        <h2>说明</h2>
                        <p>绿票，黄票，信用商店里的数值指1绿票/1黄票/100信用的理智价值<span style = {{color: 'red'}}>数值<strong>越高</strong>，则兑换优先级越高</span></p>
                        <br/>
                        <p>关卡代号后的三个数字从上到下为：材料掉落率，理智转换效率，每个物品所需的期望理智</p>
                        <br/>
                        <p style = {{color: 'red'}}> 红色：效率>99%, 刷此图毕业所需理智最低</p>
                        <br/>
                        <p style = {{color: 'goldenrod'}}> 橙色：效率>90%, 且掉率比效率最高的图高</p>
                        <br/>
                        <p style = {{color: 'blue'}}> 蓝色：掉率最高, 以毕业为目标理智消耗多</p>
                        <br/>
                        <p> <strong>毕业指全角色全技能专精三，掉率按照刷到材料所需的期望理智计算</strong></p>
                    </div>

                </div>
                <StagesModal open={this.state.stageModalOpen}/>  
            </div>
        );
    }

} export default MaterialTable;

