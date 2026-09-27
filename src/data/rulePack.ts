import type { DraftSection, Localized, QuestionDefinition } from "../types";

const l = (en: string, es: string): Localized => ({ en, es });

export const sections = [
  { id: "membership", label: l("Membership", "Membresía") },
  { id: "meetings", label: l("Meetings & voting", "Reuniones y votación") },
  { id: "leadership", label: l("Leadership", "Liderazgo") },
  { id: "decisions", label: l("Club decisions", "Decisiones del club") },
  { id: "safeguards", label: l("Safeguards", "Salvaguardas") },
  { id: "adoption", label: l("Amendment & adoption", "Enmienda y adopción") }
] as const;

export const questions: QuestionDefinition[] = [
  {
    id: "membership_eligibility",
    section: "membership",
    title: l("Who may become a voting member?", "¿Quién puede ser miembro con derecho a voto?"),
    prompt: l("Choose the eligibility rule the club can verify and administer consistently.", "Elija la regla de elegibilidad que el club pueda verificar y administrar de manera uniforme."),
    why: l("Membership eligibility determines who may vote, hold office, and count toward quorum.", "La elegibilidad determina quién puede votar, ocupar cargos y contar para el cuórum."),
    authority: "required",
    source: l("County chartering rules and common club provisions", "Reglas de afiliación del condado y disposiciones comunes de los clubes"),
    choices: [
      { value: "registered", label: l("Registered Democrats", "Demócratas registrados"), description: l("Voting membership requires Democratic voter registration where legally eligible.", "La membresía con voto requiere registro electoral demócrata cuando sea legalmente elegible."), recommended: true },
      { value: "registered_or_ineligible", label: l("Registered or not yet eligible", "Registrados o aún no elegibles"), description: l("Also permits people who are too young or otherwise not eligible to register, if they affirm Democratic values.", "También permite a quienes son demasiado jóvenes o no reúnen los requisitos para registrarse, si afirman los valores demócratas.") },
      { value: "supporter", label: l("Supporters of Democratic values", "Partidarios de los valores demócratas"), description: l("Broadest access, but may require a separate charter-compliance check.", "Ofrece el acceso más amplio, pero puede requerir una verificación adicional de cumplimiento.") }
    ]
  },
  {
    id: "dues",
    section: "membership",
    title: l("How will dues work?", "¿Cómo funcionarán las cuotas?"),
    prompt: l("Select a dues structure and keep a hardship path visible.", "Seleccione una estructura de cuotas y mantenga visible una opción por dificultades económicas."),
    why: l("Dues affect access, budgeting, and when a member becomes eligible to vote.", "Las cuotas afectan el acceso, el presupuesto y el momento en que una persona puede votar."),
    authority: "safeguard",
    source: l("Common local practice; hardship waiver is a recommended safeguard", "Práctica local común; se recomienda una exención por dificultades"),
    choices: [
      { value: "annual_waiver", label: l("Annual dues with waiver", "Cuota anual con exención"), description: l("The board sets an annual amount and confidentially waives it on request.", "La junta fija una cantidad anual y la exime confidencialmente cuando se solicita."), recommended: true },
      { value: "sliding", label: l("Sliding-scale dues", "Cuota de escala móvil"), description: l("Members choose among suggested amounts, including zero.", "Los miembros eligen entre cantidades sugeridas, incluido cero.") },
      { value: "none", label: l("No required dues", "Sin cuotas obligatorias"), description: l("Maximizes access but requires another funding plan.", "Maximiza el acceso, pero requiere otro plan de financiamiento.") }
    ]
  },
  {
    id: "meeting_cadence",
    section: "meetings",
    title: l("How often must the club meet?", "¿Con qué frecuencia debe reunirse el club?"),
    prompt: l("Choose a minimum cadence; the club may always meet more often.", "Elija una frecuencia mínima; el club siempre podrá reunirse con mayor frecuencia."),
    why: l("A minimum cadence keeps member control meaningful without making missed meetings a technical violation.", "Una frecuencia mínima mantiene el control de los miembros sin convertir reuniones omitidas en una infracción técnica."),
    authority: "common",
    source: l("Common patterns across San Diego club bylaws", "Patrones comunes en los estatutos de clubes de San Diego"),
    choices: [
      { value: "monthly", label: l("Monthly", "Mensual"), description: l("Best for active clubs with regular programs.", "Adecuado para clubes activos con programas regulares."), recommended: true },
      { value: "quarterly", label: l("At least quarterly", "Al menos trimestral"), description: l("Reduces administrative burden while preserving member oversight.", "Reduce la carga administrativa y mantiene la supervisión de los miembros.") },
      { value: "six", label: l("At least six per year", "Al menos seis al año"), description: l("Allows seasonal scheduling without long gaps.", "Permite calendarios estacionales sin intervalos prolongados.") }
    ]
  },
  {
    id: "quorum",
    section: "meetings",
    title: l("What makes a membership vote valid?", "¿Qué hace válida una votación de los miembros?"),
    prompt: l("Choose a quorum that is attainable but cannot be captured by a tiny group.", "Elija un cuórum alcanzable que no permita que un grupo muy pequeño controle la decisión."),
    why: l("Too high prevents action; too low permits unrepresentative decisions.", "Un cuórum demasiado alto impide actuar; uno demasiado bajo permite decisiones poco representativas."),
    authority: "safeguard",
    source: l("Governance safeguard synthesized from local alternatives", "Salvaguarda de gobernanza derivada de alternativas locales"),
    choices: [
      { value: "ten_percent_min5", label: l("10%, minimum five", "10 %, mínimo cinco"), description: l("Scales with membership and protects very small meetings.", "Se adapta al tamaño de la membresía y protege reuniones muy pequeñas."), recommended: true },
      { value: "twenty_percent", label: l("20% of voting members", "20 % de miembros con voto"), description: l("Broader participation, but harder for large or inactive rosters.", "Participación más amplia, pero más difícil con padrones grandes o inactivos.") },
      { value: "fixed_ten", label: l("Ten voting members", "Diez miembros con voto"), description: l("Simple to administer but does not scale with club size.", "Es fácil de administrar, pero no se adapta al tamaño del club.") }
    ]
  },
  {
    id: "remote_participation",
    section: "meetings",
    title: l("May members participate remotely?", "¿Pueden participar los miembros a distancia?"),
    prompt: l("Define remote participation before a disputed vote occurs.", "Defina la participación remota antes de que ocurra una votación disputada."),
    why: l("The bylaws should say whether remote attendees count for quorum and voting.", "Los estatutos deben indicar si los asistentes remotos cuentan para el cuórum y la votación."),
    authority: "safeguard",
    source: l("Modern governance safeguard", "Salvaguarda moderna de gobernanza"),
    choices: [
      { value: "full", label: l("Full remote participation", "Participación remota plena"), description: l("Remote members count for quorum and may vote through an approved method.", "Los miembros remotos cuentan para el cuórum y pueden votar mediante un método aprobado."), recommended: true },
      { value: "board_authorized", label: l("When the board authorizes it", "Cuando lo autorice la junta"), description: l("Flexible, but member rights may vary by meeting.", "Es flexible, pero los derechos pueden variar según la reunión.") },
      { value: "in_person", label: l("In-person voting only", "Votación solo presencial"), description: l("Simplest to administer and least accessible.", "Es lo más sencillo de administrar y lo menos accesible.") }
    ]
  },
  {
    id: "officers",
    section: "leadership",
    title: l("Which officers will the club require?", "¿Qué cargos requerirá el club?"),
    prompt: l("Use only roles the club can reliably fill and define each role’s authority.", "Use solo los cargos que el club pueda cubrir de manera confiable y defina la autoridad de cada uno."),
    why: l("Unfilled mandatory offices can make routine action impossible.", "Los cargos obligatorios vacantes pueden impedir las actividades ordinarias."),
    authority: "common",
    source: l("Common local structures", "Estructuras locales comunes"),
    choices: [
      { value: "four", label: l("President, vice president, secretary, treasurer", "Presidencia, vicepresidencia, secretaría y tesorería"), description: l("Separates records and money while providing succession.", "Separa los registros y las finanzas y establece sucesión."), recommended: true },
      { value: "three", label: l("Chair, secretary, treasurer", "Presidencia, secretaría y tesorería"), description: l("A lean structure for smaller clubs.", "Una estructura reducida para clubes pequeños.") },
      { value: "cochairs", label: l("Co-chairs, secretary, treasurer", "Copresidencias, secretaría y tesorería"), description: l("Shares leadership but needs a clear tie-breaking and responsibility rule.", "Comparte el liderazgo, pero necesita reglas claras para desempates y responsabilidades.") }
    ]
  },
  {
    id: "terms",
    section: "leadership",
    title: l("How long is an officer term?", "¿Cuánto dura el mandato de un cargo?"),
    prompt: l("Balance continuity with regular member control.", "Equilibre la continuidad con el control periódico de los miembros."),
    why: l("Term length determines election frequency and leadership transition.", "La duración determina la frecuencia electoral y la transición del liderazgo."),
    authority: "preference",
    source: l("Common local alternatives", "Alternativas locales comunes"),
    choices: [
      { value: "one", label: l("One year", "Un año"), description: l("Frequent accountability and more election administration.", "Mayor rendición de cuentas y más administración electoral."), recommended: true },
      { value: "two_staggered", label: l("Two years, staggered", "Dos años, escalonados"), description: l("More continuity; staggered elections preserve institutional knowledge.", "Mayor continuidad; las elecciones escalonadas conservan experiencia institucional.") },
      { value: "two_all", label: l("Two years, all together", "Dos años, todos a la vez"), description: l("Simple ballot but permits a complete leadership turnover.", "Boleta sencilla, pero permite un cambio total de liderazgo.") }
    ]
  },
  {
    id: "endorsement_threshold",
    section: "decisions",
    title: l("What threshold is required for an endorsement?", "¿Qué umbral se requiere para un respaldo?"),
    prompt: l("Set the rule before candidates or measures are considered.", "Establezca la regla antes de considerar candidaturas o medidas."),
    why: l("Endorsements are consequential and frequently contested club decisions.", "Los respaldos son decisiones importantes y con frecuencia disputadas."),
    authority: "safeguard",
    source: l("County procedures plus common club safeguards", "Procedimientos del condado y salvaguardas comunes de los clubes"),
    choices: [
      { value: "sixty", label: l("60% of votes cast", "60 % de los votos emitidos"), description: l("Requires meaningful consensus without making endorsement unusually difficult.", "Requiere un consenso significativo sin dificultar excesivamente el respaldo."), recommended: true },
      { value: "majority", label: l("Simple majority", "Mayoría simple"), description: l("Decisive and familiar, but may produce a divisive endorsement.", "Es decisivo y conocido, pero puede producir un respaldo divisivo.") },
      { value: "two_thirds", label: l("Two-thirds", "Dos tercios"), description: l("Strong consensus, with a greater chance of no endorsement.", "Consenso fuerte, con mayor posibilidad de no otorgar respaldo.") }
    ]
  },
  {
    id: "finance_controls",
    section: "safeguards",
    title: l("How will spending be authorized?", "¿Cómo se autorizarán los gastos?"),
    prompt: l("Separate custody, approval, and reporting as much as club size allows.", "Separe la custodia, la aprobación y los informes tanto como permita el tamaño del club."),
    why: l("Basic internal controls protect both club funds and volunteer officers.", "Los controles internos básicos protegen los fondos y a los dirigentes voluntarios."),
    authority: "safeguard",
    source: l("Recommended financial-control practice", "Práctica recomendada de control financiero"),
    choices: [
      { value: "dual", label: l("Budget plus two-person approval", "Presupuesto y aprobación de dos personas"), description: l("Expenses follow an approved budget; unbudgeted spending needs two authorized officers.", "Los gastos siguen un presupuesto aprobado; los gastos no presupuestados requieren dos dirigentes autorizados."), recommended: true },
      { value: "board", label: l("Board approval", "Aprobación de la junta"), description: l("The board approves spending and receives regular reports.", "La junta aprueba los gastos y recibe informes periódicos.") },
      { value: "treasurer", label: l("Treasurer within a budget", "Tesorería dentro del presupuesto"), description: l("Efficient, but concentrates execution and oversight.", "Es eficiente, pero concentra la ejecución y la supervisión.") }
    ]
  },
  {
    id: "discipline",
    section: "safeguards",
    title: l("What process applies to suspension or removal?", "¿Qué proceso se aplica a la suspensión o expulsión?"),
    prompt: l("Define notice, an opportunity to respond, and who decides.", "Defina la notificación, la oportunidad de responder y quién decide."),
    why: l("Clear due process reduces arbitrary enforcement and internal conflict.", "Un debido proceso claro reduce la aplicación arbitraria y los conflictos internos."),
    authority: "safeguard",
    source: l("Recommended governance safeguard", "Salvaguarda de gobernanza recomendada"),
    choices: [
      { value: "member_vote", label: l("Written notice, hearing, two-thirds member vote", "Aviso escrito, audiencia y voto de dos tercios de los miembros"), description: l("Strongest member control and due-process protection.", "Ofrece el mayor control de los miembros y protección procesal."), recommended: true },
      { value: "board_appeal", label: l("Board decision with member appeal", "Decisión de la junta con apelación a los miembros"), description: l("Faster initial action with a meaningful appeal.", "Acción inicial más rápida con una apelación significativa.") },
      { value: "board", label: l("Board decision", "Decisión de la junta"), description: l("Fastest and least protective; should require a supermajority.", "Es lo más rápido y menos protector; debería requerir una supermayoría.") }
    ]
  },
  {
    id: "amendments",
    section: "adoption",
    title: l("How may the bylaws be amended?", "¿Cómo pueden enmendarse los estatutos?"),
    prompt: l("Pair a voting threshold with advance notice of the exact text.", "Combine un umbral de votación con aviso previo del texto exacto."),
    why: l("Amendment rules should permit repair without allowing surprise changes.", "Las reglas deben permitir correcciones sin cambios sorpresivos."),
    authority: "required",
    source: l("Essential bylaws provision and common local safeguard", "Disposición esencial y salvaguarda local común"),
    choices: [
      { value: "two_thirds_14", label: l("Two-thirds with 14 days’ notice", "Dos tercios con 14 días de aviso"), description: l("Balances stability, transparency, and practical scheduling.", "Equilibra estabilidad, transparencia y programación práctica."), recommended: true },
      { value: "two_thirds_30", label: l("Two-thirds with 30 days’ notice", "Dos tercios con 30 días de aviso"), description: l("More deliberation, but slower corrections.", "Permite más deliberación, pero retrasa las correcciones.") },
      { value: "majority_14", label: l("Majority with 14 days’ notice", "Mayoría con 14 días de aviso"), description: l("Easier to amend and less stable.", "Es más fácil de enmendar y menos estable.") }
    ]
  },
  {
    id: "parliamentary_authority",
    section: "adoption",
    title: l("Which parliamentary authority fills procedural gaps?", "¿Qué autoridad parlamentaria cubre los vacíos de procedimiento?"),
    prompt: l("Name an authority only for issues the bylaws and adopted rules do not answer.", "Nombre una autoridad solo para asuntos que los estatutos y reglas adoptadas no resuelvan."),
    why: l("A gap-filler prevents procedural improvisation while preserving the club’s own rules.", "Una regla supletoria evita la improvisación y preserva las reglas propias del club."),
    authority: "common",
    source: l("Common parliamentary practice", "Práctica parlamentaria común"),
    choices: [
      { value: "roberts", label: l("Robert’s Rules, current edition", "Reglas de Robert, edición vigente"), description: l("Widely recognized and useful when applied subordinately.", "Es ampliamente reconocida y útil cuando se aplica de manera subordinada."), recommended: true },
      { value: "demeter", label: l("Demeter’s Manual", "Manual de Demeter"), description: l("A parliamentary alternative some organizations prefer.", "Una alternativa parlamentaria preferida por algunas organizaciones.") },
      { value: "none", label: l("No external authority", "Sin autoridad externa"), description: l("Keeps procedure simple but leaves more gaps to interpretation.", "Mantiene el procedimiento sencillo, pero deja más vacíos de interpretación.") }
    ]
  }
];

const pick = (answers: Record<string, string>, id: string, fallback: string) => answers[id] || fallback;

export function buildDraft(clubName: string, answers: Record<string, string>): DraftSection[] {
  const name = clubName.trim() || "[CLUB NAME / NOMBRE DEL CLUB]";
  const q = (id: string) => questions.find((item) => item.id === id)!;
  const label = (id: string, locale: "en" | "es") => {
    const item = q(id).choices.find((choice) => choice.value === answers[id]);
    return item?.label[locale] || (locale === "en" ? "[DECISION NEEDED]" : "[DECISIÓN PENDIENTE]");
  };
  const quorumEn: Record<string, string> = {
    ten_percent_min5: "ten percent of voting members, but never fewer than five voting members",
    twenty_percent: "twenty percent of voting members",
    fixed_ten: "ten voting members"
  };
  const quorumEs: Record<string, string> = {
    ten_percent_min5: "el diez por ciento de los miembros con voto, pero nunca menos de cinco",
    twenty_percent: "el veinte por ciento de los miembros con voto",
    fixed_ten: "diez miembros con voto"
  };
  const amend = pick(answers, "amendments", "");
  const amendThreshold = amend.startsWith("majority") ? l("a majority", "una mayoría") : l("two-thirds", "dos tercios");
  const amendDays = amend.endsWith("30") ? "30" : "14";
  return [
    {
      id: "name-purpose",
      title: l("Article I — Name and purpose", "Artículo I — Nombre y propósito"),
      body: l(`The name of this organization is ${name}. The Club advances Democratic values through civic education, organizing, community service, candidate and issue engagement, and participation in the San Diego County Democratic Party.`, `El nombre de esta organización es ${name}. El Club promueve los valores demócratas mediante educación cívica, organización, servicio comunitario, participación en candidaturas y asuntos públicos, y participación en el Partido Demócrata del Condado de San Diego.`),
      questionIds: []
    },
    {
      id: "affiliation",
      title: l("Article II — Affiliation and equal participation", "Artículo II — Afiliación y participación equitativa"),
      body: l("The Club will maintain its charter and comply with applicable rules of the San Diego County Democratic Party. The Club will not discriminate on the basis of race, color, religion, ancestry, national origin, disability, medical condition, marital status, sex, gender, gender identity or expression, sexual orientation, age, or any other status protected by law.", "El Club mantendrá su afiliación y cumplirá las reglas aplicables del Partido Demócrata del Condado de San Diego. El Club no discriminará por raza, color, religión, ascendencia, origen nacional, discapacidad, condición médica, estado civil, sexo, género, identidad o expresión de género, orientación sexual, edad ni cualquier otra condición protegida por la ley."),
      questionIds: []
    },
    {
      id: "membership",
      title: l("Article III — Membership", "Artículo III — Membresía"),
      body: l(`Voting eligibility: ${label("membership_eligibility", "en")}. Dues policy: ${label("dues", "en")}. No person will be denied membership solely because of inability to pay. The secretary will maintain the voting-membership record and provide a reasonable process to correct it before a vote.`, `Elegibilidad para votar: ${label("membership_eligibility", "es")}. Política de cuotas: ${label("dues", "es")}. No se negará la membresía únicamente por incapacidad de pago. La secretaría mantendrá el registro de miembros con voto y ofrecerá un proceso razonable para corregirlo antes de una votación.`),
      questionIds: ["membership_eligibility", "dues"]
    },
    {
      id: "meetings",
      title: l("Article IV — Meetings and notice", "Artículo IV — Reuniones y avisos"),
      body: l(`Regular meetings will occur ${label("meeting_cadence", "en").toLowerCase()}. Members will receive reasonable notice stating the time, place or access method, and any action requiring advance notice. Remote participation: ${label("remote_participation", "en")}.`, `Las reuniones ordinarias se celebrarán con frecuencia ${label("meeting_cadence", "es").toLowerCase()}. Los miembros recibirán aviso razonable con la hora, el lugar o método de acceso y cualquier acción que requiera aviso previo. Participación remota: ${label("remote_participation", "es")}.`),
      questionIds: ["meeting_cadence", "remote_participation"]
    },
    {
      id: "quorum-voting",
      title: l("Article V — Quorum and voting", "Artículo V — Cuórum y votación"),
      body: l(`A quorum is ${quorumEn[pick(answers, "quorum", "")] || "[DECISION NEEDED]"}. Unless these bylaws require a higher threshold, an action is approved by a majority of votes cast. Proxy voting is not permitted. The chair will announce the voting method and eligibility rule before voting begins.`, `El cuórum es ${quorumEs[pick(answers, "quorum", "")] || "[DECISIÓN PENDIENTE]"}. Salvo que estos estatutos exijan un umbral mayor, una acción se aprueba por mayoría de votos emitidos. No se permite el voto por poder. La presidencia anunciará el método de votación y la regla de elegibilidad antes de iniciar la votación.`),
      questionIds: ["quorum"]
    },
    {
      id: "officers",
      title: l("Article VI — Officers", "Artículo VI — Dirigentes"),
      body: l(`Required officers: ${label("officers", "en")}. Officer terms: ${label("terms", "en")}. Officers must perform the duties assigned by these bylaws, adopted policies, and the membership. A vacancy may be filled by member election after notice; the board may make a temporary appointment until that election.`, `Cargos requeridos: ${label("officers", "es")}. Duración de mandatos: ${label("terms", "es")}. Los dirigentes cumplirán las funciones asignadas por estos estatutos, las políticas adoptadas y la membresía. Una vacante podrá cubrirse mediante elección de los miembros con aviso previo; la junta podrá hacer un nombramiento temporal hasta esa elección.`),
      questionIds: ["officers", "terms"]
    },
    {
      id: "elections",
      title: l("Article VII — Nominations and elections", "Artículo VII — Nominaciones y elecciones"),
      body: l("The Club will give advance notice of elected offices, nomination procedures, voter eligibility, and the election date. Nominations must be open to eligible members. Contested elections will use a secret ballot or an equivalently private electronic method. The candidate receiving a majority is elected; if no candidate receives a majority, the Club will conduct a runoff between the two leading candidates.", "El Club notificará con anticipación los cargos electivos, el procedimiento de nominación, la elegibilidad de votantes y la fecha de elección. Las nominaciones estarán abiertas a miembros elegibles. Las elecciones disputadas utilizarán voto secreto o un método electrónico de privacidad equivalente. Resultará electa la candidatura que reciba mayoría; si ninguna la obtiene, habrá segunda vuelta entre las dos candidaturas principales."),
      questionIds: ["terms"]
    },
    {
      id: "endorsements",
      title: l("Article VIII — Endorsements", "Artículo VIII — Respaldos"),
      body: l(`An endorsement requires ${label("endorsement_threshold", "en").toLowerCase()} after notice identifying the contest or measure. The Club will follow applicable County Party procedures, disclose material conflicts, provide a fair opportunity to be considered, and accurately report the result.`, `Un respaldo requiere ${label("endorsement_threshold", "es").toLowerCase()} después de un aviso que identifique la contienda o medida. El Club seguirá los procedimientos aplicables del Partido del Condado, revelará conflictos importantes, brindará oportunidad justa de consideración e informará el resultado con precisión.`),
      questionIds: ["endorsement_threshold"]
    },
    {
      id: "finance",
      title: l("Article IX — Finances and records", "Artículo IX — Finanzas y registros"),
      body: l(`Spending control: ${label("finance_controls", "en")}. The treasurer will maintain complete records, make regular reports, and complete all required filings. Club funds may be used only for authorized club purposes. Financial records will be available for reasonable member inspection, subject to privacy and security safeguards.`, `Control de gastos: ${label("finance_controls", "es")}. La tesorería mantendrá registros completos, presentará informes periódicos y realizará las declaraciones requeridas. Los fondos solo se usarán para fines autorizados del Club. Los registros financieros estarán disponibles para inspección razonable de los miembros, con salvaguardas de privacidad y seguridad.`),
      questionIds: ["finance_controls"]
    },
    {
      id: "conduct",
      title: l("Article X — Conduct, conflicts, and discipline", "Artículo X — Conducta, conflictos y disciplina"),
      body: l(`Disciplinary process: ${label("discipline", "en")}. A person with a material conflict of interest must disclose it and abstain when required by adopted policy. Any disciplinary notice must identify the conduct at issue, the possible action, and the opportunity to respond.`, `Proceso disciplinario: ${label("discipline", "es")}. Toda persona con un conflicto de interés importante deberá revelarlo y abstenerse cuando lo exija la política adoptada. Todo aviso disciplinario identificará la conducta, la posible medida y la oportunidad de responder.`),
      questionIds: ["discipline"]
    },
    {
      id: "amendment",
      title: l("Article XI — Amendments", "Artículo XI — Enmiendas"),
      body: l(`These bylaws may be amended by ${amendThreshold.en} of votes cast at a meeting for which the complete proposed text was provided at least ${amendDays} days in advance. An amendment may not conflict with controlling law or applicable County Party rules.`, `Estos estatutos podrán enmendarse por ${amendThreshold.es} de los votos emitidos en una reunión para la cual se haya proporcionado el texto completo propuesto con al menos ${amendDays} días de anticipación. Ninguna enmienda podrá contradecir la ley ni las reglas aplicables del Partido del Condado.`),
      questionIds: ["amendments"]
    },
    {
      id: "authority-dissolution",
      title: l("Article XII — Parliamentary authority and dissolution", "Artículo XII — Autoridad parlamentaria y disolución"),
      body: l(`Parliamentary authority: ${label("parliamentary_authority", "en")}, to the extent consistent with these bylaws and applicable rules. On dissolution, remaining assets will be transferred to an eligible Democratic organization or nonprofit selected by the membership, after payment of lawful obligations.`, `Autoridad parlamentaria: ${label("parliamentary_authority", "es")}, en la medida en que sea compatible con estos estatutos y reglas aplicables. Al disolverse, los activos restantes se transferirán a una organización demócrata o entidad sin fines de lucro elegible seleccionada por los miembros, después de pagar las obligaciones legales.`),
      questionIds: ["parliamentary_authority"]
    }
  ];
}

export const authorityLabels: Record<string, Localized> = {
  required: l("County / essential requirement", "Requisito del condado o esencial"),
  safeguard: l("Recommended safeguard", "Salvaguarda recomendada"),
  common: l("Common local practice", "Práctica local común"),
  preference: l("Club preference", "Preferencia del club")
};
