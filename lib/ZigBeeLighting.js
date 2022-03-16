'use strict'

const { ZigBeeLightDevice } = require('homey-zigbeedriver')
const { debug } = require('zigbee-clusters')

class Device extends ZigBeeLightDevice {

  async onNodeInit({
    zclNode,
    supportsHueAndSaturation,
    supportsColorTemperature
  }) {
    await super.onNodeInit({
      zclNode,
      supportsHueAndSaturation,
      supportsColorTemperature
    })

    debug(true)
    this.enableDebug()
    this.printNode()

    this._setUpOnOffReport()
    this._setUpDimReport()
  }

  _setUpOnOffReport() {

    if (this.hasCapability('onoff')) {
      this.zclNode.endpoints[1].clusters.onOff.on('attr.onOff', async value => {
        const oldValue = await this.getCapabilityValue('onoff')
        if (value === oldValue) {
          console.log(`attr.onOff old value, ignore`, value)
        } else {
          console.log(`attr.onOff new value`, value)
          await this.setCapabilityValue('onoff', value)
            .catch(this.error)
        }
      })
    }
  }

  _setUpDimReport() {

    if (this.hasCapability('dim')) {
      this.zclNode.endpoints[1].clusters.levelControl.on('attr.currentLevel', async value => {
        const oldValue = await this.getCapabilityValue('dim')
        const diff = Math.abs(oldValue * 254 - value)
        console.log(`attr.currentLevel oldValue newValue diff`, oldValue, value, diff)
        if (diff >= 5) {
          let newValue = parseFloat((value / 0xFE).toFixed(2))
          await this.setCapabilityValue('dim', newValue).catch(this.error)
        }
      })
    }
  }

}

module.exports = Device
