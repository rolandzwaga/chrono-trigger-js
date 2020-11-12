import { IEventbus } from '~/eventbus/types';
import { resolvePropertyValues } from './helper/resolve-property-values';
import { TOperation } from './types';

export interface ISetStyleOperationData {
  properties: any;
  propertyName?: string;
  selectedElement?: JQuery;
}

export const setStyle: TOperation<ISetStyleOperationData> = function (
  operationData: ISetStyleOperationData,
  _eventBus: IEventbus
) {
  const { propertyName = 'selectedElement' } = operationData;

  const properties = resolvePropertyValues(operationData, operationData.properties);
  (operationData as any)[propertyName].css(properties);
  return operationData;
};
