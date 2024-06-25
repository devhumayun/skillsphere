/**
 * this function help us to convet _id to id in array
 */

export const replaceMongoIdInArray = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

/**
 * this function help us to convet _id to id in object
 */
export const replaceMongoIdInObject = (obj) => {
  const { _id, ...updatedObj } = { ...obj, id: obj?._id.toString() };
  return updatedObj;
};
