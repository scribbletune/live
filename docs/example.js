scribble.clip({ sample: '/sounds/CH.wav', pattern: '[xxx]'.repeat(7) + '[xx[xx]]'  }).start();
scribble.clip({ sample: '/sounds/fx1.wav', pattern: '----x-----------'  }).start();
scribble.clip({ sample: '/sounds/fx2.wav', pattern: '------------x---'  }).start();
scribble.clip({ sample: '/sounds/KickF.wav', pattern: 'x'.repeat(7) + '[xx]'  }).start();

scribble.clip({ sample: '/sounds/Snare.wav', pattern: '-x'  }).start();
scribble.clip({ sample: '/sounds/OH.wav', pattern: '-x'.repeat(7) + 'xx'  }).start();

scribble.clip({ sample: '/sounds/Bass.wav', pattern: '[xxx]'.repeat(15) + '-'  }).start();


scribble.clip({
	synth: 'PolySynth',
	pattern: 'x---x-',
	notes: 'Cm7 Fm7 Em7 Fm7'
}).start();

Tone.Transport.bpm.value = 135;
Tone.Transport.start();