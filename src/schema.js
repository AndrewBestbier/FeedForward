import * as _ from 'underscore';

/* In Memory Data imports */
import RoomsList from './data/rooms';
import PostsList from './data/posts';
import CommentsList from './data/comments';

/* GraphQL standard Imports */
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

/* FeedForward Type Definitions */
const Comment = new GraphQLObjectType({
  name: 'Comment',
  description: 'This represent a Comment type',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    content: {type: new GraphQLNonNull(GraphQLString)},
    points: {type: new GraphQLNonNull(GraphQLInt)}
  })
});

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This represent a Post type',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    content: {type: new GraphQLNonNull(GraphQLString)},
    points: {type: new GraphQLNonNull(GraphQLInt)},
    comments: {
      type: new GraphQLList(Comment),
      resolve: function() {
        return CommentsList;
      }
    }
  })
});

const Room = new GraphQLObjectType({
  name: 'Room',
  description: 'This represent a Room type',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    posts: {
      type: new GraphQLList(Post),
      resolve: function() {
        return PostsList;
      }
    }
  })
});

/* Root Query */
const Query = new GraphQLObjectType({
  name: 'FeedForwardSchema',
  description: 'Root of the FeedForward Schema',
  fields: () => ({
    rooms: {
      type: new GraphQLList(Room),
      args: {
        _id: {type: GraphQLString}
      },
      description: 'List of Rooms',
      resolve: function(root, {_id}) {
        if(_id) {
          return _.filter(RoomsList, room => room._id === _id);
        } else {
          return RoomsList; /* This is for development purposes, remove so users cannot access all rooms */
        }
      }
    },
    posts: {
      type: new GraphQLList(Post),
      args: {
        _id: {type: GraphQLString}
      },
      description: 'List of Posts',
      resolve: function(root, {_id}) {
        if(_id) {
          return _.filter(PostsList, post => post._id === _id);
        } else {
          return PostsList; /* This is for development purposes, remove so users cannot access all posts */
        }
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      args: {
        _id: {type: GraphQLString}
      },
      description: 'List of Comments',
      resolve: function(root, {_id}) {
        if(_id) {
          return _.filter(CommentsList, comment => comment._id === _id);
        } else {
          return CommentsList; /* This is for development purposes, remove so users cannot access all comments */
        }
      }
    },
  })
});

/* Defining the Schema */
const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
