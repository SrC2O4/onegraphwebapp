import React from "react";
import BaseComponent from "../Base";
// import MaterialTable from 'material-table';
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { setState } from "statezero";
import "./style.css";
import { FormattedMessage } from "react-intl";

class EfficiencyTableModal extends BaseComponent {
  filterState({ stages, stagesEN, stagesTW, listOpen, server }) {
    return { stages, stagesEN, stagesTW, listOpen, server };
  }

  handleOpen = () => {
    setState("listOpen", true);
  };

  handleClose = () => {
    setState("listOpen", false);
  };

  render() {
    let currectStages = [];
    if (this.state.server === "TW") {
      currectStages = this.state.stagesTW;
    } else if (this.state.server === "JP/EN/KR") {
      currectStages = this.state.stagesEN;
    } else {
      currectStages = this.state.stages;
    }

    return (
      <Modal
        aria-labelledby="material-table"
        className="Stagesmodal"
        open={this.state.listOpen}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.listOpen}>
          <div className="Stagespaper">
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <FormattedMessage id="stageText" />
                    </TableCell>
                    <TableCell numeric>
                      <FormattedMessage id="effiText" />
                    </TableCell>
                    <TableCell numeric>
                      <FormattedMessage id="effiEventText" />
                    </TableCell>
                    <TableCell numeric>
                      <FormattedMessage id="effiBaseText" />
                    </TableCell>
                    <TableCell numeric>
                      <FormattedMessage id="effiEventBaseText" />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currectStages.map((n) => {
                    return (
                      <TableRow>
                        <TableCell>{n.code}</TableCell>
                        <TableCell numeric>
                          {n.efficiency ? n.efficiency.toFixed(2) : 0}
                        </TableCell>
                        <TableCell numeric>
                          {n.efficiency_event ? n.efficiency_event.toFixed(2) : 0}
                        </TableCell>
                        <TableCell numeric>
                          {n.efficiency_base ? n.efficiency_base.toFixed(2) : 0}
                        </TableCell>
                        <TableCell numeric>
                          {n.efficiency_base ? n.efficiency_event_base.toFixed(2) : 0}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Fade>
      </Modal>
    );
  }
}
export default EfficiencyTableModal;
