import React from 'react';
import './style.css';
import BaseComponent from "./../Base";
import { getT1Materials, getT2Materials, getT3Materials, getT4Materials, getT5Materials, getCatalyst, getGacha, getPlan, getMisc} from '../../actions/material';

class MaterialTable extends BaseComponent{
    
    filterState({t5Material, t4Material, t3Material, t2Material, t1Material, catalyst, gacha,plan, misc}){
         
        return {t5Material, t4Material, t3Material, t2Material, t1Material, catalyst, gacha,plan, misc};
    }
    // TODO: Replace those with the actual db queries
   
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
                <div className = 'catalyst'>
                    <div className = 'catalystDiv'>
                    <h4> 黄票商店</h4>
                    <br/>
                    <img alt = "" className = 'MT-4' src= {require('./static/ESS-32001.png')}/>
                    <p className = 'CatalystValue'> {this.state.catalyst.golden_ticket_value}</p>
                    </div>
                    <div className = 'catalystDiv'>
                    <h4> 绿票商店-二层</h4>
                    <br/>
                    <img alt = ""  className = 'MT-4' src= {require('./static/GACHATICKET.png')}/>
                    <p className = {'GachaValue'}> {this.state.gacha.green_ticket_value}</p>
                    <img alt = ""  className = 'MT-4' src= {require('./static/MISC-7001.png')}/>
                    <p className = {'PlanValue'}> {this.state.plan.green_ticket_value}</p>
                    </div>
                    <h4> 信用商店</h4>
                    
                </div>
                <div className='M5Materials'>
                    {
                        this.state.t5Material.map((item) => {
                            if (this.state.t5Material.indexOf(item) <1){
                                return (
                                <div className = 'MT-5-wrapper'>
                                    <img alt = "" className = 'MT-5' src= {require('./static/MT-'+item.id+'.png')}/>
                                    <br/><br/><br/><br/><br/><br/><br/><br/>
                                </div>
                                )
                            } else {
                                return (
                                    <div className = 'MT-5-wrapper'>
                                        <img alt = "" className = 'MT-5' src= {require('./static/MT-'+item.id+'.png')}/>
                                        <br/><br/><br/><br/><br/><br/><br/>
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
                                <img alt = "" className = 'MT-4' src= {require('./static/MT-'+item.id+'.png')}/> 
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
                                <img alt = "" className = 'MT-4' src= {require('./static/MT-'+item.id+'.png')}/> 
                                <p className = {'M4Values'+item.Notes}>{`${item.green_ticket_value}`}</p>
                                {/* The stages where ap costs least to accomplish the goal */}
                                {/* TODO: maybe make it a function to avoid duplications fot too many times */}
                                    {item.lowest_ap_stages.map((stages) => {
                                        return (
                                        <div style = {{display: 'inline', marginLeft: '4%'}}>
                                            <p className = 'lowestAPStage'>{stages.code}</p>
                                            <div style = {{display: 'inline', position: 'absolute'}}> 
                                                {/* TODO: refine here!!! */}
                                                <p className = 'lowestAPStageDetails'>{stages.drop_rate}</p>
                                                <p className = 'lowestAPStageDetails'>{stages.efficiency}</p>
                                                
                                                <p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p>
                                            </div>
                                        </div>
                                        )
                                    })}
                                    {item.balanced_stages.map((stages) => {
                                        return (
                                            <div style = {{display: 'inline',marginLeft: '4%'}}>
                                            <p className = 'balancedStage'>{stages.code}</p>
                                            <div style = {{display: 'inline', position: 'absolute'}}> 
                                                {/* TODO: refine here!!! */}
                                                <p className = 'balancedStageDetails'>{stages.drop_rate}</p>
                                                <p className = 'balancedStageDetails'>{stages.efficiency}</p>
                                                <p className = 'balancedStageDetails'>{stages.ap_per_item}</p>
                                            </div>
                                        </div>
                                        )
                                    })}
                                    {item.drop_rate_first_stages.map((stages) => {
                                         return (
                                            <div style = {{display: 'inline', marginLeft: '4%'}}>
                                            <p className = 'dropRateFirstStage'>{stages.code}</p>
                                            <div style = {{display: 'inline', position: 'absolute'}}> 
                                                {/* TODO: refine here!!! */}
                                                <p className = 'dropRateFirstStageDetails'>{stages.drop_rate}</p>
                                                <p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p>
                                                <p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p>
                                            </div>
                                        </div>
                                        )
                                    })}
                            </div>
                            
                            )
                        } )
                    }
                </div>

                {/* All the tier 2 materials */}
                <div style = {{width: '60%',display: 'inline', position: 'absolute'}}>
                    <div>
                    <div className = 'M2Materials'>
                {
                        this.state.t2Material.map((item) => {
                            return (
                            <div className = 'MT-3-wrapper'>
                                <img alt = "" className = 'MT-4' src= {require('./static/MT-'+item.id+'.png')}/> 
                                <p className = {'M4Values'+item.Notes}>{`${item.credit_store_value}`}</p>
                                {/* The stages where ap costs least to accomplish the goal */}
                                {/* TODO: maybe make it a function to avoid duplications fot too many times */}
                                    {item.lowest_ap_stages.map((stages) => {
                                        return (
                                        <div style = {{display: 'inline', marginLeft: '4%'}}>
                                            <p className = 'lowestAPStage'>{stages.code}</p>
                                            <div style = {{display: 'inline', position: 'absolute'}}> 
                                                {/* TODO: refine here!!! */}
                                                <p className = 'lowestAPStageDetails'>{stages.drop_rate}</p>
                                                
                                                <p className = 'lowestAPStageDetails'>{stages.efficiency}</p>
                                                
                                                <p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p>
                                            </div>
                                        </div>
                                        )
                                    })}
                                    {item.balanced_stages.map((stages) => {
                                        return (
                                            <div style = {{display: 'inline',marginLeft: '4%'}}>
                                            <p className = 'balancedStage'>{stages.code}</p>
                                            <div style = {{display: 'inline', position: 'absolute'}}> 
                                                {/* TODO: refine here!!! */}
                                                <p className = 'balancedStageDetails'>{stages.drop_rate}</p>
                                                
                                                <p className = 'balancedStageDetails'>{stages.efficiency}</p>
                                                
                                                <p className = 'balancedStageDetails'>{stages.ap_per_item}</p>
                                            </div>
                                        </div>
                                        )
                                    })}
                                    {item.drop_rate_first_stages.map((stages) => {
                                         return (
                                            <div style = {{display: 'inline', marginLeft: '4%'}}>
                                            <p className = 'dropRateFirstStage'>{stages.code}</p>
                                            <div style = {{display: 'inline', position: 'absolute'}}> 
                                                {/* TODO: refine here!!! */}
                                                <p className = 'dropRateFirstStageDetails'>{stages.drop_rate}</p>
                                                
                                                <p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p>
                                                
                                                <p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p>
                                            </div>
                                        </div>
                                        )
                                    })}
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
                                <img alt = "" className = 'MT-4' src= {require('./static/MT-'+item.id+'.png')}/> 
                                <p className = {'M4Values'+item.Notes}>{`${item.credit_store_value}`}</p>
                                {/* The stages where ap costs least to accomplish the goal */}
                                {/* TODO: maybe make it a function to avoid duplications fot too many times */}
                                    {item.lowest_ap_stages.map((stages) => {
                                        return (
                                        <div style = {{display: 'inline', marginLeft: '4%'}}>
                                            <p className = 'lowestAPStage'>{stages.code}</p>
                                            <div style = {{display: 'inline', position: 'absolute'}}> 
                                                {/* TODO: refine here!!! */}
                                                <p className = 'lowestAPStageDetails'>{stages.drop_rate}</p>
                                                
                                                <p className = 'lowestAPStageDetails'>{stages.efficiency}</p>
                                                
                                                <p className = 'lowestAPStageDetails'>{stages.ap_per_item}</p>
                                            </div>
                                        </div>
                                        )
                                    })}
                                    {item.balanced_stages.map((stages) => {
                                        return (
                                            <div style = {{display: 'inline',marginLeft: '4%'}}>
                                            <p className = 'balancedStage'>{stages.code}</p>
                                            <div style = {{display: 'inline', position: 'absolute'}}> 
                                                {/* TODO: refine here!!! */}
                                                <p className = 'balancedStageDetails'>{stages.drop_rate}</p>
                                                
                                                <p className = 'balancedStageDetails'>{stages.efficiency}</p>
                                                
                                                <p className = 'balancedStageDetails'>{stages.ap_per_item}</p>
                                            </div>
                                        </div>
                                        )
                                    })}
                                    {item.drop_rate_first_stages.map((stages) => {
                                         return (
                                            <div style = {{display: 'inline', marginLeft: '4%'}}>
                                            <p className = 'dropRateFirstStage'>{stages.code}</p>
                                            <div style = {{display: 'inline', position: 'absolute'}}> 
                                                {/* TODO: refine here!!! */}
                                                <p className = 'dropRateFirstStageDetails'>{stages.drop_rate}</p>
                                                
                                                <p className = 'dropRateFirstStageDetails'>{stages.efficiency}</p>
                                                
                                                <p className = 'dropRateFirstStageDetails'>{stages.ap_per_item}</p>
                                            </div>
                                        </div>
                                        )
                                    })}
                            </div>
                            
                            )
                        } )
                    }
                </div>
                    </div>
                    <br/>
                    <div className = 'miscDiv'>
                    
                    {
                        this.state.misc.map((item) => {
                            return (
                            <div className = 'Credit-wrapper'>
                                <img alt = "" className = 'MT-4' src= {require('./static/MISC-'+item.id+'.png')}/> 
                                <p className = {'CreditValue'+item.Notes}>{item.credit_store_value}</p>
                            </div>
                            
                            )
                        } )
                    }
                    </div>
                </div>
                
            </div>
        );
    }

} export default MaterialTable;

