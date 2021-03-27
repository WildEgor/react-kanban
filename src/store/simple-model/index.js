import { thunk, action } from 'easy-peasy';
import { fetchJson } from 'Utils/data-utils';

const simpleModel = {
    data: null,
    isLoading: false,
    isError: false,
    loadData: thunk(async (actions) => {
        actions.dataIsLoadingStart();
        const data = await fetchJson('static/data/data.json', { params: {}});
        if (data) {
            console.log(data)
            actions.dataIsLoadingSuccess();
        } else {
            actions.dataIsLoadingFail();
        }
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