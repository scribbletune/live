# Action Plan

Note: Using "to-do" with hypen in the free text to differentiate from non-hypen version that is reserved solely for search tools (like VSCode TO-DO Tree extension) that compile actionable lists.

## TO-DOs

In addition to the to-do's sprinkled throughout the code, this file contains kind of a roadmap.

It is also a thinking-out-loud place, to capture ideas for future features.

### General App

1. TODO Theme changer
1. TODO Better components framework (with useful components like number input with spinner), see promising <https://www.primefaces.org/primereact/showcase/#/inputnumber>
1. TODO About page - show versions of app, scribbletune, tone, react, and any other important packages. Link to Github issues.

### Baseline Features

(see duplicaes in the code)

1. TODO Performance improvements, remove unnecessary renders and updates (e.g. fix volume sliding throws delays in, fix Clip unnecessary re-renders)
 @see <https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down> revisit useCallback()

1. TODO Divert channel play skip errors into a skip counter and some UI notification (perhaps in Transport component?) that is cleared with time, instead of permanent error icon (@see onChannelEvent)
1. TODO Aligned Clips - Use alignment on start (current code `if (near zero) ...` prevents aligning)
1. TODO Channel mute (helpful for "Play Row" button)
1. TODO Midi mirror output option (for all or select channels, e.g. to mirror playback to a rack)
1. TODO Master volume + mute (useful when e.g. Midi output is used)
1. TODO Metronome
1. TODO Clip names
1. TODO Clip colors
1. TODO Clip 'ditto', drag'n'drop
1. TODO Recording play performance - Track record, rewind, replay buttons, export to file (Tone.Transport keeps recording of events, maybe on notes level, need something like clip-level?)
1. TODO Clip record (from MIDI in?) -> parse into primitives (notes, pattern)
1. TODO Move sounds / sample(r)s to CDN, load custom sounds (links in track file - it should be possible already)
1. TODO Allow to combine channels into one instrument (e.g. percussion)
1. TODO Recording clips from e.g. MIDI
1. TODO Repo /search / marketplace of track files

### Roadmap to the Editors

All editors should handle both loaded object and file's source code representation (e.g. preserve any functions, comments) and keep them in sync. Open/Save (without edits) should produce same exact file.

#### Overall Goals

* Clip Editor
* Channel editor (instrument selector),
* Add/remove channel, add/remove clip
* Drag&drop clips (move/copy)
* Lead sheet editor
* Raw track code editor

1. TODO Parse raw code of loadable track file, and annotate track data, e.g. `pattern` contains result, `patternGen` would contain code snipet that created that pattern. Same for notes, chords, etc. - `xxxGen`
1. TODO Ability to 'apply' or 're-generate', i.e. run all generators to re-calculate pattern, notes, etc.
1. TODO Reverse generator? E.g. take notes or chords sequence and map back to the scale of the key signature. Given scale 'C major', chords 'C G Am F' -> produce code `notes = notes(chords(keySignature, 'I V IV vi'))` or such.
1. TODO Continue improving ClipEditor.js toward a functional level. Implementation should use `xxxGen` when present.

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
