'use server';

import { GetUserRequest, User } from "@/types/user";
import { FilterOption, GetDataResult } from "@/types/common";

import { getDataBuilder } from "@/lib/utils/get-data-builder";

export async function onGetUser({ id }: GetUserRequest): Promise<GetDataResult<User>> {
  const dataFilter: FilterOption[] = [
    { column: 'id', operator: 'eq', value: id },
    { column: 'is_active', operator: 'eq', value: true },
  ];

  const result = await getDataBuilder<User>({
    single: true,
    columns: ['*'],
    filters: dataFilter,
    tableName: 'users',
  });

  const { data: user, error } = result;

  const resultData: GetDataResult<User> = {
    data: user as unknown as User,
    status: !error?.message,
    message: error?.message ?? 'Sukses get data',
  };

  return resultData;
}