import { TOperation } from './types';

export interface IAddClassOperationData {
  selectedElement: JQuery;
  className: string;
}

export const addClass: TOperation<IAddClassOperationData> = function(
  operationData: IAddClassOperationData
) {
  const { selectedElement, className } = operationData;
  selectedElement.addClass(className);
  return operationData;
};
