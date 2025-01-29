import Booking from '../models/bookingModel.js';
import Tour from '../models/tourModel.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up',
  });
};

export const getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
  });
};

export const getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from the collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)

  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

export const getTour = catchAsync(async (req, res, next) => {
  // 1) get the data for the requested tour (including the reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  // 2) Build template
  // 3) Render template using data from 1)

  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour,
  });
});

export const getAccount = catchAsync(async (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
    user: res.locals.user,
  });
});

export const getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My tours',
    tours,
  });
});

export const updateUserData = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).render('account', {
    user,
  });
});
