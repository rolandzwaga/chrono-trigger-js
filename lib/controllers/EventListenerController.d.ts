/// <reference types="jquery" />
import { TOperationData, IEndableAction } from '../action/types';
import { IEventbus } from '../eventbus/types';
import { IController } from './types';
interface IActionInstanceInfo {
    start: boolean;
    action: IEndableAction;
}
export interface IEventListenerControllerOperationData {
    selectedElement: JQuery;
    eventName: string;
    actions: string[];
    actionOperationData?: TOperationData;
}
declare class EventListenerController implements IController<IEventListenerControllerOperationData> {
    operationData: IEventListenerControllerOperationData | null;
    actionInstanceInfos: IActionInstanceInfo[];
    name: string;
    constructor();
    init(operationData: IEventListenerControllerOperationData): void;
    attach(eventbus: IEventbus): void;
    _getElementTagName(element: JQuery | HTMLElement): string;
    _isStartAction(actionName: string): [boolean, string];
    _eventHandler(event: any): void;
    _executeAction(actions: IActionInstanceInfo[], operationData: TOperationData, idx: number): void;
    _selectEventHandler(event: any): void;
    detach(_eventbus: IEventbus): void;
}
export default EventListenerController;
