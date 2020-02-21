import ParameterTypes from './parameterTypes';

function addClass() {
  return {
    description: 'Add a class to the selected element',
    dependentProperties: ['selectedElement'],
    properties: {
      className: {
        type: ParameterTypes.CLASS_NAME,
        required: true,
      },
    },
  };
}
export default addClass;
