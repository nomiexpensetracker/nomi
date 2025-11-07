import { PostgrestError } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/server';

import { Database } from '@/types/supabase';
import { FilterOption } from '@/types/common';

interface Join {
  table: string;
  columns?: string[];
}

interface GetDataParams {
  tableName:
    | keyof Database['public']['Tables']
    | keyof Database['public']['Views'];
  columns?: string[];
  filters?: FilterOption[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
  single?: boolean;
  joins?: Join[];
}

interface GetDataResult<T> {
  data: T;
  totalData: number;
  totalPages: number;
  error: PostgrestError | null;
}

export const getDataBuilder = async <T>({
  tableName,
  columns = [],
  filters = [],
  joins = [],
  sortBy,
  sortOrder = 'asc',
  page = 1,
  pageSize = 10,
  single = false,
}: GetDataParams): Promise<GetDataResult<T>> => {
  const supabase = await createClient();

  let selectColumns = columns.length ? columns.join(', ') : '*';
  for (const join of joins) {
    const joinSelectColumns = join.columns?.length
      ? join.columns.join(', ')
      : '*';
    selectColumns += ` ,${join.table}(${joinSelectColumns})`;
  }

  let query = supabase
    .from(tableName)
    .select(selectColumns, { count: 'exact' });

  filters.forEach((filter) => {
    switch (filter.operator) {
      case 'or':
        if (filter.value) {
          query = query.or(filter.value as string, {
            referencedTable: filter.referencedTable,
          });
        }
        break;
      case 'eq':
        if (filter.value) {
          query = query.eq(filter.column, filter.value);
        }
        break;
      case 'neq':
        if (filter.value) {
          query = query.neq(filter.column, filter.value);
        }
        break;
      case 'gt':
        query = query.gt(filter.column, filter.value);
        break;
      case 'lt':
        query = query.lt(filter.column, filter.value);
        break;
      case 'gte':
        query = query.gte(filter.column, filter.value);
        break;
      case 'lte':
        query = query.lte(filter.column, filter.value);
        break;
      case 'like':
        if (filter.value) {
          query = query.like(filter.column, `%${filter.value}%`);
        }
        break;
      case 'ilike':
        if (filter.value) {
          query = query.ilike(filter.column, `%${filter.value}%`);
        }
        break;
      case 'is':
        query = query.is(filter.column, filter.value);
        break;
      case 'not':
        query = query.not(filter.column, 'is', filter.value);
        break;
      case 'in':
        query = query.in(filter.column, filter.value as string[] | number[]);
        break;
      case 'contains':
        query = query.contains(
          filter.column,
          filter.value as string[] | number[],
        );
        break;
      default:
        break;
    }
  });

  // Apply sort
  if (sortBy) {
    const [sortTable, sortColumn] = sortBy.includes('.')
      ? sortBy.split('.')
      : [null, sortBy];

    query = sortTable
      ? query.order(sortColumn, {
          ascending: sortOrder === 'asc',
          referencedTable: sortTable,
        })
      : query.order(sortColumn, {
          ascending: sortOrder === 'asc',
          nullsFirst: false,
        });
  }

  if (single) {
    const { data, error } = await query.single();

    return {
      data: data as T,
      totalData: 1,
      totalPages: 1,
      error,
    };
  } else {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    query = query.range(from, to);

    const { data, error, count } = await query;

    // handle range errors gracefully
    if (
      error?.code === 'PGRST103' ||
      (typeof error?.message === 'string' &&
        /range not satisfiable/i.test(error.message))
    ) {
      // Return empty result instead of error for out-of-range requests
      return {
        data: [] as T,
        totalData: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
        error: null, // Clear the error
      };
    }

    const totalData = count || 0;
    const totalPages = Math.ceil(totalData / pageSize);

    return {
      data: data as T,
      totalData,
      totalPages,
      error,
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FilterApplicator = (query: any, filters: FilterOption[]) => {
  filters.forEach((filter) => {
    switch (filter.operator) {
      case 'or':
        if (filter.value) {
          query = query.or(filter.value as string, {
            referencedTable: filter.referencedTable,
          });
        }
        break;
      case 'eq':
        if (filter.value) {
          query = query.eq(filter.column, filter.value);
        }
        break;
      case 'neq':
        if (filter.value) {
          query = query.neq(filter.column, filter.value);
        }
        break;
      case 'gt':
        query = query.gt(filter.column, filter.value);
        break;
      case 'lt':
        query = query.lt(filter.column, filter.value);
        break;
      case 'gte':
        query = query.gte(filter.column, filter.value);
        break;
      case 'lte':
        query = query.lte(filter.column, filter.value);
        break;
      case 'like':
        if (filter.value) {
          query = query.like(filter.column, `%${filter.value}%`);
        }
        break;
      case 'ilike':
        if (filter.value) {
          query = query.ilike(filter.column, `%${filter.value}%`);
        }
        break;
      case 'is':
        query = query.is(filter.column, filter.value);
        break;
      case 'not':
        query = query.not(filter.column, 'is', filter.value);
        break;
      case 'in':
        query = query.in(filter.column, filter.value as string[] | number[]);
        break;
      case 'contains':
        query = query.contains(
          filter.column,
          filter.value as string[] | number[],
        );
        break;
      default:
        break;
    }
  });
  return query;
};
