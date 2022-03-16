'use strict'

const {
  CLUSTER,
  Cluster
} = require('zigbee-clusters')
const ZigBeeRemote = require('../../lib/ZigBeeRemote')
const LevelControlBoundCluster = require('../../lib/LevelControlBoundCluster')
const OnOffBoundCluster = require('../../lib/OnOffBoundCluster')
const ColorControlBoundCluster = require('../../lib/ColorControlBoundCluster')
const MyColorControlCluster = require('../../lib/MyColorControlCluster')

Cluster.addCluster(MyColorControlCluster)

class Device extends ZigBeeRemote {

  async onNodeInit({
    zclNode,
    node
  }) {
    await super.onNodeInit({
      zclNode,
      node
    })

    this._setUpOnOffBinding()
    this._setUpLevelControlBinding()
    this._setUpColorControlBinding()
  }

  _setUpOnOffBinding() {

    this.zclNode.endpoints[1].bind(CLUSTER.ON_OFF.NAME, new OnOffBoundCluster({
      onSetOff: async () => {
        this.log(`onSetOff`)
        return this.homey.app.switchPressedTriggerCard.trigger(this, {}, {
          mode: 'on'
        })
      },
      onSetOn: async () => {
        this.log(`onSetOn`)
        return this.homey.app.switchPressedTriggerCard.trigger(this, {}, {
          mode: 'off'
        })
      }
    }))
  }

  _setUpLevelControlBinding() {

    this.zclNode.endpoints[1].bind(CLUSTER.LEVEL_CONTROL.NAME, new LevelControlBoundCluster({
      onStepWithOnOff: async payload => {
        this.log(`onStepWithOnOff`, payload)
        return this.homey.app.brightnessPressedTriggerCard.trigger(this, {}, {
          'mode': payload.mode
        })
      },
      onMoveWithOnOff: async payload => {
        this.log(`onMoveWithOnOff`, payload)
        return this.homey.app.brightnessHeldDownTriggerCard.trigger(this, {}, {
          'mode': payload.moveMode
        })
      },
      onStopWithOnOff: async () => {
        this.log(`onStopWithOnOff`)
        return this.homey.app.brightnessReleasedTriggerCard.trigger(this, {}, {})
      }
    }))
  }

  _setUpColorControlBinding() {

    this.zclNode.endpoints[1].bind(CLUSTER.COLOR_CONTROL.NAME, new ColorControlBoundCluster({
      onMoveToColor: async payload => {
        this.log(`onMoveToColor`, payload)
        return this.homey.app.rgbPressedTriggerCard.trigger(this, null, null)
      },
      onMoveHue: async payload => {
        this.log(`onMoveHue`, payload)
        if (payload.moveMode === 'stop') {
          return this.homey.app.rgbReleasedTriggerCard.trigger(this, null, null)
        } else {
          return this.homey.app.rgbHeldDownTriggerCard.trigger(this, null, null)
        }
      },
      onMoveToColorTemperature: async payload => {
        this.log(`onMoveToColorTemperature`, payload)
        return this.homey.app.cwPressedTriggerCard.trigger(this, null, null)
      },
      onMoveColorTemperature: async payload => {
        this.log(`onMoveColorTemperature`, payload)
        return this.homey.app.cwHeldDownTriggerCard.trigger(this, null, null)
      },
      onStopMoveStep: async () => {
        this.log(`onStopMoveStep`)
        return this.homey.app.cwReleasedTriggerCard.trigger(this, null, null)
      }
    }))
  }

}

module.exports = Device
