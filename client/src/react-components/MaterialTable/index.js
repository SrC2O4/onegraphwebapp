import React from 'react';
import './style.css';
import BaseComponent from "./../Base";
import { getT1Materials, getT2Materials, getT3Materials, getT4Materials, getT5Materials, getCatalyst, getGacha, getPlan, getMisc} from '../../actions/material';
import {getState} from 'statezero'

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
                    <h4> 黄票商店</h4>
                    <img className = 'MT-4' src= {require('./static/'+'ESS-32001.png')}/>
                    <p className = 'CatalystValue'> {`${this.state.catalyst.golden_ticket_value}`}</p>
                    <h4> 绿票商店-二层</h4>
                    <img className = 'MT-4' src= {require('./static/'+'GACHATICKET.png')}/>
                    <p className = {'GachaValue'}> {`${this.state.gacha.green_ticket_value}`}</p>
                    <img className = 'MT-4' src= {require('./static/'+'MISC-7001.png')}/>
                    <p className = {'PlanValue'}> {`${this.state.plan.green_ticket_value}`}</p>
                    <h4> 信用商店</h4>
                    {
                        this.state.misc.map((item) => {
                            return (
                            <div className = 'Credit-wrapper'>
                                <img className = 'MT-4' src= {require('./static/'+'MISC-'+item.id+'.png')}/> 
                                <p className = {'CreditValue'+item.Notes}>{`${item.credit_store_value}`}</p>
                            </div>
                            
                            )
                        } )
                    }
                </div>
                <div className='M5Materials'>
                    {
                        this.state.t5Material.map((item) => {
                            return (
                            <div className = 'MT-5-wrapper'>
                                <img className = 'MT-5' src= {require('./static/'+'MT-'+item.id+'.png')}/>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            </div>
                            )
                        } )
                    }
                </div>

                {/* All the tier 4 materials */}
                <div className = 'M4Materials'>
                {
                        this.state.t4Material.map((item) => {
                            return (
                            <div className = 'MT-4-wrapper'>
                                <img className = 'MT-4' src= {require('./static/'+'MT-'+item.id+'.png')}/> 
                                <p className = {'M4Values'+item.Notes}>{`${item.golden_ticket_value}`}</p>
                            </div>
                            
                            )
                        } )
                    }
                </div>
                
                 {/* All the tier 3 materials */}
                 <div className = 'M4Materials'>
                {
                        this.state.t3Material.map((item) => {
                            return (
                            <div className = 'MT-4-wrapper'>
                                <img className = 'MT-4' src= {require('./static/'+'MT-'+item.id+'.png')}/> 
                                <p className = {'M4Values'+item.Notes}>{`${item.green_ticket_value}`}</p>
                            </div>
                            
                            )
                        } )
                    }
                </div>

                {/* All the tier 2 materials */}
                <div className = 'M4Materials'>
                {
                        this.state.t2Material.map((item) => {
                            return (
                            <div className = 'MT-4-wrapper'>
                                <img className = 'MT-4' src= {require('./static/'+'MT-'+item.id+'.png')}/> 
                                <p className = {'M4Values'+item.Notes}>{`${item.credit_store_value}`}</p>
                            </div>
                            
                            )
                        } )
                    }
                </div>

                {/* All the tier 1 materials */}
                <div className = 'M4Materials'>
                {
                        this.state.t1Material.map((item) => {
                            return (
                            <div className = 'MT-4-wrapper'>
                                <img className = 'MT-4' src= {require('./static/'+'MT-'+item.id+'.png')}/> 
                                <p className = {'M4Values'+item.Notes}>{`${item.credit_store_value}`}</p>
                            </div>
                            
                            )
                        } )
                    }
                </div>

            </div>


            // TODO: Add tier 3 materials
            // TODO: add tier 2 materials
            // TODO: add tier 1 materials 




        );
    }

} export default MaterialTable;

