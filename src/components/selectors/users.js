/**
 *  on trouve les users voulue dans la liste d'une colocation
 * @param {Array} users - tous les users
 * @param {string} searchedId - l'id d'un user
 * @return {Object} - Les users trouvée
 */
export function findUsers(users, searchedId) {
  const user = users.find((testUser) => {
    return testUser.id === searchedId;
  });
  return user;
}
