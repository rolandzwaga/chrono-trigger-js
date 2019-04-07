import $ from 'jquery';

class Action {

	constructor(actionData, eventBus) {
		this.name = actionData.name;
		this.startOperations = actionData.startOperations;
		this.eventbus = eventBus; 
	}

	start(initOperationData) {
		const result = new Promise((resolve, reject) => {
			this.executeOperation(this.startOperations, 0, resolve, reject, initOperationData);
		}).catch((e) => {
			console.error(`Error in action start '${this.name}'`);
			throw e;
		});
		return result;
	}

	executeOperation(operations, idx, resolve, reject, previousOperationData) {
		previousOperationData = previousOperationData || {};

		if (idx < operations.length) {
			const operationInfo = operations[idx];
			const copy = (operationInfo.operationData) ? JSON.parse(JSON.stringify(operationInfo.operationData)) : {};
			const mergedOperationData = Object.assign(previousOperationData, copy);
			
			const result = operationInfo.instance(mergedOperationData, this.eventbus);
			
            if (result.then) {
				result.then((resultOperationData) => {
					this.executeOperation(operations, ++idx, resolve, reject, resultOperationData);
				}).catch((error) => {
					reject(error);
				});
            } else {
                this.executeOperation(operations, ++idx, resolve, reject, result);
            }
		} else {
			resolve(previousOperationData);
		}
	}

	resize(operationData) {
		const idx = 0;
		const result = new Promise((resolve, reject) => {
			this.executeResizeOperation(this.startOperations, idx, resolve, reject, operationData);
		});
		return result;
	}

	executeResizeOperation(operations, idx, resolve, reject, previousOperationData) {
		previousOperationData = previousOperationData || {};
		
		if (idx < operations.length) {
			const operationInfo = operations[idx];
			if ((operationInfo.resizeInstance)) {
				const copy = ((operationInfo.operationData)) ? JSON.parse(JSON.stringify(operationInfo.operationData)) : {};
				const mergedOperationData = Object.assign(previousOperationData, copy);

				const result = operationInfo.resizeInstance(mergedOperationData);
				if (result.then){
					result.then((resultOperationData) => {
						this.executeResizeOperation(operations, ++idx, resolve, reject, resultOperationData);
					}).catch((error) => {
						reject(error);
					});
				} else {
					this.executeResizeOperation(operations, ++idx, resolve, reject, result);
				}
			} else {
				this.executeResizeOperation(operations, ++idx, resolve, reject, previousOperationData);
			}
		} else {
			resolve(previousOperationData);
		}
	}
}

export default Action;
