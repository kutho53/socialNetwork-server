const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../services/dateFormat');

const ReachtionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Provide a reachtion',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Provide Username'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Must provide username'
        },
        reactions: [ReachtionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;