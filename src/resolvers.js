import { Session } from 'scribbletune';
import { GET_DATA } from './gql';
import track from './track-init';

const Tone = window.Tone;
Tone.Transport.bpm.value = 138;

const trackSession = new Session(track.channels);

export default {
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
      const newChannels = existingData.channels.map(ch => {
        const newChannel = {
          ...ch,
        };
        if (ch.idx === channelId) {
          newChannel.activeClipIdx = clipId;
          // play the new clip
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
      return null;
    },

    addRow: (_root, { needlessVar }, { cache }) => {
      // Add clip to each channel of Scribbletune's session object
      trackSession.channels.forEach(ch => {
        ch.addClip(
          {
            idx: ch.clips.length,
            channelId: ch.idx,
            activeClipIdx: ch.activeClipIdx,
            pattern: '',
            notes: 'c4',
            randomNotes: '',
            subdiv: '4n',
            dur: '4n',
          },
          ch.clips.length
        );
      });

      // Add clip to to each channel of the UI
      const existingData = cache.readQuery({
        query: GET_DATA,
      });
      const newData = {
        channels: existingData.channels.map(ch => {
          const newChannel = {
            ...ch,
          };
          newChannel.clips.push({
            idx: ch.clips.length,
            channelId: ch.idx,
            activeClipIdx: ch.activeClipIdx,
            pattern: '',
            notes: 'c4',
            randomNotes: '',
            subdiv: '4n',
            dur: '4n',
            __typename: 'Clip',
          });
          return newChannel;
        }),
      };
      cache.writeData({
        data: newData,
      });
      return null;
    },
  },
};
