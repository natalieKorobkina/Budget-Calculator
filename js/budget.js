const incList = document.querySelector (".inc-array");
const expList = document.querySelector (".exp-array");
const btn = document.querySelector (".add");
const bgForm = document.querySelector (".bg-form");
const totalBudget = document.querySelector (".bd-value");
const listOfIncs = document.getElementById ("incarray");
const listOfExps = document.getElementById ("exparray");

let arrExp = [];
let arrInc = [];
let numberIncItems = 0;
let numberExpItems = 0;

class BudgetItem {
    constructor (discr, val, type, id) {
        this.discription = discr;
        this.value = val;
        this.type = type;
        this.id = id;
        this.perc = '';
    }
newItem (arr, numberItems, percExp, str) {
        return `<div class="sf-item" id="inc-${numberItems}">
        <div class = "item-desc">${arr[numberItems].discription}</div>
        <div class = "right-side-item">${str}${arr[numberItems].value}<div class = "item-percent">${percExp}</div></div>
        <i id = ${numberItems} class="ion-ios-close-outline"></i>
                </div>`;
    }
};

function total () {
    let totalInc = document.querySelector (".total-inc");
    let totalExp = document.querySelector (".total-exp");
    let expPerc = document.querySelector ("#expper");
    let percOfItems = document.querySelectorAll ('.exp-array .item-percent');
    
    let forInc = 0;
    let forExp = 0;
    for (const ind in arrInc) {
        forInc += arrInc[ind].value;
    }
    for (const ind in arrExp) {
        forExp += arrExp[ind].value;
    }
    totalInc.textContent = `+$${(forInc).toFixed (2)}`;
    totalExp.innerText = `-$${(forExp).toFixed (2)}`;
    totalBudget.innerText = `$${(forInc-forExp).toFixed (2)}`;
    if (forInc > 0) {
        expPerc.textContent = `${(forExp * 100 / forInc).toFixed (0)}%`;
    } else {
        expPerc.textContent = `--%`;
    }
        for (let i = 0; i < arrExp.length; i++) {
        if (forInc > 0) {
            percOfItems[i].textContent = `${(arrExp[i].value * 100 / forInc).toFixed (0)}%`; 
        } else {
            percOfItems[i].textContent = `--%`;
        }
    }
}  


const checkFields = function (inpDisc, inpValue) {
    if ((inpDisc === "") || (inpValue === "") || (parseInt(inpValue) < 0) || (parseInt(inpDisc) < 0)) {
       return false; 
    } 
    return true;
}

let btId = 0;
let var2 = 0;
let var3 = 0;

let btId2 = 0;
let var22 = 0;
let var32 = 0;

listOfIncs.addEventListener ("click", function (e) {
    if (e.target.className === "ion-ios-close-outline") {
        var2 = e.target;
        btId = var2.getAttribute ('id');
        for (const ind in arrInc) {
            if (arrInc[ind].id === parseInt(btId)) {
                delete arrInc[ind];
            }
        }
        // to get rid of empty objects
        let filtered = arrInc.filter(function (el) {
            return el != null;
        });
        arrInc = filtered;
        //arrInc.splice (parseInt(btId), 1);
        var3 = var2.parentNode;
        var3.parentNode.removeChild (var3);
        total ();
    }
});

listOfExps.addEventListener ("click", function (e) {
    if (e.target.className === "ion-ios-close-outline") {
        var22 = e.target;
        btId2 = var22.getAttribute ('id');
        for (const ind in arrExp) {
            if (arrExp[ind].id === parseInt(btId2)) {
                delete arrExp[ind];
            }
        }
        // to get rid of empty objects
        let filtered2 = arrExp.filter(function (el) {
            return el != null;
        });
        arrExp  = filtered2;
        //arrExp.splice (parseInt(btId2), 1);
        var32 = var22.parentNode;
        var32.parentNode.removeChild (var32);
        total ();
    }
});

bgForm.addEventListener ("submit", function (e) {
    e.preventDefault();
    let bgType = document.querySelector (".bd-type").value;
    let inpDisc = document.querySelector (".inp-discr").value;
    let inpValue = document.querySelector (".inp-value").value;
    
// check if valid values are in fields
    if (checkFields (inpDisc, inpValue)) {
    
        if (bgType === "inc") {
            numberIncItems = arrInc.length;
            let newBudgetItemInc = new BudgetItem (inpDisc, parseInt(inpValue), "income", numberIncItems);
            arrInc.push (newBudgetItemInc);
            let str = "+";
            incList.insertAdjacentHTML (`beforeend`, newBudgetItemInc.newItem (arrInc, numberIncItems, '', str));
        } else {
            numberExpItems = arrExp.length;
            let newBudgetItemExp = new BudgetItem (inpDisc, parseInt(inpValue), "expence", numberExpItems);
            arrExp.push (newBudgetItemExp);
            let str = "-";
            expList.insertAdjacentHTML (`beforeend`, newBudgetItemExp.newItem (arrExp, numberExpItems, "%", str));
        }
// to recalculate total values
        total ();
// clean up after yourself
        document.getElementById ("form-id").reset ();

    }
});