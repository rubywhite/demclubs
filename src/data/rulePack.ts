import type { DraftSection, Localized, QuestionDefinition } from "../types";

const l = (en: string, es: string): Localized => ({ en, es });

export const sections = [
  { id: "membership", label: l("Membership", "Membresía") },
  { id: "meetings", label: l("Meetings & voting", "Reuniones y votación") },
  { id: "leadership", label: l("Leadership", "Liderazgo") },
  { id: "governance", label: l("Board & committees", "Junta y comités") },
  { id: "decisions", label: l("Club decisions", "Decisiones del club") },
  { id: "safeguards", label: l("Safeguards", "Salvaguardas") },
  { id: "representation", label: l("Party representation", "Representación partidaria") },
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
    source: l("SDCDP Bylaws, Article X, Section 3", "Estatutos de SDCDP, Artículo X, Sección 3"),
    choices: [
      { value: "registered_or_ineligible", label: l("San Diego County Democrats or pledged when eligible", "Demócratas del Condado de San Diego o comprometidos al ser elegibles"), description: l("Voting members must be registered Democrats in San Diego County, or state their intent to register that way as soon as eligible; other registrants may participate only as non-voting members.", "Los miembros con voto deben estar registrados como demócratas en el Condado de San Diego o declarar que se registrarán así cuando sean elegibles; otras personas registradas solo pueden participar sin voto."), recommended: true },
      { value: "registered", label: l("Registered San Diego County Democrats only", "Solo demócratas registrados del Condado de San Diego"), description: l("Uses the narrowest eligible voting class and does not include people not yet eligible to register.", "Usa la clase de votantes elegibles más limitada y no incluye a quienes aún no pueden registrarse.") },
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
    id: "good_standing",
    section: "membership",
    title: l("What makes a member in good standing?", "¿Qué hace que un miembro esté al corriente?"),
    prompt: l("Define a status the club can verify before votes, elections, and delegate selection.", "Defina un estado que el club pueda verificar antes de votaciones, elecciones y selección de representantes."),
    why: l("The CDP requires a club to define good standing before its roster cutoff for pre-endorsing representatives.", "El CDP exige que el club defina estar al corriente antes de la fecha límite del padrón para representantes de pre-respaldo."),
    authority: "required",
    source: l("CDP Bylaws, Article VIII, Section 3(g)(5)(c)(1)", "Estatutos del CDP, Artículo VIII, Sección 3(g)(5)(c)(1)"),
    choices: [
      { value: "dues_and_values", label: l("Eligible, current on dues or waiver, and supports the purpose", "Elegible, al día con cuotas o exención, y apoya el propósito"), description: l("A member is in good standing when eligible, current on dues or an approved waiver, and not under suspension.", "Un miembro está al corriente cuando es elegible, está al día con las cuotas o una exención aprobada y no está suspendido."), recommended: true },
      { value: "dues_only", label: l("Eligible and current on dues or waiver", "Elegible y al día con cuotas o exención"), description: l("Uses an objective financial and eligibility test without an attendance requirement.", "Usa una prueba objetiva de elegibilidad y situación financiera sin requisito de asistencia.") },
      { value: "attendance", label: l("Eligible, current, and recently active", "Elegible, al día y activo recientemente"), description: l("Also requires attendance at one meeting during a stated lookback period.", "También requiere asistencia a una reunión durante un período determinado.") }
    ]
  },
  {
    id: "voting_eligibility",
    section: "membership",
    title: l("When does a member become eligible to vote?", "¿Cuándo adquiere un miembro el derecho a votar?"),
    prompt: l("Choose a waiting or participation rule that can be applied consistently.", "Elija una regla de espera o participación que pueda aplicarse uniformemente."),
    why: l("Clear eligibility prevents surprise enrollment rules and disputed votes.", "La elegibilidad clara evita reglas sorpresivas de inscripción y votaciones disputadas."),
    authority: "safeguard",
    source: l("SDCDP Club Manual model bylaws and common local practice", "Estatutos modelo del Manual de Clubes de SDCDP y práctica local común"),
    choices: [
      { value: "prior_meeting", label: l("Good standing plus one prior meeting", "Estar al corriente y asistir a una reunión previa"), description: l("A member in good standing may vote after attending at least one prior club meeting.", "Un miembro al corriente puede votar después de asistir al menos a una reunión previa del club."), recommended: true },
      { value: "thirty_days", label: l("Good standing for 30 days", "Estar al corriente durante 30 días"), description: l("A fixed waiting period is easy to verify from the membership record.", "Un período fijo de espera es fácil de verificar en el registro de membresía.") },
      { value: "immediate", label: l("Immediately upon good standing", "Inmediatamente al estar al corriente"), description: l("Maximizes participation but permits same-day enrollment before consequential votes.", "Maximiza la participación, pero permite inscribirse el mismo día de votaciones importantes.") }
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
    id: "meeting_notice",
    section: "meetings",
    title: l("What actions require advance notice?", "¿Qué acciones requieren aviso previo?"),
    prompt: l("Protect consequential votes by naming them and setting a minimum notice period.", "Proteja las votaciones importantes nombrándolas y fijando un plazo mínimo de aviso."),
    why: l("The Club Manual requires two weeks’ notice for endorsements and models notice for elections, vacancies, resolutions, and amendments.", "El Manual de Clubes exige dos semanas de aviso para respaldos y propone aviso para elecciones, vacantes, resoluciones y enmiendas."),
    authority: "required",
    source: l("SDCDP Bylaws, Articles X.3 and XIII.7", "Estatutos de SDCDP, Artículos X.3 y XIII.7"),
    choices: [
      { value: "fourteen_all", label: l("14 days for all consequential actions", "14 días para todas las acciones importantes"), description: l("Give at least 14 days’ notice for elections, vacancies, endorsements, resolutions, and bylaw amendments.", "Dar al menos 14 días de aviso para elecciones, vacantes, respaldos, resoluciones y enmiendas a los estatutos."), recommended: true },
      { value: "fourteen_endorsements", label: l("14 days for endorsements; 10 days for other actions", "14 días para respaldos; 10 días para otras acciones"), description: l("Preserves the County endorsement requirement while shortening notice for internal matters.", "Conserva el requisito del condado para respaldos y acorta el aviso para asuntos internos.") },
      { value: "thirty_amendments", label: l("30 days for amendments; 14 days for other actions", "30 días para enmiendas; 14 días para otras acciones"), description: l("Allows more deliberation before changing the governing document.", "Permite más deliberación antes de modificar el documento rector.") }
    ]
  },
  {
    id: "special_meetings",
    section: "meetings",
    title: l("Who may call a special membership meeting?", "¿Quién puede convocar una reunión especial de miembros?"),
    prompt: l("Provide a member path as well as a leadership path.", "Ofrezca una vía para los miembros además de una vía de liderazgo."),
    why: l("A special-meeting rule lets urgent business proceed without concentrating agenda control in one officer.", "Una regla de reuniones especiales permite atender asuntos urgentes sin concentrar el control de la agenda en un solo cargo."),
    authority: "safeguard",
    source: l("Common club governance safeguard", "Salvaguarda común de gobierno de clubes"),
    choices: [
      { value: "president_board_members", label: l("President, board majority, or 10% of voting members", "Presidencia, mayoría de la junta o 10 % de miembros con voto"), description: l("Balances operational speed with a practical member petition right.", "Equilibra rapidez operativa con un derecho práctico de petición de los miembros."), recommended: true },
      { value: "board_or_twenty", label: l("Board majority or 20% of voting members", "Mayoría de la junta o 20 % de miembros con voto"), description: l("Requires broader support and gives no unilateral call authority to the president.", "Requiere mayor apoyo y no da autoridad unilateral de convocatoria a la presidencia.") },
      { value: "president_or_board", label: l("President or board majority", "Presidencia o mayoría de la junta"), description: l("Easy to administer, but members have no independent petition route.", "Es fácil de administrar, pero los miembros no tienen una vía independiente de petición.") }
    ]
  },
  {
    id: "heightened_quorum",
    section: "meetings",
    title: l("Should elections and endorsements require a higher quorum?", "¿Deben las elecciones y respaldos exigir un cuórum mayor?"),
    prompt: l("Decide whether consequential votes need broader participation than routine business.", "Decida si las votaciones importantes necesitan mayor participación que los asuntos ordinarios."),
    why: l("The Club Manual recommends a higher quorum for endorsement and election meetings.", "El Manual de Clubes recomienda un cuórum mayor para reuniones de respaldo y elección."),
    authority: "safeguard",
    source: l("SDCDP Club Manual, Sections 5.5 and Appendix A", "Manual de Clubes de SDCDP, Secciones 5.5 y Apéndice A"),
    choices: [
      { value: "officers_twenty", label: l("Officers plus 20% of voting members", "Dirigentes más 20 % de miembros con voto"), description: l("Use the regular quorum for routine business and officers plus 20% for elections and endorsements.", "Usar el cuórum ordinario para asuntos rutinarios y dirigentes más 20 % para elecciones y respaldos."), recommended: true },
      { value: "twenty_five", label: l("25% of voting members", "25 % de miembros con voto"), description: l("A simple percentage without adding the officer count.", "Un porcentaje simple sin añadir el número de dirigentes.") },
      { value: "same", label: l("Use the regular quorum", "Usar el cuórum ordinario"), description: l("Simplest, but consequential decisions may be made by a smaller group.", "Es lo más sencillo, pero decisiones importantes pueden tomarse por un grupo menor.") }
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
    id: "officer_elections",
    section: "leadership",
    title: l("How will officers be nominated and elected?", "¿Cómo se nominarán y elegirán los dirigentes?"),
    prompt: l("Choose a transparent process that works for contested and uncontested offices.", "Elija un proceso transparente que funcione para cargos disputados y no disputados."),
    why: l("The model bylaws specify nominations, secret ballots for contested offices, and a runoff when no candidate wins a majority.", "Los estatutos modelo especifican nominaciones, voto secreto para cargos disputados y segunda vuelta cuando nadie obtiene mayoría."),
    authority: "safeguard",
    source: l("SDCDP Club Manual model bylaws, Article IV, Section 3", "Estatutos modelo del Manual de Clubes de SDCDP, Artículo IV, Sección 3"),
    choices: [
      { value: "committee_floor_runoff", label: l("Nominating committee, floor nominations, secret ballot and runoff", "Comité de nominaciones, nominaciones abiertas, voto secreto y segunda vuelta"), description: l("A committee proposes candidates; members may nominate from the floor; contested races use a private ballot and majority runoff.", "Un comité propone candidaturas; los miembros pueden nominar durante la reunión; las contiendas usan voto privado y segunda vuelta por mayoría."), recommended: true },
      { value: "open_floor", label: l("Open nominations with secret ballot", "Nominaciones abiertas con voto secreto"), description: l("Uses no standing nominating committee but preserves an open and private election.", "No usa un comité permanente de nominaciones, pero conserva una elección abierta y privada.") },
      { value: "advance_only", label: l("Advance nominations only", "Solo nominaciones anticipadas"), description: l("Simplifies ballot preparation but requires a clear deadline and broad notice.", "Simplifica la preparación de la boleta, pero requiere plazo claro y aviso amplio.") }
    ]
  },
  {
    id: "officer_duties",
    section: "leadership",
    title: l("How detailed should officer duties be?", "¿Qué tan detalladas deben ser las funciones de los dirigentes?"),
    prompt: l("Decide whether the bylaws themselves will assign the core work of each office.", "Decida si los propios estatutos asignarán el trabajo principal de cada cargo."),
    why: l("Clear duties improve continuity, financial accountability, and transitions between volunteer leaders.", "Las funciones claras mejoran la continuidad, la responsabilidad financiera y las transiciones entre líderes voluntarios."),
    authority: "common",
    source: l("SDCDP Club Manual, Section 4.1 and model bylaws Article IV", "Manual de Clubes de SDCDP, Sección 4.1 y estatutos modelo Artículo IV"),
    choices: [
      { value: "full", label: l("State core duties for every elected office", "Indicar las funciones principales de cada cargo electo"), description: l("Define presiding, succession, minutes and records, communications, custody of funds, reporting, and required filings.", "Definir presidencia, sucesión, actas y registros, comunicaciones, custodia de fondos, informes y declaraciones obligatorias."), recommended: true },
      { value: "policy", label: l("State core duties and allow detail by policy", "Indicar funciones principales y permitir detalles por política"), description: l("The bylaws fix accountability while a board policy assigns recurring operational tasks.", "Los estatutos fijan la responsabilidad y una política de la junta asigna tareas operativas recurrentes.") },
      { value: "minimal", label: l("Use short conventional duty descriptions", "Usar descripciones convencionales breves"), description: l("Keeps the document shorter but leaves more room for disagreement during transitions.", "Mantiene el documento más corto, pero deja más espacio para desacuerdos durante transiciones.") }
    ]
  },
  {
    id: "officer_removal",
    section: "leadership",
    title: l("How may an officer be removed?", "¿Cómo puede destituirse a un dirigente?"),
    prompt: l("Pair stated grounds with notice, an opportunity to respond, and a member vote.", "Combine causas expresas con aviso, oportunidad de responder y voto de los miembros."),
    why: l("Removal language should protect the club from nonperformance without permitting arbitrary action.", "El texto de destitución debe proteger al club frente al incumplimiento sin permitir acciones arbitrarias."),
    authority: "safeguard",
    source: l("SDCDP Club Manual model bylaws, Article IV, Section 1", "Estatutos modelo del Manual de Clubes de SDCDP, Artículo IV, Sección 1"),
    choices: [
      { value: "two_thirds_notice", label: l("Two-thirds member vote after written notice and response", "Voto de dos tercios de los miembros tras aviso escrito y respuesta"), description: l("Requires stated cause, at least 14 days’ notice, an opportunity to respond, quorum, and a two-thirds vote.", "Requiere causa expresa, al menos 14 días de aviso, oportunidad de responder, cuórum y voto de dos tercios."), recommended: true },
      { value: "majority_notice", label: l("Majority member vote after written notice and response", "Voto mayoritario de los miembros tras aviso escrito y respuesta"), description: l("Easier to use but provides less stability for elected leadership.", "Es más fácil de usar, pero brinda menos estabilidad al liderazgo electo.") },
      { value: "recall_petition", label: l("Recall petition followed by two-thirds vote", "Petición de revocación seguida de voto de dos tercios"), description: l("Requires member support before a removal meeting is scheduled.", "Requiere apoyo de los miembros antes de programar una reunión de destitución.") }
    ]
  },
  {
    id: "vacancies",
    section: "leadership",
    title: l("How will officer vacancies be filled?", "¿Cómo se cubrirán las vacantes de dirigentes?"),
    prompt: l("Keep the club functioning while preserving member authority over elected offices.", "Mantenga al club en funcionamiento y preserve la autoridad de los miembros sobre cargos electos."),
    why: l("The model bylaws permit temporary board action but require membership approval and floor nominations.", "Los estatutos modelo permiten acción temporal de la junta, pero requieren aprobación de los miembros y nominaciones abiertas."),
    authority: "common",
    source: l("SDCDP Club Manual model bylaws, Article IV, Section 4", "Estatutos modelo del Manual de Clubes de SDCDP, Artículo IV, Sección 4"),
    choices: [
      { value: "temporary_then_election", label: l("Temporary board appointment, then member election", "Nombramiento temporal de la junta y luego elección de miembros"), description: l("The board may appoint an interim officer until a noticed membership election at the next practical meeting.", "La junta puede nombrar un dirigente interino hasta una elección de miembros debidamente anunciada en la próxima reunión posible."), recommended: true },
      { value: "member_election", label: l("Member election only", "Solo elección de miembros"), description: l("Preserves direct control but may leave an office vacant until a meeting can be noticed.", "Preserva el control directo, pero puede dejar un cargo vacante hasta que pueda avisarse una reunión.") },
      { value: "board_remainder", label: l("Board appointment for the remainder of the term", "Nombramiento de la junta por el resto del mandato"), description: l("Fastest continuity, with the least member involvement.", "Ofrece la continuidad más rápida, con menor participación de los miembros.") }
    ]
  },
  {
    id: "board_authority",
    section: "governance",
    title: l("What may the executive board do between membership meetings?", "¿Qué puede hacer la junta ejecutiva entre reuniones de miembros?"),
    prompt: l("Authorize routine administration without allowing the board to reverse member decisions.", "Autorice la administración rutinaria sin permitir que la junta revierta decisiones de los miembros."),
    why: l("A defined boundary prevents both operational paralysis and board overreach.", "Un límite definido evita tanto la parálisis operativa como el exceso de autoridad de la junta."),
    authority: "safeguard",
    source: l("SDCDP Club Manual model bylaws, Article VI", "Estatutos modelo del Manual de Clubes de SDCDP, Artículo VI"),
    choices: [
      { value: "limited", label: l("Routine business consistent with member action", "Asuntos rutinarios coherentes con las decisiones de los miembros"), description: l("The board administers the club, approves authorized expenditures, and may not amend bylaws, elect officers, or reverse membership action.", "La junta administra el club, aprueba gastos autorizados y no puede enmendar estatutos, elegir dirigentes ni revertir decisiones de los miembros."), recommended: true },
      { value: "broad_report", label: l("Broad interim authority with prompt reporting", "Autoridad interina amplia con informe oportuno"), description: l("The board may act on urgent matters but must report and, where appropriate, seek ratification.", "La junta puede actuar en asuntos urgentes, pero debe informar y, cuando corresponda, solicitar ratificación.") },
      { value: "administrative_only", label: l("Administrative implementation only", "Solo ejecución administrativa"), description: l("Reserves nearly all policy and spending decisions to the membership.", "Reserva casi todas las decisiones de política y gasto a los miembros.") }
    ]
  },
  {
    id: "board_quorum",
    section: "governance",
    title: l("What is the executive board quorum?", "¿Cuál es el cuórum de la junta ejecutiva?"),
    prompt: l("Use a rule that works even when offices are vacant.", "Use una regla que funcione incluso cuando haya cargos vacantes."),
    why: l("Board decisions need a clear participation floor distinct from the membership quorum.", "Las decisiones de la junta necesitan un mínimo claro de participación distinto del cuórum de miembros."),
    authority: "common",
    source: l("SDCDP Club Manual model bylaws, Article VI, Section 3", "Estatutos modelo del Manual de Clubes de SDCDP, Artículo VI, Sección 3"),
    choices: [
      { value: "majority_filled", label: l("Majority of filled elected offices", "Mayoría de cargos electos ocupados"), description: l("A majority of the currently filled elected officer positions constitutes a quorum.", "Una mayoría de los cargos electos actualmente ocupados constituye cuórum."), recommended: true },
      { value: "majority_authorized", label: l("Majority of all authorized offices", "Mayoría de todos los cargos autorizados"), description: l("Vacancies make quorum harder to reach until filled.", "Las vacantes dificultan alcanzar el cuórum hasta que se cubran.") },
      { value: "fixed_three", label: l("Three elected officers", "Tres dirigentes electos"), description: l("Simple for a four-officer structure but does not adapt to other structures.", "Es sencillo para una estructura de cuatro cargos, pero no se adapta a otras estructuras.") }
    ]
  },
  {
    id: "committees",
    section: "governance",
    title: l("Which committees should the bylaws establish?", "¿Qué comités deben establecer los estatutos?"),
    prompt: l("Name only durable committees and allow temporary committees by a defined process.", "Nombre solo comités duraderos y permita comités temporales mediante un proceso definido."),
    why: l("The Club Manual models audit and nominating committees and lists common optional committees.", "El Manual de Clubes propone comités de auditoría y nominaciones y enumera comités opcionales comunes."),
    authority: "common",
    source: l("SDCDP Club Manual model bylaws, Article VII", "Estatutos modelo del Manual de Clubes de SDCDP, Artículo VII"),
    choices: [
      { value: "audit_nominating", label: l("Audit and nominating committees, plus temporary committees", "Comités de auditoría y nominaciones, más comités temporales"), description: l("Establish audit and nominating functions; allow other committees when created by the board and ratified by members.", "Establecer funciones de auditoría y nominaciones; permitir otros comités creados por la junta y ratificados por los miembros."), recommended: true },
      { value: "audit_only", label: l("Audit committee, with nominations handled openly", "Comité de auditoría, con nominaciones abiertas"), description: l("Keeps financial review independent while avoiding a permanent nominating committee.", "Mantiene independiente la revisión financiera y evita un comité permanente de nominaciones.") },
      { value: "none_standing", label: l("No standing committees", "Sin comités permanentes"), description: l("The board creates time-limited committees as needed and states their charge.", "La junta crea comités de duración limitada según sea necesario y define su mandato.") }
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
    id: "endorsement_process",
    section: "decisions",
    title: l("Which endorsement safeguards belong in the bylaws?", "¿Qué salvaguardas de respaldo deben incluirse en los estatutos?"),
    prompt: l("Record the County Party rules that must apply before and after an endorsement vote.", "Registre las reglas del Partido del Condado que deben aplicarse antes y después de una votación de respaldo."),
    why: l("The Club Manual lists specific notice, invitation, eligibility, rating, and attribution requirements for chartered clubs.", "El Manual de Clubes enumera requisitos específicos de aviso, invitación, elegibilidad, calificación y atribución para clubes autorizados."),
    authority: "required",
    source: l("SDCDP Bylaws, Article XIII, Section 7", "Estatutos de SDCDP, Artículo XIII, Sección 7"),
    choices: [
      { value: "full_county", label: l("Include the full County Party safeguard set", "Incluir todas las salvaguardas del Partido del Condado"), description: l("Give members and SDCDP 14 days’ notice; invite all confirmed Democratic candidates at least five business days ahead; copy SDCDP; endorse only registered Democrats; rate others only Qualified or Unacceptable; publish the required club-only disclaimer.", "Dar a miembros y SDCDP aviso de 14 días; invitar a todas las candidaturas demócratas confirmadas con al menos cinco días hábiles; copiar a SDCDP; respaldar solo a demócratas registrados; calificar a los demás solo como Calificado o Inaceptable; publicar el aviso obligatorio de que el respaldo es solo del club."), recommended: true },
      { value: "policy_reference", label: l("Incorporate County rules and maintain a detailed policy", "Incorporar reglas del condado y mantener una política detallada"), description: l("The bylaws state the mandatory safeguards and authorize a separate, consistent endorsement procedure.", "Los estatutos indican las salvaguardas obligatorias y autorizan un procedimiento de respaldo separado y coherente.") },
      { value: "bylaws_only", label: l("Put every endorsement procedure in the bylaws", "Incluir todo el procedimiento de respaldo en los estatutos"), description: l("Most transparent and stable, but procedural changes require a bylaw amendment.", "Es lo más transparente y estable, pero los cambios de procedimiento requieren enmendar los estatutos.") }
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
    id: "representative_selection",
    section: "representation",
    title: l("How will official club representatives be selected?", "¿Cómo se seleccionarán los representantes oficiales del club?"),
    prompt: l("Cover SDCDP Associates, CDP pre-endorsing representatives, delegates, and alternates.", "Incluya Asociados de SDCDP, representantes de pre-respaldo del CDP, delegados y suplentes."),
    why: l("The Club Manual identifies a representative-selection process in the bylaws as a CDP requirement.", "El Manual de Clubes identifica como requisito del CDP un proceso de selección de representantes en los estatutos."),
    authority: "required",
    source: l("SDCDP Bylaws, Article X.3; CDP Bylaws, Article VIII.3(g)(5)(c)", "Estatutos de SDCDP, Artículo X.3; Estatutos del CDP, Artículo VIII.3(g)(5)(c)"),
    choices: [
      { value: "member_vote", label: l("Member vote at a duly noticed meeting", "Voto de miembros en una reunión debidamente anunciada"), description: l("Members in good standing select representatives from the certified roster; the overall list follows the CDP Equal Division Rule to the extent possible.", "Los miembros al corriente seleccionan representantes del padrón certificado; la lista total cumple la Regla de División Igualitaria del CDP en la medida de lo posible."), recommended: true },
      { value: "president_default", label: l("President serves by default; members select alternatives", "La presidencia sirve por defecto; los miembros seleccionan alternativas"), description: l("The president is the SDCDP Associate unless ineligible or unwilling; other representatives are selected by member vote.", "La presidencia es el Asociado de SDCDP salvo inelegibilidad o renuncia; otros representantes se seleccionan por voto de los miembros.") },
      { value: "board_nomination", label: l("Board nomination with member confirmation", "Nominación de la junta con confirmación de los miembros"), description: l("The board proposes representatives and the membership confirms them at a noticed meeting.", "La junta propone representantes y los miembros los confirman en una reunión anunciada.") }
    ]
  },
  {
    id: "representative_duties",
    section: "representation",
    title: l("What duties do official representatives owe the club?", "¿Qué deberes tienen los representantes oficiales hacia el club?"),
    prompt: l("Set expectations for positions, reporting, rosters, and required liaison roles.", "Establezca expectativas sobre posiciones, informes, padrones y funciones de enlace obligatorias."),
    why: l("Representatives act in the club’s name and connect it to County and State Party processes.", "Los representantes actúan en nombre del club y lo conectan con los procesos de los partidos del condado y estatal."),
    authority: "required",
    source: l("SDCDP Bylaws, Article X.3; CDP Bylaws, Article VIII.3(g)", "Estatutos de SDCDP, Artículo X.3; Estatutos del CDP, Artículo VIII.3(g)"),
    choices: [
      { value: "positions_reports", label: l("Represent club positions and report back promptly", "Representar las posiciones del club e informar oportunamente"), description: l("Representatives agree to follow adopted club positions, satisfy roster and filing duties, report material actions, and support required liaison designations.", "Los representantes acuerdan seguir las posiciones adoptadas del club, cumplir obligaciones de padrones y presentación, informar acciones importantes y apoyar las designaciones de enlace requeridas."), recommended: true },
      { value: "instructed", label: l("Vote only under explicit member instructions", "Votar solo con instrucciones expresas de los miembros"), description: l("Representatives abstain when the club has not adopted a position, except on procedural matters.", "Los representantes se abstienen cuando el club no ha adoptado una posición, salvo en asuntos de procedimiento.") },
      { value: "discretion_report", label: l("Use informed discretion and report back", "Usar criterio informado e informar"), description: l("Representatives consider club values and known positions but may act on unforeseen matters.", "Los representantes consideran los valores y posiciones conocidas del club, pero pueden actuar en asuntos imprevistos.") }
    ]
  },
  {
    id: "associate_endorsement_direction",
    section: "representation",
    title: l("How must the SDCDP Associate vote on endorsements?", "¿Cómo debe votar el Asociado de SDCDP sobre respaldos?"),
    prompt: l("Translate the club’s recorded position into the direction required for an Area Caucus vote.", "Convierta la posición registrada del club en la instrucción requerida para una votación del Caucus de Área."),
    why: l("County policy binds the Associate to the club’s valid vote and requires the Party form 48 hours before the Area Caucus.", "La política del condado obliga al Asociado a seguir la votación válida del club y exige el formulario del Partido 48 horas antes del Caucus de Área."),
    authority: "required",
    source: l("SDCDP Policies and Procedures, Section XIII", "Políticas y Procedimientos de SDCDP, Sección XIII"),
    choices: [
      { value: "county_direction", label: l("Follow the recorded club result exactly", "Seguir exactamente el resultado registrado del club"), description: l("Vote for the endorsed candidate or No Endorsement in every applicable round; abstain for No Consensus; submit the direction form 48 hours ahead and name any substitute on it.", "Votar por la candidatura respaldada o Sin Respaldo en cada ronda aplicable; abstenerse cuando no haya consenso; presentar el formulario de instrucción con 48 horas de anticipación y nombrar allí a cualquier sustituto."), recommended: true },
      { value: "county_plus_contingency", label: l("Record explicit contingency instructions", "Registrar instrucciones expresas para contingencias"), description: l("Follow the required result and also let members specify what to do if the endorsed candidate leaves a later ballot.", "Seguir el resultado obligatorio y permitir que los miembros especifiquen qué hacer si la candidatura respaldada sale de una boleta posterior.") },
      { value: "policy_detail", label: l("State the mandate and keep mechanics in policy", "Indicar el mandato y mantener los detalles en una política"), description: l("The bylaws bind the Associate to the club vote; a conforming policy maintains forms, deadlines, substitute designations, and contingencies.", "Los estatutos obligan al Asociado a seguir el voto del club; una política conforme mantiene formularios, plazos, sustituciones y contingencias.") }
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

export function buildDraft(clubName: string, answers: Record<string, string>, customAnswers: Record<string, Localized> = {}): DraftSection[] {
  const name = clubName.trim() || "[CLUB NAME / NOMBRE DEL CLUB]";
  const q = (id: string) => questions.find((item) => item.id === id)!;
  const label = (id: string, locale: "en" | "es") => {
    if (answers[id] === "other") return customAnswers[id]?.[locale] || (locale === "en" ? "[CUSTOM TEXT NEEDED]" : "[SE REQUIERE TEXTO PERSONALIZADO]");
    const item = q(id).choices.find((choice) => choice.value === answers[id]);
    return item?.label[locale] || (locale === "en" ? "[DECISION NEEDED]" : "[DECISIÓN PENDIENTE]");
  };
  const draft: DraftSection[] = [
    {
      id: "name",
      title: l("Article I — Name", "Artículo I — Nombre"),
      body: l(`Section 1 — Name. The name of this organization is ${name}, referred to in these bylaws as the “Club.”`, `Sección 1 — Nombre. El nombre de esta organización es ${name}, denominada en estos estatutos como el “Club”.`),
      questionIds: []
    },
    {
      id: "purpose",
      title: l("Article II — Purpose", "Artículo II — Propósito"),
      body: l("Section 1 — Democratic participation. The Club fosters Democratic ideals, supports the Democratic Party platform, contributes to party leadership and responsibility, creates constructive roles for volunteers, and develops an informed and active membership.\n\nSection 2 — Activities. The Club may conduct civic education, voter registration, organizing, community service, candidate and issue engagement, fundraising, and other lawful activities consistent with its purpose and charter.", "Sección 1 — Participación demócrata. El Club fomenta los ideales demócratas, apoya la plataforma del Partido Demócrata, contribuye al liderazgo y responsabilidad partidaria, crea funciones constructivas para voluntarios y desarrolla una membresía informada y activa.\n\nSección 2 — Actividades. El Club puede realizar educación cívica, registro de votantes, organización, servicio comunitario, participación en candidaturas y asuntos públicos, recaudación de fondos y otras actividades legales coherentes con su propósito y afiliación."),
      questionIds: []
    },
    {
      id: "membership",
      title: l("Article III — Membership", "Artículo III — Membresía"),
      body: l(`Section 1 — Eligibility. ${label("membership_eligibility", "en")}. Membership must remain open without discrimination on the basis of race, color, religion, ancestry, national origin, disability, medical condition, marital status, sex, gender, gender identity or expression, sexual orientation, age, or any other status protected by law. At least two-thirds of all members must be registered Democrats or have pledged to register as Democrats as soon as eligible. Only those registered or pledged Democrats may serve as officers or vote on Club business.\n\nSection 2 — Good standing. ${label("good_standing", "en")}. The Secretary will maintain the membership record and provide a reasonable process to correct it before a consequential vote. For any CDP pre-endorsing roster, only members in good standing as of the State Chair’s announced cutoff date may be included.\n\nSection 3 — Dues. ${label("dues", "en")}. No person will be denied membership solely because of inability to pay, and any waiver process will protect the member’s privacy.\n\nSection 4 — Voting eligibility. ${label("voting_eligibility", "en")}. Proxy voting is not permitted. The presiding officer will announce the voter-eligibility cutoff and voting method before voting begins.\n\nSection 5 — Resignation and discipline. A member may resign in writing. Suspension or removal is governed by Article X and does not eliminate any lawful financial or reporting obligation.`, `Sección 1 — Elegibilidad. ${label("membership_eligibility", "es")}. La membresía permanecerá abierta sin discriminación por raza, color, religión, ascendencia, origen nacional, discapacidad, condición médica, estado civil, sexo, género, identidad o expresión de género, orientación sexual, edad u otra condición protegida por la ley. Al menos dos tercios de todos los miembros deben ser demócratas registrados o haberse comprometido a registrarse como demócratas cuando sean elegibles. Solo esos demócratas registrados o comprometidos pueden ocupar cargos o votar en asuntos del Club.\n\nSección 2 — Miembro al corriente. ${label("good_standing", "es")}. La Secretaría mantendrá el registro de membresía y ofrecerá un proceso razonable para corregirlo antes de una votación importante. Para cualquier padrón de pre-respaldo del CDP, solo se incluirán miembros al corriente en la fecha límite anunciada por la Presidencia estatal.\n\nSección 3 — Cuotas. ${label("dues", "es")}. No se negará la membresía únicamente por incapacidad de pago y todo proceso de exención protegerá la privacidad del miembro.\n\nSección 4 — Derecho a voto. ${label("voting_eligibility", "es")}. No se permite el voto por poder. Quien presida anunciará la fecha límite de elegibilidad y el método de votación antes de comenzar.\n\nSección 5 — Renuncia y disciplina. Un miembro puede renunciar por escrito. La suspensión o expulsión se rige por el Artículo X y no elimina obligaciones legales financieras o de información.`),
      questionIds: ["membership_eligibility", "good_standing", "dues", "voting_eligibility"]
    },
    {
      id: "officers",
      title: l("Article IV — Officers", "Artículo IV — Dirigentes"),
      body: l(`Section 1 — Elected officers and eligibility. The elected officers are: ${label("officers", "en")}. Every officer must be a registered Democrat or pledge to register as soon as legally eligible.\n\nSection 2 — Terms. ${label("terms", "en")}. Officers remain in office until their successors are elected or appointed and assume office.\n\nSection 3 — Duties. ${label("officer_duties", "en")}. At minimum, the presiding officer leads meetings and serves as spokesperson; the successor officer acts when the presiding officer is unavailable; the Secretary keeps minutes, notices, correspondence, and records; and the Treasurer safeguards funds, maintains accounts, reports regularly, and makes required filings.\n\nSection 4 — Nominations and elections. ${label("officer_elections", "en")}. Notice must identify the offices, nomination process, voter eligibility, and election date.\n\nSection 5 — Removal. ${label("officer_removal", "en")}. The notice must state the grounds, proposed action, and opportunity to respond.\n\nSection 6 — Vacancies. ${label("vacancies", "en")}. Any successor serves only for the unexpired term.\n\nSection 7 — Appointed positions. The President may nominate a parliamentarian and other operational positions, subject to the approval process adopted by the Club. Appointed positions have only the authority expressly assigned to them.`, `Sección 1 — Cargos electos y elegibilidad. Los cargos electos son: ${label("officers", "es")}. Todo dirigente debe estar registrado como demócrata o comprometerse a registrarse tan pronto sea legalmente elegible.\n\nSección 2 — Mandatos. ${label("terms", "es")}. Los dirigentes permanecen en el cargo hasta que sus sucesores sean elegidos o nombrados y asuman funciones.\n\nSección 3 — Funciones. ${label("officer_duties", "es")}. Como mínimo, quien preside dirige reuniones y sirve de portavoz; el cargo sucesor actúa cuando la presidencia no está disponible; la Secretaría conserva actas, avisos, correspondencia y registros; y la Tesorería protege fondos, mantiene cuentas, informa regularmente y presenta declaraciones obligatorias.\n\nSección 4 — Nominaciones y elecciones. ${label("officer_elections", "es")}. El aviso identificará los cargos, proceso de nominación, elegibilidad de votantes y fecha de elección.\n\nSección 5 — Destitución. ${label("officer_removal", "es")}. El aviso indicará las causas, medida propuesta y oportunidad de responder.\n\nSección 6 — Vacantes. ${label("vacancies", "es")}. Todo sucesor sirve solo el resto del mandato.\n\nSección 7 — Cargos designados. La Presidencia puede nominar a un parlamentario y otros cargos operativos, sujetos al proceso de aprobación adoptado por el Club. Los cargos designados solo tienen la autoridad expresamente asignada.`),
      questionIds: ["officers", "terms", "officer_duties", "officer_elections", "officer_removal", "vacancies"]
    },
    {
      id: "meetings",
      title: l("Article V — Meetings, notice, quorum, and voting", "Artículo V — Reuniones, avisos, cuórum y votación"),
      body: l(`Section 1 — Regular meetings. The Club will meet ${label("meeting_cadence", "en").toLowerCase()}, and in every case at least once each quarter. Meeting dates, times, places, and access methods will be selected to support meaningful member participation.\n\nSection 2 — Special meetings. ${label("special_meetings", "en")}. A call for a special meeting must state the business to be considered, and no unrelated final action may be taken without the notice otherwise required by these bylaws.\n\nSection 3 — Notice and County filing. ${label("meeting_notice", "en")}. Notices will state the date, time, place or remote-access method, and the exact consequential business to be considered. Every meeting’s date, time, and location will be provided to SDCDP at least 14 days beforehand. The Club will email the Director of Clubs and SDCDP copies of the notice, agenda, and minutes for business and endorsement meetings.\n\nSection 4 — Regular quorum. A quorum is ${label("quorum", "en").toLowerCase()}.\n\nSection 5 — Elections and endorsements. The heightened quorum rule is: ${label("heightened_quorum", "en")}.\n\nSection 6 — Remote participation. ${label("remote_participation", "en")}. Remote participants who can hear, be heard, and participate substantially at the same time are present for quorum and voting when this rule permits.\n\nSection 7 — Voting. Unless a higher threshold is stated, action requires a majority of votes cast at a meeting with quorum. Abstentions are not votes cast. Proxy voting is prohibited. Contested elections and any vote that the bylaws require to be secret will use a private ballot or equivalently private electronic method.`, `Sección 1 — Reuniones ordinarias. El Club se reunirá ${label("meeting_cadence", "es").toLowerCase()} y, en todo caso, al menos una vez por trimestre. Las fechas, horas, lugares y métodos de acceso apoyarán la participación significativa de los miembros.\n\nSección 2 — Reuniones especiales. ${label("special_meetings", "es")}. La convocatoria indicará los asuntos a tratar y no se tomará acción final sobre asuntos no relacionados sin el aviso exigido por estos estatutos.\n\nSección 3 — Aviso y presentación al Condado. ${label("meeting_notice", "es")}. Los avisos indicarán fecha, hora, lugar o método de acceso remoto y el asunto importante exacto que se considerará. La fecha, hora y lugar de cada reunión se proporcionarán a SDCDP con al menos 14 días de anticipación. El Club enviará por correo electrónico al Director de Clubes y a SDCDP copias del aviso, agenda y actas de reuniones de negocios y de respaldo.\n\nSección 4 — Cuórum ordinario. El cuórum es ${label("quorum", "es").toLowerCase()}.\n\nSección 5 — Elecciones y respaldos. La regla de cuórum elevado es: ${label("heightened_quorum", "es")}.\n\nSección 6 — Participación remota. ${label("remote_participation", "es")}. Los participantes remotos que puedan escuchar, ser escuchados y participar sustancialmente al mismo tiempo están presentes para cuórum y votación cuando esta regla lo permita.\n\nSección 7 — Votación. Salvo que se indique un umbral mayor, una acción requiere mayoría de votos emitidos en una reunión con cuórum. Las abstenciones no son votos emitidos. Se prohíbe el voto por poder. Las elecciones disputadas y toda votación que deba ser secreta usarán boleta privada o método electrónico equivalente.`),
      questionIds: ["meeting_cadence", "special_meetings", "meeting_notice", "quorum", "heightened_quorum", "remote_participation"]
    },
    {
      id: "board",
      title: l("Article VI — Executive board", "Artículo VI — Junta ejecutiva"),
      body: l(`Section 1 — Membership. The executive board consists of the elected officers. Committee chairs and appointed officers may attend and advise but vote only if these bylaws or an adopted rule expressly grant that right.\n\nSection 2 — Authority. ${label("board_authority", "en")}. The board remains accountable to the membership and will keep minutes of its meetings.\n\nSection 3 — Meetings and quorum. The President may call a board meeting with reasonable notice; a majority of elected board members may also call one. Board quorum is ${label("board_quorum", "en").toLowerCase()}. Unless a higher rule applies, board action requires a majority of votes cast at a meeting with quorum.`, `Sección 1 — Integración. La junta ejecutiva está integrada por los dirigentes electos. Los presidentes de comités y cargos designados pueden asistir y asesorar, pero solo votan si estos estatutos o una regla adoptada les otorga expresamente ese derecho.\n\nSección 2 — Autoridad. ${label("board_authority", "es")}. La junta responde ante los miembros y conservará actas de sus reuniones.\n\nSección 3 — Reuniones y cuórum. La Presidencia puede convocar una reunión de la junta con aviso razonable; una mayoría de dirigentes electos también puede convocarla. El cuórum de la junta es ${label("board_quorum", "es").toLowerCase()}. Salvo regla superior, la acción de la junta requiere mayoría de votos emitidos en una reunión con cuórum.`),
      questionIds: ["board_authority", "board_quorum"]
    },
    {
      id: "committees",
      title: l("Article VII — Committees", "Artículo VII — Comités"),
      body: l(`Section 1 — Standing and temporary committees. ${label("committees", "en")}. Each committee’s charge, membership, appointing authority, reporting duty, and end date will be stated when it is created.\n\nSection 2 — Limits. A committee may investigate, recommend, and carry out assigned work, but may not bind the Club, spend unapproved funds, or exercise powers reserved to members or the executive board. An audit reviewer may not audit records for which that person had primary custody.`, `Sección 1 — Comités permanentes y temporales. ${label("committees", "es")}. Al crear cada comité se indicarán su mandato, integrantes, autoridad que nombra, obligación de informar y fecha de terminación.\n\nSección 2 — Límites. Un comité puede investigar, recomendar y realizar el trabajo asignado, pero no puede obligar al Club, gastar fondos no aprobados ni ejercer poderes reservados a los miembros o a la junta ejecutiva. Quien revise una auditoría no podrá auditar registros bajo su custodia principal.`),
      questionIds: ["committees"]
    },
    {
      id: "endorsements",
      title: l("Article VIII — Candidate endorsements and issue positions", "Artículo VIII — Respaldos de candidaturas y posiciones sobre asuntos"),
      body: l(`Section 1 — Governing standards. ${label("endorsement_process", "en")}. The Club will comply with current CDP and SDCDP rules whenever they impose a stricter requirement. Endorsement considerations will be conducted by the Club individually and presided over by a Club officer unless the SDCDP Executive Board authorizes a joint meeting.\n\nSection 2 — Notice and fair consideration. The full membership and SDCDP must receive at least 14 days’ notice identifying every race, candidate, measure, or issue to be considered. The Club will make reasonable attempts to notify and invite every declared candidate whom the Party has confirmed is a registered Democrat at least five business days beforehand, and will email a copy of the candidate notice to the Director of Clubs and SDCDP. All local Democratic candidates may speak or use a surrogate; all Democratic candidates will be considered in races without a Democratic incumbent. Requests for Party candidate information must be made at least seven business days beforehand.\n\nSection 3 — Eligibility, ratings, and threshold. The Club may endorse only registered Democrats. A non-Democratic candidate may only be rated Qualified or Unacceptable. An endorsement or position requires ${label("endorsement_threshold", "en").toLowerCase()} at a meeting satisfying the applicable heightened quorum. The ballot will include “No Endorsement” when candidates are considered.\n\nSection 4 — Publication. The Club will report results accurately and clearly separate endorsed candidates from candidates rated Qualified. Wherever an endorsement is referenced, the publication must state clearly that it is the Club’s endorsement and not the official endorsement of the California Democratic Party or San Diego County Democratic Party.`, `Sección 1 — Normas rectoras. ${label("endorsement_process", "es")}. El Club cumplirá las reglas vigentes del CDP y SDCDP cuando impongan un requisito más estricto. Las consideraciones de respaldo serán realizadas individualmente por el Club y presididas por un dirigente del Club, salvo que la Junta Ejecutiva de SDCDP autorice una reunión conjunta.\n\nSección 2 — Aviso y consideración justa. Los miembros plenos y SDCDP recibirán al menos 14 días de aviso que identifique cada contienda, candidatura, medida o asunto. El Club hará intentos razonables de avisar e invitar a toda candidatura declarada cuya inscripción demócrata haya sido confirmada por el Partido con al menos cinco días hábiles de anticipación y enviará por correo electrónico copia del aviso al Director de Clubes y a SDCDP. Todas las candidaturas demócratas locales podrán hablar o usar un representante; se considerarán todas las candidaturas demócratas en contiendas sin titular demócrata. Las solicitudes de información sobre candidaturas al Partido se harán con al menos siete días hábiles.\n\nSección 3 — Elegibilidad, calificaciones y umbral. El Club solo puede respaldar a demócratas registrados. Una candidatura no demócrata solo puede calificarse como Calificada o Inaceptable. Un respaldo o posición requiere ${label("endorsement_threshold", "es").toLowerCase()} en una reunión que cumpla el cuórum elevado aplicable. La boleta incluirá “Sin Respaldo” al considerar candidaturas.\n\nSección 4 — Publicación. El Club informará los resultados con precisión y separará claramente las candidaturas respaldadas de las calificadas como Calificadas. Donde se mencione un respaldo, la publicación indicará claramente que pertenece al Club y no es el respaldo oficial del Partido Demócrata de California ni del Partido Demócrata del Condado de San Diego.`),
      questionIds: ["endorsement_process", "endorsement_threshold", "heightened_quorum", "meeting_notice"]
    },
    {
      id: "representatives",
      title: l("Article IX — Club representatives", "Artículo IX — Representantes del club"),
      body: l(`Section 1 — Selection. ${label("representative_selection", "en")}. For CDP pre-endorsing conferences, representatives must be members in good standing from the timely certified roster and be selected either by the process stated in these bylaws or by a vote of members in good standing at a duly noticed meeting. The overall representative list will follow the CDP Equal Division Rule to the extent possible. A person may represent only one club, may not also qualify in that conference as a DSCC or County Committee member, may vote only in the district where the person resides, and may not vote by proxy.\n\nSection 2 — Roster certification. The President, Secretary, or Treasurer will certify good-standing status. The Club will submit the roster to the chartering authority, applicable CDP Regional Director, and CDP Secretary by the State Chair’s announced deadline and observe the announced good-standing cutoff 14 days earlier.\n\nSection 3 — SDCDP Associate. The Club President serves as the SDCDP Associate unless already a Central Committee member, unwilling, or ineligible. Any substitute is selected under Section 1 and submitted to SDCDP within the required time.\n\nSection 4 — Endorsement direction. ${label("associate_endorsement_direction", "en")}. The Associate may vote in an Area endorsement recommendation only after a valid Club endorsement vote and timely submission of the required Party form.\n\nSection 5 — Duties. ${label("representative_duties", "en")}. Representatives will disclose when they are speaking personally rather than for the Club.\n\nSection 6 — Liaisons. The executive board will designate the SDCDP liaison positions required for chartering or effective coordination, including voter-registration and grassroots-organizing contacts when applicable.`, `Sección 1 — Selección. ${label("representative_selection", "es")}. Para conferencias de pre-respaldo del CDP, los representantes deben ser miembros al corriente del padrón certificado oportunamente y ser seleccionados por el proceso indicado en estos estatutos o por voto de miembros al corriente en una reunión debidamente anunciada. La lista total seguirá la Regla de División Igualitaria del CDP en la medida de lo posible. Una persona solo puede representar a un club, no puede participar además como miembro de DSCC o del Comité del Condado, solo puede votar en el distrito donde reside y no puede votar por poder.\n\nSección 2 — Certificación del padrón. La Presidencia, Secretaría o Tesorería certificará el estado al corriente. El Club presentará el padrón a la autoridad de afiliación, al Director Regional aplicable del CDP y a la Secretaría del CDP dentro del plazo anunciado por la Presidencia estatal y observará la fecha límite de condición al corriente anunciada 14 días antes.\n\nSección 3 — Asociado de SDCDP. La Presidencia del Club sirve como Asociado de SDCDP salvo que ya sea miembro del Comité Central, no desee servir o no sea elegible. Todo sustituto se selecciona conforme a la Sección 1 y se presenta a SDCDP dentro del plazo requerido.\n\nSección 4 — Instrucción de respaldo. ${label("associate_endorsement_direction", "es")}. El Asociado solo puede votar en una recomendación de respaldo del Área después de una votación válida del Club y la presentación oportuna del formulario requerido por el Partido.\n\nSección 5 — Deberes. ${label("representative_duties", "es")}. Los representantes revelarán cuándo hablan a título personal y no por el Club.\n\nSección 6 — Enlaces. La junta ejecutiva designará los enlaces de SDCDP necesarios para la afiliación o coordinación eficaz, incluidos contactos de registro de votantes y organización de base cuando corresponda.`),
      questionIds: ["representative_selection", "associate_endorsement_direction", "representative_duties"]
    },
    {
      id: "finance-conduct",
      title: l("Article X — Finances, records, conflicts, and discipline", "Artículo X — Finanzas, registros, conflictos y disciplina"),
      body: l(`Section 1 — Financial controls. ${label("finance_controls", "en")}. Club funds may be used only for authorized Club purposes. The Treasurer will maintain complete records, reconcile accounts, make regular and annual reports, preserve supporting documents, and complete required tax and campaign filings.\n\nSection 2 — Inspection and retention. Minutes, governing documents, membership records, and financial reports will be retained for a reasonable period and made available for reasonable member inspection, subject to privacy, security, privilege, and legal restrictions.\n\nSection 3 — Conflicts of interest. A person with a material personal, financial, or campaign conflict will disclose it before discussion or action and abstain when required by law or adopted policy. The minutes will record the disclosure and abstention.\n\nSection 4 — Member discipline. ${label("discipline", "en")}. Any notice must identify the conduct, governing rule, possible action, decision-maker, and opportunity to respond. Retaliation for good-faith participation in the process is prohibited.`, `Sección 1 — Controles financieros. ${label("finance_controls", "es")}. Los fondos del Club solo se usarán para fines autorizados. La Tesorería mantendrá registros completos, conciliará cuentas, presentará informes periódicos y anuales, conservará comprobantes y realizará declaraciones fiscales y de campaña obligatorias.\n\nSección 2 — Inspección y conservación. Las actas, documentos rectores, registros de membresía e informes financieros se conservarán por un período razonable y estarán disponibles para inspección razonable de miembros, sujetos a privacidad, seguridad, privilegio y restricciones legales.\n\nSección 3 — Conflictos de interés. Toda persona con conflicto personal, financiero o de campaña importante lo revelará antes de la discusión o acción y se abstendrá cuando lo exijan la ley o una política adoptada. Las actas registrarán la revelación y abstención.\n\nSección 4 — Disciplina de miembros. ${label("discipline", "es")}. Todo aviso identificará conducta, regla aplicable, posible medida, autoridad decisora y oportunidad de responder. Se prohíben represalias por participar de buena fe en el proceso.`),
      questionIds: ["finance_controls", "discipline"]
    },
    {
      id: "affiliation-amendments",
      title: l("Article XI — Affiliation and amendments", "Artículo XI — Afiliación y enmiendas"),
      body: l(`Section 1 — Annual charter. The Club will charter annually with the San Diego County Democratic Party, maintain at least 20 voting members and at least 20 unique voting members for an Associate, provide its bylaws and membership list, complete the required application, pay or obtain waiver of applicable fees, and comply with controlling law and applicable CDP and SDCDP bylaws and policies. If a conflict exists, the controlling rule prevails without invalidating the remainder of these bylaws.\n\nSection 2 — Changes during the charter year. Officer changes will be reported to the Director of Clubs within 30 days of the change or election, whichever comes first. An adopted bylaws change and an outline of the changes will be submitted to the Director of Clubs within 30 days; the charter is subject to Executive Board review.\n\nSection 3 — Amendments. ${label("amendments", "en")}. The complete proposed text must accompany the notice. The Secretary will record each amendment and its effective date.`, `Sección 1 — Afiliación anual. El Club renovará anualmente su afiliación con el Partido Demócrata del Condado de San Diego, mantendrá al menos 20 miembros con voto y al menos 20 miembros con voto únicos para obtener un Asociado, proporcionará sus estatutos y lista de miembros, completará la solicitud requerida, pagará u obtendrá exención de las cuotas aplicables y cumplirá la ley y los estatutos y políticas aplicables del CDP y SDCDP. Si existe conflicto, prevalece la regla superior sin invalidar el resto de estos estatutos.\n\nSección 2 — Cambios durante el año de afiliación. Los cambios de dirigentes se informarán al Director de Clubes dentro de 30 días del cambio o elección, lo que ocurra primero. Una enmienda adoptada y un resumen de los cambios se presentarán al Director de Clubes dentro de 30 días; la afiliación queda sujeta a revisión de la Junta Ejecutiva.\n\nSección 3 — Enmiendas. ${label("amendments", "es")}. El texto completo propuesto acompañará el aviso. La Secretaría registrará cada enmienda y su fecha de vigencia.`),
      questionIds: ["amendments", "meeting_notice"]
    },
    {
      id: "authority-adoption",
      title: l("Article XII — Parliamentary authority, adoption, and dissolution", "Artículo XII — Autoridad parlamentaria, adopción y disolución"),
      body: l(`Section 1 — Parliamentary authority. ${label("parliamentary_authority", "en")} governs questions not answered by law, controlling party rules, these bylaws, or adopted special rules of order.\n\nSection 2 — Adoption. These bylaws take effect immediately when adopted by the organizing membership or by the vote required under the prior governing document. The Secretary will record the adoption date and preserve the signed or certified copy.\n\nSection 3 — Dissolution. After payment of lawful obligations, remaining assets will be transferred by member vote to an eligible Democratic organization or nonprofit whose purposes are consistent with the Club’s, subject to applicable law. No remaining asset may benefit an individual member or officer.\n\nAdopted on: ____________________    Certified by: ____________________`, `Sección 1 — Autoridad parlamentaria. ${label("parliamentary_authority", "es")} rige las cuestiones no resueltas por la ley, reglas partidarias superiores, estos estatutos o reglas especiales de orden adoptadas.\n\nSección 2 — Adopción. Estos estatutos entran en vigor inmediatamente al ser adoptados por los miembros organizadores o por el voto exigido en el documento rector anterior. La Secretaría registrará la fecha y conservará la copia firmada o certificada.\n\nSección 3 — Disolución. Tras pagar obligaciones legales, los activos restantes se transferirán por voto de los miembros a una organización demócrata o entidad sin fines de lucro elegible cuyos propósitos sean coherentes con los del Club, sujeto a la ley. Ningún activo restante beneficiará a un miembro o dirigente individual.\n\nAdoptados el: ____________________    Certificados por: ____________________`),
      questionIds: ["parliamentary_authority"]
    }
  ];
  const representatives = draft.find((section) => section.id === "representatives")!;
  representatives.body.en += "\n\nSection 7 — Required Area endorsement voting. The Associate must vote for the Club-endorsed candidate in every round in which that candidate appears, vote No Endorsement when that is the Club’s position, and abstain when the Club recorded No Consensus. The required Party form must be submitted at least 48 hours before the Area Caucus, and any substitute designated by the President must be named on that form.";
  representatives.body.es += "\n\nSección 7 — Votación obligatoria de respaldo del Área. El Asociado debe votar por la candidatura respaldada por el Club en cada ronda donde aparezca, votar Sin Respaldo cuando esa sea la posición del Club y abstenerse cuando el Club haya registrado Sin Consenso. El formulario requerido por el Partido debe presentarse al menos 48 horas antes del Caucus de Área, y todo sustituto designado por la Presidencia debe figurar en ese formulario.";
  return draft;
}

export const authorityLabels: Record<string, Localized> = {
  required: l("County / essential requirement", "Requisito del condado o esencial"),
  safeguard: l("Recommended safeguard", "Salvaguarda recomendada"),
  common: l("Common local practice", "Práctica local común"),
  preference: l("Club preference", "Preferencia del club")
};
