const Schema = mongoose.Schema;

const timeline = new Schema({
  matchID: Number,
  JUNGLE: [
    {
      killerId: String,
      victimId: String,
      timestamp: Number,
      assistingParticipantIds: [Number],
      position: {
        x: Number,
        y: Number
      },
      type: { type: String }
    }
  ],
  TOP: [
    {
      killerId: String,
      victimId: String,
      timestamp: Number,
      assistingParticipantIds: [Number],
      position: {
        x: Number,
        y: Number
      },
      type: { type: String }
    }
  ],
  MIDDLE: [
    {
      killerId: String,
      victimId: String,
      timestamp: Number,
      assistingParticipantIds: [Number],
      position: {
        x: Number,
        y: Number
      },
      type: { type: String }
    }
  ],
  BOTTOM: [
    {
      killerId: String,
      victimId: String,
      timestamp: Number,
      assistingParticipantIds: [Number],
      position: {
        x: Number,
        y: Number
      },
      type: { type: String }
    }
  ],
  data: [
    {
      CHAMPION_KILL: [
        {
          killerId: String,
          victimId: String,
          timestamp: Number,
          assistingParticipantIds: [Number],
          position: {
            x: Number,
            y: Number
          },
          type: { type: String }
        }
      ],
      WARD_PLACED: [
        {
          timestamp: Number,
          type: { type: String },
          creatorId: Number,
          wardType: String
        }
      ],
      WARD_KILL: [
        {
          timestamp: Number,
          type: { type: String },
          killerId: Number,
          wardType: String
        }
      ],
      BUILDING_KILL: [
        {
          killerId: Number,
          timestamp: Number,
          buildingType: String,
          towerType: String,
          teamID: Number,
          assistingParticipantIds: [Number],
          position: {
            x: Number,
            y: Number
          },
          type: { type: String },
          laneType: String
        }
      ],
      ELITE_MONSTER_KILL: [
        {
          killerId: Number,
          timestamp: Number,
          position: {
            x: Number,
            y: Number
          },
          monsterType: String,
          monsterSubType: String,
          type: { type: String }
        }
      ],
      ITEM_PURCHASED: [
        {
          itemId: Number,
          timestamp: Number,
          type: { type: String },
          participantId: Number
        }
      ],
      ITEM_SOLD: [
        {
          itemId: Number,
          timestamp: Number,
          type: { type: String },
          participantId: Number
        }
      ],
      ITEM_DESTROYED: [
        {
          itemId: Number,
          timestamp: Number,
          type: { type: String },
          participantId: Number
        }
      ],
      ITEM_UNDO: [
        {
          timestamp: Number,
          afterId: Number,
          type: { type: String },
          participantId: Number,
          beforeId: Number
        }
      ],
      SKILL_LEVEL_UP: [
        {
          timestamp: Number,
          skillSlot: Number,
          levelUpType: String,
          type: { type: String },
          participantId: Number
        }
      ]
    }
  ]
});

module.exports = {
  timeline
};
