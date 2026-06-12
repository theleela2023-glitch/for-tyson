import { useState, useEffect } from 'react';

type Screen = 'intro' | 'brands' | 'final';

const luxuryBrands = [
  { name: 'Jimmy Choo', tag: 'Footwear' },
  { name: 'Gucci', tag: 'Fashion House' },
  { name: 'Maison Margiela', tag: 'Avant-garde' },
  { name: 'Versace', tag: 'Luxury' },
  { name: 'Jacquemus', tag: 'Contemporary' },
  { name: 'Christofle', tag: 'Silversmith' },
];

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
    }, 700);
  };

  return (
    <div className="min-h-screen bg-deep-navy text-soft-white font-sans overflow-hidden">
      <div className={`transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {screen === 'intro' && <IntroScreen onContinue={() => handleScreenChange('brands')} />}
        {screen === 'brands' && <BrandsScreen onContinue={() => handleScreenChange('final')} />}
        {screen === 'final' && <FinalScreen onRestart={() => handleScreenChange('intro')} />}
      </div>

      <footer className="fixed bottom-0 left-0 right-0 py-5 text-center pointer-events-none z-50">
        <p className="text-[10px] text-soft-white/40 font-light tracking-[0.28em] uppercase">
          Made for a comeback.
        </p>
      </footer>
    </div>
  );
}

function IntroScreen({ onContinue }: { onContinue: () => void }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover scale-105"
          src="/assets/door.mp4"
          poster="/assets/door-poster.jpg"
          autoPlay muted loop playsInline
          onError={(e) => { (e.target as HTMLVideoElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/70 via-deep-navy/50 to-deep-navy/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/40 via-transparent to-deep-navy/40" />
        {/* Subtle grain texture */}
        <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
      </div>

      {/* Thin gold top bar */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">

        {/* Eyebrow */}
        <div className={`mb-8 transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-gold/70 text-[10px] tracking-[0.35em] uppercase font-medium">The Production Hub</span>
        </div>

        {/* Main headline */}
        <h1 className={`font-serif mb-6 text-soft-white transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5rem)', letterSpacing: '-0.03em', lineHeight: '1.05', fontWeight: 500 }}>
          Enter a new chapter<br />
          <em className="italic text-gold/90 not-italic" style={{ fontStyle: 'italic' }}>in your life.</em>
        </h1>

        {/* Sub copy */}
        <p className={`text-soft-white/55 mb-14 font-light transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.125rem)', lineHeight: '1.7', letterSpacing: '0.01em' }}>
          One door closed. The next one is already open —<br className="hidden sm:block" /> and the world's finest brands are waiting on the other side.
        </p>

        {/* Logo CTA */}
        <button
          onClick={onContinue}
          className={`group relative mx-auto block mb-10 transition-all duration-700 delay-[400ms] ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          aria-label="Enter"
        >
          <div className="relative rounded-2xl overflow-hidden bg-[#060606] p-5 mx-auto logo-button"
            style={{ width: 'clamp(130px, 14vw, 170px)', aspectRatio: '100 / 116' }}>
            <TphLogo />
            <div className="absolute inset-0 rounded-2xl border border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
            <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-all duration-500 rounded-2xl" />
          </div>
        </button>

        {/* CTA Button */}
        <button
          onClick={onContinue}
          className={`cta-button transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span>Step Through</span>
          <svg className="ml-2 w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="w-12 h-[1px] bg-gold/20" />
        <div className="w-1 h-1 rounded-full bg-gold/30" />
        <div className="w-12 h-[1px] bg-gold/20" />
      </div>
    </section>
  );
}

function BrandsScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="relative min-h-screen" style={{ paddingBlock: 'clamp(4rem, 8vw, 7rem)', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
      <div className="absolute inset-0 brands-bg" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 pt-4">
          <span className="text-gold/60 text-[10px] tracking-[0.35em] uppercase font-medium block mb-6">Your Next Arena</span>
          <h2 className="font-serif text-soft-white mb-6 animate-fade-in"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', letterSpacing: '-0.025em', lineHeight: '1.1', fontWeight: 500 }}>
            Look no further —<br />
            <em style={{ fontStyle: 'italic' }} className="text-gold/85">apply now.</em>
          </h2>
          <p className="text-soft-white/50 max-w-xl mx-auto font-light animate-fade-in-up"
            style={{ fontSize: '1rem', lineHeight: '1.75', animationDelay: '0.2s', animationFillMode: 'forwards', opacity: 0 }}>
            These aren't just brands. They're proof that taste, ambition, and craft<br className="hidden md:block" /> can live in the same address.
          </p>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {luxuryBrands.map((brand, index) => (
            <BrandCard key={brand.name} brand={brand.name} tag={brand.tag} index={index} />
          ))}
        </div>

        {/* Apply CTA */}
        <div className="text-center pb-8">
          <button onClick={onContinue} className="cta-button">
            <span>I'm Ready to Apply</span>
            <svg className="ml-2 w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="text-soft-white/25 text-xs mt-4 tracking-wider">Exclusive placements · Zero compromise</p>
        </div>
      </div>
    </section>
  );
}

function BrandCard({ brand, tag, index }: { brand: string; tag: string; index: number }) {
  return (
    <div
      className="brand-card group p-8 flex flex-col gap-2"
      style={{ animation: `cardIn 600ms cubic-bezier(0.22,1,0.36,1) ${index * 60}ms forwards`, opacity: 0 }}
    >
      <span className="text-gold/40 text-[9px] tracking-[0.3em] uppercase font-medium">{tag}</span>
      <span className="font-serif text-soft-white/90 text-xl tracking-wide group-hover:text-soft-white transition-colors duration-300">{brand}</span>
      <div className="mt-3 w-6 h-[1px] bg-gold/20 group-hover:w-12 group-hover:bg-gold/50 transition-all duration-500" />
    </div>
  );
}

function FinalScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingBlock: 'clamp(4rem, 8vw, 7rem)', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
      <div className="absolute inset-0 brands-bg" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Video card */}
        <div className="comeback-card relative overflow-hidden rounded-2xl mx-auto mb-14 animate-scale-in"
          style={{ width: 'min(300px, 78vw)', aspectRatio: '4/5' }}>
          <video
            className="w-full h-full object-cover"
            src="/assets/comeback.mp4"
            poster="/assets/comeback-poster.jpg"
            autoPlay muted loop playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/40 via-transparent to-transparent rounded-2xl pointer-events-none" />
          {/* Gold frame */}
          <div className="absolute inset-0 rounded-2xl border border-gold/25 pointer-events-none" />
        </div>

        {/* Eyebrow */}
        <div className="mb-5 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', opacity: 0 }}>
          <span className="text-gold/60 text-[10px] tracking-[0.35em] uppercase font-medium">Plot Twist</span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-soft-white mb-6 animate-fade-in"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', letterSpacing: '-0.025em', lineHeight: '1.1', fontWeight: 500, animationDelay: '0.4s', animationFillMode: 'forwards', opacity: 0 }}>
          This is not the end.
          <br />
          <em style={{ fontStyle: 'italic' }} className="text-gold/85">This is the plot twist.</em>
        </h2>

        {/* Body */}
        <p className="text-soft-white/50 max-w-xl mx-auto mb-12 font-light animate-fade-in-up"
          style={{ fontSize: '1rem', lineHeight: '1.8', animationDelay: '0.6s', animationFillMode: 'forwards', opacity: 0 }}>
          One door closed because it was too small for you. Reset, rebuild, and walk into the next one like your name was already on the door.
        </p>

        {/* CTA */}
        <button
          onClick={onRestart}
          className="cta-button animate-fade-in-up"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards', opacity: 0 }}
        >
          <span>Start Again</span>
        </button>
      </div>
    </section>
  );
}

export default App;
