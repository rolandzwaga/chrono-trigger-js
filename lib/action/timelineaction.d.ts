import EndableAction from './endableaction';
import { IEventbus } from '../eventbus/types';
import { IResolvedTimelineActionConfiguration, TOperationData } from './types';
import { IStrictDuration } from '../types';
declare class TimelineAction extends EndableAction {
    id: string;
    active: boolean;
    duration: IStrictDuration;
    constructor(actionConfiguration: IResolvedTimelineActionConfiguration, eventBus: IEventbus);
    start(initOperationData: TOperationData): Promise<TOperationData>;
    end(initOperationData: TOperationData): Promise<TOperationData>;
}
export default TimelineAction;
