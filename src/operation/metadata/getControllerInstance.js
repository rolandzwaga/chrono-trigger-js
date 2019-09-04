import ParameterTypes from "./ParameterTypes";

function getControllerInstance() {
    return {
        systemName: {
            type: ParameterTypes.CONTROLLER_NAME,
            required: true
        },
        propertyName: {
            type: ParameterTypes.STRING
        }
    };
}
export default getControllerInstance;