/*
 * @Autor:jiea
 * Date: 2022-10-20 22:16
 * @LastEditors: Huhuuuu
 * @LastEditTime: 2022-10-20 22:16
 * @FilePath: src/store
 * @Description: ...
 * IDE:WebStorm
*/
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
