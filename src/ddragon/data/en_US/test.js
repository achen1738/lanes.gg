import Runes from '../../data/en_US/runesReforged.json';

function test() {
  Object.keys(Runes).forEach((tree, index) => {
    tree.slots.forEach(slot => {
      console.log('https://ddragon.leagueoflegends.com/cdn/img/' + slot.icon);
    });
  });
}

console.log(test());
