//  const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"; 

const dropdowns = document.querySelectorAll (".dropdown select");
const btn = document.querySelector( "form button");
const fromCurr = document.querySelector (".from select");
const toCurr = document.querySelector (".to select");
const msg = document.querySelector(".msg");

document.addEventListener("Load" , () => [
         updateExchangeRate()
])

// for (code in countryList) {
//     console.log (code , countryList[code]);
// }

for (let select of dropdowns) {
    for (currCode in countryList) {
         let newOption = document.createElement("option");
         newOption.innerText = currCode;
         newOption.value = currCode;

         if (select.name === "from" && currCode ==="USD" ) {
            newOption.selected = "selected"
         } else if (select.name === "to" && currCode ==="INR" ) {
            newOption.selected = "selected"
         }

         select.append(newOption);
 }

select.addEventListener ("change" , (evt) => {    //evt = event object//
    updateFlag(evt.target);      // evt.target =jb bhi kuch change laya to change kaha aaya//
 });
}
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input ");
let amountVal =  amount.value; 
// console.log (amountVal);
if (amountVal === "" || amountVal <1 ) {
    amountVal = 1;
    amount.value = "1";
}
// console.log (fromCurr.value , toCurr.value);

//  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

 let response = await  fetch (URL);
 let data = await response.json();
//  console.log (response);
let rate = data [toCurr.value.toLowerCase()];
//  console.log(data);
console.log (rate);

let finalAmount = amountVal * rate ;
msg.innerText =  `${amountVal} ${fromCurr.value} =  ${finalAmount} ${toCurr.value}`;
}


const updateFlag = (element) => {
    // console.log(element);
  
    let currCode = element.value; // apne element se currcode ko extract krwayge     // and element ki value = currCode
    // console.log (currCode);
    let countryCode = countryList[currCode]; //IN , EU//   // i.e country code se img change ho flag ki//
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");   // for accessing img in out html we see element k andr parent elem h select-container jsime img hai//
    img.src = newSrc;
}



btn.addEventListener ("click" ,  (evt) => {
        evt.preventDefault();   // means html m page refresh pr jo b kaam hore the (i.e form k button pr click krne p br br refresh hora tha changes k liye) , wo ab bnd hojege sb kaam//
        updateExchangeRate();
    });


window.addEventListener("Load" , () => {
        updateExchangeRate();
});

