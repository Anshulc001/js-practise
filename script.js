const notes = [
	{ note: 'C4', key: 'a' },
	{ note: 'Db4', key: 'w' },
	{ note: 'D4', key: 's' },
	{ note: 'Eb4', key: 'e' },
	{ note: 'E4', key: 'd' },
	{ note: 'F4', key: 'f' },
	{ note: 'Gb4', key: 't' },
	{ note: 'G4', key: 'g' },
	{ note: 'Ab4', key: 'y' },
	{ note: 'A4', key: 'h' },
	{ note: 'Bb4', key: 'u' },
	{ note: 'B4', key: 'j' },
	{ note: 'C5', key: 'k' }
];

const audioPath = './piano-mp3/';
const keyboard = document.getElementById('keyboard');
const audioMap = {};

notes.forEach(({ note, key }) => {
	audioMap[note] = new Audio(`${audioPath}${note}.mp3`);
	const btn = document.createElement('button');
	btn.className = `key ${note.includes('b') ? 'black' : 'white'}`;
	btn.dataset.key = key;
	btn.dataset.note = note;
	btn.innerHTML = `<span class="note">${note}</span><span class="binding">${key.toUpperCase()}</span>`;
	keyboard.appendChild(btn);
});

document.addEventListener('keydown', (e) => {
	const key = e.key.toLowerCase();
	const btn = keyboard.querySelector(`[data-key="${key}"]`);
	if (!btn) return;
	btn.classList.add('active');
	const audio = audioMap[btn.dataset.note]?.cloneNode();
	if (audio) {
		audio.currentTime = 0;
		audio.play();
	}
	setTimeout(() => btn.classList.remove('active'), 140);
});
