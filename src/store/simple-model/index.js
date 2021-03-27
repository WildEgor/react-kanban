import { thunk, action } from 'easy-peasy';
import { fetchJson } from 'Utils/data-utils';

const simpleModel = {
    data: null,
    isLoading: false,
    isError: false,
    setInitialState: action((state, payload) => {
        state.data = payload;
    }),
    fetchInitialState: thunk(async (actions, payload, {getState}) => {
        if (getState().data === null) {
            actions.dataIsLoadingStart();
            const data = await fetchJson('static/mockData/mockData.json', { params: {}});
            if (data) {
                actions.setInitialState(data)
                actions.dataIsLoadingSuccess();
            } else {
                actions.dataIsLoadingFail();
            }
        }
    }),
    updateData: action((state, payload) => {
        state.data = payload
    }),
    dataIsLoadingStart: action((state, payload) => {
        console.log('Start Load');
        state.isLoading = true
        state.isError = false
    }),
    dataIsLoadingSuccess: action((state, payload) => {
        state.isLoading = false
        state.isError = false
    }),
    dataIsLoadingFail: action((state, payload) => {
        state.isLoading = false
        state.isError = true
    }),
}

export default simpleModel