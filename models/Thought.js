const { Schema, model, Mongoose } = require('mongoose');
const reactionSchema = require('./Reaction');


// thoughtText, createdAt, username, reactions, reactionCount

const thoughtSchema = new Schema(
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

        },
        username: {

            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        reactions: [reactionSchema],

        // reactionCount: reactionSchema.countDocuments({reactions})
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;