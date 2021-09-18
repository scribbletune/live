# Action Plan

Note: Using "to-do" with hypen in the free text to differentiate from non-hypen version that is reserved solely for search tools (like VSCode TO-DO Tree extension) that compile actionable lists.

## TO-DOs

In addition to the to-do's sprinkled throughout the code, this file contains kind of a roadmap.

It is also a thinking-out-loud place, to capture ideas for future features.

### General

1. TODO Host App on Netlify - need to use github branch in package.json depenencies
1. TODO Host Storybook on Netlify
1. TODO Theme changer, better framework (with useful components like number input with spinner), see promising <https://www.primefaces.org/primereact/showcase/#/inputnumber>

### Baseline

(see duplicaes in the code)

1. TODO Performance improvements, remove unnecessary renders and updates,
 @see <https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down> revisit useCallback()

1. TODO Organize components: separate toolbar, left drawer.
1. TODO Channel mute
1. TODO Master volume + mute
1. TODO Metronome
1. TODO Clip names
1. TODO Clip colors
1. TODO Clip 'ditto', drag'n'drop
1. TODO Track record, rewind, replay, export to file (Tone.Transport keeps recording of events, maybe on notes level, need something like clip-level?)
1. TODO Clip record (from MIDI in?) -> parse into primitives (notes, pattern)

### Roadmap to the Editor

1. TODO Parse raw code of loadable track file, and annotate track data, e.g. `pattern` contains result, `patternGen` would contain code snipet that created that pattern. Same for notes, chords, etc.
1. TODO Ability to 'apply' or 're-generate', i.e. run all generators to re-calculate pattern, notes, etc.
1. TODO Reverse generator? E.g. take notes or chords sequence and map back to the scale of the key signature. Given scale 'C major', chords 'C G Am F' -> produce code `notes = notes(chords(keySignature, 'I V IV vi'))` or such.
1. TODO Continue impoving ClipEditor.js toward a functional level. Implementation should use `xxxGen` when present.

### Roadmap to the TTM - Lead Sheet

1. TODO Add lead sheet 'open file'/'save file'/'edit file'
1. TODO Add lead sheet parser (text -> data)
1. TODO Add lead sheet exporter (data -> text)
1. TODO Add lead sheet data structure to the track loader
1. TODO Examples of track using lead sheet

### Roadmap to the TTM - Other

Main idea is to add textual patterns (rhythms) library, textual melodies library, something like 'drum:kick:style-reggae' (with multi-dimensional tags as style, country, era, artists, etc.) to allow picking/generating patterns from mappings to a free-form text search, which will be able to find tagged info, like '80's reggae from Brasil'. ML/AI most likely will be needed.

## Data Structures

### Lead Sheet

Parsed text into data structure for algorithm consumption. Main use is in the track / clips, to create melodies programmaticaly.

* Key signature
* Time signature
* Tempo
* Tune(s): Main melody / secondary melodies
* Lyrics

Extensions to Lead Sheet or rather a separate mid-layer place, like "Arrangement":

* Ability to change any of Key/Time/Tempo mid-track? (e.g. a clip could set new tempo for the whole track)
* 'Song' structure, e.g. verse, chorus, break (names should be arbitrary so any structures could be described) - some modularity, so composition can be described in 'modules'. That could translate into e.g. clip type
* Instrumental Arrangements
