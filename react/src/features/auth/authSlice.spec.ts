import authReducer, {AuthState} from "./authSlice"


describe('auth reducer', () => {
    const initialState: AuthState = {
        isLogin: false,
        authUser: undefined,
    };
    it('should handle initial state', () => {
        expect(authReducer(undefined, {type: 'unknown'})).toEqual({
            isLogin: false,
            authUser: undefined,
        });
    });

});
