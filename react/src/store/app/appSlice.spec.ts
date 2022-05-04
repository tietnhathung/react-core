import appReducer, {
    AppState,
    toggleHideSidebar,
    toggleUnfoldableSidebar
} from './appSlice';

describe('app reducer', () => {
    const initialState: AppState = {
        hideSidebar: false,
        unfoldableSidebar: false,
    };
    it('should handle initial state', () => {
        expect(appReducer(undefined, { type: 'unknown' })).toEqual({
            hideSidebar: false,
            unfoldableSidebar: false,
        });
    });

    it('should handle toggleHideSidebar', () => {
        const actual = appReducer(initialState, toggleHideSidebar());
        expect(actual.hideSidebar).toEqual(true);
    });

    it('should handle toggleUnfoldableSidebar', () => {
        const actual = appReducer(initialState, toggleUnfoldableSidebar());
        expect(actual.unfoldableSidebar).toEqual(true);
    });
});
