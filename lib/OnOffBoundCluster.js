const { BoundCluster } = require('zigbee-clusters')

class OnOffBoundCluster extends BoundCluster {
  constructor({
    onSetOff,
    onSetOn
  }) {
    super()
    this._onSetOff = onSetOff
    this._onSetOn = onSetOn
  }

  setOff() {
    this._onSetOff()
  }

  setOn() {
    this._onSetOn()
  }
}

module.exports = OnOffBoundCluster
