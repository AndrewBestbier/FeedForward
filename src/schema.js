/* In Memory Data imports */
import PlanetList, {getPlanets, getPlanetById } from './data/planets';
import RoverList, {getRovers, getRoverById } from './data/rovers';

/* GraphQL Imports */
import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLSchema,
} from 'graphql';

/* MarsChallenge Type Definitions */
const Planet = new GraphQLObjectType({
  name: 'Planet',
  description: 'This represent the Planet type',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)}
  })
});

const Rover = new GraphQLObjectType({
  name: 'Rover',
  description: 'This represent the Rover type',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)}
  })
});

/* Root Query */
const Query = new GraphQLObjectType({
  name: 'MarsChallengeSchema',
  description: 'Root of the MarsChallengeSchema Schema',
  fields: () => ({
    planets: {
      type: new GraphQLList(Planet),
      args: {
        _id: {type: GraphQLString}
      },
      description: 'List of Planets',
      resolve: function(root, {_id}) {
        if(_id) {
          return getPlanetById(_id);
        } else {
          return getPlanets();
        }
      }
    },
    rovers: {
      type: new GraphQLList(Rover),
      args: {
        _id: {type: GraphQLString}
      },
      description: 'List of Rovers',
      resolve: function(root, {_id}) {
        if(_id) {
          return getRoverById(_id);
        } else {
          return getRovers();
        }
      }
    }
  })
});

/* Defining the Schema */
const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
