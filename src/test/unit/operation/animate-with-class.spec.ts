import { expect } from 'chai';
import { animateWithClass } from '../../../operation/animate-with-class';
import { applyOperation } from './apply-operation';

class MockElement {
  removedCalled = false;
  expectedClass: string;
  handler: () => void = () => {};

  constructor(expectedClass: string) {
    this.expectedClass = expectedClass;
  }

  one(_eventNames: string[], handler: () => void) {
    this.handler = handler;
  }

  addClass(className: string) {
    expect(className).to.equal(this.expectedClass);
  }

  removeClass(className: string) {
    this.removedCalled = true;
    expect(className).to.equal(this.expectedClass);
  }
}

describe('animateWithClass', () => {
  it('should animate by adding the specified class, and remove the class afterwards', () => {
    // given
    const mockElement = new MockElement('testClass');

    const operationData = {
      selectedElement: (mockElement as any) as JQuery,
      className: 'testClass',
    };

    // test
    const promise = applyOperation<Promise<typeof operationData>>(
      animateWithClass,
      operationData
    );
    mockElement.handler();
    expect(mockElement.removedCalled).to.be.true;
    return promise;
  });

  it('should animate by adding the specified class, and keep the class afterwards', () => {
    // given
    const mockElement = new MockElement('testClass');

    const operationData = {
      selectedElement: (mockElement as any) as JQuery,
      className: 'testClass',
      removeClass: false,
    };

    // test
    const promise = applyOperation<Promise<typeof operationData>>(
      animateWithClass,
      operationData
    );
    mockElement.handler();
    expect(mockElement.removedCalled).to.be.false;
    return promise;
  });
});
