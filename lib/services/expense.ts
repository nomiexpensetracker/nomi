'use server';

import {
  Expense,
  UserExpenseCount,
  CoupleExpenseCount,
  FamilyExpenseCount,
  GetExpenseCountRequest,
} from "@/types/expenses";
import { FilterOption, GetDataResult } from "@/types/common";

import { getDataBuilder } from "@/lib/utils/get-data-builder";

export async function onGetUserExpenseList(): Promise<GetDataResult<Expense[]>> {
  const result = await getDataBuilder<Expense[]>({
    columns: ['*'],
    tableName: 'view_user_expenses',
  });

  const { data: user, error } = result;

  const resultData: GetDataResult<Expense[]> = {
    data: user as unknown as Expense[],
    status: !error?.message,
    message: error?.message ?? 'Sukses get data',
  };

  return resultData;
}

export async function onGetCoupleExpenseList(): Promise<GetDataResult<Expense[]>> {

  const result = await getDataBuilder<Expense[]>({
    columns: ['*'],
    tableName: 'view_couple_expenses',
  });

  const { data: user, error } = result;

  const resultData: GetDataResult<Expense[]> = {
    data: user as unknown as Expense[],
    status: !error?.message,
    message: error?.message ?? 'Sukses get data',
  };

  return resultData;
}

export async function onGetFamilyExpenseList(): Promise<GetDataResult<Expense[]>> {
  const result = await getDataBuilder<Expense[]>({
    columns: ['*'],
    tableName: 'view_family_expenses',
  });

  const { data: user, error } = result;

  const resultData: GetDataResult<Expense[]> = {
    data: user as unknown as Expense[],
    status: !error?.message,
    message: error?.message ?? 'Sukses get data',
  };

  return resultData;
}

export async function onGetUserExpensesCount(payload: GetExpenseCountRequest): Promise<GetDataResult<UserExpenseCount>> {
  const dataFilter: FilterOption[] = [
    { column: 'month', operator: 'eq', value: payload.month },
  ];

  const result = await getDataBuilder<UserExpenseCount>({
    single: true,
    columns: ['*'],
    filters: dataFilter,
    tableName: 'view_total_user_expenses',
  });

  const { data: user, error } = result;

  const resultData: GetDataResult<UserExpenseCount> = {
    data: user as unknown as UserExpenseCount,
    status: !error?.message,
    message: error?.message ?? 'Sukses get data',
  };

  return resultData;
}

export async function onGetCoupleExpensesCount(payload: GetExpenseCountRequest): Promise<GetDataResult<CoupleExpenseCount>> {
  const dataFilter: FilterOption[] = [
    { column: 'month', operator: 'eq', value: payload.month },
  ];

  const result = await getDataBuilder<CoupleExpenseCount>({
    single: true,
    columns: ['*'],
    filters: dataFilter,
    tableName: 'view_total_couple_expenses',
  });

  const { data: user, error } = result;

  const resultData: GetDataResult<CoupleExpenseCount> = {
    data: user as unknown as CoupleExpenseCount,
    status: !error?.message,
    message: error?.message ?? 'Sukses get data',
  };

  return resultData;
}

export async function onGetFamilyExpensesCount(payload: GetExpenseCountRequest): Promise<GetDataResult<FamilyExpenseCount>> {
  const dataFilter: FilterOption[] = [
    { column: 'month', operator: 'eq', value: payload.month },
  ];

  const result = await getDataBuilder<FamilyExpenseCount>({
    single: true,
    columns: ['*'],
    filters: dataFilter,
    tableName: 'view_total_family_expenses',
  });

  const { data: user, error } = result;

  const resultData: GetDataResult<FamilyExpenseCount> = {
    data: user as unknown as FamilyExpenseCount,
    status: !error?.message,
    message: error?.message ?? 'Sukses get data',
  };

  return resultData;
}