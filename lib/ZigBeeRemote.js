'use strict'

const { ZigBeeDevice } = require('homey-zigbeedriver')
const { CLUSTER } = require('zigbee-clusters')
const { debug } = require('zigbee-clusters')

class Device extends ZigBeeDevice {

  async onNodeInit({
    zclNode,
    node
  }) {
    await super.onNodeInit({
      zclNode,
      node
    })

    // Enable debug logging of all relevant Zigbee communication
    debug(true)

    this.enableDebug()
    this.printNode()

    await this._registerMeasureBattery()
  }

  _registerMeasureBattery() {

    if (this.hasCapability('measure_battery')) {
      this.registerCapability('measure_battery', CLUSTER.POWER_CONFIGURATION, {
        getOpts: {
          getOnStart: true,
          getOnOnline: false,
          pollInterval: 24 * 60 * 60 * 1000 // 24 hours
        },
        reportParser: async report => {
          this.log(`measure_battery report`, report)
          return report * 0.5
        }
      })
    }
  }

}

module.exports = Device
