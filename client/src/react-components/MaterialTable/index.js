import React from 'react';
import './style.scss';
import BaseComponent from "./../Base";
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import StagesModal from "./../StagesModal";
import { setState } from 'statezero';
import api from '../../actions/api';
import { IconButton, TableContainer, Paper, Table, TableRow, TableCell, CircularProgress, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FormattedMessage } from 'react-intl';
import { Alert, AlertTitle } from '@material-ui/lab';

const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                backgroundColor: "rgba(255,255,255,0.1)"
            },
        },
    }
});

class MaterialTable extends BaseComponent {
 
    filterState({ t5Material, t4Material, t3Material, t2Material, t1Material, catalyst, gacha, plan, misc, considerEventStages, contingencyStore, eventType,
                detailMode, showBestOnly, stageModalOpen, itemToRender, animeOnce, orangeStore, server, lang,
                t5MaterialEN, t4MaterialEN, t3MaterialEN, t2MaterialEN, t1MaterialEN, catalystEN, gachaEN, planEN, miscEN, considerEventStagesEN, contingencyStoreEN, eventTypeEN,
                t5MaterialTW, t4MaterialTW, t3MaterialTW, t2MaterialTW, t1MaterialTW, catalystTW, gachaTW, planTW, miscTW, considerEventStagesTW, contingencyStoreTW, eventTypeTW
             }){
        return {
            t5Material, t4Material, t3Material, t2Material, t1Material, catalyst, gacha, plan, misc, detailMode, showBestOnly, stageModalOpen, itemToRender,
            considerEventStages, contingencyStore, eventType, animeOnce, orangeStore, server, lang,
            t5MaterialEN, t4MaterialEN, t3MaterialEN, t2MaterialEN, t1MaterialEN, catalystEN, gachaEN, planEN, miscEN, considerEventStagesEN, contingencyStoreEN, eventTypeEN,
            t5MaterialTW, t4MaterialTW, t3MaterialTW, t2MaterialTW, t1MaterialTW, catalystTW, gachaTW, planTW, miscTW, considerEventStagesTW, contingencyStoreTW, eventTypeTW}
    }

    //I know this is shooty but it works, whatever :0
    handleChange = name => event => {
        setState("itemToRender", name)
        setState("stageModalOpen", true)
    }

    async componentDidMount(){
        const serverList = ['CN','JP/EN/KR','TW'];
        //first,get the data for the currect server.
        await api.getTotal(this.state.server === 'JP/EN/KR' ? 'EN' : this.state.server)
        //then,get the data for the other server.
        serverList.filter(e => {return e !== this.state.server}).map(e => {
            return api.getTotal(e === 'JP/EN/KR' ? 'EN' : e)
        })
    }

    indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    dataLoading(server){
        let serverTag = ''

        if(server === 'CN'){
            serverTag = ''
        } else if(server === 'JP/EN/KR'){
            serverTag = 'EN'
        } else {
            serverTag = 'TW'
        }

        return (
            this.state['t4Material' + serverTag].length === 0 ||
            this.state['t3Material' + serverTag].length === 0 ||
            this.state['t1Material' + serverTag].length === 0 || 
            this.state['t2Material' + serverTag].length === 0 || 
            this.state['t5Material' + serverTag].length === 0 ||
            this.state['catalyst' + serverTag].length === 0 ||
            this.state['plan' + serverTag].length === 0 ||
            this.state['gacha' + serverTag].length === 0 ||
            this.state['misc' + serverTag].length === 0
        )
    }

    render() {

        if (this.dataLoading(this.state.server)) {
            return (
                <Modal
                    aria-labelledby="transition-modal-preloader"
                    className="modal2 modalBlur"
                    open={true}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                >
                    <Fade in={true}>
                        <div style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <CircularProgress color='secondary' />
                        </div>
                    </Fade>
                </Modal>)
        }
        
        if (this.state.server !== 'CN') {
            setState('orangeStore', false)
        }
        var currentData = {'t5':{},'t4':{},'t3':{}, 't2':{}, 't1':{}, 'catalyst':{}, 'gacha':{}, 'plan':{}, 'misc':{}, 
        'considerEventStages':false, 'contingencyStore':{}, 'eventType':''}
        console.log(this.state.server)
        if (this.state.server === 'TW') {
            currentData.t5 = this.state.t5MaterialTW
            currentData.t4 = this.state.t4MaterialTW
            currentData.t3 = this.state.t3MaterialTW
            currentData.t2 = this.state.t2MaterialTW
            currentData.t1 = this.state.t1MaterialTW
            currentData.catalyst = this.state.catalystTW
            currentData.gacha = this.state.gachaTW
            currentData.plan = this.state.planTW
            currentData.misc = this.state.miscTW
            currentData.considerEventStages = this.state.considerEventStagesTW
            currentData.contingencyStore = this.state.contingencyStoreTW
            currentData.eventType = this.state.eventTypeTW
        } else if (this.state.server === 'JP/EN/KR') {
            currentData.t5 = this.state.t5MaterialEN
            currentData.t4 = this.state.t4MaterialEN
            currentData.t3 = this.state.t3MaterialEN
            currentData.t2 = this.state.t2MaterialEN
            currentData.t1 = this.state.t1MaterialEN
            currentData.catalyst = this.state.catalystEN
            currentData.gacha = this.state.gachaEN
            currentData.plan = this.state.planEN
            currentData.misc = this.state.miscEN
            currentData.considerEventStages = this.state.considerEventStagesEN
            currentData.contingencyStore = this.state.contingencyStoreEN
            currentData.eventType = this.state.eventTypeEN
        } else{
            currentData.t5 = this.state.t5Material
            currentData.t4 = this.state.t4Material
            currentData.t3 = this.state.t3Material
            currentData.t2 = this.state.t2Material
            currentData.t1 = this.state.t1Material
            currentData.catalyst = this.state.catalyst
            currentData.gacha = this.state.gacha
            currentData.plan = this.state.plan
            currentData.misc = this.state.misc
            currentData.considerEventStages = this.state.considerEventStages
            currentData.contingencyStore = this.state.contingencyStore
            currentData.eventType = this.state.eventType
        }
        console.log('check')
        console.log(currentData.considerEventStages)
        console.log('bee pee')
        const finite_items = currentData.contingencyStore.filter(obj => obj.contingency_store_value.finite !== "0.0");
        const infinite_items = currentData.contingencyStore.filter(obj => obj.contingency_store_value.infinite !== "0.0");
        return (

            // The 3 tier 5 materials
            <MuiThemeProvider theme={theme}>
                <Alert severity="info"  >
                <AlertTitle>Info as Aug.17</AlertTitle>
                    We now have server difference and i18N translation. If you have any questions, feel free to join us in Discord!
                    (Check out the link at footer!)
                </Alert>
                <div className='outLayer'>
                    <h2 style={{ textAlign: "right", marginRight: "1%" }}><FormattedMessage id='last' />：{new Date(currentData.gacha.last_updated).toLocaleString()}</h2>
                    <TableContainer component={Paper} className="tableGrid">
                        <Table size="small" aria-label="spanning table">
                            <TableRow>
                                <TableCell />
                                <TableCell >
                                    <h3 className='textTips'> {this.state.orangeStore ? <strong style={{ color: 'orange' }}>[橙票商店]</strong> : <FormattedMessage id='yellowStore' />}</h3>
                                    <Tooltip title={<FormattedMessage id='32001' />} arrow>
                                        <span className='material material-ESS-32001 spriteMT-4'></span>
                                    </Tooltip>
                                    <p className='CatalystValue'> {currentData.considerEventStages ?currentData.catalyst.golden_ticket_value.event :currentData.catalyst.golden_ticket_value.normal}</p>
                                </TableCell>
                                <TableCell colSpan={3}>
                                    <h3 className='textTips'> {this.state.orangeStore ? <strong style={{ color: 'orange' }}>[橙票商店]</strong> : <FormattedMessage id='greenStore' />}</h3>
                                    <Tooltip title={<FormattedMessage id='7003' />} arrow>
                                        <span className='spriteMT-4 material material-GACHATICKET'></span>
                                    </Tooltip>
                                    <p className={'GachaValue'}> {currentData.considerEventStages ? currentData.gacha.green_ticket_value.event : currentData.gacha.green_ticket_value.normal}</p>
                                    <Tooltip title={<FormattedMessage id='7001' />} arrow>
                                        <span className='material material-MISC-7001 spriteMT-4'></span>
                                    </Tooltip>
                                    <p className={'PlanValue'}> {currentData.considerEventStages ? currentData.plan.green_ticket_value.event : currentData.plan.green_ticket_value.normal}</p>
                                </TableCell>
                                <TableCell rowSpan={4} >
                                    <h2 className='textTips'><FormattedMessage id='creditStore' /></h2>
                                </TableCell>
                                <TableCell colSpan={8} rowSpan={4} >
                                    <div>
                                        <h2 className='instructions'><FormattedMessage id='notes' /></h2>
                                        <p className='instructions'> <FormattedMessage id='noteText1' /><span style={{ color: '#d81b60e4' }}><FormattedMessage id='value' /><strong><FormattedMessage id='higher' /></strong>，<FormattedMessage id='worth' /></span></p>
                                        <p className='instructions'><FormattedMessage id='noteText2' /></p>
                                        <p style={{ color: '#d81b60e4' }} className='instructions'> <FormattedMessage id='noteText3' /></p>
                                        <p style={{ color: '#fb8c00e4' }} className='instructions'> <FormattedMessage id='noteText4' /></p>
                                        <p style={{ color: '#039be5e4' }} className='instructions'> <FormattedMessage id='noteText5' /></p>
                                        <p className='instructions'> <strong><FormattedMessage id='noteText6' /></strong></p>
                                    </div>
                                </TableCell>
                            </TableRow> {/*Catalyst ends*/}

                            {/* Read the matrix and then generate the table */}
                            {this.indices.map((i) => {
                                // First row -> D32
                                if (i === 0) {
                                    return (

                                        <TableRow>
                                            <TableCell rowSpan={3}>
                                                <Tooltip title={<FormattedMessage id={currentData.t5[0].id} />} arrow>
                                                    <span className={'material spriteMT-5 material-MT-' + currentData.t5[0].id}></span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t4[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t4[i].id}></span>
                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t4[i].orange_note && currentData.t4[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].orange_note.event : currentData.t4[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{currentData.considerEventStages ? currentData.t4[i].orange_store_value.event : currentData.t4[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].Notes.event : currentData.t4[i].Notes.normal)}>{currentData.considerEventStages ? currentData.t4[i].golden_ticket_value.event : currentData.t4[i].golden_ticket_value.normal}</p>}
                                            </TableCell>

                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t3[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t3[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t3[i].orange_note && currentData.t3[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].orange_note.event : currentData.t3[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${currentData.considerEventStages ? currentData.t3[i].orange_store_value.event : currentData.t3[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].Notes.event : currentData.t3[i].Notes.normal)}>{`${currentData.considerEventStages ? currentData.t3[i].green_ticket_value.event : currentData.t3[i].green_ticket_value.normal}`}</p>

                                                }

                                            </TableCell>
                                            <TableCell colSpan={2}>
                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).length === 0 && <h3 style={{ display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>{<FormattedMessage id='recommend' />}</h3>}

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='lowestAPStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                            </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].balanced_stages.event : currentData.t3[i].balanced_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                    </Tooltip>
                                                                )
                                                            })
                                                            }
                                                            <p className='balancedStage'>{stages.code}</p>
                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}

                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].drop_rate_first_stages.event : currentData.t3[i].drop_rate_first_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='dropRateFirstStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}
                                            </TableCell>


                                        </TableRow>


                                    )

                                }
                                // The 
                                else if (i === 3) {
                                    return (

                                        <TableRow>
                                            <TableCell rowSpan={3}>
                                                <Tooltip title={<FormattedMessage id={currentData.t5[1].id} />} arrow>
                                                    <span className={'material spriteMT-5 material-MT-' + currentData.t5[1].id}></span>

                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t4[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t4[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t4[i].orange_note && currentData.t4[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].orange_note.event : currentData.t4[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{currentData.considerEventStages ? currentData.t4[i].orange_store_value.event : currentData.t4[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].Notes.event : currentData.t4[i].Notes.normal)}>{currentData.considerEventStages ? currentData.t4[i].golden_ticket_value.event : currentData.t4[i].golden_ticket_value.normal}</p>
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t3[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t3[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t3[i].orange_note && currentData.t3[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].orange_note.event : currentData.t3[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${currentData.considerEventStages ? currentData.t3[i].orange_store_value.event : currentData.t3[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].Notes.event : currentData.t3[i].Notes.normal)}>{`${currentData.considerEventStages ? currentData.t3[i].green_ticket_value.event : currentData.t3[i].green_ticket_value.normal}`}</p>
                                                }


                                            </TableCell>
                                            <TableCell colSpan={2}>

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).length === 0 && <h3 style={{ display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>{<FormattedMessage id='recommend' />}</h3>}

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='lowestAPStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                            </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].balanced_stages.event : currentData.t3[i].balanced_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                    </Tooltip>
                                                                )
                                                            })
                                                            }
                                                            <p className='balancedStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}

                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].drop_rate_first_stages.event : currentData.t3[i].drop_rate_first_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='dropRateFirstStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}
                                            </TableCell>


                                            <TableCell colSpan={4}>
                                                <Tooltip title={<FormattedMessage id={currentData.t2[i - 3].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t2[i - 3].id} />
                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t2[i-3].orange_note && currentData.t2[i-3].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t2[i - 3].orange_note.event : currentData.t2[i - 3].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(currentData.considerEventStages ? currentData.t2[i - 3].orange_store_value.event : currentData.t2[i - 3].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t2[i - 3].Notes.event : currentData.t2[i - 3].Notes.normal)}>{`${(currentData.considerEventStages ? currentData.t2[i - 3].credit_store_value.event : currentData.t2[i - 3].credit_store_value.normal)}`}</p>
                                                }


                                                <div style={{ display: 'inline' }}>
                                                    {(currentData.considerEventStages ? currentData.t2[i - 3].lowest_ap_stages.event : currentData.t2[i - 3].lowest_ap_stages.normal).map((stages) => {
                                                        if ((currentData.considerEventStages ? currentData.t2[i - 3].lowest_ap_stages.event : currentData.t2[i - 3].lowest_ap_stages.normal).length >= 2) {
                                                            if ((currentData.considerEventStages ? currentData.t2[i - 3].lowest_ap_stages.event : currentData.t2[i - 3].lowest_ap_stages.normal).indexOf(stages) === 1) {
                                                                return (

                                                                    <div className='stageWrapper'>
                                                                        {stages.extra_drop.map((loots) => {
                                                                            return (
                                                                                <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                                    <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                                </Tooltip>)
                                                                        })
                                                                        }
                                                                        <p className='lowestAPStage'>{stages.code}</p>

                                                                        {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                            <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                        </div>}

                                                                        <Tooltip title={<FormattedMessage id='otherotherStages' />} arrow placement='top'>
                                                                            <IconButton>
                                                                                <KeyboardArrowRightIcon onClick={this.handleChange(currentData.t2[i - 3])} style={{ marginLeft: '25px' }} />
                                                                            </IconButton></Tooltip>
                                                                    </div>
                                                                )
                                                            }
                                                        }
                                                        return (
                                                            (currentData.considerEventStages ? currentData.t2[i - 3].lowest_ap_stages.event : currentData.t2[i - 3].lowest_ap_stages.normal).length < 2 &&
                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='lowestAPStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                </div>}
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t2[i - 3].balanced_stages.event : currentData.t2[i - 3].balanced_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='balancedStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}

                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t2[i - 3].drop_rate_first_stages.event : currentData.t2[i - 3].drop_rate_first_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='dropRateFirstStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </TableCell>


                                            <TableCell colSpan={5}>
                                                <Tooltip title={<FormattedMessage id={currentData.t1[i - 3].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t1[i - 3].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t1[i-3].orange_note && currentData.t1[i-3].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t1[i - 3].orange_note.event : currentData.t1[i - 3].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(currentData.considerEventStages ? currentData.t1[i - 3].orange_store_value.event : currentData.t1[i - 3].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t1[i - 3].Notes.event : currentData.t1[i - 3].Notes.normal)}>{`${(currentData.considerEventStages ? currentData.t1[i - 3].credit_store_value.event : currentData.t1[i - 3].credit_store_value.normal)}`}</p>
                                                }


                                                <div style={{ display: 'inline' }}>
                                                    {(currentData.considerEventStages ? currentData.t1[i - 3].lowest_ap_stages.event : currentData.t1[i - 3].lowest_ap_stages.normal).map((stages) => {
                                                        if ((currentData.considerEventStages ? currentData.t1[i - 3].lowest_ap_stages.event : currentData.t1[i - 3].lowest_ap_stages.normal).length >= 2) {
                                                            if ((currentData.considerEventStages ? currentData.t1[i - 3].lowest_ap_stages.event : currentData.t1[i - 3].lowest_ap_stages.normal).indexOf(stages) === 1) {
                                                                return (

                                                                    <div className='stageWrapper'>
                                                                        {stages.extra_drop.map((loots) => {
                                                                            return (
                                                                                <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                                    <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                                </Tooltip>)
                                                                        })
                                                                        }
                                                                        <p className='lowestAPStage'>{stages.code}</p>

                                                                        {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                            <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                        </div>}
                                                                        <Tooltip title={<FormattedMessage id='otherStages' />} arrow placement='top'>
                                                                            <IconButton>
                                                                                <KeyboardArrowRightIcon onClick={this.handleChange(currentData.t1[i - 3])} style={{ marginLeft: '25px' }} />
                                                                            </IconButton></Tooltip>
                                                                    </div>

                                                                )
                                                            }
                                                        }
                                                        return (
                                                            (currentData.considerEventStages ? currentData.t1[i - 3].lowest_ap_stages.event : currentData.t1[i - 3].lowest_ap_stages.normal).length < 2 &&
                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='lowestAPStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                </div>}
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t1[i - 3].balanced_stages.event : currentData.t1[i - 3].balanced_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='balancedStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}

                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t1[i - 3].drop_rate_first_stages.event : currentData.t1[i - 3].drop_rate_first_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='dropRateFirstStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

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
                                else if (i === 6) {
                                    return (

                                        <TableRow>
                                            <TableCell rowSpan={2}>
                                                <Tooltip title={<FormattedMessage id={currentData.t5[2].id} />} arrow>
                                                    <span className={'material spriteMT-5 material-MT-' + currentData.t5[2].id}></span>

                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t4[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t4[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t4[i].orange_note && currentData.t4[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].orange_note.event : currentData.t4[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{currentData.considerEventStages ? currentData.t4[i].orange_store_value.event : currentData.t4[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].Notes.event : currentData.t4[i].Notes.normal)}>{currentData.considerEventStages ? currentData.t4[i].golden_ticket_value.event : currentData.t4[i].golden_ticket_value.normal}</p>
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t3[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t3[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t3[i].orange_note && currentData.t3[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].orange_note.event : currentData.t3[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${currentData.considerEventStages ? currentData.t3[i].orange_store_value.event : currentData.t3[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].Notes.event : currentData.t3[i].Notes.normal)}>{`${currentData.considerEventStages ? currentData.t3[i].green_ticket_value.event : currentData.t3[i].green_ticket_value.normal}`}</p>
                                                }


                                            </TableCell>
                                            <TableCell colSpan={2}>

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).length === 0 && <h3 style={{ display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>{<FormattedMessage id='recommend' />}</h3>}

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='lowestAPStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                            </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].balanced_stages.event : currentData.t3[i].balanced_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                    </Tooltip>
                                                                )
                                                            })
                                                            }
                                                            <p className='balancedStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}

                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].drop_rate_first_stages.event : currentData.t3[i].drop_rate_first_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='dropRateFirstStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}
                                            </TableCell>


                                            <TableCell colSpan={4}>
                                                <Tooltip title={<FormattedMessage id={currentData.t2[i - 3].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t2[i - 3].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t2[i-3].orange_note && currentData.t2[i-3].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t2[i - 3].orange_note.event : currentData.t2[i - 3].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(currentData.considerEventStages ? currentData.t2[i - 3].orange_store_value.event : currentData.t2[i - 3].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t2[i - 3].Notes.event : currentData.t2[i - 3].Notes.normal)}>{`${(currentData.considerEventStages ? currentData.t2[i - 3].credit_store_value.event : currentData.t2[i - 3].credit_store_value.normal)}`}</p>
                                                }


                                                <div style={{ display: 'inline' }}>
                                                    {(currentData.considerEventStages ? currentData.t2[i - 3].lowest_ap_stages.event : currentData.t2[i - 3].lowest_ap_stages.normal).map((stages) => {
                                                        if ((currentData.considerEventStages ? currentData.t2[i - 3].lowest_ap_stages.event : currentData.t2[i - 3].lowest_ap_stages.normal).length >= 2) {
                                                            if ((currentData.considerEventStages ? currentData.t2[i - 3].lowest_ap_stages.event : currentData.t2[i - 3].lowest_ap_stages.normal).indexOf(stages) === 1) {
                                                                return (

                                                                    <div className='stageWrapper'>
                                                                        {stages.extra_drop.map((loots) => {
                                                                            return (
                                                                                <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                                    <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                                </Tooltip>)
                                                                        })
                                                                        }
                                                                        <p className='lowestAPStage'>{stages.code}</p>

                                                                        {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                            <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                        </div>}

                                                                        <Tooltip title={<FormattedMessage id='otherStages' />} arrow placement='top'>
                                                                            <IconButton>
                                                                                <KeyboardArrowRightIcon onClick={this.handleChange(currentData.t2[i - 3])} style={{ marginLeft: '25px' }} />
                                                                            </IconButton></Tooltip>
                                                                    </div>
                                                                )
                                                            }
                                                        }
                                                        return (
                                                            (currentData.considerEventStages ? currentData.t2[i - 3].lowest_ap_stages.event : currentData.t2[i - 3].lowest_ap_stages.normal).length < 2 &&
                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='lowestAPStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                </div>}
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t2[i - 3].balanced_stages.event : currentData.t2[i - 3].balanced_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='balancedStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}

                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t2[i - 3].drop_rate_first_stages.event : currentData.t2[i - 3].drop_rate_first_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='dropRateFirstStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </TableCell>


                                            <TableCell colSpan={5}>
                                                <Tooltip title={<FormattedMessage id={currentData.t1[i - 3].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t1[i - 3].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t1[i-3].orange_note && currentData.t1[i-3].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t1[i - 3].orange_note.event : currentData.t1[i - 3].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(currentData.considerEventStages ? currentData.t1[i - 3].orange_store_value.event : currentData.t1[i - 3].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t1[i - 3].Notes.event : currentData.t1[i - 3].Notes.normal)}>{`${(currentData.considerEventStages ? currentData.t1[i - 3].credit_store_value.event : currentData.t1[i - 3].credit_store_value.normal)}`}</p>
                                                }


                                                <div style={{ display: 'inline' }}>
                                                    {(currentData.considerEventStages ? currentData.t1[i - 3].lowest_ap_stages.event : currentData.t1[i - 3].lowest_ap_stages.normal).map((stages) => {
                                                        if ((currentData.considerEventStages ? currentData.t1[i - 3].lowest_ap_stages.event : currentData.t1[i - 3].lowest_ap_stages.normal).length >= 2) {
                                                            if ((currentData.considerEventStages ? currentData.t1[i - 3].lowest_ap_stages.event : currentData.t1[i - 3].lowest_ap_stages.normal).indexOf(stages) === 1) {
                                                                return (

                                                                    <div className='stageWrapper'>
                                                                        {stages.extra_drop.map((loots) => {
                                                                            return (
                                                                                <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                                    <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                                </Tooltip>)
                                                                        })
                                                                        }
                                                                        <p className='lowestAPStage'>{stages.code}</p>

                                                                        {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                            <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                        </div>}
                                                                        <Tooltip title={<FormattedMessage id='otherStages' />} arrow placement='top'>
                                                                            <IconButton>
                                                                                <KeyboardArrowRightIcon onClick={this.handleChange(currentData.t1[i - 3])} style={{ marginLeft: '25px' }} />
                                                                            </IconButton></Tooltip>
                                                                    </div>

                                                                )
                                                            }
                                                        }
                                                        return (
                                                            (currentData.considerEventStages ? currentData.t1[i - 3].lowest_ap_stages.event : currentData.t1[i - 3].lowest_ap_stages.normal).length < 2 &&
                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='lowestAPStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                </div>}
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t1[i - 3].balanced_stages.event : currentData.t1[i - 3].balanced_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>

                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='balancedStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}

                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t1[i - 3].drop_rate_first_stages.event : currentData.t1[i - 3].drop_rate_first_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='dropRateFirstStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

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
                                else if (i === 7) {
                                    return (

                                        <TableRow>
                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t4[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t4[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t4[i].orange_note && currentData.t4[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].orange_note.event : currentData.t4[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{currentData.considerEventStages ? currentData.t4[i].orange_store_value.event : currentData.t4[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].Notes.event : currentData.t4[i].Notes.normal)}>{currentData.considerEventStages ? currentData.t4[i].golden_ticket_value.event : currentData.t4[i].golden_ticket_value.normal}</p>
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t3[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t3[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t3[i].orange_note && currentData.t3[i].orange_store_value) ? <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].orange_note.event : currentData.t3[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${currentData.considerEventStages ? currentData.t3[i].orange_store_value.event : currentData.t3[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].Notes.event : currentData.t3[i].Notes.normal)}>{`${currentData.considerEventStages ? currentData.t3[i].green_ticket_value.event : currentData.t3[i].green_ticket_value.normal}`}</p>
                                                }


                                            </TableCell>
                                            <TableCell colSpan={2}>

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).length === 0 && <h3 style={{ display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>{<FormattedMessage id='recommend' />}</h3>}

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='lowestAPStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                            </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].balanced_stages.event : currentData.t3[i].balanced_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>
                                                                )
                                                            })
                                                            }
                                                            <p className='balancedStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}

                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].drop_rate_first_stages.event : currentData.t3[i].drop_rate_first_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='dropRateFirstStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}
                                            </TableCell>


                                        </TableRow>


                                    )

                                }
                                //Other t4 material that does not involve in upper synthesis
                                else if (i === 8) {
                                    return (
                                        <TableRow>
                                            <TableCell rowSpan={4} />
                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t4[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t4[i].id}></span>


                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t4[i].orange_note && currentData.t4[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].orange_note.event : currentData.t4[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{currentData.considerEventStages ? currentData.t4[i].orange_store_value.event : currentData.t4[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p> :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].Notes.event : currentData.t4[i].Notes.normal)}>{currentData.considerEventStages ? currentData.t4[i].golden_ticket_value.event : currentData.t4[i].golden_ticket_value.normal}</p>
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t3[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t3[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t3[i].orange_note && currentData.t3[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].orange_note.event : currentData.t3[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${currentData.considerEventStages ? currentData.t3[i].orange_store_value.event : currentData.t3[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p> :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].Notes.event : currentData.t3[i].Notes.normal)}>{`${currentData.considerEventStages ? currentData.t3[i].green_ticket_value.event : currentData.t3[i].green_ticket_value.normal}`}</p>
                                                }


                                            </TableCell>
                                            <TableCell colSpan={2}>

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).length === 0 && <h3 style={{ display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>{<FormattedMessage id='recommend' />}</h3>}

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='lowestAPStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                            </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].balanced_stages.event : currentData.t3[i].balanced_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>
                                                                )
                                                            })
                                                            }
                                                            <p className='balancedStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}

                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].drop_rate_first_stages.event : currentData.t3[i].drop_rate_first_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='dropRateFirstStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}
                                            </TableCell>


                                            <TableCell colSpan={4}>
                                                <Tooltip title={<FormattedMessage id={currentData.t2[i - 4].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t2[i - 4].id} />
                                                    {/* <img alt = "" className = 'spriteMT-4' src= {require('./static/MT-'+currentData.t2[i-4].id+'.png')}/> */}
                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t2[i-4].orange_note && currentData.t2[i-4].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t2[i - 4].orange_note.event : currentData.t2[i - 4].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(currentData.considerEventStages ? currentData.t2[i - 4].orange_store_value.event : currentData.t2[i - 4].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t2[i - 4].Notes.event : currentData.t2[i - 4].Notes.normal)}>{`${currentData.considerEventStages ? currentData.t2[i - 4].credit_store_value.event : currentData.t2[i - 4].credit_store_value.normal}`}</p>
                                                }


                                                <div style={{ display: 'inline' }}>
                                                    {(currentData.considerEventStages ? currentData.t2[i - 4].lowest_ap_stages.event : currentData.t2[i - 4].lowest_ap_stages.normal).map((stages) => {
                                                        if ((currentData.considerEventStages ? currentData.t2[i - 4].lowest_ap_stages.event : currentData.t2[i - 4].lowest_ap_stages.normal).length >= 2) {
                                                            if ((currentData.considerEventStages ? currentData.t2[i - 4].lowest_ap_stages.event : currentData.t2[i - 4].lowest_ap_stages.normal).indexOf(stages) === 1) {
                                                                return (

                                                                    <div className='stageWrapper'>
                                                                        {stages.extra_drop.map((loots) => {
                                                                            return (
                                                                                <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                                    <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                                </Tooltip>)
                                                                        })
                                                                        }
                                                                        <p className='lowestAPStage'>{stages.code}</p>

                                                                        {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                            <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                        </div>}

                                                                        <Tooltip title={<FormattedMessage id='otherStages' />} arrow placement='top'>
                                                                            <IconButton>
                                                                                <KeyboardArrowRightIcon onClick={this.handleChange(currentData.t2[i - 4])} style={{ marginLeft: '25px' }} />
                                                                            </IconButton></Tooltip>
                                                                    </div>
                                                                )
                                                            }
                                                        }
                                                        return (
                                                            (currentData.considerEventStages ? currentData.t2[i - 4].lowest_ap_stages.event : currentData.t2[i - 4].lowest_ap_stages.normal).length < 2 &&
                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='lowestAPStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                </div>}
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t2[i - 4].balanced_stages.event : currentData.t2[i - 4].balanced_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='balancedStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}

                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t2[i - 4].drop_rate_first_stages.event : currentData.t2[i - 4].drop_rate_first_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='dropRateFirstStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </TableCell>


                                            <TableCell colSpan={5}>
                                                <Tooltip title={<FormattedMessage id={currentData.t1[i - 4].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t1[i - 4].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t1[i-4].orange_note && currentData.t1[i-4].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t1[i - 4].orange_note.event : currentData.t1[i - 4].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(currentData.considerEventStages ? currentData.t1[i - 4].orange_store_value.event : currentData.t1[i - 4].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t1[i - 4].Notes.event : currentData.t1[i - 4].Notes.normal)}>{`${(currentData.considerEventStages ? currentData.t1[i - 4].credit_store_value.event : currentData.t1[i - 4].credit_store_value.normal)}`}</p>
                                                }


                                                <div style={{ display: 'inline' }}>
                                                    {(currentData.considerEventStages ? currentData.t1[i - 4].lowest_ap_stages.event : currentData.t1[i - 4].lowest_ap_stages.normal).map((stages) => {
                                                        if ((currentData.considerEventStages ? currentData.t1[i - 4].lowest_ap_stages.event : currentData.t1[i - 4].lowest_ap_stages.normal).length >= 2) {
                                                            if ((currentData.considerEventStages ? currentData.t1[i - 4].lowest_ap_stages.event : currentData.t1[i - 4].lowest_ap_stages.normal).indexOf(stages) === 1) {
                                                                return (

                                                                    <div className='stageWrapper'>
                                                                        {stages.extra_drop.map((loots) => {
                                                                            return (
                                                                                <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                                    <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                                </Tooltip>)
                                                                        })
                                                                        }
                                                                        <p className='lowestAPStage'>{stages.code}</p>

                                                                        {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                            <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                        </div>}
                                                                        <Tooltip title={<FormattedMessage id='otherStages' />} arrow placement='top'>
                                                                            <IconButton>
                                                                                <KeyboardArrowRightIcon onClick={this.handleChange(currentData.t1[i - 4])} style={{ marginLeft: '25px' }} />
                                                                            </IconButton></Tooltip>
                                                                    </div>

                                                                )
                                                            }
                                                        }
                                                        return (
                                                            (currentData.considerEventStages ? currentData.t1[i - 4].lowest_ap_stages.event : currentData.t1[i - 4].lowest_ap_stages.normal).length < 2 &&
                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='lowestAPStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                </div>}
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t1[i - 4].balanced_stages.event : currentData.t1[i - 4].balanced_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='balancedStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}

                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t1[i - 4].drop_rate_first_stages.event : currentData.t1[i - 4].drop_rate_first_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='dropRateFirstStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}
                                                </div>


                                            </TableCell>


                                        </TableRow>


                                    )

                                } else if (i < 3) {
                                    return (

                                        <TableRow>

                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t4[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t4[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t4[i].orange_note && currentData.t4[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].orange_note.event : currentData.t4[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{currentData.considerEventStages ? currentData.t4[i].orange_store_value.event : currentData.t4[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].Notes.event : currentData.t4[i].Notes.normal)}>{currentData.considerEventStages ? currentData.t4[i].golden_ticket_value.event : currentData.t4[i].golden_ticket_value.normal}</p>
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t3[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t3[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t3[i].orange_note && currentData.t3[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].orange_note.event : currentData.t3[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${currentData.considerEventStages ? currentData.t3[i].orange_store_value.event : currentData.t3[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].Notes.event : currentData.t3[i].Notes.normal)}>{`${currentData.considerEventStages ? currentData.t3[i].green_ticket_value.event : currentData.t3[i].green_ticket_value.normal}`}</p>
                                                }


                                            </TableCell>
                                            <TableCell colSpan={2}>

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).length === 0 && <h3 style={{ display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>{<FormattedMessage id='recommend' />}</h3>}

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='lowestAPStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                            </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].balanced_stages.event : currentData.t3[i].balanced_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>
                                                                )
                                                            })
                                                            }
                                                            <p className='balancedStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}

                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].drop_rate_first_stages.event : currentData.t3[i].drop_rate_first_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='dropRateFirstStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}
                                            </TableCell>


                                        </TableRow>


                                    )

                                } else if (i > 10) {
                                    return (

                                        <TableRow>
                                            {this.state.server === 'TW'  && <TableCell colSpan= {4}></TableCell>
                                            }
                                            {this.state.server !== 'TW' && <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t4[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t4[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t4[i].orange_note && currentData.t4[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].orange_note.event : currentData.t4[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{currentData.considerEventStages ? currentData.t4[i].orange_store_value.event : currentData.t4[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].Notes.event : currentData.t4[i].Notes.normal)}>{currentData.considerEventStages ? currentData.t4[i].golden_ticket_value.event : currentData.t4[i].golden_ticket_value.normal}</p>
                                                }
                                            </TableCell>}

                                            {this.state.server !== 'TW' && <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t3[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t3[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t3[i].orange_note && currentData.t3[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].orange_note.event : currentData.t3[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${currentData.considerEventStages ? currentData.t3[i].orange_store_value.event : currentData.t3[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].Notes.event : currentData.t3[i].Notes.normal)}>{`${currentData.considerEventStages ? currentData.t3[i].green_ticket_value.event : currentData.t3[i].green_ticket_value.normal}`}</p>
                                                }
                                            </TableCell>
                                            }
                                            {this.state.server !== 'TW' &&<TableCell colSpan={2}>

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).length === 0 && <h3 style={{ display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>{<FormattedMessage id='recommend' />}</h3>}

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='lowestAPStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                            </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].balanced_stages.event : currentData.t3[i].balanced_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>
                                                                )
                                                            })
                                                            }
                                                            <p className='balancedStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}

                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].drop_rate_first_stages.event : currentData.t3[i].drop_rate_first_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='dropRateFirstStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}
                                            </TableCell>}


                                        </TableRow>


                                    )

                                } else if (i === 10) {
                                    return (

                                        <TableRow>
                                            {this.state.server === 'TW'  && <TableCell colSpan= {4}></TableCell>
                                            }
                                            {this.state.server !== 'TW' && <TableCell >
                                                <Tooltip title={<FormattedMessage id={currentData.t4[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t4[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t4[i].orange_note && currentData.t4[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].orange_note.event : currentData.t4[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{currentData.considerEventStages ? currentData.t4[i].orange_store_value.event : currentData.t4[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].Notes.event : currentData.t4[i].Notes.normal)}>{currentData.considerEventStages ? currentData.t4[i].golden_ticket_value.event : currentData.t4[i].golden_ticket_value.normal}</p>
                                                }
                                            </TableCell>}

                                            {this.state.server !== 'TW' &&<TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t3[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t3[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t3[i].orange_note && currentData.t3[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].orange_note.event : currentData.t3[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${currentData.considerEventStages ? currentData.t3[i].orange_store_value.event : currentData.t3[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].Notes.event : currentData.t3[i].Notes.normal)}>{`${currentData.considerEventStages ? currentData.t3[i].green_ticket_value.event : currentData.t3[i].green_ticket_value.normal}`}</p>
                                                }


                                            </TableCell>
                                            }
                                            {this.state.server !== 'TW' &&<TableCell colSpan={2}>

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).length === 0 && <h3 style={{ display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>{<FormattedMessage id='recommend' />}</h3>}

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='lowestAPStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                            </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].balanced_stages.event : currentData.t3[i].balanced_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>
                                                                )
                                                            })
                                                            }
                                                            <p className='balancedStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}

                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].drop_rate_first_stages.event : currentData.t3[i].drop_rate_first_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='dropRateFirstStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}
                                            </TableCell>}

                                            {
                                                currentData.misc.map((item) => {
                                                    return (
                                                        <TableCell rowSpan={2}>
                                                            <Tooltip title={<FormattedMessage id={item.id} />} arrow>
                                                                <span className={'spriteMT-4 material material-MISC-' + item.id}></span>

                                                            </Tooltip>
                                                            <p className={'CreditValue' + (currentData.considerEventStages ? item.Notes.event : item.Notes.normal)}>{currentData.considerEventStages ? item.credit_store_value.event : item.credit_store_value.normal}</p>
                                                        </TableCell>

                                                    )
                                                })
                                            }

                                        </TableRow>


                                    )

                                } else if (i === 4 || i === 5) {
                                    return (
                                        <TableRow>
                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t4[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t4[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t4[i].orange_note && currentData.t4[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].orange_note.event : currentData.t4[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{currentData.considerEventStages ? currentData.t4[i].orange_store_value.event : currentData.t4[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].Notes.event : currentData.t4[i].Notes.normal)}>{currentData.considerEventStages ? currentData.t4[i].golden_ticket_value.event : currentData.t4[i].golden_ticket_value.normal}</p>
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t3[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t3[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t3[i].orange_note && currentData.t3[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].orange_note.event : currentData.t3[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${currentData.considerEventStages ? currentData.t3[i].orange_store_value.event : currentData.t3[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].Notes.event : currentData.t3[i].Notes.normal)}>{`${currentData.considerEventStages ? currentData.t3[i].green_ticket_value.event : currentData.t3[i].green_ticket_value.normal}`}</p>
                                                }


                                            </TableCell>
                                            <TableCell colSpan={2}>

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).length === 0 && <h3 style={{ display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>{<FormattedMessage id='recommend' />}</h3>}

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='lowestAPStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                            </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].balanced_stages.event : currentData.t3[i].balanced_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>
                                                                )
                                                            })
                                                            }
                                                            <p className='balancedStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}

                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].drop_rate_first_stages.event : currentData.t3[i].drop_rate_first_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='dropRateFirstStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}
                                            </TableCell>


                                            <TableCell colSpan={4}>
                                                <Tooltip title={<FormattedMessage id={currentData.t2[i - 3].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t2[i - 3].id} />
                                                    {/* <img alt = "" className = 'spriteMT-4' src= {require('./static/MT-'+currentData.t2[i-3].id+'.png')}/> */}
                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t2[i-3].orange_note && currentData.t2[i-3].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t2[i - 3].orange_note.event : currentData.t2[i - 3].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(currentData.considerEventStages ? currentData.t2[i - 3].orange_store_value.event : currentData.t2[i - 3].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t2[i - 3].Notes.event : currentData.t2[i - 3].Notes.normal)}>{`${(currentData.considerEventStages ? currentData.t2[i - 3].credit_store_value.event : currentData.t2[i - 3].credit_store_value.normal)}`}</p>
                                                }


                                                <div style={{ display: 'inline' }}>
                                                    {(currentData.considerEventStages ? currentData.t2[i - 3].lowest_ap_stages.event : currentData.t2[i - 3].lowest_ap_stages.normal).map((stages) => {
                                                        if ((currentData.considerEventStages ? currentData.t2[i - 3].lowest_ap_stages.event : currentData.t2[i - 3].lowest_ap_stages.normal).length >= 2) {
                                                            if ((currentData.considerEventStages ? currentData.t2[i - 3].lowest_ap_stages.event : currentData.t2[i - 3].lowest_ap_stages.normal).indexOf(stages) === 1) {
                                                                return (

                                                                    <div className='stageWrapper'>
                                                                        {stages.extra_drop.map((loots) => {
                                                                            return (
                                                                                <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                                    <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                                </Tooltip>)
                                                                        })
                                                                        }
                                                                        <p className='lowestAPStage'>{stages.code}</p>

                                                                        {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                            <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                        </div>}

                                                                        <Tooltip title={<FormattedMessage id='otherStages' />} arrow placement='top'>
                                                                            <IconButton>
                                                                                <KeyboardArrowRightIcon onClick={this.handleChange(currentData.t2[i - 3])} style={{ marginLeft: '25px' }} />
                                                                            </IconButton></Tooltip>
                                                                    </div>
                                                                )
                                                            }
                                                        }
                                                        return (
                                                            (currentData.considerEventStages ? currentData.t2[i - 3].lowest_ap_stages.event : currentData.t2[i - 3].lowest_ap_stages.normal).length < 2 &&
                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='lowestAPStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                </div>}
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t2[i - 3].balanced_stages.event : currentData.t2[i - 3].balanced_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='balancedStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}

                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t2[i - 3].drop_rate_first_stages.event : currentData.t2[i - 3].drop_rate_first_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='dropRateFirstStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </TableCell>


                                            <TableCell colSpan={5}>
                                                <Tooltip title={<FormattedMessage id={currentData.t1[i - 3].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t1[i - 3].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t1[i-3].orange_note && currentData.t1[i-3].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t1[i - 3].orange_note.event : currentData.t1[i - 3].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(currentData.considerEventStages ? currentData.t1[i - 3].orange_store_value.event : currentData.t1[i - 3].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t1[i - 3].Notes.event : currentData.t1[i - 3].Notes.normal)}>{`${(currentData.considerEventStages ? currentData.t1[i - 3].credit_store_value.event : currentData.t1[i - 3].credit_store_value.normal)}`}</p>
                                                }


                                                <div style={{ display: 'inline' }}>
                                                    {(currentData.considerEventStages ? currentData.t1[i - 3].lowest_ap_stages.event : currentData.t1[i - 3].lowest_ap_stages.normal).map((stages) => {
                                                        if ((currentData.considerEventStages ? currentData.t1[i - 3].lowest_ap_stages.event : currentData.t1[i - 3].lowest_ap_stages.normal).length >= 2) {
                                                            if ((currentData.considerEventStages ? currentData.t1[i - 3].lowest_ap_stages.event : currentData.t1[i - 3].lowest_ap_stages.normal).indexOf(stages) === 1) {
                                                                return (

                                                                    <div className='stageWrapper'>
                                                                        {stages.extra_drop.map((loots) => {
                                                                            return (
                                                                                <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                                    <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                                </Tooltip>)
                                                                        })
                                                                        }
                                                                        <p className='lowestAPStage'>{stages.code}</p>

                                                                        {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                            <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                        </div>}
                                                                        <Tooltip title={<FormattedMessage id='otherStages' />} arrow placement='top'>
                                                                            <IconButton>
                                                                                <KeyboardArrowRightIcon onClick={this.handleChange(currentData.t1[i - 3])} style={{ marginLeft: '25px' }} />
                                                                            </IconButton></Tooltip>
                                                                    </div>

                                                                )
                                                            }
                                                        }
                                                        return (
                                                            (currentData.considerEventStages ? currentData.t1[i - 3].lowest_ap_stages.event : currentData.t1[i - 3].lowest_ap_stages.normal).length < 2 &&
                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='lowestAPStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                </div>}
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t1[i - 3].balanced_stages.event : currentData.t1[i - 3].balanced_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='balancedStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}

                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t1[i - 3].drop_rate_first_stages.event : currentData.t1[i - 3].drop_rate_first_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='dropRateFirstStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}
                                                </div>


                                            </TableCell>


                                        </TableRow>


                                    )

                                } else {
                                    return (
                                        <TableRow>
                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t4[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t4[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t4[i].orange_note && currentData.t4[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].orange_note.event : currentData.t4[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{currentData.considerEventStages ? currentData.t4[i].orange_store_value.event : currentData.t4[i].orange_store_value.normal}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t4[i].Notes.event : currentData.t4[i].Notes.normal)}>{currentData.considerEventStages ? currentData.t4[i].golden_ticket_value.event : currentData.t4[i].golden_ticket_value.normal}</p>
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={currentData.t3[i].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t3[i].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t3[i].orange_note && currentData.t3[i].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].orange_note.event : currentData.t3[i].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${currentData.considerEventStages ? currentData.t3[i].orange_store_value.event : currentData.t3[i].orange_store_value.normal}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t3[i].Notes.event : currentData.t3[i].Notes.normal)}>{`${currentData.considerEventStages ? currentData.t3[i].green_ticket_value.event : currentData.t3[i].green_ticket_value.normal}`}</p>
                                                }


                                            </TableCell>
                                            <TableCell colSpan={2}>

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).length === 0 && <h3 style={{ display: 'inline', whiteSpace: 'nowrap' }} className='textTips'>{<FormattedMessage id='recommend' />}</h3>}

                                                {(currentData.considerEventStages ? currentData.t3[i].lowest_ap_stages.event : currentData.t3[i].lowest_ap_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='lowestAPStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                            </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].balanced_stages.event : currentData.t3[i].balanced_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>
                                                                )
                                                            })
                                                            }
                                                            <p className='balancedStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}

                                                {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t3[i].drop_rate_first_stages.event : currentData.t3[i].drop_rate_first_stages.normal).map((stages) => {
                                                    return (
                                                        <div className='stageWrapper'>
                                                            {stages.extra_drop.map((loots) => {
                                                                return (
                                                                    <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                        <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                    </Tooltip>)
                                                            })
                                                            }
                                                            <p className='dropRateFirstStage'>{stages.code}</p>

                                                            {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                            </div>}
                                                        </div>
                                                    )
                                                })}
                                            </TableCell>


                                            <TableCell colSpan={4}>
                                                <Tooltip title={<FormattedMessage id={currentData.t2[i - 4].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t2[i - 4].id} />

                                                    {/* <img alt = "" className = 'spriteMT-4' src= {require('./static/MT-'+currentData.t2[i-4].id+'.png')}/> */}
                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t2[i-4].orange_note && currentData.t2[i-4].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t2[i - 4].orange_note.event : currentData.t2[i - 4].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(currentData.considerEventStages ? currentData.t2[i - 4].orange_store_value.event : currentData.t2[i - 4].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t2[i - 4].Notes.event : currentData.t2[i - 4].Notes.normal)}>{`${currentData.considerEventStages ? currentData.t2[i - 4].credit_store_value.event : currentData.t2[i - 4].credit_store_value.normal}`}</p>
                                                }
                                                <div style={{ display: 'inline' }}>
                                                    {(currentData.considerEventStages ? currentData.t2[i - 4].lowest_ap_stages.event : currentData.t2[i - 4].lowest_ap_stages.normal).map((stages) => {
                                                        if ((currentData.considerEventStages ? currentData.t2[i - 4].lowest_ap_stages.event : currentData.t2[i - 4].lowest_ap_stages.normal).length >= 2) {
                                                            if ((currentData.considerEventStages ? currentData.t2[i - 4].lowest_ap_stages.event : currentData.t2[i - 4].lowest_ap_stages.normal).indexOf(stages) === 1) {
                                                                return (

                                                                    <div className='stageWrapper'>
                                                                        {stages.extra_drop.map((loots) => {
                                                                            return (
                                                                                <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                                    <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                                </Tooltip>)
                                                                        })
                                                                        }
                                                                        <p className='lowestAPStage'>{stages.code}</p>

                                                                        {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                            <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                        </div>}

                                                                        <Tooltip title={<FormattedMessage id='otherStages' />} arrow placement='top'>
                                                                            <IconButton>
                                                                                <KeyboardArrowRightIcon onClick={this.handleChange(currentData.t2[i - 4])} style={{ marginLeft: '25px' }} />
                                                                            </IconButton></Tooltip>
                                                                    </div>
                                                                )
                                                            }
                                                        }
                                                        return (
                                                            (currentData.considerEventStages ? currentData.t2[i - 4].lowest_ap_stages.event : currentData.t2[i - 4].lowest_ap_stages.normal).length < 2 &&
                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='lowestAPStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                </div>}
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t2[i - 4].balanced_stages.event : currentData.t2[i - 4].balanced_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='balancedStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}

                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t2[i - 4].drop_rate_first_stages.event : currentData.t2[i - 4].drop_rate_first_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='dropRateFirstStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </TableCell>


                                            <TableCell colSpan={5}>
                                                <Tooltip title={<FormattedMessage id={currentData.t1[i - 4].id} />} arrow>
                                                    <span className={'material spriteMT-4 material-MT-' + currentData.t1[i - 4].id}></span>

                                                </Tooltip>
                                                {(this.state.orangeStore && currentData.t1[i-4].orange_note && currentData.t1[i-4].orange_store_value) ?
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t1[i - 4].orange_note.event : currentData.t1[i - 4].orange_note.normal)}><strong style={{ color: 'orange' }}>[</strong>{`${(currentData.considerEventStages ? currentData.t1[i - 4].orange_store_value.event : currentData.t1[i - 4].orange_store_value.normal)}`}<strong style={{ color: 'orange' }}>]</strong></p>
                                                    :
                                                    <p className={'M4Values' + (currentData.considerEventStages ? currentData.t1[i - 4].Notes.event : currentData.t1[i - 4].Notes.normal)}>{`${(currentData.considerEventStages ? currentData.t1[i - 4].credit_store_value.event : currentData.t1[i - 4].credit_store_value.normal)}`}</p>
                                                }
                                                <div style={{ display: 'inline' }}>
                                                    {(currentData.considerEventStages ? currentData.t1[i - 4].lowest_ap_stages.event : currentData.t1[i - 4].lowest_ap_stages.normal).map((stages) => {
                                                        if ((currentData.considerEventStages ? currentData.t1[i - 4].lowest_ap_stages.event : currentData.t1[i - 4].lowest_ap_stages.normal).length >= 2) {
                                                            if ((currentData.considerEventStages ? currentData.t1[i - 4].lowest_ap_stages.event : currentData.t1[i - 4].lowest_ap_stages.normal).indexOf(stages) === 1) {
                                                                return (

                                                                    <div className='stageWrapper'>
                                                                        {stages.extra_drop.map((loots) => {
                                                                            return (
                                                                                <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                                    <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                                </Tooltip>)
                                                                        })
                                                                        }
                                                                        <p className='lowestAPStage'>{stages.code}</p>

                                                                        {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                            <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                            <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                        </div>}
                                                                        <Tooltip title={<FormattedMessage id='otherStages' />} arrow placement='top'>
                                                                            <IconButton>
                                                                                <KeyboardArrowRightIcon onClick={this.handleChange(currentData.t1[i - 4])} style={{ marginLeft: '25px' }} />
                                                                            </IconButton></Tooltip>
                                                                    </div>

                                                                )
                                                            }
                                                        }
                                                        return (
                                                            (currentData.considerEventStages ? currentData.t1[i - 4].lowest_ap_stages.event : currentData.t1[i - 4].lowest_ap_stages.normal).length < 2 &&
                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='lowestAPStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>
                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='lowestAPStageDetails'>{stages.ap_per_item}</p></span></Tooltip>
                                                                </div>}
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t1[i - 4].balanced_stages.event : currentData.t1[i - 4].balanced_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='balancedStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='balancedStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

                                                                </div>}
                                                            </div>
                                                        )
                                                    })}

                                                    {!this.state.showBestOnly && (currentData.considerEventStages ? currentData.t1[i - 4].drop_rate_first_stages.event : currentData.t1[i - 4].drop_rate_first_stages.normal).map((stages) => {
                                                        return (

                                                            <div className='stageWrapper'>
                                                                {stages.extra_drop.map((loots) => {
                                                                    return (
                                                                        <Tooltip title={<span><FormattedMessage id='extraDrop' />: <FormattedMessage id={loots.id} /></span>} arrow>
                                                                            <span className={'material extraDropWrap material-MT-' + loots.id}></span>
                                                                        </Tooltip>)
                                                                })
                                                                }
                                                                <p className='dropRateFirstStage'>{stages.code}</p>

                                                                {this.state.detailMode && <div style={{ display: 'inline', position: 'absolute' }}>

                                                                    <Tooltip title={<FormattedMessage id='dropRate' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{`${(stages.drop_rate * 100).toFixed()}%`}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='efficiency' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.efficiency}</p></span></Tooltip>
                                                                    <Tooltip title={<FormattedMessage id='expected' />} arrow placement='right'><span className=""><p className='dropRateFirstStageDetails'>{stages.ap_per_item}</p></span></Tooltip>

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
                            {currentData.eventType === "Contingency Contract" &&
                                <TableRow>
                                    <TableCell>
                                        <h2><FormattedMessage id='finite' /></h2>
                                    </TableCell>
                                    {finite_items.map((contingencyItems) => {
                                        return (
                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={contingencyItems.id} />} arrow>

                                                    <span className={(contingencyItems.id === "bipeak" ? 'contingencyMiscs spriteCM-4 material-MT-' : 'material spriteMT-4 material-MT-') + contingencyItems.id}></span>
                                                </Tooltip>
                                                <p className='M4Values'>{contingencyItems.contingency_store_value.finite}</p>
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>}

                            {currentData.eventType === "Contingency Contract" &&
                                <TableRow>

                                    <TableCell>
                                        <h2><FormattedMessage id='infinite' /></h2>
                                    </TableCell>
                                    {infinite_items.map((contingencyItems) => {
                                        return (
                                            <TableCell>
                                                <Tooltip title={<FormattedMessage id={contingencyItems.id} />} arrow>
                                                    <span className={(contingencyItems.id === "superiors" || contingencyItems.id === "inferiors" ? 'contingencyMiscs spriteCM-4 material-MT-' : 'material spriteMT-4 material-MT-') + contingencyItems.id}></span>
                                                </Tooltip>
                                                <p className='M4Values'>{contingencyItems.contingency_store_value.infinite}</p>
                                            </TableCell>)
                                    })}
                                </TableRow>}
                        </Table>
                    </TableContainer>

                    <StagesModal open={this.state.stageModalOpen} />
                </div>
            </MuiThemeProvider>
        );
    }

} export default MaterialTable;

