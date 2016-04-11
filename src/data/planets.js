import shortid from 'shortid';
import * as _ from 'underscore';

/* Data Store */
const PlanetList = [];
export default PlanetList;

/* Helper Functions */
export function getPlanets(){
  return PlanetList;
}

export function getPlanetById(_id){
  return _.filter(PlanetList, planet => planet._id === _id);
}
