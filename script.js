const keys = [
	['C4', 'a'], ['Db4', 'w'], ['D4', 's'], ['Eb4', 'e'], ['E4', 'd'],
	['F4', 'f'], ['Gb4', 't'], ['G4', 'g'], ['Ab4', 'y'], ['A4', 'h'],
	['Bb4', 'u'], ['B4', 'j'], ['C5', 'k'],
];

const keyboard = document.getElementById('keyboard');
const sounds = {};

keys.forEach(([note, hotkey]) => {
	// preload audio
	sounds[note] = new Audio(`./piano-mp3/${note}.mp3`);

	// build key button
	const btn = document.createElement('button');
	btn.className = `key ${note.includes('b') ? 'black' : 'white'}`;
	btn.dataset.key = hotkey;
	btn.dataset.note = note;
	btn.innerHTML = `<span class="note">${note}</span><span class="binding">${hotkey.toUpperCase()}</span>`;
	keyboard.appendChild(btn);
});

function play(btn) {
	const note = btn.dataset.note;
	const audio = sounds[note];
	if (!audio) return;
	audio.currentTime = 0;
	audio.play();
	btn.classList.add('active');
	setTimeout(() => btn.classList.remove('active'), 140);
}

keyboard.addEventListener('click', (e) => {
	const btn = e.target.closest('.key');
	if (btn) play(btn);
});

document.addEventListener('keydown', (e) => {
	const btn = keyboard.querySelector(`[data-key="${e.key.toLowerCase()}"]`);
	if (btn) play(btn);
});
