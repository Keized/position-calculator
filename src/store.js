import { browser } from '$app/env';
import { writable } from 'svelte/store';

const defaultPreferences = {
    capital: 1000,
    maxLossPerTrade: 1
};

let storedPreferences;

if (browser) {
    storedPreferences = localStorage.getItem('preferences');
    if (storedPreferences) {
        storedPreferences = JSON.parse(storedPreferences);
    }
}

if (!storedPreferences) {
    storedPreferences = defaultPreferences;
}

export const preferences = writable(storedPreferences);

if (browser) {
    preferences.subscribe(value => {
        localStorage.setItem('preferences', JSON.stringify(value))
    });
}