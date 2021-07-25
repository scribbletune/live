import { Session } from 'scribbletune';
import { GET_DATA } from './gql';

const Tone = window.Tone;
Tone.Transport.bpm.value = 138;

const getResolvers = track => {
  const channels = track.channels.map(ch => {
    const channelClips = ch.clips.map(cl => {
      try {
        let clipObj;
        if (cl.clipStr) {
          /*eslint-disable */
          clipObj = JSON.parse(cl.clipStr);
          /*eslint-enable */
        }
        if (clipObj.pattern) {
          cl.pattern = clipObj.pattern;
        }

        if (clipObj.notes) {
          cl.notes = clipObj.notes;
        }

        if (clipObj.randomNotes) {
          cl.randomNotes = clipObj.randomNotes;
        }
      } catch (e) {}

      return cl;
    });
    ch.clips = channelClips;
    return ch;
  });
  const trackSession = new Session(channels);

  const setChannelVolume = (channelId, volume) => {
    // Change volume of the active clip on the channelId
    trackSession.channels[channelId].volume = volume;

    // Change volume of the player
    if (trackSession.channels[channelId].player) {
      trackSession.channels[channelId].player.volume.value = volume;
    }

    // Change volume of the sampler
    if (trackSession.channels[channelId].sampler) {
      trackSession.channels[channelId].sampler.volume.value = volume;
    }
  };

  return {
    Mutation: {
      startStopTrack: (_root, { isPlaying }, { cache }) => {
        const existingData = cache.readQuery({
          query: GET_DATA,
        });

        const data = {
          ...existingData,
          isPlaying,
        };

        // If "Start" is requested then start it only if not already started
        if (!existingData.isPlaying && isPlaying) {
          Tone.Transport.start();
        }

        // If "Stop" is requested then start it only if not already started
        if (existingData.isPlaying && !isPlaying) {
          // Stop any playing clip as well
          data.channels = existingData.channels.map(ch => {
            // trackSession.channels[ch.idx].stopClip(ch.activeClipIdx);
            return { ...ch, activeClipIdx: -1 };
          });
          Tone.Transport.stop();
        }

        cache.writeData({
          data,
        });
        return null;
      },
      playRow: (_root, { activeClipIdx }, { cache }) => {
        const existingData = cache.readQuery({
          query: GET_DATA,
        });
        if (!existingData.isPlaying) {
          Tone.Transport.start();
        }

        const newChannels = existingData.channels.map(ch => {
          trackSession.channels[ch.idx].startClip(activeClipIdx);
          setChannelVolume(ch.idx, ch.volume);
          return {
            ...ch,
            activeClipIdx,
          };
        });

        cache.writeData({ data: { channels: newChannels, isPlaying: true } });
        return null;
      },

      stopClip: (_root, { channelId }, { cache }) => {
        const existingData = cache.readQuery({
          query: GET_DATA,
        });
        const newChannels = existingData.channels.map(ch => {
          const newChannel = { ...ch };
          if (ch.idx === channelId) {
            newChannel.activeClipIdx = -1;
          }
          return newChannel;
        });
        cache.writeData({ data: { channels: newChannels } });
        // Stop the active clip on the channelId passed in this method
        trackSession.channels[channelId].stopClip(
          existingData.channels[channelId].activeClipIdx
        );
        return null;
      },

      playClip: (_root, { channelId, clipId }, { cache }) => {
        const existingData = cache.readQuery({
          query: GET_DATA,
        });
        let volume;
        const newChannels = existingData.channels.map(ch => {
          const newChannel = {
            ...ch,
          };
          if (ch.idx === channelId) {
            newChannel.activeClipIdx = clipId;
            // play the new clip
            volume = ch.volume;
          }
          return newChannel;
        });
        cache.writeData({
          data: {
            channels: newChannels,
          },
        });
        // Start the active clip on the channelId passed in this method
        trackSession.channels[channelId].startClip(clipId);
        setChannelVolume(channelId, volume);
        return null;
      },

      setVolume: (_root, { channelId, volume }, { cache }) => {
        const existingData = cache.readQuery({
          query: GET_DATA,
        });
        const newChannels = existingData.channels.map(ch => {
          const newChannel = { ...ch };
          if (ch.idx === channelId) {
            newChannel.volume = volume;
            // set channel volume
          }
          return newChannel;
        });
        cache.writeData({
          data: {
            channels: newChannels,
          },
        });
        setChannelVolume(channelId, volume);
        return null;
      },

    },
  };
};

export default getResolvers;
