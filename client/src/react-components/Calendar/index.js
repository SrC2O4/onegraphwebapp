import React from 'react'
import './style.css'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Badge } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import DayUtils from '@date-io/dayjs'
import localeCN from 'dayjs/locale/zh-cn'
import localeTW from 'dayjs/locale/zh-tw'
import localeJA from 'dayjs/locale/ja'
import localeEN from 'dayjs/locale/en-au'
import localeKO from 'dayjs/locale/ko'
import BaseComponent from '../Base'
import { setState, getState } from 'statezero'
import dayjs from 'dayjs'
import isoa from 'dayjs/plugin/isSameOrAfter'
import isob from 'dayjs/plugin/isSameOrBefore'
import api from '../../actions/api'

dayjs.extend(isoa)
dayjs.extend(isob)

export default class Calendar extends BaseComponent {
  filterState({ lang, selectDate, calendarOpen, historyList }) {
    return { lang, selectDate, calendarOpen, historyList }
  }

  onChange(value) {
    setState('selectDate', dayjs(value).format())
  }

  onMonthChange(value) {
    api.getHistoryList(dayjs(value).format())
  }

  onClose() {
    setState('calendarOpen', false)
  }

  renderDay = (day, _selectedDate, isInCurrentMonth, dayComponent) => {
    const activityTag = ['', '🔸', '🔹']
    const date = dayjs(day)
    let isInActivity = undefined
    for (const index in this.state.historyList.activity) {
      if (
        date.isSameOrAfter(dayjs(this.state.historyList.activity[index].openTime), 'date') &&
        date.isSameOrBefore(dayjs(this.state.historyList.activity[index].closeTime), 'date')
      ) {
        isInActivity = (this.state.historyList.activity[index].id % 2) + 1
      }
    }
    return (
      <Badge badgeContent={isInCurrentMonth && isInActivity ? activityTag[isInActivity] : undefined}>
        {dayComponent}
      </Badge>
    )
  }

  getActivityName = () => {
    const date = dayjs(this.state.selectDate)
    for (const index in this.state.historyList.activity) {
      if (
        date.isSameOrAfter(dayjs(this.state.historyList.activity[index].openTime), 'date') &&
        date.isSameOrBefore(dayjs(this.state.historyList.activity[index].closeTime), 'date')
      ) {
        return this.state.historyList.activity[index].name
      }
    }
  }

  getServerTag() {
    switch (getState('server')) {
      default:
      case 'CN':
        return ''
      case 'JP/EN/KR':
        return 'EN'
      case 'TW':
        return 'TW'
    }
  }

  render() {
    let currectLoacle
    switch (this.state.lang) {
      case 'zh_Hans':
        currectLoacle = localeCN
        break
      case 'zh_Hant':
        currectLoacle = localeTW
        break
      case 'ja':
        currectLoacle = localeJA
        break
      default:
      case 'en':
        currectLoacle = localeEN
        break
      case 'ko':
        currectLoacle = localeKO
        break
    }

    return (
      <MuiPickersUtilsProvider utils={DayUtils} locale={currectLoacle}>
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={this.state.calendarOpen}
          disableBackdropClick
          onClose={this.onClose}
          maxWidth={false}
          dividers
        >
          <MuiDialogTitle>
            {'时间机器 (仅供参考)'}
            <IconButton aria-label="close" onClick={this.onClose} style={{ float: 'right', padding: '4px' }}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <div className="activity-box">
            <DatePicker
              variant="static"
              openTo="date"
              orientation="portrait"
              onChange={this.onChange}
              onMonthChange={this.onMonthChange}
              renderDay={this.renderDay}
              value={this.state.selectDate}
            />
            <div className="activity-list">
              <Card style={{ margin: '8px' }}>
                <CardContent style={{ padding: '16px' }}>{this.getActivityName() || 'No activity'}</CardContent>
              </Card>
              {this.state.historyList && this.state.historyList.update
                ? this.state.historyList.update[dayjs(this.state.selectDate).date().toString()].map((e) => {
                    return (
                      <Card style={{ margin: '8px' }}>
                        <CardContent style={{ padding: '16px', lineHeight: '30px' }}>
                          {`Updated at ${dayjs(e.updateCreatedAt).format('HH:mm')}`}
                          <Button
                            style={{ float: 'right', lineHeight: '20px' }}
                            size="small"
                            variant="contained"
                            color="primary"
                            onLoad={true}
                            onClick={() => {
                              setState('gacha' + this.getServerTag(), {}) //show loading circular
                              setState('calendarOpen', false)
                              setState('isHistoryData' + this.getServerTag(), true)
                              api.getTotalFormHistory(e.updateId)
                            }}
                          >
                            Goto
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })
                : ''}
            </div>
          </div>
        </Dialog>
      </MuiPickersUtilsProvider>
    )
  }
}
