import produce from 'immer';

// v3.3.0 import { Session } from 'scribbletune';
import { GET_DATA, WRITE_DATA } from './gql';

const getResolvers = (mutationObservers) => ({
  // mutationObservers object contains callback functions for direct control of the track session and transport.
  // Alternative method to observe ApolloClient query data has additional latency of ~10ms.

  Query: {
    // this resolver is required for ApolloClient to get separate channels from cache.
    // Though it needs a direct call from typePolicy.
    channels: (ref, args, { cache }) => {
      if (ref) return ref;
      const data = [];
      if (args && (args.idx || args.idx === 0)) {
        const existingData = cache.readQuery({
          query: GET_DATA,
        });
        // existingData.channels.forEach((ch) => {
        //   if (ch.idx === args.idx) {
        //     data.push(ch);
        //   }
        // });
        data.push(existingData.channels[args.idx]);
      }
      // console.log('resolvers::channels(%o) return=%o', args, data);
      return data;
    },
  },

  Mutation: {
    // TODO: Refactor to use cache.modify() for faster updates (since @apollo/client@3)
    // // Example monitoring network connection
    // updateNetworkStatus: (_, { isConnected }, { cache }) => {
    //   cache.writeData({ data: { isConnected } });
    //   return null;
    // },

    /* TODO: (if ever needed) local resolvers are deprecated (since @apollo/client@3),
     * per https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/
     * code should be changed to local-only fields. However, they have significant issues, and
     * the issue discussion ends up with local resolvers living indefinitely,
     * see https://github.com/apollographql/apollo-client/issues/7072#issuecomment-857214561
     * Conclusion: Do not migrate from local resolvers. Revisit if ever needed.
     */
    mutationResolverSetTempo: (_root, { tempoBpm }, { cache }) => {
      const existingData = cache.readQuery({
        query: GET_DATA,
      });

      mutationObservers.setTransportTempo(tempoBpm);

      const newData = produce(existingData, (draftState) => {
        draftState.tempoBpm = +tempoBpm;
      });
      // immer.produce() preserves the object un-modified parts

      cache.writeQuery({
        query: WRITE_DATA,
        data: newData,
        // optimisticResponse: { tempoBpm, __typename: 'Track' }, // This does not seem to make any difference. // The intent is to have Apollo push changes to observers right away. Should have effect when there's a network connection (if ever)
      });

      return null;
    },

    mutationResolverStartStopTrack: (_root, { isPlaying }, { cache }) => {
      const existingData = cache.readQuery({
        query: GET_DATA,
      });

      // console.log(
      //   'mutationResolverStartStopTrack(%o) @%o existingData.isPlaying=%o',
      //   isPlaying,
      //   Tone.now(),
      //   existingData.isPlaying
      // );

      // If "Start" is requested then start it only if not already started
      if (!existingData.isPlaying && isPlaying) {
        // console.log('mutationResolverStartStopTrack(START) @%o', Tone.now());
        mutationObservers.startTransport();
        mutationObservers.setTransportTempo(existingData.tempoBpm);
      }

      const newData = produce(existingData, (draftState) => {
        draftState.channels.map((ch, idx) => {
          // TODO: No need to stop any playing clips - stopping transport will effectively cancel all future events
          if (ch.activeClipIdx >= 0) {
            mutationObservers.stopChannelClip(idx, ch.activeClipIdx);
          }
          ch.activeClipIdx = -1;
          return ch;
        });
        draftState.isPlaying = isPlaying;
      });
      // immer.produce() preserves the object un-modified parts

      // If "Stop" is requested then stop it only if not already stopped
      if (existingData.isPlaying && !isPlaying) {
        // console.log('mutationResolverStartStopTrack(STOP) @%o', Tone.now()); // Compare time between direct intercept (here) and called from React hook
        mutationObservers.stopTransport();
      }

      cache.writeQuery({
        query: WRITE_DATA,
        data: newData,
        // optimisticResponse: { isPlaying, __typename: '??' }, // This does not seem to make any difference. // The intent is to have Apollo push changes to observers right away. Should have effect when there's a network connection (if ever)
      });
      return null;
    },

    playRow: (_root, { activeClipIdx }, { cache }) => {
      const existingData = cache.readQuery({
        query: GET_DATA,
      });
      if (!existingData.isPlaying) {
        mutationObservers.startTransport();
        mutationObservers.setTransportTempo(existingData.tempoBpm);
      }

      const newData = produce(existingData, (draftState) => {
        draftState.channels.map((ch, idx) => {
          if (ch.activeClipIdx >= 0) {
            mutationObservers.stopChannelClip(idx, ch.activeClipIdx);
          }
          ch.activeClipIdx = activeClipIdx;
          mutationObservers.startChannelClip(idx, ch.activeClipIdx);
          mutationObservers.setChannelVolume(idx, ch.volume);
          return ch;
        });
        draftState.isPlaying = true;
      });
      // immer.produce() preserves the object un-modified parts

      cache.writeQuery({
        query: WRITE_DATA,
        data: newData,
      });
      return null;
    },

    stopClip: (_root, { channelIdx }, { cache }) => {
      const existingData = cache.readQuery({
        query: GET_DATA,
      });

      const newData = produce(existingData, (draftState) => {
        draftState.channels.map((ch, idx) => {
          if (idx === channelIdx) {
            // Stop the active clip on the channel
            mutationObservers.stopChannelClip(idx, ch.activeClipIdx);
            ch.activeClipIdx = -1;
          }
          return ch;
        });
      });
      // immer.produce() preserves the object un-modified parts

      cache.writeQuery({
        query: WRITE_DATA,
        data: newData,
      });
      return null;
    },

    playClip: (_root, { channelIdx, clipId }, { cache }) => {
      const existingData = cache.readQuery({
        query: GET_DATA,
      });

      const newData = produce(existingData, (draftState) => {
        draftState.channels.map((ch, idx) => {
          if (idx === channelIdx) {
            ch.activeClipIdx = clipId;
            // play the new clip
            mutationObservers.startChannelClip(idx, ch.activeClipIdx);
            mutationObservers.setChannelVolume(idx, ch.volume);
          }
          return ch;
        });
      });
      // immer.produce() preserves the object un-modified parts

      cache.writeQuery({
        query: WRITE_DATA,
        data: newData,
      });
      return null;
    },

    setVolume: (_root, { channelIdx, volume }, { cache }) => {
      const existingData = cache.readQuery({
        query: GET_DATA,
      });

      const newData = produce(existingData, (draftState) => {
        draftState.channels.map((ch, idx) => {
          if (idx === channelIdx) {
            ch.volume = volume;
            // set channel volume
            mutationObservers.setChannelVolume(idx, volume);
          }
          return ch;
        });
      });
      // immer.produce() preserves the object un-modified parts

      cache.writeQuery({
        query: WRITE_DATA,
        data: newData,
      });

      return null;
    },
  },
});
export default getResolvers;
