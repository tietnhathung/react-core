import passport from "passport"
import {Strategy as StrategyJwt, ExtractJwt, StrategyOptions} from "passport-jwt"
import {IStrategyOptions, Strategy as StrategyLocal} from 'passport-local'
import dataSource from "../db/data-source";
import User from "../entity/user.entity";
import bcrypt from 'bcrypt';

const userRepository = dataSource.getRepository(User);

const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

passport.use(new StrategyJwt(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = await userRepository.findOneBy({id: jwtPayload.id});

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (e) {
        return done(e, false)
    }

}));

const localOptions: IStrategyOptions = {
    usernameField: "username",
    passwordField: "password",
}

passport.use(new StrategyLocal(localOptions, async (username, password, done) => {
    try {
        const user = await userRepository.findOneBy({
            username: username
        });
        if (!user) {
            return done(null, false)
        }
        const isComparePassword = bcrypt.compareSync(password, user.password);
        if (!isComparePassword) {
            return done(null, false)
        }
        return done(null, user);
    } catch (e) {
        return done(e, false)
    }
}))

export const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true});
export const localAuth = passport.authenticate("local", {session: false, failWithError: true});
