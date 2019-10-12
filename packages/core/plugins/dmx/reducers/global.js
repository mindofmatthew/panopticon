const { genId } = require('../../../common');

exports.reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LIGHT':
      return {
        ...state,
        lights: [
          ...state.lights,
          {
            id: genId(),
            name: 'dmx1',
            channel: 0,
            type: 'white'
          }
        ]
      };
    case 'CHANGE_LIGHT_NAME':
      return {
        ...state,
        lights: state.lights.map(light =>
          light.id === action.id ? { ...light, name: action.value } : light
        )
      };
    case 'CHANGE_LIGHT_CHANNEL':
      return {
        ...state,
        lights: state.lights.map(light =>
          light.id === action.id ? { ...light, channel: action.value } : light
        )
      };
    case 'CHANGE_LIGHT_TYPE':
      return {
        ...state,
        lights: state.lights.map(light =>
          light.id === action.id ? { ...light, type: action.value } : light
        )
      };
    case 'DELETE_LIGHT':
      return {
        ...state,
        lights: state.lights.filter(light => light.id !== action.id)
      };
  }
};