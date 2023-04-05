/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

const PROCESS_SHOWROOM = 'ProcessShowroom'
const PROCESS_CHILL = 'ProcessChill'
const PROCESS_SILENT = 'ProcessSilent'
const PILOTAGE_SHOWROOM = 'PilotageShowroom'
const PILOTAGE_CHILL = 'PilotageChill'
const PILOTAGE_SILENT = 'PilotageSilent'
const MANAGERS_SHOWROOM = 'ManagersShowroom'
const MANAGERS_CHILL = 'ManagersChill'
const MANAGERS_SILENT = 'ManagersSilent'

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    listenShowroomPopups(PROCESS_SHOWROOM, "Processus & Transformation")
    listenChillPopups(PROCESS_CHILL)
    listenSilentPopups(PROCESS_SILENT)
    listenShowroomPopups(PILOTAGE_SHOWROOM, "Pilotage")
    listenChillPopups(PILOTAGE_CHILL)
    listenSilentPopups(PILOTAGE_SILENT)
    listenShowroomPopups(MANAGERS_SHOWROOM, "Managers")
    listenChillPopups(MANAGERS_CHILL)
    listenSilentPopups(MANAGERS_SILENT)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

const listenShowroomPopups = (area: string, squad: string) => {
    WA.room.area.onEnter(area).subscribe(() => {
        currentPopup = WA.ui.openPopup(area+"Popup", "Bienvenue !\nÀ ma droite, vous trouverez des liens utiles mis à disposition par la Squad "+squad, [])
    })
    WA.room.area.onLeave(area).subscribe(closePopup)
}

const listenChillPopups = (area: string) => {
    WA.room.area.onEnter(area).subscribe(() => {
        currentPopup = WA.ui.openPopup(area+"Popup", "À ma gauche se trouve un espace détente.", [])
    })
    WA.room.area.onLeave(area).subscribe(closePopup)
}

const listenSilentPopups = (area: string) => {
    WA.room.area.onEnter(area).subscribe(() => {
        currentPopup = WA.ui.openPopup(area+"Popup", "En entrant dans cette salle d'isolement, vous ne serrez dérangé par personne.", [])
    })
    WA.room.area.onLeave(area).subscribe(closePopup)
}

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
