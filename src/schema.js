import { GraphQLEnumType } from 'graphql';

var InstrumentEnum = new GraphQLEnumType({
  name: 'Instrument',
  values: {
    SAMPLE: { value: 'sample' },
    SAMPLER: { value: 'sampler' },
  },
});

export default InstrumentEnum;
