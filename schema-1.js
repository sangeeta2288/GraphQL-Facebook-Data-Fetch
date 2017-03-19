import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
    
import fetch from 'node-fetch';
import axios from 'axios';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'Person Object Type',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: person => person.id,
    },
    name: {
      type: GraphQLString,
      resolve: person => person.name,
    },
    firstname: {
      type: GraphQLString,
      resolve: person => person.first_name,
    },
    lastname: {
      type: GraphQLString,
      resolve: person => person.last_name,
    },
    friends: {
      type: new GraphQLList(PersonType),
      resolve :(person)=>{
                if(person.friends)
                    return person.friends.data; 
                else return []}
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "First GraphQL Server Config - Yay!",
  fields: () => ({
    Person: {
      type: PersonType,
      description: "Facebook user API data with enhanced and additional data",
      resolve: () => {
        const url = `https://graph.facebook.com/v2.8/me?fields=name%2Cfriends%7Bfirst_name%2Clast_name%2Cemail%2Cfriends.limit(2)%7D&access_token=EAACEdEose0cBAMOo7LoyMRybI3WtvjY3xR0Wbzj9Py7Bc4hGZAq7UZBfUdYJGTow4PWKsl3o05fZAuQJiOsFU7fzYuGgpZCQ9mgC8HfiPo123oaM9VFC3uN3ItzjwWZAkZBjwrpRxFyiSIsW1Dno23rjMuKyhaZAMaWuOgeT1mibtHlqgANXr4ULHK9Lhmvo44ZD`;
        return axios.get(url)
                    .then(function(response) {
                      return response.data;
                    });
      }
    },
  })
});

export default new GraphQLSchema({
  query: QueryType,
});