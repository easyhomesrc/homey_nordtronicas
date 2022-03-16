'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { CLUSTER } = require('zigbee-clusters')

class Device extends ZigBeeDevice {

  onNodeInit ({ zclNode, node }) {
    super.onNodeInit({ zclNode, node })

    this.registerCapability('onoff', CLUSTER.ON_OFF)
    this._setUpOnOffReport()
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

}

module.exports = Device;
