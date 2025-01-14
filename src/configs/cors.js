// const whitelist = ['http://localhost:5173'];
const whitelist = [process.env.ORIGIN_CLIENT_DOMAIN];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback('500 Server Error');
    }
  },
  methods: 'GET,PUT,POST,DELETE',
  optionsSuccessStatus: 200,
};

export default corsOptions;