const {Schema, Types, model} = require('mongoose');
const formatDate = require('../utils/format-date');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            validate: {
                validator: function(text) {
                    return text.length < 280;
                },
                message: 'Please shorten your message. Max 280 characters.'
            }
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => formatDate(createdAtVal)
        }
    }, 
    {
          toJSON: {
            getters: true
          }
    }
)

const ThoughtSchema = new ThoughtSchema(
    {
        thoughtText: {
            type: String,
            required: 'Your thought requires text',
            validate: {
                validator: function(text) {
                    return text.length < 280;
                },
                message: 'Your thought must be shortened. Max length is 280 characters.'
            }
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;