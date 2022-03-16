'use strict'

const {
  Cluster,
  ZCLDataTypes,
  ColorControlCluster
} = require('zigbee-clusters')

const ATTRIBUTES = {
  // Mandatory if colorCapabilities = hueAndSaturation
  // Reportable, read-only
  currentHue: {
    id: 0,
    type: ZCLDataTypes.uint8
  },

  // Mandatory if colorCapabilities = hueAndSaturation
  // Reportable, read-only
  currentSaturation: {
    id: 1,
    type: ZCLDataTypes.uint8
  },

  // Mandatory
  // Reportable, read-only
  currentX: {
    id: 3,
    type: ZCLDataTypes.uint16
  },

  // Mandatory
  // Reportable, read-only
  currentY: {
    id: 4,
    type: ZCLDataTypes.uint16
  },

  // Mandatory if colorCapabilities = colorTemperature
  // Reportable, read-only
  colorTemperatureMireds: {
    id: 7,
    type: ZCLDataTypes.uint16
  },

  // Mandatory, read-only
  colorMode: {
    id: 8,
    type: ZCLDataTypes.enum8({
      currentHueAndCurrentSaturation: 0,
      currentXAndCurrentY: 1,
      colorTemperatureMireds: 2,
    }),
  },

  // Mandatory, read-only
  // Bit 0: hueAndSaturation mandatory commands: moveToHue, moveHue, stepHue, moveToSaturation,
  // moveSaturation, stepSaturation moveToHueAndSaturation, stopMoveStep, related attributes:
  // currentHue, currentSaturation

  // Bit 1: enhancedHue (hueAndSaturation must also be supported) mandatory commands:
  // enhancedMoveToHue, enhancedMoveHue, enhancedStepHue, enhancedMoveToHueAndSaturation,
  // stopMoveStep, related attributes: enhancedCurrentHue

  // Bit 2: colorLoop (enhancedHue must also be supported) mandatory commands: colorLoopSet,
  // related attributes: colorLoopActive, colorLoopDirection, colorLoopTime,
  // colorLoopStartEnhancedHue, colorLoopStoredEnhancedHue

  // Bit 3: xy mandatory commands: moveToColor, moveColor, stepColor, stopMoveStep, related
  // attributes: currentX, currentY

  // Bit 4: colorTemperature mandatory commands: moveToColorTemperature, moveColorTemperature,
  // stepColorTemperature, stopMoveStep, related attributes: colorTemperatureMireds,
  // colorTempPhysicalMinMireds, colorTempPhysicalMaxMireds
  colorCapabilities: {
    id: 16394,
    type: ZCLDataTypes.map16('hueAndSaturation', 'enhancedHue', 'colorLoop', 'xy', 'colorTemperature')
  },

  // Mandatory if colorCapabilities = colorTemperature
  // Read-only
  colorTempPhysicalMinMireds: {
    id: 16395,
    type: ZCLDataTypes.uint16
  },

  // Mandatory if colorCapabilities = colorTemperature
  // Read-only
  colorTempPhysicalMaxMireds: {
    id: 16396,
    type: ZCLDataTypes.uint16
  },
}

const COMMANDS = {
  moveToHue: {
    id: 0,
    args: {
      hue: ZCLDataTypes.uint8,
      direction: ZCLDataTypes.enum8({ // TODO: ?
        shortestDistance: 0,
        longestDistance: 1,
        up: 2,
        down: 3,
      }),
      transitionTime: ZCLDataTypes.uint16,
    },
  },
  moveHue: {
    id: 1,
    args: {
      moveMode: ZCLDataTypes.enum8({
        stop: 0x00,
        up: 0x01,
        reserved: 0x02,
        down: 0x03
      }),
      rate: ZCLDataTypes.uint8
    }
  },
  moveToSaturation: {
    id: 3,
    args: { // TODO
      saturation: ZCLDataTypes.uint8,
      transitionTime: ZCLDataTypes.uint16,
    },
  },
  moveToHueAndSaturation: {
    id: 6,
    args: {
      hue: ZCLDataTypes.uint8,
      saturation: ZCLDataTypes.uint8,
      transitionTime: ZCLDataTypes.uint16,
    },
  },
  moveToColor: {
    id: 7,
    args: {
      colorX: ZCLDataTypes.uint16,
      colorY: ZCLDataTypes.uint16,
      transitionTime: ZCLDataTypes.uint16,
    },
  },
  moveToColorTemperature: {
    id: 10,
    args: {
      colorTemperature: ZCLDataTypes.uint16,
      transitionTime: ZCLDataTypes.uint16,
    },
  },
  stopMoveStep: {
    id: 0x47
  },
  moveColorTemperature: {
    id: 0x4B,
    args: {
      moveMode: ZCLDataTypes.enum8({
        stop: 0x00,
        up: 0x01,
        reserved: 0x02,
        down: 0x03
      }),
      rate: ZCLDataTypes.uint16,
      colorTemperatureMinimumMireds: ZCLDataTypes.uint16,
      colorTemperatureMaximumMireds: ZCLDataTypes.uint16
    }
  }
}

class MyColorControlCluster extends ColorControlCluster {

  static get COMMANDS() {
    return COMMANDS
  }

}

module.exports = MyColorControlCluster
