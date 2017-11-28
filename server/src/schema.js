const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require('graphql-tools');
const { resolvers } = require('./resolvers');

const typeDefs = `

type Club {
   id: ID!                # "!" denotes a required field
   name: String
   coeff: [Float]
   totalCoeff: Float
}

type PartialResult {
	homeScore: Int!
	awayScore: Int!
}

type MatchResult {
	regularTime: PartialResult!
	extraTime: PartialResult
	shootout: PartialResult
	winner: Club
}

type Match {
	id: ID!
	name: String
	home: Club!
	away: Club!
	result: MatchResult
}

type Tour {
	id: ID!
	level: Int
	name: String
	clubs: [Club]
	matches: [Match]
}

type Coupe{
	id: ID!
	name: String
	clubs: [Club]
	tours: [Tour]
	matchCount: Int
	matchTPCount: Int
	tourCount: Int
	needsTP: Boolean
	coeffPerMatch: Float
}

# This type specifies the entry points into our API. In this case
# there is only one - "clubs" - which returns a list of clubs.
type Query {
   clubs: [Club]  
   club(id: ID!): Club
   matches(levelTour: Int): [Match]
   match(levelTour: Int, idClub: ID): Match
   bigUpset(levelTour: Int): Match
   coupe: Coupe
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
exports.schema = schema;