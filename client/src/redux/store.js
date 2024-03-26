import {combineReducers,configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';


const rootReducer=combineReducers({user:userReducer});

const persistConfig={
    key:'root',
    storage,
    version:1,
}

const persistedReducer=persistReducer(persistConfig,rootReducer);


export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    }),
})

export const persistor=persistStore(store);

//配置 store（configureStore）：使用 Redux Toolkit 的 configureStore 方法来创建 Redux store。这个方法接收一个配置对象，该对象的 reducer 字段定义了应用中的根 reducer。在这个例子中，你把 user 切片的 reducer 作为根 reducer 的一部分，这意味着所有关于用户的状态都会被存储在 store 的 user 键下。middleware 字段用于配置中间件，这里使用默认中间件但禁用了序列化检查。