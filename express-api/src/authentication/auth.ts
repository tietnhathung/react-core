import passport from "passport"
import passportJwt from "passport-jwt"
import dataSource from "../db/data-source";
import User from "../entity/user.entity";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const userRepository = dataSource.getRepository(User);
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

const strategy = new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
    console.log('payload received', jwtPayload);
    const user = await userRepository.findOneBy({id: jwtPayload.id});
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
passport.use(strategy);

export default passport
