import { browser } from '$app/env';
import { writable } from 'svelte/store';

const defaultPreferences = {
    capital: 1000,
    maxLossPerTrade: 1
};

const defaultSimulation = {
    entryPrice: 10,
    stopLoss: 5,
    takeProfit: 15,
    positionSize: 200,
    short: false,
    leverage: 1
};

let storedPreferences;
let currentSimulation = defaultSimulation;

if (browser) {
    storedPreferences = localStorage.getItem('preferences');
    if (storedPreferences) {
        try {
            storedPreferences = JSON.parse(storedPreferences);        
        } catch(error) {
            storedPreferences = defaultPreferences;
        }
    }
}

if (!storedPreferences) {
    storedPreferences = defaultPreferences;
}

export const preferences = writable(storedPreferences);
export const simulation = writable(currentSimulation);


if (browser) {
    preferences.subscribe(value => {
        localStorage.setItem('preferences', JSON.stringify(value))
    });
}