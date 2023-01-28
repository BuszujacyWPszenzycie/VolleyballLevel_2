const formPages = document.querySelectorAll('.form__box')
const steps = document.querySelectorAll('.step')
const progressBar = document.querySelector('.progress__box-bar')
const prevBtn = document.querySelector('.btn__previous')
const nextBtn = document.querySelector('.btn__next')

let currentStep = 1

const handleNextBtn = () => {
	currentStep++

	if (currentStep > steps.length) {
		currentStep = steps.length
	}

	handleProgressBar()
}

const handlePrevBtn = () => {
	currentStep--

	if (currentStep < 1) {
		currentStep = 1
	}

	handleProgressBar()
}

const handleProgressBar = () => {
	steps.forEach((step, index) => {
		if (index < currentStep) {
			step.classList.add('active-step')
		} else {
			step.classList.remove('active-step')
		}
	})
	const activeSteps = document.querySelectorAll('.active-step')
	progressBar.style.width = ((activeSteps.length - 1) / (steps.length - 1)) * 100 + '%'

	handleButtons()
	handleFormPage()
}

const handleButtons = () => {
	if (currentStep === 1) {
		prevBtn.disabled = true
	} else if (currentStep === steps.length) {
		nextBtn.disabled = true
	} else {
		prevBtn.disabled = false
		nextBtn.disabled = false
	}
}

const handleFormPage = () => {
	formPages.forEach(page => {
		if (currentStep == page.dataset.number) {
			page.classList.add('form__box-active')
		} else {
			page.classList.remove('form__box-active')
		}
	})
}

nextBtn.addEventListener('click', handleNextBtn)
prevBtn.addEventListener('click', handlePrevBtn)

// Moje obliczanie wyniku

const submitBtn = document.querySelector('.form__box-submit-btn')
const h2Result = document.querySelector('.form__box-h2-result')
const spanResult = document.querySelector('.form__box-span')

const getAttackNumber = () => {
	const radioElement = document.getElementsByName('atack-form')

	for (i = 0; i < radioElement.length; i++) {
		if (radioElement[i].checked) {
			document.querySelector('.temp-span').innerHTML = radioElement[i].value
		}
	}

	h2Result.style.display = 'block'
}

// submitBtn.addEventListener('click', getAttackNumber);

// Moje obliczanie wyniku 2:

const getAllResults = () => {
	const radioElementAtack = document.getElementsByName('atack-form')
	const radioElementSetting = document.getElementsByName('setter-form')
	const radioElementBlock = document.getElementsByName('block-form')
	const radioElementPass = document.getElementsByName('pass-form')
	const radioElementReceive = document.getElementsByName('receive-form')
	const radioElementServe = document.getElementsByName('serve-form')

	const myTable = [
		radioElementAtack,
		radioElementSetting,
		radioElementBlock,
		radioElementPass,
		radioElementReceive,
		radioElementServe,
	]

	let myScore = 0

	const showAllResults = () => {
		for (let i = 0; i < myTable.length; i++) {
			for (let j = 0; j < myTable[i].length; j++) {
				if (myTable[i][j].checked) {
					const convertString = parseInt(myTable[i][j].value)
					myScore += convertString
				}
			}
		}
	}

	showAllResults()

	console.log(myScore)
	h2Result.style.display = 'block'
	spanResult.textContent = Math.round((myScore / 6) * 100) / 100
}

submitBtn.addEventListener('click', getAllResults)
