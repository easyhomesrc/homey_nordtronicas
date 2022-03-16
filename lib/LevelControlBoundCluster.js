const { BoundCluster } = require('zigbee-clusters')

class LevelControlBoundCluster extends BoundCluster {
  constructor({
    onStepWithOnOff,
    onMoveWithOnOff,
    onStopWithOnOff
  }) {
    super()
    this._onStepWithOnOff = onStepWithOnOff
    this._onMoveWithOnOff = onMoveWithOnOff
    this._onStopWithOnOff = onStopWithOnOff
  }

  stepWithOnOff(payload) {
    this._onStepWithOnOff(payload)
  }

  moveWithOnOff(payload) {
    this._onMoveWithOnOff(payload)
  }

  stopWithOnOff() {
    this._onStopWithOnOff()
  }
}

module.exports = LevelControlBoundCluster
