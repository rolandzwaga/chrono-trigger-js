/// <reference types="jquery" />
import { IEventbus, TEventHandlerRemover } from '../eventbus/types';
import { ILabel } from '../types';
import { IController } from './types';
export interface ILabelControllerMetadata {
    selectedElement: JQuery;
    labelId: string;
}
export declare class LabelController implements IController<ILabelControllerMetadata> {
    listeners: TEventHandlerRemover[];
    currentLanguage: string | null;
    operationData: ILabelControllerMetadata | null;
    labelData: Record<string, string>;
    name: string;
    init(operationData: ILabelControllerMetadata): void;
    attach(eventbus: IEventbus): void;
    setLabel(): void;
    detach(_eventbus: IEventbus): void;
    handleLanguageChange(code: string): void;
    createTextDataLookup(data: ILabel[]): void;
}
