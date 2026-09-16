import FadeIn from './FadeIn';

export default function ImpressumSection() {
  return (
    <section id="impressum" className="scroll-mt-28 max-w-2xl">
      <FadeIn direction="up">
        <h2 className="font-bold text-2xl md:text-3xl mb-6">Impressum</h2>
        <div className="space-y-5 text-sm leading-relaxed text-black/80">
          <p>Angaben gemäß § 5 TMG</p>
          <p>
            Tom Nüßer
            <br />
            Breedlandweg 27
            <br />
            24944 Flensburg
            <br />
            Deutschland
          </p>
          <p>
            Umsatzsteuer-Identifikationsnummer:
            <br />
            Nicht vorhanden.
          </p>
          <p>
            Verantwortlich für den Inhalt nach § 18 MStV:
            <br />
            Tom Nüßer
            <br />
            Breedlandweg 27
            <br />
            24944 Flensburg
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
