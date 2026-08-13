import { LegalLayout, LSection, LP, LUL } from "~/components/LegalLayout";
import { useT } from "~/lib/i18n";

export function meta() {
  return [
    { title: "Privatlivspolitik – Svaleholm Roskilde" },
    { name: "description", content: "Sådan behandler Svaleholm Gaard Roskilde dine personoplysninger, når du kontakter os eller bruger vores prisberegner." },
    { name: "robots", content: "noindex" },
  ];
}

export default function Privatlivspolitik() {
  const t = useT();
  return (
    <LegalLayout
      eyebrow={t("Persondata", "Personal data")}
      title={t("Privatlivspolitik", "Privacy policy")}
      updated={t("Senest opdateret: august 2026", "Last updated: August 2026")}
    >
      <LSection heading={t("1. Dataansvarlig", "1. Data controller")}>
        <LP>{t(
          "Svaleholm Gaard Roskilde er dataansvarlig for behandlingen af de personoplysninger, du deler med os via hjemmesiden. Du kan kontakte os her:",
          "Svaleholm Gaard Roskilde is the data controller for the personal data you share with us via this website. You can reach us here:"
        )}</LP>
        <LUL items={[
          "Svaleholm Gaard Roskilde",
          "Frederiksborgvej 388, 4000 Roskilde",
          t("Telefon: +45 71 53 13 79", "Phone: +45 71 53 13 79"),
          "E-mail: kontakt@svaleholmroskilde.dk",
          t("CVR-nr.: (udfyldes)", "Company reg. no.: (to be added)"),
        ]} />
      </LSection>

      <LSection heading={t("2. Hvilke oplysninger vi indsamler", "2. What we collect")}>
        <LP>{t(
          "Når du udfylder kontaktformularen eller sender en forespørgsel fra prisberegneren, indsamler vi de oplysninger, du selv giver os:",
          "When you fill in the contact form or send an enquiry from the price calculator, we collect the information you provide:"
        )}</LP>
        <LUL items={[
          t("Navn og telefonnummer", "Name and phone number"),
          t("E-mailadresse (hvis du oplyser den)", "E-mail address (if you provide it)"),
          t("Din besked til os", "Your message to us"),
          t("Detaljer fra prisberegneren: ophold eller event, antal, datoer, tilvalg og vejledende pris", "Details from the price calculator: stay or event, quantity, dates, add-ons and guideline price"),
        ]} />
        <LP>{t(
          "Derudover registrerer vores hosting-server tekniske oplysninger som IP-adresse og tidspunkt af sikkerheds- og driftshensyn.",
          "In addition, our hosting server logs technical data such as IP address and timestamp for security and operational purposes."
        )}</LP>
      </LSection>

      <LSection heading={t("3. Formål og retsgrundlag", "3. Purpose and legal basis")}>
        <LP>{t(
          "Vi bruger dine oplysninger til at besvare din henvendelse, udarbejde et tilbud og indgå samt gennemføre en eventuel booking af ophold eller festsal.",
          "We use your information to answer your enquiry, prepare a quote and enter into and carry out any booking of accommodation or the hall."
        )}</LP>
        <LP>{t(
          "Retsgrundlaget er databeskyttelsesforordningen (GDPR) art. 6, stk. 1, litra b (foranstaltninger forud for og opfyldelse af en aftale) og litra a (dit samtykke, når du kontakter os).",
          "The legal basis is the GDPR art. 6(1)(b) (steps prior to and performance of a contract) and (a) (your consent when you contact us)."
        )}</LP>
      </LSection>

      <LSection heading={t("4. Deling og databehandlere", "4. Sharing and processors")}>
        <LP>{t(
          "Vi sælger aldrig dine oplysninger. Vi deler dem kun med de leverandører, der hjælper os med at drive hjemmesiden og besvare henvendelser:",
          "We never sell your information. We only share it with the providers who help us run the website and respond to enquiries:"
        )}</LP>
        <LUL items={[
          t("Vores hosting-/driftsleverandør (Scaleweb)", "Our hosting/operations provider (Scaleweb)"),
          t("Vores e-mailudbyder, der leverer beskeden fra formularen til os", "Our e-mail provider, which delivers the form message to us"),
          t("Google Maps – det indlejrede kort leveres af Google, som kan behandle din IP-adresse og sætte cookies", "Google Maps – the embedded map is served by Google, which may process your IP address and set cookies"),
        ]} />
      </LSection>

      <LSection heading={t("5. Cookies", "5. Cookies")}>
        <LP>{t(
          "Hjemmesiden bruger kun nødvendig lokal lagring til at huske dit sprogvalg. Det indlejrede Google Maps-kort kan sætte cookies fra Google, når det indlæses. Vi bruger ikke cookies til markedsføring.",
          "The website only uses necessary local storage to remember your language choice. The embedded Google Maps map may set cookies from Google when it loads. We do not use cookies for marketing."
        )}</LP>
      </LSection>

      <LSection heading={t("6. Opbevaring", "6. Storage")}>
        <LP>{t(
          "Vi opbevarer din henvendelse, så længe det er nødvendigt for at behandle din forespørgsel og en eventuel booking, samt så længe vi er forpligtet til det efter gældende lovgivning (fx bogføringsloven). Herefter slettes oplysningerne.",
          "We keep your enquiry for as long as necessary to handle your request and any booking, and for as long as we are required to under applicable law (e.g. the Danish Bookkeeping Act). After that the data is deleted."
        )}</LP>
      </LSection>

      <LSection heading={t("7. Dine rettigheder", "7. Your rights")}>
        <LP>{t("Efter databeskyttelsesreglerne har du ret til:", "Under the data protection rules you have the right to:")}</LP>
        <LUL items={[
          t("Indsigt i de oplysninger, vi behandler om dig", "Access the information we hold about you"),
          t("Berigtigelse af forkerte oplysninger", "Have inaccurate information corrected"),
          t("Sletning af dine oplysninger", "Have your information deleted"),
          t("Begrænsning af og indsigelse mod behandlingen", "Restrict and object to the processing"),
          t("Dataportabilitet", "Data portability"),
          t("At trække et samtykke tilbage", "Withdraw a consent"),
        ]} />
        <LP>{t(
          "Vil du gøre brug af dine rettigheder, så kontakt os på kontakt@svaleholmroskilde.dk. Du kan også klage til Datatilsynet (datatilsynet.dk).",
          "To exercise your rights, contact us at kontakt@svaleholmroskilde.dk. You can also complain to the Danish Data Protection Agency (datatilsynet.dk)."
        )}</LP>
      </LSection>
    </LegalLayout>
  );
}
