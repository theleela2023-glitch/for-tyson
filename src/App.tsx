import { useState } from 'react';

type Screen = 'intro' | 'brands' | 'final';

const luxuryBrands = [
  'Jimmy Choo',
  'Gucci',
  'Maison Margiela',
  'Versace',
  'Jacquemus',
  'Christofle',
];

/* ------------------------------------------------------------------ *
 * Brand logo — embedded as a base64 data URI (no asset file needed). *
 * NOTE: source file is only 100x116px, so it can look soft when      *
 * scaled up. Swap in a higher-res export here when you have one.      *
 * ------------------------------------------------------------------ */
const TPH_LOGO = 'data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAB0AGQDASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAEHBAgDBQYJAv/EAEUQAAEDAwICBAgJCgcBAAAAAAECAwQABREGBxIhCBMxQRUyM1FVcZTRCRQYIldhgZXTFiVCUnJ1g5GjszY4Q2WTobGy/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAeEQEAAwACAgMAAAAAAAAAAAAAARESAgMEITFBYf/aAAwDAQACEQMRAD8A1Dcu9241fnSb2n/XV76/Phe7elJvtCvfWG55RXrNRWW2b4Xu3pSb7Qr308L3b0pN9oV76wqUGb4Xu3pSb7Qr308L3b0pN9oV76wqUGb4Xu3pSb7Qr308L3b0pN9oV76wqUGb4Xu3pSb7Qr308L3b0pN9oV76wqUGb4Xu3pSb7Qr308L3b0pN9oV76wqUGcLvdvSk3/nV76VhClAc8or1moqXPKK9ZqKBSlWNqHZLcWwaBTrq6WZpmxKYafEgS21Hgd4eA8IVxc+Id1BXNKUoFKVtP0KtndBbl6Tv8/V9qemyIc9DLKkSnGuFJbyRhJGedUasUrtNXw2Lfqy8QIqCiPGnPstJJzhKXFADJ7eQrq6gUpSgkUoKUBzyivWaipc8or1mooO901pK/ajjyH7RCL7cfx1FYTz7cDPaa3q3/SpHQbZQtJSpNotYIPaDxM1o/o3XN70rElRbYWC1IPEQ6ji4FYxxDn21vD0gXFvdB5p1xRUtdptilE95Kmc125x1445u/t4emfLnyOyO2Ix6zV3+21B242O3D3A0u7qTTFsjSbc06tlS1y0Nq4kAFQ4Sc9hFdppjo2bx6gtyJ8XSa4zDg4kGZIbYUoefhUQr+Yraz4PYgbDPk8h4Zkf/AA3Ve7sdMi7W7V021aHsVsft8N5TPxubxrMgpOCpKUqSEpyOXaT28q5PbctatxdrNfbfKSdWablwGFnhRJGHGVHzBxJKc/VnNbafBs/4C1X+9G/7Qr22wO7Fk6Qejbzp3U9jitTmWgidDB42Xml5AcRnmMEesHBzWN0PNIL0HcNyNJqWpbcC/ISytXatoshTZP18JFCZax3Xo4bwal1Ne7tA0sWYj9xkOMqlyW2VOJLiiCEqOcEecVV+4O32stAz0Q9W2CXbFuZ6pawFNuY/VWnKVfYa2w3y6XF10xuBP01o2yW2VGtjxjyJU3jV1riThYSEqGADkZOc4qztH3vTnSb2HnM3K2txZKyuM+1njMSUlOUOIV245gj6sg0LfNmlZN2gv2y6S7bKTwvxX1sOjzKSopP/AGKxqipFKClAc8or1moqXPKK9ZqKBX0F3659BiORz/M9r/8AWa+fVbu9HjfHbjU20bG3O6UmFEXDjphkTwRHmMJ8Q8XYlQAA5kdgI+qwkvUdAFpT3R8mMpVwqcuslIPmJbbFaGaqtM6xaluVnubC2JkOS4y8hYwQpKiK+lHRwTpe26W1Z+R/xZWno9/kqhfFHONsthlknhUSc8899eSnaw6Le6HV3vUbunTcAkBzwkDGkJx+io8uLHrIolql+DdstwXrPUuoOqWm3s29MQuEfNU6txKgkHvICCftHnrZfaifGuG6G6K4qkqSzdYjCyP10REBX8jkfZVUbh9I7a3bXRzmnNp48GdNCFJjIgscESOo/pqVgcZ78DOe815roNbk6Zs+ntXStbauttvuVyuwlFU6SltbxKPnL59vMmg1O3DUVa/1EpRyTdZJJ/iqrcb4Ncn8jNXDPIXFnl/DNaaa3fZla0vkmO6h1l64yHG1oOQpJcUQQfMRW1HQD1zo7SWlNUR9TamtdndkTmVsolyEtlaQ2QSM9ozSFn4a2bzJCd3dXpSMAXuX/eVXkq9PuzMi3DdDVM6DIbkRZF3lOsutqylxCnVEKB7wRXmKKkUoKVAc8or1moqXPKK9ZqKBSlKD6AdA7/Lfc/3jL/tIrQJ/y7n7R/8Aas3bTfbX+3mkntL6bkW9u3POuPLS9EDiuJYAVzJ8wFVgolSio9pOTVEUpSoFKUoFKUoJFKClAc8or1moqXPKK9ZqKBSlKBSlKBSlKBSlKBSlKCRSgpQbbSuhbJYHWSNx4LKFLCQV28pBJPIc3O01yfIluH0gxfu1X4lWPcJ+oXol/gT7/Dlyo+pI6W460KCkr65vCwColLXdwj+dd5cdytV25t21ShCVNZu7sFye2wOrCUIChhClpHEc96hyHfWqY0pz5Etw+kGL92q/Ep8iW4fSDF+7VfiVcbu5GqHlQ2nLjYbKpy0GapctPGl1aXFJAQQrHzgkHGTjn21m2jXusLqibcWI0JmNbrUxPeiFhSnXlLQo8CTnkCU5zgnGKUtqP+RLcPpBi/dqvxK4k9C6QqSuKnciAp9CQpbQt54kg9hI6zIFXMjdHUcWE+4ZNmvSnLX8dSqE2oJgrK0p4XeZyBxZ7jyrqU6tuto1ZfL6m8Wi6v8AUW9p6XFbPUBtTpCsjPIgHtzSk0rT5Etw+kGL92q/EqFdCaelJUrcKIABkk21XL+pV3XDcy6v3N+FbbhaI0Ny7ORWbq+kqYaaQ0lYyQcFSiSAc45V1mobxfUaqubc/UVsmw3tMLfQyhCksShwq5IHH42QTxD9HlSl0qRPQmnqSFJ3CiEHmCLarn/UoehLPAydwYoA/wBtV+JVto3FvlvtgTDestvYtcGGW7fIQouzuNtJPVnOQBnA7frrsWteatdniQ8bcLUu/rs6o4ZUHgCMhXFnGR6qUWo+N0LZMphL8bceC+0rxVt28qSfUQ5ST0LZMZAckbjwWUFQSFOW8pBJ5Ac3O01Z2kNX6o0xoyCwyYD0R61TZUNHUqK2ltOEniOfnA5PmrM15rh6/RHokadblxIotcpL45oQ8p0cfGQfFB7R3Uo0qodCW4fSDF+7VfiUq3H93tR2qdKt3g+HqVLDuEz7ehSWlgpBxyyMjOO2lKLXMu1WtcpcpduhqfWQVullJUrByMnGTggVL9str7TrT1viONvL43UrZSQtXnUMcz9ZpSiPLvaftMjcr4xIhsvIRaEspYW2lTSQHcghJHI165uNGacW63HaQtaQlSkoAKgOwE94FKUHDGtdsjJeTHt0RlL/AJYIZSkOftYHP7a/Ddls7bC2G7VBQ04ngWhMdASpOc4IxzGe6lKCTaLSYqohtcIx1kFTXUJ4FEDAJGMdlS5abW6Wi5bYa+pQW2uJhJ4EkYKRy5DHdSlActVscdYeXboanI4AZWWUktgdgSccvsr9m3wCMfEY2Ot67ySfKfr9njfX20pQQm225CUJTAipDaVIQAykcKVeMBy5A94764mrLZ2m+rbtMBCOXzUx0Acjkd3cedKUHPDgwoTPUw4ceO1kngabCU5PfgUpSg//2Q==';

function TphLogo() {
  return (
    <img
      src={TPH_LOGO}
      alt="The Production Hub"
      className="w-full h-full object-contain"
      draggable={false}
    />
  );
}


function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleScreenChange = (newScreen: Screen) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setScreen(newScreen);
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-deep-navy text-soft-white font-sans overflow-hidden">
      <div
        className={`transition-opacity duration-[600ms] ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {screen === 'intro' && <IntroScreen onContinue={() => handleScreenChange('brands')} />}
        {screen === 'brands' && <BrandsScreen onContinue={() => handleScreenChange('final')} />}
        {screen === 'final' && <FinalScreen onRestart={() => handleScreenChange('intro')} />}
      </div>

      <footer className="fixed bottom-0 left-0 right-0 py-6 text-center pointer-events-none">
        <p className="text-xs text-soft-white/60 font-light tracking-[0.18em] uppercase">
          Made for a comeback.
        </p>
      </footer>
    </div>
  );
}

function IntroScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center" style={{ paddingBlock: 'clamp(3rem, 8vw, 7rem)' }}>
      {/* Door background — autoplaying video loop */}
      <div className="absolute inset-0 border-b border-[rgba(212,175,55,0.25)]">
        <video
          className="w-full h-full object-cover"
          src="/assets/door.mp4"
          poster="/assets/door-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 via-deep-navy/30 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[1100px] mx-auto">
        <h1
          className="font-serif font-medium mb-12 text-soft-white opacity-0 animate-fade-in headline-underline"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            animationDelay: '0.2s',
            animationFillMode: 'forwards',
          }}
        >
          Enter a new chapter in your life
        </h1>

        {/* TPH Logo Button — embedded brand mark */}
        <button
          onClick={onContinue}
          className="group relative mx-auto block mb-10 opacity-0 animate-scale-in"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          aria-label="Click to begin"
        >
          <div
            className="relative rounded-2xl overflow-hidden bg-[#070707] p-5 transition-transform duration-[450ms] group-hover:scale-[1.04]"
            style={{
              width: 'clamp(150px, 18vw, 200px)',
              aspectRatio: '100 / 116',
              transition: 'transform 450ms cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <TphLogo />
            {/* Subtle gold ring on hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(212,175,55,0.45)',
                transition: 'opacity 450ms cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          </div>
        </button>

        {/* Kick Now Button */}
        <button
          onClick={onContinue}
          className="luxury-button opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          Kick Now
        </button>
      </div>
    </section>
  );
}

function BrandsScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <section
      className="relative min-h-screen animated-gradient"
      style={{
        paddingBlock: 'clamp(3rem, 8vw, 7rem)',
        paddingLeft: 'clamp(1rem, 4vw, 3rem)',
        paddingRight: 'clamp(1rem, 4vw, 3rem)',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20 pt-8">
          <h2
            className="font-serif font-medium mb-10 text-soft-white opacity-0 animate-fade-in headline-underline"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              animationFillMode: 'forwards',
            }}
          >
            Look no further, apply now!
          </h2>
          <p
            className="font-sans text-soft-white/70 max-w-3xl mx-auto opacity-0 animate-fade-in-up"
            style={{ fontSize: '1.0625rem', lineHeight: '1.6', animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            The world's finest brands are not the destination. They are the reminder
            that your next chapter can be bigger, sharper, and brighter.
          </p>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {luxuryBrands.map((brand, index) => (
            <BrandCard key={brand} brand={brand} index={index} />
          ))}
        </div>

        {/* Apply Now Button */}
        <div className="text-center pb-12">
          <button
            onClick={onContinue}
            className="luxury-button text-lg px-12 py-5 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}

function BrandCard({ brand, index }: { brand: string; index: number }) {
  const delayMs = index * 40;
  return (
    <div
      className="brand-card h-28 md:h-32 flex items-center justify-center p-6"
      style={{
        animation: `brandCardIn 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms forwards`,
        opacity: 0,
      }}
    >
      <span className="font-serif text-lg text-soft-white tracking-wider text-center">
        {brand}
      </span>
    </div>
  );
}

function FinalScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center animated-gradient"
      style={{
        paddingBlock: 'clamp(3rem, 8vw, 7rem)',
        paddingLeft: 'clamp(1rem, 4vw, 3rem)',
        paddingRight: 'clamp(1rem, 4vw, 3rem)',
      }}
    >
      <div className="relative z-10 text-center max-w-[1100px] mx-auto">
        {/* Comeback image card — autoplaying video loop */}
        <div
          className="image-card relative overflow-hidden rounded-2xl mx-auto mb-16 opacity-0 animate-scale-in"
          style={{
            width: 'min(320px, 80vw)',
            aspectRatio: '4/5',
            animationDelay: '0.2s',
            animationFillMode: 'forwards',
          }}
        >
          <video
            className="w-full h-full object-cover"
            src="/assets/comeback.mp4"
            poster="/assets/comeback-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 ring-1 ring-[rgba(212,175,55,0.25)] rounded-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/20 via-transparent to-transparent pointer-events-none rounded-2xl" />
        </div>

        {/* Main Headline */}
        <h2
          className="font-serif font-medium mb-10 text-soft-white opacity-0 animate-fade-in headline-underline"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            animationDelay: '0.4s',
            animationFillMode: 'forwards',
          }}
        >
          This is not the end.
          <br />
          <span className="text-soft-white/80">This is the plot twist.</span>
        </h2>

        {/* Motivational Message */}
        <p
          className="font-sans text-soft-white/70 max-w-2xl mx-auto mb-16 opacity-0 animate-fade-in-up"
          style={{ fontSize: '1.0625rem', lineHeight: '1.6', animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          One door closed because it was too small for you. Reset, rebuild, and
          walk into the next one like it was waiting for your name.
        </p>

        {/* Start Again Button */}
        <button
          onClick={onRestart}
          className="luxury-button text-lg px-12 py-5 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
        >
          Start Again
        </button>
      </div>
    </section>
  );
}

export default App;
