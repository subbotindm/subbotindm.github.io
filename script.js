document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: 'Какого цвета небо?',
            answers: [
                { text: 'Синего', correct: true },
                { text: 'Зелёного', correct: false },
                { text: 'Красного', correct: false },
                { text: 'Жёлтого', correct: false }
            ]
        },
        {
            question: 'Сколько дней в году?',
            answers: [
                { text: '365', correct: true },
                { text: '360', correct: false },
                { text: '366', correct: false },
                { text: '364', correct: false }
            ]
        },
        {
            question: 'Что является столицей Франции?',
            answers: [
                { text: 'Париж', correct: true },
                { text: 'Лондон', correct: false },
                { text: 'Рим', correct: false },
                { text: 'Берлин', correct: false }
            ]
        }
    ];

    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-button');

    let currentQuestionIndex = 0;
    let shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    startQuiz();

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    function startQuiz() {
        currentQuestionIndex = 0;
        nextButton.classList.add('hide');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.dataset.correct = answer.correct;
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        setStatusClass(selectedButton, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
        });
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            nextButton.innerText = 'Перезапустить';
            nextButton.classList.remove('hide');
            nextButton.addEventListener('click', () => location.reload());
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }
});
