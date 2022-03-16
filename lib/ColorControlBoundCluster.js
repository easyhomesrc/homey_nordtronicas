const { BoundCluster } = require('zigbee-clusters')

class ColorControlBoundCluster extends BoundCluster {
  constructor({
    onMoveHue,
    onMoveToColor,
    onMoveToColorTemperature,
    onMoveColorTemperature,
    onStopMoveStep
  }) {
    super()
    this._onMoveHue = onMoveHue
    this._onMoveToColor = onMoveToColor
    this._onMoveToColorTemperature = onMoveToColorTemperature
    this._onMoveColorTemperature = onMoveColorTemperature
    this._onStopMoveStep = onStopMoveStep
  }

  moveHue(payload) {
    this._onMoveHue(payload)
  }

  moveToColor(payload) {
    this._onMoveToColor(payload)
  }

  moveToColorTemperature(payload) {
    this._onMoveToColorTemperature(payload)
  }

  moveColorTemperature(payload) {
    this._onMoveColorTemperature(payload)
  }

  stopMoveStep() {
    this._onStopMoveStep()
  }

}

module.exports = ColorControlBoundCluster
