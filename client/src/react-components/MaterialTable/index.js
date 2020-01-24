import React from 'react';
import './style.css';


class MaterialTable extends React.Component{
    // TODO: Replace those with the actual db queries
    t5Material = [{name:"D32钢", id:"30135"}, {name:"聚合剂", id:"30115"}, {name:"双极纳米片", id:"30125"}]
    t4Material = [{name:"RMA70-24", id:"30104"},{name:"三水锰矿", id:"30084"}, {id:"30094"}, {id:"30014"}]
    render(){
        return(
            // The 3 tier 5 materials
            <div className = 'outLayer'>
                <div className='M5Materials'>
                    {
                        this.t5Material.map((item) => {
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
                        this.t4Material.map((item) => {
                            return (
                            <div className = 'MT-4-wrapper'>
                                <img className = 'MT-4' src= {require('./static/'+'MT-'+item.id+'.png')}/>
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

