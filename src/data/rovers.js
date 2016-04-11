import shortid from 'shortid';
import * as _ from 'underscore';

/* Data Store */
const RoverList = [];
export default RoverList;

/* Helper Functions */
export function getRovers(){
  return RoverList;
}

export function getRoverById(_id){
  return _.filter(RoverList, rover => rover._id === _id);
}
