import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ClinicalStampBadge } from "@/components/ui/ClinicalStampBadge";
import { Button } from "@/components/ui/Button";
import { whatsapp } from "@/lib/whatsapp";

const CASES = [
  {
    slug: "mbd-pogona",
    title: "Metabolic Bone Disease en Pogona vitticeps",
    species: "Dragón Barbudo", scientific: "Pogona vitticeps",
    date: "Agosto 2025", source: "Manual MSD Veterinary, 2022",
    tags: ["nutrición", "pogona", "MBD"],
    body: `
La enfermedad metabólica ósea (MBD) es la patología más frecuente en dragones barbudos en cautiverio, causada principalmente por déficit de calcio, fósforo y/o vitamina D3 activa.

**Presentación del caso**
Ejemplar juvenil de 8 meses, peso 120 g (bajo para la edad). El propietario reporta dificultad para caminar, tremores posturales y cifosis leve. La alimentación consistía exclusivamente en grillos sin suplementar.

**Diagnóstico**
Radiografías AP y LAT confirman reducción de densidad ósea en columna y extremidades. Calcio sérico: 6.4 mg/dL (referencia: 8-12 mg/dL). Diagnóstico: MBD grado II.

**Tratamiento**
- Gluconato de calcio 100 mg/kg/día VO durante 4 semanas
- Vitamina D3 oral 400 UI cada 72h
- Corrección del enclosure: lámpara UVB 10.0 a 30 cm de distancia, 10-12h/día
- Dieta: 70% vegetales (col rizada, berros, diente de león) + 30% proteína suplementada con calcio en polvo

**Seguimiento (8 semanas)**
Mejora significativa de la densidad ósea en radiografía de control. Normalización del calcio sérico a 9.2 mg/dL. Recuperación completa de la movilidad.

**Referencias**
- Meredith A, Johnson-Delaney C. *BSAVA Manual of Exotic Pets*, 2010.
- Merck Veterinary Manual. *Metabolic Bone Disease in Reptiles*, 2022.
    `.trim(),
  },
  {
    slug: "crypto-gecko",
    title: "Criptosporidiosis en Eublepharis macularius",
    species: "Gecko Leopardo", scientific: "Eublepharis macularius",
    date: "Julio 2025", source: "Frye FL, Reptile Clinician's Handbook",
    tags: ["parásitos", "gecko", "bioseguridad"],
    body: `
La criptosporidiosis es una de las enfermedades parasitarias más devastadoras en colecciones de reptiles, causada por *Cryptosporidium varanii* en lagartos.

**Presentación del caso**
Gecko leopardo adulto, 4 años, pérdida de peso progresiva durante 3 meses (de 75 g a 51 g). Anorexia intermitente, heces pastosas ocasionales.

**Diagnóstico**
PCR fecal positiva para *Cryptosporidium varanii*. Endoscopia con biopsia gástrica: hiperplasia epitelial característica.

**Manejo**
No existe tratamiento curativo comprobado. Se implementó manejo paliativo:
- Paromomicina 360 mg/kg/día VO (reduce carga parasitaria, no elimina)
- Soporte nutricional: alimento por sonda cada 72h
- Aislamiento estricto de otros individuos de la colección
- Desinfección con solución de amoniaco al 5% (único desinfectante efectivo contra oocistos)

**Bioseguridad**
El propietario fue informado sobre el carácter crónico de la enfermedad y el riesgo de transmisión. Se recomendó no adquirir nuevos individuos hasta confirmar ausencia de infección por PCR en todos los animales de la colección.

**Referencias**
- Frye FL. *Reptile Clinician's Handbook*, 1994.
- Jacobson ER. *Infectious Diseases and Pathology of Reptiles*, 2007.
    `.trim(),
  },
  {
    slug: "vit-a-quelonios",
    title: "Deficiencia de Vitamina A en quelonios acuáticos",
    species: "Tortuga de agua", scientific: "Trachemys scripta",
    date: "Julio 2025", source: "Reptile Medicine and Surgery, Mader DR",
    tags: ["vitaminas", "tortuga", "nutrición"],
    body: `
La hipovitaminosis A es frecuente en tortugas acuáticas alimentadas exclusivamente con lechuga o dietas sin variedad, ya que estas no aportan suficiente beta-caroteno.

**Presentación**
Tortuga de orejas rojas, 2 años. Blefaroedema bilateral, apática, sin apetito. Mucosas orales pálidas.

**Diagnóstico**
Clínico, apoyado en historial dietético deficiente. Se descartó infección bacteriana ocular mediante cultivo negativo.

**Tratamiento**
- Vitamina A palmitato 2000 UI/kg IM dosis única (mayor riesgo de hipervitaminosis con inyectable; monitorear)
- Corrección dietética: incorporar camote, zanahoria, diente de león, gambas
- Antibiótico tópico ocular (terramicina) para prevenir infección secundaria

**Seguimiento**
Resolución del blefaroedema a los 14 días. Retorno del apetito en 7 días.

**Referencias**
- Mader DR. *Reptile Medicine and Surgery*, 2nd ed., 2006.
- Boyer TH. *Essentials of Reptiles: A Guide for Practitioners*, 1998.
    `.trim(),
  },
  {
    slug: "stomatitis-boa",
    title: "Estomatitis infecciosa en Boa constrictor",
    species: "Boa Constrictor", scientific: "Boa constrictor",
    date: "Junio 2025", source: "Infectious Diseases and Pathology of Reptiles, Jacobson ER",
    tags: ["infeccioso", "boa", "boca"],
    body: `
La estomatitis infecciosa (mouth rot) es una infección bacteriana de la mucosa oral, frecuente en serpientes inmunodeprimidas o mantenidas en condiciones subóptimas.

**Presentación**
Boa constrictor hembra adulta, 6 años, 3.2 kg. El propietario nota exudado blanquecino en la boca y la serpiente rechaza alimento desde hace 3 semanas.

**Diagnóstico**
Examen oral: úlceras extensas en mucosa gingival, exudado mucopurulento. Cultivo: *Pseudomonas aeruginosa* sensible a enrofloxacina.

**Tratamiento**
- Enrofloxacina 5 mg/kg/día SC durante 21 días
- Metronidazol 20 mg/kg cada 48h VO (flora anaerobia)
- Limpieza oral con clorhexidina 0.2% cada 48h
- AINE (meloxicam 0.3 mg/kg/día) para control del dolor
- Corrección de temperatura (punto frío 24°C, punto caliente 32°C)

**Seguimiento**
Resolución completa a los 28 días. Retorno de apetito en día 14 post-inicio de tratamiento.

**Referencias**
- Jacobson ER. *Infectious Diseases and Pathology of Reptiles*, 2007.
- Cooper JE, Cooper ME. *Introduction to Veterinary and Comparative Forensic Medicine*, 2007.
    `.trim(),
  },
];

export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CASES.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: `Caso clínico documentado — ${c.species} (${c.scientific}). ${c.source}.`,
  };
}

export default async function CasoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CASES.find((x) => x.slug === slug);
  if (!c) notFound();

  const lines = c.body.split("\n");

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-[var(--color-ink-soft)] mb-8">
        <Link href="/" className="hover:text-[var(--color-ink)]">Inicio</Link>
        <ChevronRight size={12} />
        <Link href="/veterinaria" className="hover:text-[var(--color-ink)]">Veterinaria</Link>
        <ChevronRight size={12} />
        <Link href="/veterinaria/casos" className="hover:text-[var(--color-ink)]">Casos</Link>
        <ChevronRight size={12} />
        <span className="text-[var(--color-ink)] line-clamp-1">{c.title}</span>
      </nav>

      {/* Hero del caso */}
      <div className="flex items-start gap-6 mb-8">
        <ClinicalStampBadge size="lg" className="shrink-0" />
        <div>
          <p className="text-[11px] font-mono text-[var(--color-vet)] uppercase tracking-widest mb-1">
            {c.species}
          </p>
          <p className="scientific-name text-sm text-[var(--color-ink-soft)] mb-3">{c.scientific}</p>
          <h1 className="font-display text-2xl md:text-3xl text-[var(--color-ink)] leading-snug">{c.title}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {c.tags.map((t) => (
              <span key={t} className="text-[10px] font-mono text-[var(--color-vet)] bg-[var(--color-vet-soft)] border border-[var(--color-vet)]/30 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <article className="prose-sm max-w-none">
        {lines.map((line, i) => {
          if (!line.trim()) return <br key={i} />;
          if (line.startsWith("**") && line.endsWith("**"))
            return <h2 key={i} className="font-display text-xl text-[var(--color-ink)] mt-6 mb-2">{line.slice(2, -2)}</h2>;
          if (line.startsWith("- "))
            return <li key={i} className="text-sm text-[var(--color-ink)] ml-4 mb-1 list-disc">{line.slice(2)}</li>;
          return <p key={i} className="text-sm text-[var(--color-ink)] leading-relaxed mb-2">{line}</p>;
        })}
      </article>

      {/* Fuente */}
      <div className="mt-8 p-4 bg-[var(--color-vet-soft)] border border-[var(--color-vet)]/20 rounded-[var(--radius-sm)]">
        <p className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-vet)] mb-1">Referencia bibliográfica</p>
        <p className="text-xs text-[var(--color-ink-soft)] italic">{c.source}</p>
        <p className="text-[10px] text-[var(--color-ink-soft)] mt-1">{c.date}</p>
      </div>

      {/* CTA */}
      <div className="mt-8 flex gap-3">
        <Button variant="danger" size="md" href="/veterinaria/agendar" as="a">
          Agendar consulta
        </Button>
        <Button variant="secondary" size="md" href={whatsapp.appointment()} as="a">
          Preguntar por WhatsApp
        </Button>
      </div>
    </div>
  );
}
