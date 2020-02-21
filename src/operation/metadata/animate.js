import ParameterTypes from './ParameterTypes';

function animate() {
  return {
    description: 'Animates the selected elmenet with the given animation settings.',
    dependentProperties: ['selectedElement'],
    properties: {
      animationEasing: ParameterTypes.BOOLEAN,
      animationProperties: {
        type: ParameterTypes.OBJECT,
        required: true,
      },
      animationDuration: {
        type: ParameterTypes.INTEGER,
        required: true,
      },
    },
  };
}
export default animate;
