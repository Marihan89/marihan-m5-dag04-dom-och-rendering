// Dag 4: DOM. Kör npm run dev och titta i Console (F12).
// querySelector kan ge null om elementet saknas. Hantera det med if eller ?. (TypeScript kräver det).
// Tips: document.querySelector<HTMLElement>("#id") säger vilken sorts element du får.
import { meny } from './data'
import { visaMeny, uppdateraRubrik, markeraDagensRatt } from './ui'
import { billigast } from './meny'

// DEL 1: utforska DOM:en ----------------------------------------------
// 1. Hämta h1 med document.querySelector("h1") och skriv ut dess textContent.
// 2. Ändra texten i #hero-rubrik till "Välkommen in!"
// 3. Hämta alla länkar i menyn med document.querySelectorAll("nav a").
//    Loopa med for...of och skriv ut varje länks href och text.
// 4. Skapa ett nytt p-element (document.createElement), ge det texten
//    "Dagens tips: prova en kardemummabulle." och lägg det sist i #hero med append.
// 5. Lägg klassen "dagens" på #hero med classList.add. Ta bort den med classList.remove.
// 6. Säkerhetsförsök: sätt p.innerHTML = '<img src="x" onerror="console.log(\'Attack!\')">'
//    Vad händer i Console? Byt sedan till p.textContent med samma text. Vad händer nu?
// TODO

//  1
const h = document.querySelector('h1')
console.log(h?.textContent)

//  2
const e = document.getElementById('hero-rubrik')
// orrrrrr
//const e = document.querySelector('#hero-rubrik')
if (e) e.textContent = 'Välkommen in!'

//  3
const links = document.querySelectorAll('nav a')
for (const l of links) {
    console.log(`${l.textContent}  :  ${l}`)
}

//  4
const p = document.createElement('p')
p.textContent = 'Dagens tips: prova en kardemummabulle.'
document.querySelector(' #hero')?.append(p)

//  5
document.querySelector('#hero')?.classList.add('dagens')
document.querySelector('#hero')?.classList.remove('dagens')

//  6
p.innerHTML = '<img src="x" onerror="console.log(\'Attack!\')">' // Attack msg appears in console and img icon in the page
p.textContent = '<img src="x" onerror="console.log(\'Attack!\')">' // the text appears in the page as the paragraph text
//why you should never set `innerHTML` with text that a user or an API has written.
// because innerhtml deals with this text as html elements and could crash the structure
//or it could be even a javascript code that run unwanted functions or hacks
// And thats called Cross Site Scripting XSS

// DEL 2: koppla ihop med funktionerna i ui.js ----------------------------
// 7. Hämta #meny-lista och #meny-rubrik.
const menucontainer = document.querySelector<HTMLElement>('#meny-lista')
const menuheader = document.querySelector<HTMLElement>('#meny-rubrik')

// 8. Anropa visaMeny med menyn,
// och uppdateraRubrik med antalet rätter.

if (menucontainer && menuheader) {
    visaMeny(menucontainer, meny)
    uppdateraRubrik(menuheader, meny.length)
}
// 9. Dagens rätt = den billigaste lunchen. Använd filter och billigast (från meny.js)
//    och markeraDagensRatt.

const lunchs = meny.filter((m) => m.kategori === 'lunch')
const cheapestlunch = billigast(lunchs)
if (menucontainer && cheapestlunch) {
    markeraDagensRatt(menucontainer, cheapestlunch?.id)
}
// TODO
