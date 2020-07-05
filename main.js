const passwords = ["depression", "sad", "lonely"];


//losowanie hasła
const min = 0;
const max = passwords.length - 1;
const currentPassword =  passwords[Math.floor(Math.random() * (max-min+1) + min)];

//tworzenie miejsca na hasło
const passwordLetters = [...currentPassword];
const passwordBox = document.querySelector('.password_box');
for( passwordLetter of passwordLetters ){

    const passwordBoxItem = document.createElement('div');

    passwordBox.appendChild(passwordBoxItem);
    passwordBoxItem.classList.add('password_box_item');
    passwordBoxItem.setAttribute('value', passwordLetter);
}

//ustawienie ilości ruchów
let movesQuantity = passwordLetters.length + 3;
let movesCounter = document.querySelector('.moves_counter');
movesCounter.innerHTML = movesQuantity;

//co ma się dziać po kliknięciu w litery
const alphabet = document.querySelectorAll('.letter_box_item');
for( alphabetItem of alphabet){

    // console.log(alphabetItem.innerText);

    alphabetItem.addEventListener('mouseup', function(){

        this.setAttribute('disabled', '');
        movesQuantity--;
        movesCounter.innerHTML = movesQuantity;
        checkPassword(this.innerText);
        checkAllPassword()

    }, false);
}



//animacja szubienicy
function gallows(){

    const gallowsImg = document.querySelector('.gallows_item--path');
    let gallowsProgress = 50/movesQuantity;
    gallowsImg.style.clip = `rect( auto auto ${gallowsProgress}vh auto)`;

}


//sprawdzenie czy kliknięta litera występuje w haśle
function checkPassword(currentLetter){
    
    let checkPasswordLetter;
    for( passwordLetter of passwordLetters ){
        
        if( passwordLetter.toLowerCase() == currentLetter.toLowerCase() ){
            // console.log('true');
            checkPasswordLetter += 'true';
            
        }
        else{
            // console.log('false');
            checkPasswordLetter += 'false';
        }
    }
    
    if( checkPasswordLetter.indexOf('true') != -1 ){
        showLetter(currentLetter.toLowerCase());
    }
    else{
        gallows();
    }

}

const passwordElements = document.querySelectorAll('.password_box_item');

//wyświetlenie litery w haśle
function showLetter(letter){

    for( passwordElement of passwordElements){
        // console.log(passwordElement.getAttribute('value').toLowerCase());
        if( passwordElement.getAttribute('value').toLowerCase() == letter){
            passwordElement.innerText = letter;
        }
    }

}

//sprawdzenie czy wszytkie litery zostały odgadnięte
function checkAllPassword(){
    let passwordProgress = true;
    for( passwordElement of passwordElements){
        if( passwordElement.innerText == "" ){
            passwordProgress = false;
        }
    }

    if( movesQuantity == 0 && passwordProgress == false){
        lost();
    }

    if( passwordProgress == true ){
        win();
    }
}


//wyświetlenie wyniku
const scoreContainer  = document.querySelector('.score_container');
const scoreTitle = document.querySelector('.score_content h3');
const scoreBtn = document.querySelector('.score_content p');
const passwordFinish = document.querySelector('.password_box');

function win(){
    scoreTitle.innerText = "You win!"
    document.querySelector('.score_content').insertBefore(passwordFinish,scoreBtn);
    scoreContainer.style.display = "block";
}
function lost(){
    scoreTitle.innerText = "You lost."
    for( passwordElement of passwordElements){
        passwordElement.innerText = passwordElement.getAttribute('value').toLowerCase();
    }
    document.querySelector('.score_content').insertBefore(passwordFinish,scoreBtn);
    scoreContainer.style.display = "block";
}
scoreBtn.addEventListener('click', function(){
    location.reload();
});