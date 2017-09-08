import * as Mongoose from 'mongoose';

export let UserSchema: Mongoose.Schema = new Mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: function (value) {
        let regex = new RegExp(['^(([^<>()[\\]\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\.,;:\\s@\"]+)*)',
          '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
          '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'].join(''));
        return regex.test(value);
      },
      message: 'Invalid email'
    },
    required: [true, 'Email required'],
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    validate: {
      validator: (value: String) => {
        return value.length >= 10;
      },
      message: 'Password must have at least 10 characters'
    },
    required: [true, 'Password required']
  },
  roles: {
    type: [{ type: String, enum: ['user', 'admin'] }],
    default: 'user'
  }
});
