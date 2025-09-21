import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import MuiProvider from '@/lib/providers/muiProvider';
import { HeaderServer } from '@/lib/components/header/HeaderServer';

import en from '@/messages/en.json';
import ru from '@/messages/ru.json';

const messagesMap = { en, ru };

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = messagesMap[locale as 'en' | 'ru'];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MuiProvider>
        <HeaderServer />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
      </MuiProvider>
    </NextIntlClientProvider>
  );
}