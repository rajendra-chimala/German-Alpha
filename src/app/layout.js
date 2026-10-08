import './globals.css';

export const metadata = {
  title: 'Deutsch ABC – German Alphabet Learning Game',
  description:
    'Master the German alphabet with an interactive quiz game. 20 timed questions covering all 30 German letters including umlauts (Ä, Ö, Ü) and ß. Track your score and get personalized tips.',
  keywords: ['German', 'alphabet', 'learning', 'quiz', 'game', 'Deutsch', 'ABC', 'umlauts'],
  openGraph: {
    title: 'Deutsch ABC – German Alphabet Learning Game',
    description: 'Learn all 30 German letters with a fun timed quiz game.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
