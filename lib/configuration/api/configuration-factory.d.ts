import { ILabel, ILanguageLabel, TimelineTypes } from '../../types';
import { IActionConfiguration, IEngineConfiguration, ITimelineActionConfiguration, ITimelineConfiguration } from '../types';
import { ActionCreatorFactory } from './action-creator-factory';
import { ActionEditor, EndableActionEditor, TimelineActionEditor } from './action-editor';
import TimelineProvidersSettingsEditor from './timeline-provider-settings-editor';
export declare type TEngineConfigurationLists = Pick<IEngineConfiguration, 'availableLanguages' | 'initActions' | 'actions' | 'eventActions' | 'timelines' | 'labels'>;
export declare class ConfigurationFactory {
    actionCreatorFactory: ActionCreatorFactory;
    configuration: IEngineConfiguration;
    constructor(config?: IEngineConfiguration);
    init(defaultLanguage: string): this;
    setDefaultLanguage(defaultLanguage: string): this;
    setContainerSelector(selector: string): this;
    editTimelineProviderSettings(): TimelineProvidersSettingsEditor;
    getConfiguration(callBack: (copy: IEngineConfiguration) => IEngineConfiguration): this;
    addLanguage(code: string, languageLabel: string): this;
    _internalAddAction(collectionName: keyof TEngineConfigurationLists, action: IActionConfiguration): void;
    _initializeCollection<T, K extends keyof T>(parent: T, name: K): T[K];
    addAction(action: IActionConfiguration): void;
    addInitAction(action: IActionConfiguration): void;
    addEventAction(action: IActionConfiguration): void;
    addTimelineAction(uri: string, action: ITimelineActionConfiguration): void;
    createAction(name: string): import("./action-creator-factory").ActionCreator<IActionConfiguration>;
    createInitAction(name: string): import("./action-creator-factory").EndableActionCreator<import("../types").IEndableActionConfiguration>;
    createEventAction(name: string): import("./action-creator-factory").ActionCreator<IActionConfiguration>;
    createTimelineAction(uri: string, name: string): import("./action-creator-factory").TimelineActionCreator;
    addTimeline(uri: string, type: TimelineTypes, duration: number, loop: boolean, selector: string): this;
    getTimeline(uri: string): ITimelineConfiguration | undefined;
    removeTimeline(uri: string): this;
    _initializeLabel(id: string, labels: ILanguageLabel[]): ILanguageLabel;
    _getLabelTranslation(labelTranslations: ILabel[], languageCode: string): ILabel;
    addLabel(id: string, code: string, translation: string): this;
    editAction(id: string): ActionEditor<import("../types").IEndableActionConfiguration>;
    editEventAction(id: string): ActionEditor<import("../types").IEventActionConfiguration>;
    editInitAction(id: string): EndableActionEditor<import("../types").IEndableActionConfiguration>;
    editTimelineAction(uri: string, id: string): TimelineActionEditor;
}
