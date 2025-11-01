import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { USER_LOCALE_KEY } from '@/constants';

export default getRequestConfig(async () => {
  let locale = 'en';
  const cookieStore = await cookies();

  if (cookieStore.has(USER_LOCALE_KEY)) {
    locale = cookieStore.get(USER_LOCALE_KEY)?.value ?? 'id';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
