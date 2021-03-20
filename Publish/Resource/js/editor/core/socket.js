import Rete, { Control } from "rete";

var strSocket = new Rete.Socket('String')
var numSocket = new Rete.Socket("Number Value");

export default {
  strSocket: strSocket,
  numSocket: numSocket,
}
