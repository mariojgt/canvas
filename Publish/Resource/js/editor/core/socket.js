import Rete, { Control } from "rete";

var strSocket = new Rete.Socket('String');
var modelVarSocket = new Rete.Socket('ModelVarriable');
var numSocket = new Rete.Socket("Number Value");

export default {
  strSocket     : strSocket,        // String socket
  numSocket     : numSocket,        // number socket
  modelVarSocket: modelVarSocket,   // Model varaible SOcket
}
