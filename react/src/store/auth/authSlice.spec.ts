import authReducer, {AuthState, logout} from "./authSlice"


describe('auth reducer', () => {
    const initialState: AuthState = {
        isLogin: false,
        authUser: undefined,
    };
    const initialStateIsAuth: AuthState = {
        isLogin: true,
        authUser: {
            id:1,
            enabled:true,
            fullName:"test",
            username:"test",
            accountNonExpired:true,
            accountNonLocked:true,
            credentialsNonExpired:true,
            authorities:[]
        },
    };
    it('should handle initial state', () => {
        expect(authReducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });
    it('should handle logout', () => {
        expect(authReducer(initialStateIsAuth,logout)).toEqual(initialState);
    });
});
