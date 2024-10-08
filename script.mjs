import { getPrsMergeTimes } from './api_helper.mjs';

function calculateAverage(array) {
    if (array.length === 0) return 0;
    const sum = array.reduce((acc, val) => acc + val, 0);
    return sum / array.length;
}

function calculateMedian(array) {
    if (array.length === 0) return 0;

    array.sort((a, b) => a - b);
    const mid = Math.floor(array.length / 2);

    if (array.length % 2 === 0) {
        return (array[mid - 1] + array[mid]) / 2;
    } else {
        return array[mid];
    }
}

(async() => {
	const listOfRepositories = [
		'sonarlint-vscode',
		'sonarlint-language-server',
		'sonarlint-intellij',
		'sonarlint-eclipse',
		'sonarlint-visualstudio',
		'sonarlint-core'
	]
	const Q1 = {
		startDate: '2024-01-01T00:00:00',
		endDate: '2024-03-31T00:00:00'
	};

	const Q2 = {
		startDate: '2024-04-01T00:00:00',
		endDate: '2024-06-30T00:00:00'
	};

	const Q3 = {
		startDate: '2024-07-01T00:00:00',
		endDate: '2024-09-30T00:00:00'
	};

	listOfRepositories.forEach(async (repository) => {
		const durationsQ1 = await getPrsMergeTimes(repository, Q1.startDate, Q1.endDate);
		const durationsQ2 = await getPrsMergeTimes(repository, Q2.startDate, Q2.endDate);
		const durationsQ3 = await getPrsMergeTimes(repository, Q3.startDate, Q3.endDate);
		// const averageDurationQ1 = calculateAverage(durationsQ1);
		// const averageDurationQ2 = calculateAverage(durationsQ2);
		// const averageDurationQ3 = calculateAverage(durationsQ3);
		const medianDurationQ1 = calculateMedian(durationsQ1);
		const medianDurationQ2 = calculateMedian(durationsQ2);
		const medianDurationQ3 = calculateMedian(durationsQ3);
		console.log('-----------------------------------');
		// console.log(`Average PR duration for ${repository} in Q1: ${averageDurationQ1} hours over ${durationsQ1.length} PRs`);
		// console.log(`Average PR duration for ${repository} in Q2: ${averageDurationQ2} hours over ${durationsQ2.length} PRs`);
		// console.log(`Average PR duration for ${repository} in Q3: ${averageDurationQ3} hours over ${durationsQ3.length} PRs`);
		console.log(`Median PR duration for ${repository} in Q1: ${medianDurationQ1} hours over ${durationsQ1.length} PRs`);
		console.log(`Median PR duration for ${repository} in Q2: ${medianDurationQ2} hours over ${durationsQ2.length} PRs`);
		console.log(`Median PR duration for ${repository} in Q3: ${medianDurationQ3} hours over ${durationsQ3.length} PRs`);
	});
})();