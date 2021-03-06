import {
  IResolvedEngineConfiguration,
  ITimelineFlow,
} from './configuration/types';
import { IEventbus } from './eventbus/types';

export class EligiusFlowController {
  timelineFlow?: ITimelineFlow;

  constructor(
    private configuration: IResolvedEngineConfiguration,
    private eventbus: IEventbus
  ) {
    this.timelineFlow = configuration.timelineFlow;
  }
}
