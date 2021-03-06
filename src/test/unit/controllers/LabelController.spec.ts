import { expect } from 'chai';
import {
  ILabelControllerMetadata,
  LabelController,
} from '../../../controllers/label-controller';
import { Eventbus } from '../../../eventbus';
import { TimelineEventNames } from '../../../timeline-event-names';
class MockElement {
  content: string = '';
  html(content: string) {
    this.content = content;
  }
}

describe('LabelController', () => {
  let controller = new LabelController();
  let eventbus = new Eventbus();
  let selectedElement: JQuery = (new MockElement() as unknown) as JQuery;
  let operationData: ILabelControllerMetadata = ({} as unknown) as ILabelControllerMetadata;

  beforeEach(() => {
    controller = new LabelController();
    eventbus = new Eventbus();
    selectedElement = (new MockElement() as unknown) as JQuery;
    operationData = {
      selectedElement: selectedElement,
      labelId: 'test',
    };
  });

  it('should create the LabelController', () => {
    expect(controller.name).to.equal('LabelController');
    expect(controller.listeners).to.not.be.null;
    expect(controller.listeners.length).to.equal(0);
    expect(controller.currentLanguage).to.be.null;
    expect(controller.operationData).to.be.null;
    expect(controller.labelData).to.not.be.null;
  });

  it('should clone the operationData in init method', () => {
    // test
    controller.init(operationData);
    // expect
    expect(operationData).to.not.equal(controller.operationData);
  });

  it('should attach properly', () => {
    // given
    controller.init(operationData);
    eventbus.on(
      TimelineEventNames.REQUEST_CURRENT_LANGUAGE,
      (...args: any[]) => {
        args[0]('en-GB');
      }
    );

    eventbus.on(
      TimelineEventNames.REQUEST_LABEL_COLLECTION,
      (...args: any[]) => {
        args[1]([
          {
            id: '1111',
            languageCode: 'nl-NL',
            label: 'hallo',
          },
          {
            id: '2222',
            languageCode: 'en-GB',
            label: 'hello',
          },
        ]);
      }
    );

    // test
    controller.attach(eventbus);

    // expect
    expect(
      ((operationData.selectedElement as unknown) as MockElement).content
    ).to.equal('hello');
  });
});
