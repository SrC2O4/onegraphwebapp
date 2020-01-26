import React from 'react';
import './style.css';
import BaseComponent from "./../Base";
import { getT1Materials, getT2Materials, getT3Materials, getT4Materials, getT5Materials, getCatalyst} from '../../actions/material';
import {getState} from 'statezero'

class MaterialTable extends BaseComponent{
    
    filterState({t5Material, t4Material, t3Material, t2Material, t1Material, catalyst}){
         
        return {t5Material, t4Material, t3Material, t2Material, t1Material, catalyst};
    }
    // TODO: Replace those with the actual db queries
   
    render(){
           
        getT1Materials();      
        getT2Materials();
        getT3Materials();
        getT4Materials();
        getT5Materials(); 
        getCatalyst(); 

        return(
            // The 3 tier 5 materials
            <div className = 'outLayer'>
                <div className = 'catalyst'>
                    <img className = 'MT-4' src= {require('./static/'+'ESS-32001.png')}/>
                    <p className = 'CatalystValue'> {`${this.state.catalyst.golden_ticket_value}`}</p>
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
{/* 
                <div className = 'M4Materials'>
                {
                        this.state.t4Material.map((item) => {
                            if(this.state.t4Material.indexOf(item) == 0){
                                return (
                                    <div >
                                      
                                    </div>
                                    
                                    )
                            } else{
                                return (
                                <div className = {'M4Values'+item.Notes}>
                                <p>{`${item.golden_ticket_value}`}</p>
                                </div>
                                
                                )
                            }
                        } )
                    }
                </div> */}


            </div>


            // TODO: Add tier 3 materials
            // TODO: add tier 2 materials
            // TODO: add tier 1 materials 




        );
    }

} export default MaterialTable;

