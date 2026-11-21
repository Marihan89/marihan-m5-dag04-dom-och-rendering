// Dag 4: Funktioner som bygger sidans innehåll med DOM. Gör alla tester gröna på tests.html.
// Röda understrykningar tills du skrivit return är normalt. ratt.bild och ratt.beskrivning är valfria (string | undefined): använd ?? "" för att få en text.
// Regel: använd createElement och textContent. Använd INTE innerHTML med data.
import { formateraPris } from './pris'
import type { Ratt } from './typer'

// 1. Bygger ett kort för en rätt och returnerar det (anropar inte append själv).
//    <article data-id="1">
//      <img src="..." alt="Illustration av kardemummabulle">
//      <h3>Kardemummabulle</h3>
//      <p>Beskrivning</p>
//      <p class="pris">35 kr</p>
//    </article>
export function skapaRattKort(ratt: Ratt): HTMLElement {
    // TODO
    const card = document.createElement('article')
    card.dataset.id = String(ratt.id)
    const image = document.createElement('img')
    image.src = ratt.bild ? ratt.bild : '...'
    image.alt = 'Illustration av kardemummabulle'
    const h = document.createElement('h3')
    h.textContent = ratt.namn
    const p1 = document.createElement('p')
    p1.textContent = ratt.beskrivning ? ratt.beskrivning : null
    const p2 = document.createElement('p')
    p2.textContent = formateraPris(ratt.pris)
    p2.classList.add('pris')
    card.append(image)
    card.append(h)
    card.append(p1)
    card.append(p2)

    return card
}

// 2. Töm containern och lägg in ett kort per rätt.
//    Är listan tom: visa <p class="tom">Inga rätter hittades.</p> istället.
export function visaMeny(container: HTMLElement, ratter: Ratt[]): void {
    // TODO
    // TODO
    container.replaceChildren()
    if (ratter.length > 0) {
        for (const r of ratter) container.append(skapaRattKort(r))
    } else {
        const p = document.createElement('p')
        p.textContent = 'No Dishes available Now.'
        p.classList.add('tom')
        container.append(p)
    }
}

// 3. Sätt rubrikens text: "Meny (8 rätter)". Ett enda: "Meny (1 rätt)".
export function uppdateraRubrik(element: HTMLElement, antal: number): void {
    // TODO
    if (antal > 0) {
        if (antal === 1) element.textContent = 'Meny (1 rätt)'
        else element.textContent = 'Meny (8 rätter)'
    }
}

// 4. Markera EN rätt som dagens rätt: klassen "dagens" ska finnas på kortet med rätt
//    data-id, och inte på något annat kort. Anropas igen = markeringen flyttas.
export function markeraDagensRatt(container: HTMLElement, id: number): void {
    // TODO

    const exist = container.querySelector<HTMLElement>('.dagens')
    if (exist) {
        for (const c of container.querySelectorAll('article')) {
            c.classList.toggle('dagens', c.dataset.id === String(id))
        }
    } else {
        let card = container.querySelector<HTMLElement>(
            `article[data-id="${id}"]`
        )
        card?.classList.add('dagens')
    }
}
