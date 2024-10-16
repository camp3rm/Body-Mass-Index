const openCalculate = document.querySelector('.open-calculate');
const description = document.querySelector('.BMI-description');
const bmiCalculator = document.querySelector('.bmi-calculator');
const langChange = document.querySelector('#langChange')
const ranges = document.querySelector('.value-ranges');
const calculateBtn = document.querySelector('.calculate');
const resultField = document.querySelector('.result-field');
const result = document.querySelector('.result');
const reloadPage = document.querySelector(".repeat-calculate");
const regExp = /^\d{1,3}(\.\d{1,2})?$/;

openCalculate.addEventListener('click', () => {
	description.classList.add('hidden');
	bmiCalculator.classList.remove('hidden');
	document.addEventListener('DOMContentLoaded', function () {
		window.scrollTo(0, 0);
	});
})

async function calculate() {
	const savedLang = localStorage.getItem('language');
	const translations = await loadTranslations();
	const weight = parseFloat(peopleWeight.value)
	const height = parseFloat(peopleHeight.value)
	let bmi = Math.round(weight / ((Math.pow(height, 2)) / 1000));
	peopleHeight.value = "";
	peopleWeight.value = "";
	let resultText = translations[savedLang].result;
	resultField.textContent = `${resultText}` + ` ${bmi}`;
	ranges.classList.remove('hidden');
	result.classList.remove('hidden');
	reloadPage.classList.remove('hidden');
	peopleHeight.disabled = true;
	peopleWeight.disabled = true;
}

function validation(e) {
	const value = e.target.value;
	if (!value || !regExp.test(value)) {
		if (e.target.id == "weight") {
			document.getElementById("errorMessageWeight").classList.remove("valid");
			document.getElementById("errorMessageWeight").classList.add("invalid");
			calculateBtn.disabled = true;
			result.classList.remove("invalid");
			ranges.classList.remove("invalid");
			result.classList.add("valid");
			ranges.classList.add("valid")
			return
		}
		if (e.target.id == "height") {
			document.getElementById("errorMessageHeight").classList.remove("valid");
			document.getElementById("errorMessageHeight").classList.add("invalid");
			calculateBtn.disabled = true;
			result.classList.remove("invalid");
			ranges.classList.remove("invalid");
			result.classList.add("valid");
			ranges.classList.add("valid")
			return
		}

	} else {
		if (e.target.id == "weight") {
			document.getElementById("errorMessageWeight").classList.remove("invalid");
			document.getElementById("errorMessageWeight").classList.add("valid");
			calculateBtn.disabled = false;
			result.classList.remove('valid');
			ranges.classList.remove('valid');
			result.classList.add("invalid");
			ranges.classList.add("invalid")
			return
		}
		if (e.target.id == "height") {
			console.log(e.target.length);
			document.getElementById("errorMessageHeight").classList.remove("invalid");
			document.getElementById("errorMessageHeight").classList.add("valid");
			calculateBtn.disabled = false;
			result.classList.remove('valid');
			ranges.classList.remove('valid');
			result.classList.add("invalid");
			ranges.classList.add("invalid")
			return
		}

	}
}

const peopleWeight = document.querySelector('.weight');
const peopleHeight = document.querySelector('.height');
calculateBtn.addEventListener('click', calculate);
peopleWeight.addEventListener('input', validation);
peopleHeight.addEventListener('input', validation);

const translationUrl = "./assets/lang.json";

async function loadTranslations() {
	try {
		const response = await fetch(translationUrl);
		if (!response.ok) {
			throw new Error('Failed to load translations');
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching translations:', error);
	}
}

async function changeLang(lang) {
	const translations = await loadTranslations();
	if (translations && translations[lang]) {
		document.querySelectorAll('[data-translation]').forEach(elem => {
			const dataTranslationValue = elem.getAttribute('data-translation');
			const translation = translations[lang][dataTranslationValue];
			if (translation) {
				if (elem.tagName.toLowerCase() === 'input') {
					elem.setAttribute('placeholder', translation);
				} else {
					elem.textContent = translation;
				}
			}
		});
	} else {
		console.error('Translations for selected language not found.');
	};
};




document.addEventListener('DOMContentLoaded', () => {
	const savedLang = localStorage.getItem('language') || "pl";
	changeLang(savedLang);
	if (langChange) {
		langChange.value = savedLang;
	}
});

langChange.addEventListener('change', (e) => {
	const selectLang = e.target.value;
	changeLang(selectLang);
	localStorage.setItem('language', selectLang);
});


