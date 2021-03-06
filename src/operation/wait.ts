import { internalResolve } from './helper/internal-resolve';
import { TOperation } from './types';

export interface IWaitOperationData {
  milliseconds: number;
}

export const wait: TOperation<IWaitOperationData> = function(
  operationData: IWaitOperationData
) {
  const { milliseconds } = operationData;
  return new Promise(resolve => {
    setTimeout(() => {
      internalResolve(resolve, operationData);
    }, milliseconds);
  });
};
