const kayn = require('../kayn');
const db = require('../MySQL.js');
const cloudinary = require('cloudinary');
const { model } = require('mongoose');
const {
  profileicons: ProfileIcons,
  champions: Champions,
  items: Items,
  runes: Runes,
  maps: Maps,
  summonerspells: SummonerSpells
} = db;

const getItems = () => {
  return Items.findAll({}).then(res => {
    return res.map(item => item.dataValues);
  });
};

const updateItems = () => {
  return db.sequelize.transaction(async t => {
    const res = await kayn.DDragon.Item.list();
    const items = res.data;
    let promises = [];
    Object.keys(items).forEach(key => {
      const promise = Items.findOne({
        where: {
          id: key
        }
      })
        .then(item => {
          if (!item) {
            const itemObj = {
              id: key,
              name: items[key].name,
              _full: items[key].image.full,
              sprite: items[key].image.sprite,
              _group: items[key].image.group,
              x: items[key].image.x,
              y: items[key].image.y,
              w: items[key].image.w,
              h: items[key].image.h
            };
            return Items.create(itemObj);
          } else {
            return item;
          }
        })
        .then(res => res.dataValues);
      promises.push(promise);
    });
    return Promise.all(promises);
  });
};

const getChampions = () => {
  return Champions.findAll({}).then(res => {
    return res.map(item => item.dataValues);
  });
};

const updateChampions = () => {
  return db.sequelize.transaction(async t => {
    const res = await kayn.DDragon.Champion.list();
    const champions = res.data;
    let promises = [];
    Object.keys(champions).forEach(key => {
      const promise = Champions.findOne({
        where: {
          id: key
        }
      })
        .then(champion => {
          if (!champion) {
            const champObj = {
              id: champions[key].id,
              _key: champions[key].key,
              name: champions[key].name,
              _full: champions[key].image.full,
              sprite: champions[key].image.sprite,
              _group: champions[key].image.group,
              x: champions[key].image.x,
              y: champions[key].image.y,
              w: champions[key].image.w,
              h: champions[key].image.h
            };
            return Champions.create(champObj);
          } else {
            return champion;
          }
        })
        .then(res => res.dataValues);
      promises.push(promise);
    });
    return Promise.all(promises);
  });
};

const getMaps = () => {
  return kayn.DDragon.Map.list();
};

const updateMaps = () => {};

const getSummonerSpells = () => {
  return SummonerSpells.findAll({}).then(res => {
    return res.map(item => item.dataValues);
  });
};

const updateSummonerSpells = () => {
  return db.sequelize.transaction(async t => {
    const res = await kayn.DDragon.SummonerSpell.list();
    const summonerSpells = res.data;
    let promises = [];
    Object.keys(summonerSpells).forEach(key => {
      const promise = Champions.findOne({
        where: {
          id: key
        }
      })
        .then(summonerSpell => {
          if (!summonerSpell) {
            const summObj = {
              id: summonerSpells[key].id,
              _key: summonerSpells[key].key,
              name: summonerSpells[key].name,
              _full: summonerSpells[key].image.full,
              sprite: summonerSpells[key].image.sprite,
              _group: summonerSpells[key].image.group,
              x: summonerSpells[key].image.x,
              y: summonerSpells[key].image.y,
              w: summonerSpells[key].image.w,
              h: summonerSpells[key].image.h
            };
            return SummonerSpells.create(summObj);
          } else {
            return summonerSpell;
          }
        })
        .then(res => res.dataValues);
      promises.push(promise);
    });
    return Promise.all(promises);
  });
};

const getRunes = () => {
  return Runes.findAll({}).then(res => {
    return res.map(item => item.dataValues);
  });
};

const updateRunes = async () => {
  return db.sequelize.transaction(async t => {
    const res = await kayn.DDragon.RunesReforged.list();
    const runes = res;
    let promises = [];
    runes.forEach(rune => {
      const promise = Runes.findOne({
        where: {
          id: rune.id
        }
      })
        .then(runeRow => {
          if (!runeRow) {
            const runeObj = {
              id: rune.id,
              name: rune.name,
              icon: rune.icon,
              _key: rune.key
            };
            return Runes.create(runeObj);
          } else {
            return runeRow;
          }
        })
        .then(res => res.dataValues);

      rune.slots.forEach(slot => {
        slot.runes.forEach(slotRune => {
          const slotPromise = Runes.findOne({
            where: {
              id: slotRune.id
            }
          })
            .then(runeRow => {
              if (!runeRow) {
                const runeObj = {
                  id: slotRune.id,
                  name: slotRune.name,
                  icon: slotRune.icon,
                  _key: slotRune.key
                };
                return Runes.create(runeObj);
              } else {
                return runeRow;
              }
            })
            .then(res => res.dataValues);
          promises.push(slotPromise);
        });
      });
      promises.push(promise);
    });
  });
};

const getProfileIcons = () => {
  return ProfileIcons.findAll({}).then(res => {
    return res.map(item => item.dataValues);
  });
};

const updateProfileIcons = () => {
  return db.sequelize.transaction(async t => {
    const res = await kayn.DDragon.ProfileIcon.list();
    const profileIcons = res.data;
    let promises = [];
    Object.keys(profileIcons).forEach(key => {
      const promise = ProfileIcons.findOne({
        where: {
          id: key
        }
      })
        .then(profileIcon => {
          if (!profileIcon) {
            const profileIconObj = {
              id: profileIcons[key].id,
              _full: profileIcons[key].image.full,
              sprite: profileIcons[key].image.sprite,
              _group: profileIcons[key].image.group,
              x: profileIcons[key].image.x,
              y: profileIcons[key].image.y,
              w: profileIcons[key].image.w,
              h: profileIcons[key].image.h
            };
            return ProfileIcons.create(profileIconObj);
          } else {
            return profileIcon;
          }
        })
        .then(res => res.dataValues);
      promises.push(promise);
    });
  });
};

const cloudinaryFixHelper = (model, folderName, next_cursor) => {
  const cloudinarySearch = cloudinary.v2.search.expression(`folder:${folderName}`).max_results(500);
  if (next_cursor && next_cursor !== 1) cloudinarySearch.next_cursor(next_cursor);
  cloudinarySearch.execute().then(res => {
    db.sequelize.transaction(async t => {
      res.resources.forEach(image => {
        const id = image.filename.substring(0, image.filename.lastIndexOf('_'));
        const { secure_url } = image;
        model.findOne({ where: { id } }).then(champ => {
          if (champ) {
            champ._full = secure_url;
            champ.save();
          }
        });
      });
      if (res.next_cursor) cloudinaryFixHelper(model, folderName, res.next_cursor);
    });
  });
};

const cloudinaryFix = (model, folderName) => {
  cloudinaryFixHelper(model, folderName, 1);
};

// cloudinaryFix(SummonerSpells, 'summonerSpells');

const test = async () => {
  const res = await updateSummonerSpells();
  console.log(res); //
};
//

module.exports = { getItems, getChampions, getSummonerSpells, getRunes, getProfileIcons };
