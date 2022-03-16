'use strict'

const Homey = require('homey')

class MyApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {

    this.log('Nordtronic A/S has been initialized')

    this._setUpSwitchTriggers()
    this._setUpBrightnessTriggers()
    this._setUpRgbTriggers()
    this._setUpCwTriggers()
  }

  _setUpSwitchTriggers() {

    this.switchPressedTriggerCard = this.homey.flow
      .getDeviceTriggerCard('switch_pressed')
    this.switchPressedTriggerCard.registerRunListener(async (args, state) => {
      return args.mode === state.mode
    })
  }

  _setUpBrightnessTriggers() {

    this.brightnessPressedTriggerCard = this.homey.flow
      .getDeviceTriggerCard('brightness_pressed')
    this.brightnessPressedTriggerCard.registerRunListener(async (args, state) => {
      return args.mode === state.mode
    })

    this.brightnessHeldDownTriggerCard = this.homey.flow
      .getDeviceTriggerCard('brightness_held_down')
    this.brightnessHeldDownTriggerCard.registerRunListener(async (args, state) => {
      return args.mode === state.mode
    })

    this.brightnessReleasedTriggerCard = this.homey.flow
      .getDeviceTriggerCard('brightness_released')
    this.brightnessReleasedTriggerCard.registerRunListener(async (args, state) => {
      return true
    })
  }

  _setUpRgbTriggers() {

    this.rgbPressedTriggerCard = this.homey.flow
      .getDeviceTriggerCard('rgb_pressed')
    this.rgbPressedTriggerCard.registerRunListener(async (args, state) => {
      return true
    })

    this.rgbHeldDownTriggerCard = this.homey.flow
      .getDeviceTriggerCard('rgb_held_down')
    this.rgbHeldDownTriggerCard.registerRunListener(async (args, state) => {
      return true
    })

    this.rgbReleasedTriggerCard = this.homey.flow
      .getDeviceTriggerCard('rgb_released')
    this.rgbReleasedTriggerCard.registerRunListener(async (args, state) => {
      return true
    })
  }

  _setUpCwTriggers() {

    this.cwPressedTriggerCard = this.homey.flow
      .getDeviceTriggerCard('cw_pressed')
    this.cwPressedTriggerCard.registerRunListener(async (args, state) => {
      return true
    })

    this.cwHeldDownTriggerCard = this.homey.flow
      .getDeviceTriggerCard('cw_held_down')
    this.cwHeldDownTriggerCard.registerRunListener(async (args, state) => {
      return true
    })

    this.cwReleasedTriggerCard = this.homey.flow
      .getDeviceTriggerCard('cw_released')
    this.cwReleasedTriggerCard.registerRunListener(async (args, state) => {
      return true
    })
  }

}

module.exports = MyApp
