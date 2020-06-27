const { GraphQLList } = require('graphql');
const { getProfileIcons } = require('../../dbFunctions');
const { ProfileIconType } = require('../../types');

const ProfileIconsQueries = {
  getProfileIcons: {
    name: 'GetProfileIcons',
    description: "Retrieves DDragon's list of profile icons",
    type: GraphQLList(ProfileIconType),
    resolve: async (_, __) => {
      return await getProfileIcons();
    }
  }
};
const ProfileIconsMutations = {};

module.exports = {
  ProfileIconsQueries,
  ProfileIconsMutations
};
