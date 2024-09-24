const countries = [
    'algeria', 'angola', 'benin', 'botswana', 'burkina faso',
    'burundi', 'cameroon', 'cape verde', 'CAR', 'chad',
    'comoros', 'djibouti', 'DRC', 'egypt', 'equatorial guinea',
    'eritrea', 'eswatini', 'ethiopia', 'gabon', 'ghana',
    'guinea', 'guinea-bissau', 'ivory coast', 'kenya', 'lesotho',
    'liberia', 'libya', 'madagascar', 'malawi', 'mali',
    'mauritania', 'mauritius', 'morocco', 'mozambique', 'namibia',
    'niger', 'nigeria', 'republic of the congo', 'rwanda', 'western sahara',
    'sao tome and principe', 'senegal', 'seychelles', 'sierra leone', 'somalia', 
    'somaliland', 'south africa', 'south sudan', 'sudan', 'tanzania', 'the gambia',
    'togo', 'tunisia', 'uganda', 'zambia', 'zimbabwe',
];

let currentCountryIndex = 0;
let triesLeft = 5;

const countryImage = document.getElementById('country-image');
const feedback = document.getElementById('feedback');
const triesDisplay = document.getElementById('tries-left');

// columns = 1-14, 15-28, 29-42, 43-56
const columns = [
    document.getElementById('column-1'),
    document.getElementById('column-2'),
    document.getElementById('column-3'),
    document.getElementById('column-4')
];

countries.forEach((country, index) => {
    const listItem = document.createElement('li');
    listItem.id = `question-${index}`;

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Type country name';
    inputField.id = `input-${index}`;
    inputField.disabled = index !== 0; // Only the first input is enabled at the start

    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkAnswer(index, inputField.value.trim().toLowerCase());
        }
    });

    listItem.innerHTML = `${index + 1}. `;
    listItem.appendChild(inputField);

    const columnIndex = Math.floor(index / 14);
    columns[columnIndex].appendChild(listItem);
});

function loadCountry() {
    if (currentCountryIndex >= countries.length) {
        feedback.textContent = 'Quiz Complete!';
        return;
    }

    const countryName = countries[currentCountryIndex];
    countryImage.src = `images/${countryName}.png`; 
    feedback.textContent = '';
    triesDisplay.textContent = triesLeft; 
}

function resetTries() {
    triesLeft = 5; //  reset tries to 5
    triesDisplay.textContent = triesLeft; // Update the display
}

function checkAnswer(index, answer) {
    const correctAnswer = countries[index].toLowerCase();
    const questionItem = document.getElementById(`question-${index}`);

    if (answer === correctAnswer) {
        questionItem.innerHTML = `${index + 1}. ${countries[index]} <span class="checkmark">✓</span>`;
        currentCountryIndex++;
        resetTries(); 
        if (currentCountryIndex < countries.length) {
            document.getElementById(`input-${currentCountryIndex}`).disabled = false; 
            document.getElementById(`input-${currentCountryIndex}`).focus(); 
        }
        loadCountry();
    } else {
        triesLeft--;
        triesDisplay.textContent = triesLeft;

        if (triesLeft === 0) {
            questionItem.innerHTML = `${index + 1}. ${countries[index]} <span class="cross">×</span>`;
            currentCountryIndex++;
            resetTries(); // Reset tries after all attempts are used
            if (currentCountryIndex < countries.length) {
                document.getElementById(`input-${currentCountryIndex}`).disabled = false; 
                document.getElementById(`input-${currentCountryIndex}`).focus(); 
            }
            loadCountry();
        } else {
            feedback.textContent = 'Incorrect! Try again.';
        }
    }
}


document.getElementById('restart-btn').addEventListener('click', function() {
    location.reload();

});


loadCountry();

