const openCalculate = document.querySelector('.open-calculate');
const description = document.querySelector('.BMI-description');
const bmiCalculator = document.querySelector('.bmi-calculator');
const langChange = document.querySelector('#langChange')
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

// calculating body mass index
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


const translationUrl = '../assets/lang.json';
async function loadTranslations() {
	try {
		const response = await fetch(translationUrl);
		if (!response.ok) {
			throw new Error('Failed to load translations');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching translations:', error);
	}
};

async function changeLang(lang) {
	const translations = await loadTranslations();
	if (translations && translations[lang]) {
		document.getElementById('bmiHeader').textContent = translations[lang].bmiHeader;
	} else {
		console.error('Translations for selected language not found.');
	}
};

langChange.addEventListener('change', (e) => {
	const selectedLang = e.target.value;
	changeLang(selectedLang);
});

document.addEventListener('DOMContentLoaded', () => {
	const defaultLanguage = 'pl';
	langChange.value = defaultLanguage;
	changeLang(defaultLanguage); // Змінюємо мову при завантаженні сторінки
});



