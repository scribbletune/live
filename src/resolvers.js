import { GET_DATA } from './gql';

export default {
  Mutation: {
    playRow: (_root, { activeClipIdx }, { cache }) => {
      const existingData = cache.readQuery({
        query: GET_DATA,
      });
      const newChannels = existingData.channels.map(ch => {
        if (ch.activeClipIdx > -1) {
          // stop the current clip
        }
        // play the clip at ch.activeClipIdx
        return {
          ...ch,
          activeClipIdx,
        };
      });
      cache.writeData({ data: { channels: newChannels } });
      return null;
    },

    stopClip: (_root, { channelId }, { cache }) => {
      const existingData = cache.readQuery({
        query: GET_DATA,
      });
      const newChannels = existingData.channels.map(ch => {
        const newChannel = { ...ch };
        if (ch.idx === channelId) {
          // stop the clip at ch.activeClipIdx
          newChannel.activeClipIdx = -1;
        }
        return newChannel;
      });
      cache.writeData({ data: { channels: newChannels } });
      return null;
    },

    playClip: (_root, { channelId, clipId }, { cache }) => {
      const existingData = cache.readQuery({
        query: GET_DATA,
      });
      const newChannels = existingData.channels.map(ch => {
        const newChannel = { ...ch };
        if (ch.idx === channelId) {
          if (ch.activeClipIdx > -1) {
            // stop the clip at ch.activeClipIdx
          }
          newChannel.activeClipIdx = clipId;
          // play the new clip
        }
        return newChannel;
      });
      cache.writeData({ data: { channels: newChannels } });
      return null;
    },

    addRow: (_root, { needlessVar }, { cache }) => {
      const existingData = cache.readQuery({
        query: GET_DATA,
      });
      const newData = {
        channels: existingData.channels.map(ch => {
          const newChannel = { ...ch };
          newChannel.clips.push({
            idx: ch.clips.length,
            channelId: ch.idx,
            activeClipIdx: ch.activeClipIdx,
            pattern: '',
            notes: '',
            randomNotes: '',
            subdiv: '4n',
            dur: '4n',
            __typename: 'Clip',
          });
          return newChannel;
        }),
      };
      cache.writeData({ data: newData });
      return null;
    },
  },
};
