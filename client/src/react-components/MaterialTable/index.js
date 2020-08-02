import React from 'react';
import './style.css';
import BaseComponent from "./../Base";
//import {getAll} from '../../actions/material';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import StagesModal from "./../StagesModal";
import {setState} from 'statezero';
import { IconButton, TableContainer, Paper, Table, TableRow, TableCell, CircularProgress, MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Anime from 'animejs';
import './chip.css';
import './contingencyMiscs.css';
import './materials.css';

const theme = createMuiTheme({
            overrides: {
              MuiPaper: {
                root: {
                    backgroundColor: "rgba(255,255,255,0.1)"
                },
              },
            }
});

const Random = (min, max)=> {
    return Math.round(Math.random() * (max - min)) + min;
}
class MaterialTable extends BaseComponent{
    
    filterState({t5Material, t4Material, t3Material, t2Material, t1Material, catalyst, gacha,plan, misc, detailMode, showBestOnly,stageModalOpen,itemToRender, considerEventStages, contingencyStore, eventType, animeOnce,orangeStore}){
         
        return {t5Material, t4Material, t3Material, t2Material, t1Material, catalyst, gacha,plan, misc,detailMode, showBestOnly,stageModalOpen, itemToRender, considerEventStages, contingencyStore, eventType,animeOnce,orangeStore};
    }
    handleChange = name => event =>{
        setState("itemToRender",  name)
        setState("stageModalOpen", true)

    }
    componentDidUpdate() {
        if ((this.state.t4Material.length !== 0 || this.state.t3Material.length !== 0 || this.state.t1Material.length !== 0 || this.state.t2Material.length !== 0 || this.state.t5Material.length !== 0) && this.state.animeOnce) {
            setState("animeOnce", false)
            Anime({
                targets: ['.material.spriteMT-4','.M4Valuesred','.M4Valuesyellow','.M4Valuesgreen','.M4Values','.material.spriteMT-5','.material.extraDropWrap','.stageWrapper','.CreditValuered','.CreditValueyellow','.CreditValuegreen','.textTips','.CatalystValue','.PlanValue','.GachaValue'],
                opacity: [
                    { value: '0', duration: 0, easing: 'linear' },
                    { value: '1', duration: 200, easing: 'linear' },
                ],
                scale: [
                    { value: '0', duration: 0, easing: 'linear' },
                    { value: '1', duration: 500, easing: 'easeInOutBack' },
                ],
                autoplay: true,
                delay: function () {
                    return Random(600,1500);
                }
            });
            Anime({
                targets: '.instructions',
                opacity: [
                    { value: '0', duration: 0, easing: 'linear' },
                    { value: '1', duration: 200, easing: 'linear' },
                ],
                scale: [
                    { value: '0', duration: 0, easing: 'linear' },
                    { value: '1', duration: 500, easing: 'easeInOutBack' },
                ],
                autoplay: true,
                delay: Anime.stagger(100, {start:600})
            })
        }
    }
    
    
    indices = [0,1,2,3,4,5,6,7,8,9,10,11]



    render(){

        if(this.state.t4Material.length===0||this.state.t3Material.length===0 ||this.state.t1Material.length===0 || this.state.t2Material.length===0 || this.state.t5Material.length===0  ){
            return (
            <Modal
                aria-labelledby="transition-modal-preloader"
                className = "modal2 modalBlur"
                open={this.state.t5Material.length===0}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 1000,
                }}>
                <Fade in={this.state.t5Material.length===0}>
                    <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
                        <CircularProgress color='secondary'/>
                    </div>
                </Fade>
            </Modal>)
         
    }
    const finite_items = this.state.contingencyStore.filter(obj => obj.contingency_store_value.finite !=="0.0");
        const infinite_items = this.state.contingencyStore.filter(obj => obj.contingency_store_value.infinite !=="0.0");

        return(
            <MuiThemeProvider theme={theme}>
            <div className = 'outLayer'>
            <h2 style={{textAlign: "right", marginRight: "1%"}}>上次数据更新时间：{new Date(this.state.gacha.last_updated).toLocaleString('zh', {hour12: true,timeZone: "Asia/Shanghai"})}</h2>
            <TableContainer component = {Paper} className="tableGrid">
                <Table size="small" aria-label="spanning table">
                    {/* Header */}
                    <TableRow>
                        <TableCell/>
                        <TableCell >
                                    <h3 className='textTips'> {this.state.orangeStore ? <strong style = {{color:'orange'}}>[橙票商店]</strong> : '黄票商店' }</h3>
                            <Tooltip title = "芯片助剂" arrow>
                                <span className='material material-ESS-32001 spriteMT-4'></span>
                            </Tooltip>
                            <p className = 'CatalystValue'> {this.state.considerEventStages?this.state.catalyst.golden_ticket_value.event:this.state.catalyst.golden_ticket_value.normal}</p>
                        </TableCell>
                        <TableCell colSpan={3}>
                            <h3 className='textTips'> {this.state.orangeStore?<strong style = {{color:'orange'}}>[橙票商店]</strong>:'绿票商店-二层'}</h3>
                            <Tooltip title = "寻访凭证" arrow>
                                <span className='spriteMT-4 material material-GACHATICKET'></span>
                            </Tooltip>
                            <p className = {'GachaValue'}> {this.state.considerEventStages?this.state.gacha.green_ticket_value.event:this.state.gacha.green_ticket_value.normal}</p>
                            <Tooltip title = "招聘许可" arrow>
                                <span className='material material-MISC-7001 spriteMT-4'></span>
                            </Tooltip>
                            <p className = {'PlanValue'}> {this.state.considerEventStages?this.state.plan.green_ticket_value.event:this.state.plan.green_ticket_value.normal}</p>
                        </TableCell> 
                        <TableCell rowSpan={4} >
                            <h2 className='textTips'>信用商店</h2>
                        </TableCell>
                        <TableCell colSpan={8} rowSpan={4} >
                        <div>
                        <h2 className='instructions'>说明</h2>
                        <p className='instructions'> 绿票，黄票，橙票，信用商店里的数值指1绿票/1黄票/1橙票/100信用的理智价值<span style = {{color: '#d81b60e4'}}>数值<strong>越高</strong>，则兑换优先级越高</span></p>
                        <p className='instructions'>关卡代号后的三个数字从上到下为：材料掉落率，理智转换效率，每个物品所需的期望理智</p>
                        <p style = {{color: '#d81b60e4'}} className='instructions'> 红色：效率>99%, 刷此图毕业所需理智最低</p>
                        <p style = {{color: '#fb8c00e4'}} className='instructions'> 橙色：效率>90%, 且掉率比效率最高的图高</p>
                        <p style = {{color: '#039be5e4'}} className='instructions'> 蓝色：掉率最高, 以毕业为目标理智消耗多</p>
                        <p className='instructions'> <strong>毕业指全角色全技能专精三，掉率按照刷到材料所需的期望理智计算</strong></p>
                    </div>
                        </TableCell>
                    </TableRow> {/*Catalyst ends*/}

                {/* Read the matrix and then generate the table */}
                {this.indices.map((i) => {
                        // First row -> D32
                        if (i===0){
                        return(
                        
                            <TableRow>
                            <TableCell rowSpan = {3}>
                                <Tooltip title = {this.state.t5Material[0].name} arrow>
                                    <span className={'material spriteMT-5 material-MT-'+this.state.t5Material[0].id}></span>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title = {this.state.t4Material[i].name} arrow>
                                <span className={'material spriteMT-4 material-MT-'+this.state.t4Material[i].id}></span>
                                </Tooltip>
                                    {this.state.orangeStore ?
                                    <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].orange_note.event : this.state.t4Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{this.state.considerEventStages ? this.state.t4Material[i].orange_store_value.event : this.state.t4Material[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                    :
                                    <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].Notes.event : this.state.t4Material[i].Notes.normal)}>{this.state.considerEventStages ? this.state.t4Material[i].golden_ticket_value.event : this.state.t4Material[i].golden_ticket_value.normal}</p>}
                            </TableCell>
    
                            <TableCell>
                                <Tooltip title = {this.state.t3Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t3Material[i].id}></span>
                                    
                                </Tooltip>
                                    {this.state.orangeStore ?
                                     <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].orange_note.event : this.state.t3Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${this.state.considerEventStages ? this.state.t3Material[i].orange_store_value.event : this.state.t3Material[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                     :
                                    <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].Notes.event : this.state.t3Material[i].Notes.normal)}>{`${this.state.considerEventStages ? this.state.t3Material[i].green_ticket_value.event : this.state.t3Material[i].green_ticket_value.normal}`}</p>
                                       
                                }
                                    
                            </TableCell>
                            <TableCell colSpan={2}>
                                        {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).length===0 && <h3 style={{display: 'inline', whiteSpace: 'nowrap'}} className='textTips'>建议合成</h3>}
                                        
                                        {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).map((stages) => {
                                            return (
                                                <div className='stageWrapper'>
                                                    {stages.extra_drop.map((loots)=>{
                                                            return (
                                                                <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                    <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    
                                                                </Tooltip>)
                                                        })
                                                    }
                                                    <p className = 'lowestAPStage'>{stages.code}</p>
        
                                                    {this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                       
                                                       <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                        <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                        <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                    
                                                    </div>
                                                    }
                                                </div>
                                            )
                                        })}
                                        {!this.state.showBestOnly && (this.state.considerEventStages?this.state.t3Material[i].balanced_stages.event:this.state.t3Material[i].balanced_stages.normal).map((stages) => {
                                            return (
                                                <div className='stageWrapper'>
                                                    {stages.extra_drop.map((loots)=>{
                                                            return (
                                                                <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                    <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    
                                                                </Tooltip>
                                                            )})
                                                    }
                                                    <p className = 'balancedStage'>{stages.code}</p>
        
                                                   {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                       
                                                        <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                        <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                        <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                    </div>}
                                                </div>
                                            )
                                        })}
        
                                        {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t3Material[i].drop_rate_first_stages.event:this.state.t3Material[i].drop_rate_first_stages.normal).map((stages) => {
                                            return (
                                                <div className='stageWrapper'>
                                                    {stages.extra_drop.map((loots)=>{
                                                            return (
                                                                <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                    <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                
                                                            </Tooltip>)})
                                                    }
                                                    <p className = 'dropRateFirstStage'>{stages.code}</p>
        
                                                    {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                       
                                                        <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                        <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                        <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                    </div>}
                                                </div>
                                            )
                                        })}
                            </TableCell>
                          
        
                        </TableRow>
        
        
                            )

                        }
                        // The 
                        else if (i===3){
                            return(
                            
                                <TableRow>
                                <TableCell rowSpan = {3}>
                                    <Tooltip title = {this.state.t5Material[1].name} arrow>
                                    <span className={'material spriteMT-5 material-MT-'+this.state.t5Material[1].id}></span>
                                   
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title = {this.state.t4Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t4Material[i].id}></span>
                                    
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                        <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].orange_note.event : this.state.t4Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{this.state.considerEventStages ? this.state.t4Material[i].orange_store_value.event : this.state.t4Material[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                        :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].Notes.event : this.state.t4Material[i].Notes.normal)}>{this.state.considerEventStages ? this.state.t4Material[i].golden_ticket_value.event : this.state.t4Material[i].golden_ticket_value.normal}</p>
                                        }
                                </TableCell>
        
                                <TableCell>
                                    <Tooltip title = {this.state.t3Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t3Material[i].id}></span>
                                        
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                        <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].orange_note.event : this.state.t3Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${this.state.considerEventStages ? this.state.t3Material[i].orange_store_value.event : this.state.t3Material[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                        :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].Notes.event : this.state.t3Material[i].Notes.normal)}>{`${this.state.considerEventStages ? this.state.t3Material[i].green_ticket_value.event : this.state.t3Material[i].green_ticket_value.normal}`}</p>
                                        }
                                        
                                        
                                </TableCell>
                                <TableCell colSpan={2}>
                                        
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).length===0 && <h3 style={{display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>建议合成</h3>}
                                            
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        
                                                                    </Tooltip>)
                                                            })
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>
            
                                                        {this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                           <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        
                                                        </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                            {!this.state.showBestOnly && (this.state.considerEventStages?this.state.t3Material[i].balanced_stages.event:this.state.t3Material[i].balanced_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        
                                                                    </Tooltip>
                                                                )})
                                                        }
                                                        <p className = 'balancedStage'>{stages.code}</p>
            
                                                       {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
            
                                            {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t3Material[i].drop_rate_first_stages.event:this.state.t3Material[i].drop_rate_first_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    
                                                                </Tooltip>)})
                                                        }
                                                        <p className = 'dropRateFirstStage'>{stages.code}</p>
            
                                                        {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
                                </TableCell>

                                
                        <TableCell colSpan={4}>
                            <Tooltip title = {this.state.t2Material[i-3].name} arrow>
                                <span className={'material spriteMT-4 material-MT-'+this.state.t2Material[i-3].id}/>
                                {/* <img alt = "" className = 'spriteMT-4' src= {require('./static/MT-'+this.state.t2Material[i-3].id+'.png')}/> */}
                            </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t2Material[i - 3].orange_note.event : this.state.t2Material[i - 3].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(this.state.considerEventStages ? this.state.t2Material[i - 3].orange_store_value.event : this.state.t2Material[i - 3].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t2Material[i - 3].Notes.event : this.state.t2Material[i - 3].Notes.normal)}>{`${(this.state.considerEventStages ? this.state.t2Material[i - 3].credit_store_value.event : this.state.t2Material[i - 3].credit_store_value.normal)}`}</p>
                                        }
                                
                                
                                <div style = {{display: 'inline'}}>
                                    {(this.state.considerEventStages?this.state.t2Material[i-3].lowest_ap_stages.event:this.state.t2Material[i-3].lowest_ap_stages.normal).map((stages) => {
                                        if((this.state.considerEventStages?this.state.t2Material[i-3].lowest_ap_stages.event:this.state.t2Material[i-3].lowest_ap_stages.normal).length >=2){
                                            if((this.state.considerEventStages?this.state.t2Material[i-3].lowest_ap_stages.event:this.state.t2Material[i-3].lowest_ap_stages.normal).indexOf(stages) ===1){
                                                return (

                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots)=>{
                                                                    return (
                                                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                            <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                            
                                                                        </Tooltip>)})
                                                            }
                                                            <p className = 'lowestAPStage'>{stages.code}</p>

                                                        {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        
                                                        <Tooltip title="其他副本……" arrow placement='top'>
                                                        <IconButton>
                                                        <KeyboardArrowRightIcon onClick={this.handleChange(this.state.t2Material[i-3])} style={{marginLeft:'25px'}}/>
                                                        </IconButton></Tooltip>
                                                    </div>
                                                )
                                            }
                                        } 
                                            return (
                                                (this.state.considerEventStages?this.state.t2Material[i-3].lowest_ap_stages.event:this.state.t2Material[i-3].lowest_ap_stages.normal).length <2&&
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        
                                                                    </Tooltip>)})
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>

                                                    {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )}
                                    )}
                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t2Material[i-3].balanced_stages.event:this.state.t2Material[i-3].balanced_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                
                                                            </Tooltip>)})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                               { this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t2Material[i-3].drop_rate_first_stages.event:this.state.t2Material[i-3].drop_rate_first_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                
                                                            </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}
                                </div>
                        </TableCell>
                        
                        
                        <TableCell colSpan={5}>
                            <Tooltip title = {this.state.t1Material[i-3].name} arrow>
                                <span className={'material spriteMT-4 material-MT-'+this.state.t1Material[i-3].id}></span>
                                
                                 </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t1Material[i - 3].orange_note.event : this.state.t1Material[i - 3].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(this.state.considerEventStages ? this.state.t1Material[i - 3].orange_store_value.event : this.state.t1Material[i - 3].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t1Material[i - 3].Notes.event : this.state.t1Material[i - 3].Notes.normal)}>{`${(this.state.considerEventStages ? this.state.t1Material[i - 3].credit_store_value.event : this.state.t1Material[i - 3].credit_store_value.normal)}`}</p>
                                        }
                                
                                
                                <div style = {{display: 'inline'}}>
                                    {(this.state.considerEventStages?this.state.t1Material[i-3].lowest_ap_stages.event:this.state.t1Material[i-3].lowest_ap_stages.normal).map((stages) => {
                                        if((this.state.considerEventStages?this.state.t1Material[i-3].lowest_ap_stages.event:this.state.t1Material[i-3].lowest_ap_stages.normal).length >=2){
                                            if((this.state.considerEventStages?this.state.t1Material[i-3].lowest_ap_stages.event:this.state.t1Material[i-3].lowest_ap_stages.normal).indexOf(stages) ===1){
                                                return (

                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots)=>{
                                                                    return (
                                                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                            <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                            
                                                                        </Tooltip>)})
                                                            }
                                                            <p className = 'lowestAPStage'>{stages.code}</p>

                                                        {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        <Tooltip title="其他副本……" arrow placement='top'>
                                                        <IconButton>
                                                        <KeyboardArrowRightIcon onClick={this.handleChange(this.state.t1Material[i-3])} style={{marginLeft:'25px'}}/>
                                                        </IconButton></Tooltip>
                                                    </div>
                                                    
                                                )
                                            }
                                        }
                                            return (
                                                (this.state.considerEventStages?this.state.t1Material[i-3].lowest_ap_stages.event:this.state.t1Material[i-3].lowest_ap_stages.normal).length <2&&
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        
                                                                    </Tooltip>)})
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>

                                                    {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )}
                                    )}
                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t1Material[i-3].balanced_stages.event:this.state.t1Material[i-3].balanced_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                
                                                            </Tooltip>)})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                               { this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t1Material[i-3].drop_rate_first_stages.event:this.state.t1Material[i-3].drop_rate_first_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                
                                                            </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}
                                    </div>


                        </TableCell>
                              
            
                            </TableRow>
            
            
                                )
    
                        }
                        // Microchip
                        else if (i===6){
                            return(
                            
                                <TableRow>
                                <TableCell rowSpan = {2}>
                                    <Tooltip title = {this.state.t5Material[2].name} arrow>
                                    <span className={'material spriteMT-5 material-MT-'+this.state.t5Material[2].id}></span>
                                    
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title = {this.state.t4Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t4Material[i].id}></span>
                                    
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].orange_note.event : this.state.t4Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{this.state.considerEventStages ? this.state.t4Material[i].orange_store_value.event : this.state.t4Material[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].Notes.event : this.state.t4Material[i].Notes.normal)}>{this.state.considerEventStages ? this.state.t4Material[i].golden_ticket_value.event : this.state.t4Material[i].golden_ticket_value.normal}</p>
                                            }
                                </TableCell>
        
                                <TableCell>
                                    <Tooltip title = {this.state.t3Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t3Material[i].id}></span>
                                        
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].orange_note.event : this.state.t3Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${this.state.considerEventStages ? this.state.t3Material[i].orange_store_value.event : this.state.t3Material[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].Notes.event : this.state.t3Material[i].Notes.normal)}>{`${this.state.considerEventStages ? this.state.t3Material[i].green_ticket_value.event : this.state.t3Material[i].green_ticket_value.normal}`}</p>
                                            }
                                        
                                        
                                </TableCell>
                                <TableCell colSpan={2}>
                                        
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).length===0 && <h3 style={{display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>建议合成</h3>}
                                            
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        
                                                                    </Tooltip>)
                                                            })
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>
            
                                                        {this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        
                                                        </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                            {!this.state.showBestOnly && (this.state.considerEventStages?this.state.t3Material[i].balanced_stages.event:this.state.t3Material[i].balanced_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        
                                                                    </Tooltip>
                                                                )})
                                                        }
                                                        <p className = 'balancedStage'>{stages.code}</p>
            
                                                        {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                            
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
            
                                            {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t3Material[i].drop_rate_first_stages.event:this.state.t3Material[i].drop_rate_first_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    
                                                                </Tooltip>)})
                                                        }
                                                        <p className = 'dropRateFirstStage'>{stages.code}</p>
            
                                                        {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                            
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
                                </TableCell>

                                
                        <TableCell colSpan={4}>
                            <Tooltip title = {this.state.t2Material[i-3].name} arrow>
                                <span className={'material spriteMT-4 material-MT-'+this.state.t2Material[i-3].id}></span>
                                
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t2Material[i - 3].orange_note.event : this.state.t2Material[i - 3].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(this.state.considerEventStages ? this.state.t2Material[i - 3].orange_store_value.event : this.state.t2Material[i - 3].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t2Material[i - 3].Notes.event : this.state.t2Material[i - 3].Notes.normal)}>{`${(this.state.considerEventStages ? this.state.t2Material[i - 3].credit_store_value.event : this.state.t2Material[i - 3].credit_store_value.normal)}`}</p>
                                        }
                                
                                
                                <div style = {{display: 'inline'}}>
                                    {(this.state.considerEventStages?this.state.t2Material[i-3].lowest_ap_stages.event:this.state.t2Material[i-3].lowest_ap_stages.normal).map((stages) => {
                                        if((this.state.considerEventStages?this.state.t2Material[i-3].lowest_ap_stages.event:this.state.t2Material[i-3].lowest_ap_stages.normal).length >=2){
                                            if((this.state.considerEventStages?this.state.t2Material[i-3].lowest_ap_stages.event:this.state.t2Material[i-3].lowest_ap_stages.normal).indexOf(stages) ===1){
                                                return (

                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots)=>{
                                                                    return (
                                                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                            <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                            
                                                                        </Tooltip>)})
                                                            }
                                                            <p className = 'lowestAPStage'>{stages.code}</p>

                                                        {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        
                                                        <Tooltip title="其他副本……" arrow placement='top'>
                                                        <IconButton>
                                                        <KeyboardArrowRightIcon onClick={this.handleChange(this.state.t2Material[i-3])} style={{marginLeft:'25px'}}/>
                                                        </IconButton></Tooltip>
                                                    </div>
                                                )
                                            }
                                        }
                                            return (
                                                (this.state.considerEventStages?this.state.t2Material[i-3].lowest_ap_stages.event:this.state.t2Material[i-3].lowest_ap_stages.normal).length <2&&
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        
                                                                    </Tooltip>)})
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>

                                                    {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )}
                                    )}
                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t2Material[i-3].balanced_stages.event:this.state.t2Material[i-3].balanced_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                
                                                            </Tooltip>)})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                                { this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                    
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t2Material[i-3].drop_rate_first_stages.event:this.state.t2Material[i-3].drop_rate_first_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                
                                                            </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                    
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}
                                </div>
                        </TableCell>
                        
                        
                        <TableCell colSpan={5}>
                            <Tooltip title = {this.state.t1Material[i-3].name} arrow>
                            <span className={'material spriteMT-4 material-MT-'+this.state.t1Material[i-3].id}></span>
                                
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t1Material[i - 3].orange_note.event : this.state.t1Material[i - 3].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(this.state.considerEventStages ? this.state.t1Material[i - 3].orange_store_value.event : this.state.t1Material[i - 3].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t1Material[i - 3].Notes.event : this.state.t1Material[i - 3].Notes.normal)}>{`${(this.state.considerEventStages ? this.state.t1Material[i - 3].credit_store_value.event : this.state.t1Material[i - 3].credit_store_value.normal)}`}</p>
                                        }
                                
                                
                                <div style = {{display: 'inline'}}>
                                    {(this.state.considerEventStages?this.state.t1Material[i-3].lowest_ap_stages.event:this.state.t1Material[i-3].lowest_ap_stages.normal).map((stages) => {
                                        if((this.state.considerEventStages?this.state.t1Material[i-3].lowest_ap_stages.event:this.state.t1Material[i-3].lowest_ap_stages.normal).length >=2){
                                            if((this.state.considerEventStages?this.state.t1Material[i-3].lowest_ap_stages.event:this.state.t1Material[i-3].lowest_ap_stages.normal).indexOf(stages) ===1){
                                                return (

                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots)=>{
                                                                    return (
                                                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                            <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                            
                                                                        </Tooltip>)})
                                                            }
                                                            <p className = 'lowestAPStage'>{stages.code}</p>

                                                        {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        <Tooltip title="其他副本……" arrow placement='top'>
                                                        <IconButton>
                                                        <KeyboardArrowRightIcon onClick={this.handleChange(this.state.t1Material[i-3])} style={{marginLeft:'25px'}}/>
                                                        </IconButton></Tooltip>
                                                    </div>
                                                    
                                                )
                                            }
                                        }
                                            return (
                                                (this.state.considerEventStages?this.state.t1Material[i-3].lowest_ap_stages.event:this.state.t1Material[i-3].lowest_ap_stages.normal).length <2&&
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        
                                                                    </Tooltip>)})
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>

                                                    {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )}
                                    )}
                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t1Material[i-3].balanced_stages.event:this.state.t1Material[i-3].balanced_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                
                                                            </Tooltip>)})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                                { this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                    
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t1Material[i-3].drop_rate_first_stages.event:this.state.t1Material[i-3].drop_rate_first_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                    
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}
                                    </div>


                        </TableCell>
                                
            
                            </TableRow>
            
            
                                )
    
                        } 
                        // Alignment for Kohl series
                        else if (i===7){
                            return(
                            
                                <TableRow>
                                <TableCell>
                                    <Tooltip title = {this.state.t4Material[i].name} arrow>
                                        <span className={'material spriteMT-4 material-MT-'+this.state.t4Material[i].id}></span>
                                    
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].orange_note.event : this.state.t4Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{this.state.considerEventStages ? this.state.t4Material[i].orange_store_value.event : this.state.t4Material[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].Notes.event : this.state.t4Material[i].Notes.normal)}>{this.state.considerEventStages ? this.state.t4Material[i].golden_ticket_value.event : this.state.t4Material[i].golden_ticket_value.normal}</p>
                                        }
                                </TableCell>
        
                                <TableCell>
                                    <Tooltip title = {this.state.t3Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t3Material[i].id}></span>
                                        
                                    </Tooltip>
                                        {this.state.orangeStore ? <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].orange_note.event : this.state.t3Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${this.state.considerEventStages ? this.state.t3Material[i].orange_store_value.event : this.state.t3Material[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].Notes.event : this.state.t3Material[i].Notes.normal)}>{`${this.state.considerEventStages ? this.state.t3Material[i].green_ticket_value.event : this.state.t3Material[i].green_ticket_value.normal}`}</p>
                                        }
                                        
                                        
                                </TableCell>
                                <TableCell colSpan={2}>
                                        
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).length===0 && <h3 style={{display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>建议合成</h3>}
                                            
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>
            
                                                        {this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        
                                                        </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                            {!this.state.showBestOnly && (this.state.considerEventStages?this.state.t3Material[i].balanced_stages.event:this.state.t3Material[i].balanced_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>
                                                                )})
                                                        }
                                                        <p className = 'balancedStage'>{stages.code}</p>
            
                                                        {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                            
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
            
                                            {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t3Material[i].drop_rate_first_stages.event:this.state.t3Material[i].drop_rate_first_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                    <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                </Tooltip>)})
                                                        }
                                                        <p className = 'dropRateFirstStage'>{stages.code}</p>
            
                                                        {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                            
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
                                </TableCell>

            
                            </TableRow>
            
            
                                )
    
                        }
                         //Other t4 material that does not involve in upper synthesis
                         else if (i===8){
                            return(
                                <TableRow>
                                <TableCell rowSpan = {4}/>
                                <TableCell>
                                    <Tooltip title = {this.state.t4Material[i].name} arrow>
                                        <span className={'material spriteMT-4 material-MT-'+this.state.t4Material[i].id}></span>
                                    
                                    
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                        <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].orange_note.event : this.state.t4Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{this.state.considerEventStages ? this.state.t4Material[i].orange_store_value.event : this.state.t4Material[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>:
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].Notes.event : this.state.t4Material[i].Notes.normal)}>{this.state.considerEventStages ? this.state.t4Material[i].golden_ticket_value.event : this.state.t4Material[i].golden_ticket_value.normal}</p>
                                        }
                                </TableCell>
        
                                <TableCell>
                                    <Tooltip title = {this.state.t3Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t3Material[i].id}></span>
                                        
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                        <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].orange_note.event : this.state.t3Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${this.state.considerEventStages ? this.state.t3Material[i].orange_store_value.event : this.state.t3Material[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>:
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].Notes.event : this.state.t3Material[i].Notes.normal)}>{`${this.state.considerEventStages ? this.state.t3Material[i].green_ticket_value.event : this.state.t3Material[i].green_ticket_value.normal}`}</p>
                                        }
                                        
                                        
                                </TableCell>
                                <TableCell colSpan={2}>
                                        
                                          
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>
            
                                                        {this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                           <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        
                                                        </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                            {!this.state.showBestOnly && (this.state.considerEventStages?this.state.t3Material[i].balanced_stages.event:this.state.t3Material[i].balanced_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>
                                                                )})
                                                        }
                                                        <p className = 'balancedStage'>{stages.code}</p>
            
                                                       {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
            
                                            {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t3Material[i].drop_rate_first_stages.event:this.state.t3Material[i].drop_rate_first_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                    <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                </Tooltip>)})
                                                        }
                                                        <p className = 'dropRateFirstStage'>{stages.code}</p>
            
                                                        {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
                                </TableCell>

                                
                        <TableCell colSpan={4}>
                            <Tooltip title = {this.state.t2Material[i-4].name} arrow>
                            <span className={'material spriteMT-4 material-MT-'+this.state.t2Material[i-4].id}/>
                                
                                 </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t2Material[i - 4].orange_note.event : this.state.t2Material[i - 4].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(this.state.considerEventStages ? this.state.t2Material[i - 4].orange_store_value.event : this.state.t2Material[i - 4].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t2Material[i - 4].Notes.event : this.state.t2Material[i - 4].Notes.normal)}>{`${this.state.considerEventStages ? this.state.t2Material[i - 4].credit_store_value.event : this.state.t2Material[i - 4].credit_store_value.normal}`}</p>
                                        }
                                
                                
                                <div style = {{display: 'inline'}}>
                                    {(this.state.considerEventStages?this.state.t2Material[i-4].lowest_ap_stages.event:this.state.t2Material[i-4].lowest_ap_stages.normal).map((stages) => {
                                        if((this.state.considerEventStages?this.state.t2Material[i-4].lowest_ap_stages.event:this.state.t2Material[i-4].lowest_ap_stages.normal).length >=2){
                                            if((this.state.considerEventStages?this.state.t2Material[i-4].lowest_ap_stages.event:this.state.t2Material[i-4].lowest_ap_stages.normal).indexOf(stages) ===1){
                                                return (

                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots)=>{
                                                                    return (
                                                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                            <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        </Tooltip>)})
                                                            }
                                                            <p className = 'lowestAPStage'>{stages.code}</p>

                                                        {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        
                                                        <Tooltip title="其他副本……" arrow placement='top'>
                                                        <IconButton>
                                                        <KeyboardArrowRightIcon onClick={this.handleChange(this.state.t2Material[i-4])} style={{marginLeft:'25px'}}/>
                                                        </IconButton></Tooltip>
                                                    </div>
                                                )
                                            }
                                        }
                                            return (
                                                (this.state.considerEventStages?this.state.t2Material[i-4].lowest_ap_stages.event:this.state.t2Material[i-4].lowest_ap_stages.normal).length <2&&
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>)})
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>

                                                    {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )}
                                    )}
                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t2Material[i-4].balanced_stages.event:this.state.t2Material[i-4].balanced_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                               { this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t2Material[i-4].drop_rate_first_stages.event:this.state.t2Material[i-4].drop_rate_first_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}
                                </div>
                        </TableCell>
                        
                        
                        <TableCell colSpan={5}>
                            <Tooltip title = {this.state.t1Material[i-4].name} arrow>
                            <span className={'material spriteMT-4 material-MT-'+this.state.t1Material[i-4].id}></span>
                                
                                 </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t1Material[i - 4].orange_note.event : this.state.t1Material[i - 4].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(this.state.considerEventStages ? this.state.t1Material[i - 4].orange_store_value.event : this.state.t1Material[i - 4].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t1Material[i - 4].Notes.event : this.state.t1Material[i - 4].Notes.normal)}>{`${(this.state.considerEventStages ? this.state.t1Material[i - 4].credit_store_value.event : this.state.t1Material[i - 4].credit_store_value.normal)}`}</p>
                                            }
                                
                                
                                <div style = {{display: 'inline'}}>
                                    {(this.state.considerEventStages?this.state.t1Material[i-4].lowest_ap_stages.event:this.state.t1Material[i-4].lowest_ap_stages.normal).map((stages) => {
                                        if((this.state.considerEventStages?this.state.t1Material[i-4].lowest_ap_stages.event:this.state.t1Material[i-4].lowest_ap_stages.normal).length >=2){
                                            if((this.state.considerEventStages?this.state.t1Material[i-4].lowest_ap_stages.event:this.state.t1Material[i-4].lowest_ap_stages.normal).indexOf(stages) ===1){
                                                return (

                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots)=>{
                                                                    return (
                                                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                            <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        </Tooltip>)})
                                                            }
                                                            <p className = 'lowestAPStage'>{stages.code}</p>

                                                        {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        <Tooltip title="其他副本……" arrow placement='top'>
                                                        <IconButton>
                                                        <KeyboardArrowRightIcon onClick={this.handleChange(this.state.t1Material[i-4])} style={{marginLeft:'25px'}}/>
                                                        </IconButton></Tooltip>
                                                    </div>
                                                    
                                                )
                                            }
                                        } 
                                            return (
                                                (this.state.considerEventStages?this.state.t1Material[i-4].lowest_ap_stages.event:this.state.t1Material[i-4].lowest_ap_stages.normal).length <2&&
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>)})
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>

                                                    {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )}
                                    )}
                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t1Material[i-4].balanced_stages.event:this.state.t1Material[i-4].balanced_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                               { this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t1Material[i-4].drop_rate_first_stages.event:this.state.t1Material[i-4].drop_rate_first_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}
                                    </div>


                        </TableCell>
                              
            
                            </TableRow>
            
            
                                )
    
                        } else if (i<3 || i>10){
                            return(
                            
                                <TableRow>
                               
                                <TableCell>
                                    <Tooltip title = {this.state.t4Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t4Material[i].id}></span>
                                    
                                    </Tooltip>
                                     {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].orange_note.event : this.state.t4Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{this.state.considerEventStages ? this.state.t4Material[i].orange_store_value.event : this.state.t4Material[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                    <p className = {'M4Values'+(this.state.considerEventStages?this.state.t4Material[i].Notes.event:this.state.t4Material[i].Notes.normal)}>{this.state.considerEventStages?this.state.t4Material[i].golden_ticket_value.event:this.state.t4Material[i].golden_ticket_value.normal}</p>
                                    }
                                </TableCell>
        
                                <TableCell>
                                    <Tooltip title = {this.state.t3Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t3Material[i].id}></span>
                                        
                                    </Tooltip>
                                     {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].orange_note.event : this.state.t3Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${this.state.considerEventStages ? this.state.t3Material[i].orange_store_value.event : this.state.t3Material[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                        <p className = {'M4Values'+(this.state.considerEventStages?this.state.t3Material[i].Notes.event:this.state.t3Material[i].Notes.normal)}>{`${this.state.considerEventStages?this.state.t3Material[i].green_ticket_value.event:this.state.t3Material[i].green_ticket_value.normal}`}</p>
                                        }
                                        
                                        
                                </TableCell>
                                <TableCell colSpan={2}>
                                        
                                            {/* {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).length===0 && <h3 style={{display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>建议合成</h3>} */}
                                            
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>
            
                                                        {this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                           <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        
                                                        </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                            {!this.state.showBestOnly && (this.state.considerEventStages?this.state.t3Material[i].balanced_stages.event:this.state.t3Material[i].balanced_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>
                                                                )})
                                                        }
                                                        <p className = 'balancedStage'>{stages.code}</p>
            
                                                       {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
            
                                            {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t3Material[i].drop_rate_first_stages.event:this.state.t3Material[i].drop_rate_first_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                    <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                </Tooltip>)})
                                                        }
                                                        <p className = 'dropRateFirstStage'>{stages.code}</p>
            
                                                        {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
                                </TableCell>
                              
            
                            </TableRow>
            
            
                                )
    
                        } else if (i===10){
                            return(
                            
                                <TableRow>
                               
                                <TableCell >
                                    <Tooltip title = {this.state.t4Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t4Material[i].id}></span>
                                    
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].orange_note.event : this.state.t4Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{this.state.considerEventStages ? this.state.t4Material[i].orange_store_value.event : this.state.t4Material[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].Notes.event : this.state.t4Material[i].Notes.normal)}>{this.state.considerEventStages ? this.state.t4Material[i].golden_ticket_value.event : this.state.t4Material[i].golden_ticket_value.normal}</p>
                                        }
                                </TableCell>
        
                                <TableCell>
                                    <Tooltip title = {this.state.t3Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t3Material[i].id}></span>
                                        
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].orange_note.event : this.state.t3Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${this.state.considerEventStages ? this.state.t3Material[i].orange_store_value.event : this.state.t3Material[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].Notes.event : this.state.t3Material[i].Notes.normal)}>{`${this.state.considerEventStages ? this.state.t3Material[i].green_ticket_value.event : this.state.t3Material[i].green_ticket_value.normal}`}</p>
                                        }
                                        
                                        
                                </TableCell>
                                <TableCell colSpan={2}>
                                        
                                            {/* {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).length===0 && <h3 style={{display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>建议合成</h3>} */}
                                            
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>
            
                                                        {this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                           <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        
                                                        </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                            {!this.state.showBestOnly && (this.state.considerEventStages?this.state.t3Material[i].balanced_stages.event:this.state.t3Material[i].balanced_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>
                                                                )})
                                                        }
                                                        <p className = 'balancedStage'>{stages.code}</p>
            
                                                       {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
            
                                            {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t3Material[i].drop_rate_first_stages.event:this.state.t3Material[i].drop_rate_first_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                    <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                </Tooltip>)})
                                                        }
                                                        <p className = 'dropRateFirstStage'>{stages.code}</p>
            
                                                        {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
                                </TableCell>
                                
                                {
                                    this.state.misc.map((item) => {
                                        return (
                                        <TableCell rowSpan={2}>
                                            <Tooltip title = {item.name} arrow>
                                            <span className={'spriteMT-4 material material-MISC-'+item.id}></span>
                                            
                                                </Tooltip>
                                            <p className = {'CreditValue'+(this.state.considerEventStages?item.Notes.event:item.Notes.normal)}>{this.state.considerEventStages?item.credit_store_value.event:item.credit_store_value.normal}</p>
                                        </TableCell>
                                        
                                        )
                                    })
                                }
                                
                            </TableRow>
            
            
                                )
    
                        } else if (i===4 || i===5){
                            return(
                                <TableRow>
                                <TableCell>
                                    <Tooltip title = {this.state.t4Material[i].name} arrow>
                                        <span className={'material spriteMT-4 material-MT-'+this.state.t4Material[i].id}></span>
                                    
                                    </Tooltip>
                                    {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].orange_note.event : this.state.t4Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{this.state.considerEventStages ? this.state.t4Material[i].orange_store_value.event : this.state.t4Material[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                    <p className = {'M4Values'+(this.state.considerEventStages?this.state.t4Material[i].Notes.event:this.state.t4Material[i].Notes.normal)}>{this.state.considerEventStages?this.state.t4Material[i].golden_ticket_value.event:this.state.t4Material[i].golden_ticket_value.normal}</p>
                                    }
                                </TableCell>
        
                                <TableCell>
                                    <Tooltip title = {this.state.t3Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t3Material[i].id}></span>
                                        
                                    </Tooltip>
                                    {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].orange_note.event : this.state.t3Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${this.state.considerEventStages ? this.state.t3Material[i].orange_store_value.event : this.state.t3Material[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                        <p className = {'M4Values'+(this.state.considerEventStages?this.state.t3Material[i].Notes.event:this.state.t3Material[i].Notes.normal)}>{`${this.state.considerEventStages?this.state.t3Material[i].green_ticket_value.event:this.state.t3Material[i].green_ticket_value.normal}`}</p>
                                        }
                                        
                                        
                                </TableCell>
                                <TableCell colSpan={2}>
                                        
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).length===0 && <h3 style={{display: 'inline', whiteSpace: 'nowrap'}} className='textTips'>建议合成</h3>}
                                            
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>
            
                                                        {this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                           <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        
                                                        </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                            {!this.state.showBestOnly && (this.state.considerEventStages?this.state.t3Material[i].balanced_stages.event:this.state.t3Material[i].balanced_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>
                                                                )})
                                                        }
                                                        <p className = 'balancedStage'>{stages.code}</p>
            
                                                       {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
            
                                            {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t3Material[i].drop_rate_first_stages.event:this.state.t3Material[i].drop_rate_first_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                    <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                </Tooltip>)})
                                                        }
                                                        <p className = 'dropRateFirstStage'>{stages.code}</p>
            
                                                        {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
                                </TableCell>

                                
                        <TableCell colSpan={4}>
                            <Tooltip title = {this.state.t2Material[i-3].name} arrow>
                            <span className={'material spriteMT-4 material-MT-'+this.state.t2Material[i-3].id}/>
                                {/* <img alt = "" className = 'spriteMT-4' src= {require('./static/MT-'+this.state.t2Material[i-3].id+'.png')}/> */}
                                 </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t2Material[i - 3].orange_note.event : this.state.t2Material[i - 3].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(this.state.considerEventStages ? this.state.t2Material[i - 3].orange_store_value.event : this.state.t2Material[i - 3].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t2Material[i - 3].Notes.event : this.state.t2Material[i - 3].Notes.normal)}>{`${(this.state.considerEventStages ? this.state.t2Material[i - 3].credit_store_value.event : this.state.t2Material[i - 3].credit_store_value.normal)}`}</p>
                                            }
                                
                                
                                <div style = {{display: 'inline'}}>
                                    {(this.state.considerEventStages?this.state.t2Material[i-3].lowest_ap_stages.event:this.state.t2Material[i-3].lowest_ap_stages.normal).map((stages) => {
                                        if((this.state.considerEventStages?this.state.t2Material[i-3].lowest_ap_stages.event:this.state.t2Material[i-3].lowest_ap_stages.normal).length >=2){
                                            if((this.state.considerEventStages?this.state.t2Material[i-3].lowest_ap_stages.event:this.state.t2Material[i-3].lowest_ap_stages.normal).indexOf(stages) ===1){
                                                return (

                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots)=>{
                                                                    return (
                                                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                            <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        </Tooltip>)})
                                                            }
                                                            <p className = 'lowestAPStage'>{stages.code}</p>

                                                        {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        
                                                        <Tooltip title="其他副本……" arrow placement='top'>
                                                        <IconButton>
                                                        <KeyboardArrowRightIcon onClick={this.handleChange(this.state.t2Material[i-3])} style={{marginLeft:'25px'}}/>
                                                        </IconButton></Tooltip>
                                                    </div>
                                                )
                                            }
                                        } 
                                            return (
                                                (this.state.considerEventStages?this.state.t2Material[i-3].lowest_ap_stages.event:this.state.t2Material[i-3].lowest_ap_stages.normal).length <2&&
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>)})
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>

                                                    {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )}
                                    )}
                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t2Material[i-3].balanced_stages.event:this.state.t2Material[i-3].balanced_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                               { this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t2Material[i-3].drop_rate_first_stages.event:this.state.t2Material[i-3].drop_rate_first_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}
                                </div>
                        </TableCell>
                        
                        
                        <TableCell colSpan={5}>
                            <Tooltip title = {this.state.t1Material[i-3].name} arrow>
                            <span className={'material spriteMT-4 material-MT-'+this.state.t1Material[i-3].id}></span>
                                
                                 </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t1Material[i - 3].orange_note.event : this.state.t1Material[i - 3].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(this.state.considerEventStages ? this.state.t1Material[i - 3].orange_store_value.event : this.state.t1Material[i - 3].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t1Material[i - 3].Notes.event : this.state.t1Material[i - 3].Notes.normal)}>{`${(this.state.considerEventStages ? this.state.t1Material[i - 3].credit_store_value.event : this.state.t1Material[i - 3].credit_store_value.normal)}`}</p>
                                        }
                                
                                
                                <div style = {{display: 'inline'}}>
                                    {(this.state.considerEventStages?this.state.t1Material[i-3].lowest_ap_stages.event:this.state.t1Material[i-3].lowest_ap_stages.normal).map((stages) => {
                                        if((this.state.considerEventStages?this.state.t1Material[i-3].lowest_ap_stages.event:this.state.t1Material[i-3].lowest_ap_stages.normal).length >=2){
                                            if((this.state.considerEventStages?this.state.t1Material[i-3].lowest_ap_stages.event:this.state.t1Material[i-3].lowest_ap_stages.normal).indexOf(stages) ===1){
                                                return (

                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots)=>{
                                                                    return (
                                                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                            <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        </Tooltip>)})
                                                            }
                                                            <p className = 'lowestAPStage'>{stages.code}</p>

                                                        {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        <Tooltip title="其他副本……" arrow placement='top'>
                                                        <IconButton>
                                                        <KeyboardArrowRightIcon onClick={this.handleChange(this.state.t1Material[i-3])} style={{marginLeft:'25px'}}/>
                                                        </IconButton></Tooltip>
                                                    </div>
                                                    
                                                )
                                            }
                                        }
                                            return (
                                                (this.state.considerEventStages?this.state.t1Material[i-3].lowest_ap_stages.event:this.state.t1Material[i-3].lowest_ap_stages.normal).length <2&&
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>)})
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>

                                                    {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )}
                                    )}
                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t1Material[i-3].balanced_stages.event:this.state.t1Material[i-3].balanced_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                               { this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t1Material[i-3].drop_rate_first_stages.event:this.state.t1Material[i-3].drop_rate_first_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}
                                    </div>


                        </TableCell>
                              
            
                            </TableRow>
            
            
                                )
    
                        } else {
                            return(
                                <TableRow>
                                <TableCell>
                                    <Tooltip title = {this.state.t4Material[i].name} arrow>
                                        <span className={'material spriteMT-4 material-MT-'+this.state.t4Material[i].id}></span>
                                    
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].orange_note.event : this.state.t4Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{this.state.considerEventStages ? this.state.t4Material[i].orange_store_value.event : this.state.t4Material[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t4Material[i].Notes.event : this.state.t4Material[i].Notes.normal)}>{this.state.considerEventStages ? this.state.t4Material[i].golden_ticket_value.event : this.state.t4Material[i].golden_ticket_value.normal}</p>
                                        }
                                </TableCell>
        
                                <TableCell>
                                    <Tooltip title = {this.state.t3Material[i].name} arrow>
                                    <span className={'material spriteMT-4 material-MT-'+this.state.t3Material[i].id}></span>
                                        
                                    </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].orange_note.event : this.state.t3Material[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${this.state.considerEventStages ? this.state.t3Material[i].orange_store_value.event : this.state.t3Material[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t3Material[i].Notes.event : this.state.t3Material[i].Notes.normal)}>{`${this.state.considerEventStages ? this.state.t3Material[i].green_ticket_value.event : this.state.t3Material[i].green_ticket_value.normal}`}</p>
                                        }
                                        
                                        
                                </TableCell>
                                <TableCell colSpan={2}>
                                        
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).length===0 && <h3 style={{display: 'inline', whiteSpace: 'nowrap'}} className='textTips'>建议合成</h3>}
                                            
                                            {(this.state.considerEventStages?this.state.t3Material[i].lowest_ap_stages.event:this.state.t3Material[i].lowest_ap_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>
            
                                                        {this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                           <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        
                                                        </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                            {!this.state.showBestOnly && (this.state.considerEventStages?this.state.t3Material[i].balanced_stages.event:this.state.t3Material[i].balanced_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>
                                                                )})
                                                        }
                                                        <p className = 'balancedStage'>{stages.code}</p>
            
                                                       {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
            
                                            {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t3Material[i].drop_rate_first_stages.event:this.state.t3Material[i].drop_rate_first_stages.normal).map((stages) => {
                                                return (
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                    <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                </Tooltip>)})
                                                        }
                                                        <p className = 'dropRateFirstStage'>{stages.code}</p>
            
                                                        {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                           
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )
                                            })}
                                </TableCell>

                                
                        <TableCell colSpan={4}>
                            <Tooltip title = {this.state.t2Material[i-4].name} arrow>
                            <span className={'material spriteMT-4 material-MT-'+this.state.t2Material[i-4].id}/>
                                
                                {/* <img alt = "" className = 'spriteMT-4' src= {require('./static/MT-'+this.state.t2Material[i-4].id+'.png')}/> */}
                                 </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t2Material[i - 4].orange_note.event : this.state.t2Material[i - 4].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(this.state.considerEventStages ? this.state.t2Material[i - 4].orange_store_value.event : this.state.t2Material[i - 4].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t2Material[i - 4].Notes.event : this.state.t2Material[i - 4].Notes.normal)}>{`${this.state.considerEventStages ? this.state.t2Material[i - 4].credit_store_value.event : this.state.t2Material[i - 4].credit_store_value.normal}`}</p>
                                    }
                                <div style = {{display: 'inline'}}>
                                    {(this.state.considerEventStages?this.state.t2Material[i-4].lowest_ap_stages.event:this.state.t2Material[i-4].lowest_ap_stages.normal).map((stages) => {
                                        if((this.state.considerEventStages?this.state.t2Material[i-4].lowest_ap_stages.event:this.state.t2Material[i-4].lowest_ap_stages.normal).length >=2){
                                            if((this.state.considerEventStages?this.state.t2Material[i-4].lowest_ap_stages.event:this.state.t2Material[i-4].lowest_ap_stages.normal).indexOf(stages) ===1){
                                                return (

                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots)=>{
                                                                    return (
                                                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                            <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        </Tooltip>)})
                                                            }
                                                            <p className = 'lowestAPStage'>{stages.code}</p>

                                                        {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        
                                                        <Tooltip title="其他副本……" arrow placement='top'>
                                                        <IconButton>
                                                        <KeyboardArrowRightIcon onClick={this.handleChange(this.state.t2Material[i-4])} style={{marginLeft:'25px'}}/>
                                                        </IconButton></Tooltip>
                                                    </div>
                                                )
                                            }
                                        }
                                            return (
                                                (this.state.considerEventStages?this.state.t2Material[i-4].lowest_ap_stages.event:this.state.t2Material[i-4].lowest_ap_stages.normal).length <2 &&
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>)})
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>

                                                    {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )}
                                    )}
                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t2Material[i-4].balanced_stages.event:this.state.t2Material[i-4].balanced_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                               { this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t2Material[i-4].drop_rate_first_stages.event:this.state.t2Material[i-4].drop_rate_first_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}
                                </div>
                        </TableCell>
                        
                        
                        <TableCell colSpan={5}>
                            <Tooltip title = {this.state.t1Material[i-4].name} arrow>
                            <span className={'material spriteMT-4 material-MT-'+this.state.t1Material[i-4].id}></span>
                                
                                 </Tooltip>
                                        {this.state.orangeStore ?
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t1Material[i - 4].orange_note.event : this.state.t1Material[i - 4].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(this.state.considerEventStages ? this.state.t1Material[i - 4].orange_store_value.event : this.state.t1Material[i - 4].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                            :
                                            <p className={'M4Values' + (this.state.considerEventStages ? this.state.t1Material[i - 4].Notes.event : this.state.t1Material[i - 4].Notes.normal)}>{`${(this.state.considerEventStages ? this.state.t1Material[i - 4].credit_store_value.event : this.state.t1Material[i - 4].credit_store_value.normal)}`}</p>
                                        }
                                <div style = {{display: 'inline'}}>
                                    {(this.state.considerEventStages?this.state.t1Material[i-4].lowest_ap_stages.event:this.state.t1Material[i-4].lowest_ap_stages.normal).map((stages) => {
                                        if((this.state.considerEventStages?this.state.t1Material[i-4].lowest_ap_stages.event:this.state.t1Material[i-4].lowest_ap_stages.normal).length >=2){
                                            if((this.state.considerEventStages?this.state.t1Material[i-4].lowest_ap_stages.event:this.state.t1Material[i-4].lowest_ap_stages.normal).indexOf(stages) ===1){
                                                return (

                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots)=>{
                                                                    return (
                                                                        <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                            <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                        </Tooltip>)})
                                                            }
                                                            <p className = 'lowestAPStage'>{stages.code}</p>

                                                        {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                                <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        <Tooltip title="其他副本……" arrow placement='top'>
                                                        <IconButton>
                                                        <KeyboardArrowRightIcon onClick={this.handleChange(this.state.t1Material[i-4])} style={{marginLeft:'25px'}}/>
                                                        </IconButton></Tooltip>
                                                    </div>
                                                    
                                                )
                                            }
                                        }
                                            return (
                                                (this.state.considerEventStages?this.state.t1Material[i-4].lowest_ap_stages.event:this.state.t1Material[i-4].lowest_ap_stages.normal).length <2 &&
                                                    <div className='stageWrapper'>
                                                        {stages.extra_drop.map((loots)=>{
                                                                return (
                                                                    <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                        <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                                    </Tooltip>)})
                                                        }
                                                        <p className = 'lowestAPStage'>{stages.code}</p>

                                                    {   this.state.detailMode && <div style = {{display: 'inline', position: 'absolute'}}> 
                                                            <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                            <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                            <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                        </div>}
                                                    </div>
                                                )}
                                    )}
                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t1Material[i-4].balanced_stages.event:this.state.t1Material[i-4].balanced_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'balancedStage'>{stages.code}</p>

                                               { this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}

                                    {!this.state.showBestOnly &&(this.state.considerEventStages?this.state.t1Material[i-4].drop_rate_first_stages.event:this.state.t1Material[i-4].drop_rate_first_stages.normal).map((stages) => {
                                        return (
                                        
                                            <div className='stageWrapper'>
                                                {stages.extra_drop.map((loots)=>{
                                                        return (
                                                            <Tooltip title = {"额外掉落："+loots.name} arrow>
                                                                <span className={'material extraDropWrap material-MT-'+loots.id}></span>
                                                            </Tooltip>)})
                                                }
                                                <p className = 'dropRateFirstStage'>{stages.code}</p>

                                                {this.state.detailMode &&<div style = {{display: 'inline', position: 'absolute'}}> 
                                                   
                                                    <Tooltip title="材料掉率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{`${(stages.drop_rate*100).toFixed()}%`}</p></span></Tooltip>
                                                    <Tooltip title="理智转化效率" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                    <Tooltip title="单个材料期望理智" arrow placement='right'><span className = ""><p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                
                                                </div>}
                                            </div>
                                        )
                                    })}
                                    </div>


                        </TableCell>
                              
            
                            </TableRow>
            
            
                                )
    
                        }
                    
                })}

                                {/* contingency store */}
                    {this.state.eventType ==="Contingency Contract" && 
                    <TableRow>
                        <TableCell>
                            <h2>有限池</h2>
                        </TableCell>
                        {finite_items.map((contingencyItems) =>{
                            return(
                            <TableCell>
                            <Tooltip title = {contingencyItems.name} arrow>
                                
                            <span className={(contingencyItems.id==="bipeak"?'contingencyMiscs spriteMT-4 material-MT-':'material spriteMT-4 material-MT-')+contingencyItems.id}></span>
                            </Tooltip>
                            <p className = 'M4Values'>{contingencyItems.contingency_store_value.finite}</p>
                            </TableCell>
                            )
                        })}
                    </TableRow>}

                    {this.state.eventType ==="Contingency Contract" && 
                    <TableRow>
                                                  
                            <TableCell>
                                <h2>无限池</h2>
                            </TableCell>
                        {infinite_items.map((contingencyItems) =>{
                            return(
                            <TableCell>
                            <Tooltip title = {contingencyItems.name} arrow>
                            <span className={(contingencyItems.id==="superiors"||contingencyItems.id==="inferiors"?'contingencyMiscs spriteMT-4 material-MT-':'material spriteMT-4 material-MT-')+contingencyItems.id}></span>
                            </Tooltip>
                            <p className = 'M4Values'>{contingencyItems.contingency_store_value.infinite}</p>
                            </TableCell>)
                        })}
                    </TableRow>}
                </Table>
                </TableContainer>
                    
                <StagesModal open={this.state.stageModalOpen}/>  
            </div>
            </MuiThemeProvider>
        );
    }

} export default MaterialTable;

