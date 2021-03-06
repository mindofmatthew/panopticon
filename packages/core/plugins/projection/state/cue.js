const { genId } = require('../../../common');

exports.empty = [];

const defaultCueData = {
  asset: '',
  corners: {
    northwest: { x: 0, y: 0 },
    northeast: { x: 1, y: 0 },
    southwest: { x: 0, y: 1 },
    southeast: { x: 1, y: 1 }
  }
};

exports.mutate = (draft, action) => {
  switch (action.type) {
    case 'DELETE_CUE':
      draft.splice(draft.findIndex(cue => cue.id === action.id), 1);
      return;
    case 'ADD_CUE':
      const newCue = { id: genId(), ...defaultCueData };
      draft.push(newCue);
      return;
    case 'EDIT_CUE_CORNERS':
      draft[draft.findIndex(c => c.id === action.id)].corners = clampCorners(
        action.corners
      );
      return;
    case 'EDIT_CUE_ASSET':
      draft[draft.findIndex(c => c.id === action.id)].asset = action.value;
      return;
  }
};

function clampCorners(corners) {
  return Object.entries(corners)
    .map(([k, { x, y }]) => [k, { x: clamp(x), y: clamp(y) }])
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
}

function clamp(x) {
  return Math.max(Math.min(x, 1), 0);
}
