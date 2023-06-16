const passLength = document.querySelector('[data-length]');
const slider = document.querySelector('.slider');
const checkbox = document.querySelectorAll('.check');
const password = document.querySelector('[data-password]');
const generate = document.querySelector('.generate');
const strength = document.querySelector('[data-strength-indicator]');
const copyText = document.querySelector('.copy-text');
const tooltip = document.querySelector('.tooltip');
const checkIcons = document.querySelectorAll('.check-icon');

const source = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz","0123456789","!@#$%^&*-+?/][}{)("];

function defaultSetting() {
        let defaultVal = slider.max/2;
        slider.value = defaultVal;
        passLength.textContent = defaultVal;
        slider.style.backgroundSize = ((slider.value)*100)/(slider.max) + "% 100%";
        password.value = "";
        strength.style.cssText = 'background-color: #CCC; box-shadow: 0px 0px 12px #CCC;';
}

function checkOptionsSelected(arr) {

    let optionsSelected = 0;
    let sourceMain = "";

    for(let i=0; i < 4; i++) {
        if(checkbox[i].checked) {
            ++optionsSelected;
            let randomCharInd = Math.floor(Math.random()*source[i].length);
            arr.unshift(source[i].charAt(randomCharInd));
            sourceMain += source[i];
        }
    }

    if(optionsSelected < slider.value){
        let remainingStartInd = optionsSelected;
        for(let i=remainingStartInd; i < slider.value; i++) {
            let randomCharInd = Math.floor(Math.random()*sourceMain.length);
            arr.push(sourceMain.charAt(randomCharInd));
        }
    }
    else{
        slider.value = optionsSelected;
        passLength.textContent = slider.value;
    }

    return optionsSelected;
}

function randomize(arr) {
    for(let i=0; i < arr.length/2; i++) {
        let temp = null;
        let randInd1 = Math.floor(Math.random()*arr.length);
        let randInd2 = Math.floor(Math.random()*arr.length);
        if(randInd1 !== randInd2) {
            temp = arr[randInd1];
            arr[randInd1] = arr[randInd2];
            arr[randInd2] = temp;
        }
    }
}

function indicateStrength(optionsSelected,length) {
   if(optionsSelected > 2 && length >= 8){
        strength.style.cssText = 'background-color: green; box-shadow: 0px 0px 12px green;';
   }
   else if(length <= 6 || optionsSelected < 2) {
        strength.style.cssText = 'background-color: red; box-shadow: 0px 0px 12px red;';
   }
   else{
        strength.style.cssText = 'background-color: yellow; box-shadow: 0px 0px 12px yellow;';
   }
}

function genPassword() {

    let arr = [];
    let optionsSelected = checkOptionsSelected(arr);
    let length = slider.value;

    if(optionsSelected === 0){
        defaultSetting();
        return;
    }

    indicateStrength(optionsSelected,length);
    randomize(arr);
    return arr.join('');

}

slider.addEventListener('input',()=>{
    passLength.textContent = slider.value;
    slider.style.backgroundSize = ((slider.value)*100)/(slider.max) + "% 100%";
});

generate.addEventListener('click',() => {
    let pass = genPassword();
    if(pass !== undefined)
        password.value = pass;
});

copyText.addEventListener('click',async () => {
    if(password.value) {
        await navigator.clipboard.writeText(password.value);
        if(!tooltip.classList.contains('active')) {
            tooltip.classList.add('active');
        }
        setTimeout(()=>{
            if(tooltip.classList.contains('active')) {
                tooltip.classList.remove('active');
            }
        },2000);
    }
});

for(let i=0; i < 4; i++) {
    checkIcons[i].addEventListener('click',()=>{
        if(checkbox[i].checked) {
            checkbox[i].checked = false;
        }
    });   
}

defaultSetting();