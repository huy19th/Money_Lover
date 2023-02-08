import passport from 'passport';
import dataSource from "./database/data-source";
import {User} from "./models/user.model";
import BaseController from "./controllers/base.controller";
require('dotenv').config();

let userRepo = dataSource.getRepository(User);

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await userRepo.findOneBy({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            } else {
                let newUser = new User();
                newUser.name = profile.displayName;
                newUser.email = profile.emails[0].value
                newUser.password = BaseController.getRandomString();
                newUser.googleId = profile.id;
                newUser.image = profile.photos[0].value
                await userRepo.save(newUser);
                return done(null, newUser);
            }
        } catch (err) {
            return done(null, false)
        }
    }
));

passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await userRepo.findOneBy({ githubId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            } else {
                let newUser = new User();
                newUser.name = profile.username;
                newUser.email = ''
                newUser.password = BaseController.getRandomString();
                newUser.image = profile.photos[0].value
                newUser.githubId = profile.id
                await userRepo.save(newUser);
                return done(null, newUser);
            }
        } catch (err) {
            return done(null, false)
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})


