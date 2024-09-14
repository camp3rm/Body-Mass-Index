const description = document.querySelector('.BMI-description');
const openCalculate = document.querySelector('.open-calculate');
const bmiCalculator = document.querySelector('.bmi-calculator');
const ranges = document.querySelector('.value-ranges');
const poepleWeight = document.querySelector('.weight');
const poepleHeight = document.querySelector('.height');
const calculateBMI = document.querySelector('.calculate');
const resultField = document.querySelector('.result-field');
const result = document.querySelector('.result')

openCalculate.addEventListener('click', () => {
	description.classList.add('hidden');
	bmiCalculator.classList.remove('hidden');

})

function calculate() {
	let weight = parseFloat(poepleWeight.value);
	let height = parseFloat(poepleHeight.value);

	if (weight > 0 && height > 0) {
		let bmi = Math.round(weight / (Math.pow(height, 2)));
		resultField.innerHTML = `Twój BMI: ${bmi}`;

	} else {
		resultField.innerHTML = `Proszę wprowadzić poprawne wartości!`;
	}
	poepleWeight.value = '';
	poepleHeight.value = '';
	ranges.classList.remove('hidden');
	result.classList.remove('hidden');
}

calculateBMI.addEventListener('click', calculate);


