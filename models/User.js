const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        email: {
            type: String,
            required: 'Provide a valid email address',
            unique: true,
            validation: [validateEmail, 'Email address is required'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
      toJSON: {
        virtuals: true
      },
      id: false
    }
)

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

module.exports = User;