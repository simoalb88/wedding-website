// ============================================
// Bilingual (EN / IT) toggle for the wedding site
// - Translations live in the I18N dictionary below
// - Mark elements with data-i18n="key" (swaps innerHTML)
//   or data-i18n-ph="key" (swaps the placeholder attribute)
// - Preference is saved in localStorage and applied on every page
// ============================================

const I18N = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.rsvp': 'RSVP',
        'nav.story': 'Our Story',
        'nav.travel': 'Travel',
        'nav.todo': 'Things To Do',
        'nav.registry': 'Registry',
        'nav.faqs': 'FAQs',

        // Footer
        'footer.details': 'July 24, 2026 · Stresa, Italy',

        // Home
        'home.datetime': 'July 24, 2026 <span class="at">at</span> 17:00',
        'home.location': 'Stresa, Italy',

        // Password
        'pw.placeholder': 'Enter Password',
        'pw.button': 'Enter',
        'pw.date': 'July 24, 2026 <span style="font-family: Arial, sans-serif;">·</span> Stresa, Italy',
        'pw.error': 'Incorrect password. Please try again.',

        // Our Story
        'story.p1': "It all began when Emily's childhood friend Alyssa moved to San Francisco and ended up living with a group of strangers she found on Craigslist, one of whom happened to be Simo. One night, while Emily and Alyssa were out with friends, Simo decided to join. And just like that, the rest is (kind of) history.",
        'story.p2': 'Emily and Simo spent years as "just friends," often wondering if there might be something more. After three years of perfectly timed almosts, they finally decided to give dating a real shot and it quickly became clear they had something special!',
        'story.p3': "Together they've traveled to many new places, cherished long summers in Italy with Simo's family, and put down roots in San Francisco by purchasing their first home together, a milestone that made the city they love feel even more like home.",
        'story.p4': "Four years later, they're tying the knot and couldn't be more excited to celebrate this moment with the people they love most.",

        // FAQs
        'faq.attire.title': 'Attire',
        'faq.attire.sub': 'Italian Riviera Chic (Summer Cocktail Attire)',
        'faq.attire.p': 'Think colorful, elegant, and effortlessly polished—light fabrics, warm-weather silhouettes, and a touch of glamour fit the lakeside setting perfectly. Choose shoes you can wear on grass and gravel, and bring a light layer for the evening breeze off the lake.',
        'faq.children.title': 'Are children allowed?',
        'faq.children.p': "While children are not invited to the wedding celebration, we know many of you may be traveling with kids. We're happy to help coordinate childcare by sharing a list of vetted, local babysitters in the area.",
        'faq.transport.title': 'Shuttles',
        'faq.transport.p': "For guests staying at the hotels in Stresa, we'll provide shuttles on the wedding day from Stresa to the venue and back at the end of the night. More details coming soon!",
        'faq.weather.title': 'Weather',
        'faq.weather.p': 'July is typically warm, but Verbania can experience occasional rainstorms. We recommend packing light layers and being prepared for a mix of sunshine and summer showers.',
        'faq.explore.title': 'Where else to explore?',
        'faq.explore.p1': 'Lake Maggiore stretches all the way into Switzerland and is easily accessible by car or ferry, perfect for a day trip!',
        'faq.explore.p2': "There's so much of Italy to explore and all spots are just a train ride or short flight away. For nearby trips, we especially recommend Cinque Terre, Santa Margherita, and Portofino for their seaside views and delicious eats.",
        'faq.explore.p3': "Need more ideas? Don't hesitate to reach out! We're happy to share tips, itineraries, and hidden gems to make your trip extra special.",
        'faq.questions.title': 'Still have questions?',
        'faq.questions.p': "Reach out to Emily or Simo—we're happy to help!",

        // Things To Do
        'todo.intro': 'Below are a few of our favorite places.',
        'todo.alberti.p': "Need a gift to bring home? May we suggest the family bookstore? Founded by Simo's grandfather in 1954, here you will find a plethora of books and gifts for the whole family. There is also a second location located in Stresa.",
        'todo.borromeo.title': 'Borromeo Island Tour',
        'todo.borromeo.p': 'Isola Bella is an absolute must, but we recommend checking out all the islands while in town. Tickets can be bought at the Stresa harbor or booked online in advance.',
        'todo.ittico.p': 'Where we spend most of our evenings for aperitivo! Ittico has undeniable lake views and immaculate vibes.',
        'todo.casera.p': "While everything here is to die for, we recommend the 'i taglieri' because it's perfect for sampling a little of all the meats and cheeses.",
        'todo.dali.p': 'This is our favorite place for a cappuccino and croissant. The views are everything here!',
        'todo.gelato.p': "By Italian law, you must enjoy one gelato a day! This is our favorite spot, but honestly, you can't go wrong anywhere you wander.",
        'todo.skybar.p': 'The views are breathtaking, especially at sunset! A reservation is recommended, but not required.',
        'todo.map.title': 'More Places to Explore',
        'todo.map.p': 'View our full collection on Google Maps',

        // Registry
        'registry.intro': "Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we've registered on Zola.",

        // Travel — labels
        'travel.label.accom': 'Accommodations',
        'travel.label.getting': 'Getting There',
        'travel.label.shuttle': 'By Shuttle',
        'travel.label.train': 'By Train',
        'travel.label.car': 'By Car',
        'travel.label.good': 'Good to Know',
        // Travel — titles
        'travel.title.hotel': 'Hotel',
        'travel.title.car': 'Rental Car',
        'travel.title.rideshare': 'Rideshare',
        // Travel — Hotel
        'travel.hotel.p1': 'We recommend staying in <span class="highlight">Stresa</span>, where we\'ll have a shuttle pick-up on the day.',
        'travel.hotel.p2': "Stresa is the lake's classic resort town: an elegant promenade, gardens, and a lineup of grand hotels that helped transform it from a quiet village into a destination for European travelers in the late 1800s and early 1900s. Just offshore are the Borromean Islands—Isola Bella, Isola Madre, and Isola dei Pescatori—famous for palaces, gardens, and postcard-perfect views, and tied to the Borromeo family for centuries.",
        'travel.hotel.p3': '<span class="highlight">We strongly recommend booking sooner rather than later.</span> And if you\'re staying longer (or want something more specific), tell us and we\'ll happily share more options around the lake.',
        'travel.hotel.favorites': 'A few favorites (though Stresa has many excellent options):',
        // Travel — Malpensa
        'travel.malpensa.p': 'The closest airport to Stresa is <span class="highlight">Milan Malpensa (MXP)</span>. From there, you have several options to reach the lake.',
        // Travel — Shuttle
        'travel.shuttle.p': 'The easiest way from Malpensa to Stresa is the <span class="highlight"><a href="https://www.safduemila.com/linee/alibus-malpensa-lago-maggiore/" target="_blank">Alibus</a></span>, a direct shuttle that picks up at Terminal 1 (bus stop 6) and Terminal 2, and drops off directly in Stresa—no transfers needed.',
        'travel.shuttle.departures.label': 'Departures',
        'travel.shuttle.departures.val': '10:00, 12:00, 14:00, 16:00, 18:00, 20:00 from Malpensa',
        'travel.shuttle.time.label': 'Travel time',
        'travel.shuttle.time.val': '~1 hour 20 minutes to Stresa',
        'travel.shuttle.cost.label': 'Cost',
        'travel.shuttle.cost.val': '€14 to Stresa (pre-booked)',
        'travel.shuttle.details.label': 'Full details',
        'travel.shuttle.details.val': 'Timetable & stops →',
        'travel.shuttle.note': '<span class="highlight">Book in advance</span> at <a href="https://www.safbooking.com" target="_blank">safbooking.com</a> by 11:00 AM the day before travel (Friday 11:00 AM for weekend/holiday trips). Walk-ons are possible if seats remain, but carry a €5 surcharge.',
        // Travel — Train
        'travel.train.title': 'Heads Up: Line Closure',
        'travel.train.p1': 'During the week of the wedding (<span class="highlight">July 20–26, 2026</span>), regional trains on the <span class="highlight">Milano–Domodossola line</span> are <span class="highlight">cancelled on the stretch that serves Stresa</span> for major upgrade works. Trenitalia/Trenord run replacement buses with a stop in Stresa, so train journeys will be longer and less predictable.',
        'travel.train.p2': 'We\'d suggest the Alibus shuttle above as a simpler, direct way to reach Stresa from the airport. If you do plan to take the train, <span class="highlight">check the latest schedules and replacement-bus times</span> carefully before you travel.',
        'travel.train.note': 'Confirm schedules, cancellations, and replacement-bus times at <a href="https://www.trenitalia.com" target="_blank">trenitalia.com</a> before you travel.',
        // Travel — Car
        'travel.car.p': 'Renting a car is a great option if you plan to explore Lake Maggiore or nearby towns. Major companies like Hertz, Avis, Europcar, Sixt, and Budget are available at the airport.',
        'travel.car.drive.label': 'Drive time',
        'travel.car.drive.val': '~50–60 minutes',
        'travel.car.tolls.label': 'Tolls',
        'travel.car.tolls.val': 'Yes, bring a credit card or cash',
        'travel.car.parking.label': 'Parking',
        'travel.car.parking.val': 'Most hotels offer parking—confirm with your hotel',
        'travel.car.note': '<span class="highlight">Good to know:</span> You should obtain an international driver\'s license prior to arrival. You can get one at your local AAA for a small fee.',
        // Travel — Rideshare
        'travel.rideshare.p': 'Please note that rideshare services like Uber are not readily available in Italy. Ferries are a wonderful and scenic way to get around Lake Maggiore!',

        // RSVP — static
        'rsvp.searchIntro': 'Please enter your name to find your invitation.',
        'rsvp.firstName': 'First Name',
        'rsvp.lastName': 'Last Name',
        'rsvp.findBtn': 'Find My Invitation',
        'rsvp.respondIntro': "We found you! Please let us know if you'll be joining us.",
        'rsvp.accept': 'Joyfully Accept',
        'rsvp.decline': 'Regretfully Decline',
        'rsvp.email': 'Email (for confirmation)',
        'rsvp.submit': 'Submit RSVP',
        'rsvp.back': '← Search for a different name',
        'rsvp.thankyou': 'Thank You!',
        'rsvp.confirmNote1': "A confirmation email has been sent. If you don't receive it, please check your spam folder or contact us directly.",
        'rsvp.confirmNote2': 'If you need to update your response, simply search for your name again.',
        'rsvp.updateBtn': 'Update Response',
        // RSVP — dynamic
        'rsvp.searching': 'Searching...',
        'rsvp.notFound': "We couldn't find that name. Please check the spelling and try again, or contact Emily & Simo directly.",
        'rsvp.genericError': 'Something went wrong. Please try again.',
        'rsvp.connectError': 'Unable to connect. Please check your internet and try again.',
        'rsvp.submitting': 'Submitting...',
        'rsvp.submitError': 'Unable to submit. Please check your internet and try again.',
        'rsvp.msg.bothAccept': "We're thrilled that {guest} and {plusone} will be celebrating with us in Stresa!",
        'rsvp.msg.guestAcceptPlusDecline': "We're thrilled that {guest} will be celebrating with us in Stresa! We'll miss {plusonefirst}.",
        'rsvp.msg.guestAccept': "We're thrilled that {guest} will be celebrating with us in Stresa!",
        'rsvp.msg.decline': "We're sorry you won't be able to make it, but we appreciate you letting us know. You'll be missed!",

        // Aperitivo
        'ap.searchIntro': "You're invited to join us the <strong>evening before the wedding</strong>. Enter your name to see the details and RSVP.",
        'ap.notInvited1': "We couldn't find your name on the list for this event.",
        'ap.notInvited2': 'If you think this is a mistake, please reach out to Emily or Simo directly.',
        'ap.tryAgain': '← Try a different name',
        'ap.eyebrow': 'The Evening Before',
        'ap.title': 'Aperitivo on the Lake',
        'ap.desc': "Join us for drinks and bites as we cruise around Lake Maggiore and the Borromean Islands. <strong>The boat departs Stresa promptly at 6:00 PM, so please arrive a little early.</strong> A relaxed, festive way to kick off the wedding weekend together before the big day.",
        'ap.when.label': 'When:',
        'ap.when.val': 'Thursday, July 23 · 6:00–8:00 PM',
        'ap.where.label': 'Where:',
        'ap.where.val': 'Pickup in Stresa (TBD)',
        'ap.what.label': 'What:',
        'ap.what.val': 'Aperitivo cruise around Lake Maggiore & the Borromean Islands',
        'ap.calendar': 'Add to calendar',
        'ap.msg.guestAccept': "We're so excited that {name} will be joining us on the lake!",
        'ap.msg.bothAccept': "We're so excited that {name} and {plusonefirst} will be joining us on the lake!",
        'ap.msg.decline': "We're sorry you won't be able to make it, but we appreciate you letting us know. See you at the wedding!",

        // Navigation (events tab)
        'nav.events': 'Events',

        // Welcome / entry
        'welcome.intro': 'Enter your name to see your invitation.',
        'welcome.button': 'Continue',
        'welcome.searching': 'Searching...',
        'welcome.notFound': "We couldn't find that name. Please check the spelling, or reach out to Emily & Simo directly.",

        // Home greeting ({name} filled in JS)
        'greeting.hello': 'Welcome, {name}',

        // Schedule / events
        'schedule.title': 'The Weekend',
        'schedule.intro': "Here's everything you're invited to.",
        'schedule.thursday': 'Thursday',
        'schedule.friday': 'Friday',
        'schedule.status.going': "You're going",
        'schedule.status.notGoing': "Can't make it",
        'schedule.status.respond': 'RSVP needed',
        'schedule.rsvpToggle': 'RSVP',
        'schedule.rsvpUpdate': 'Update response',
        'schedule.save': 'Save RSVP',
        'schedule.saving': 'Saving...',
        'schedule.saved': 'Saved',
        'schedule.none.title': "We'll miss you",
        'schedule.none.msg': "It looks like you've let us know you can't join us. If that's not right, please reach out to Emily & Simo.",

        // Wedding card
        'wedding.title': 'The Wedding',
        'wedding.when': 'Friday, July 24 · 5:00 PM',
        'wedding.where': 'La Rampolina, Stresa',
        'wedding.desc': 'Perched in the hills above Stresa, La Rampolina opens onto sweeping views of Lake Maggiore and the Borromean Islands. We\'ll begin with the ceremony in the garden, followed by an aperitivo, dinner, and dancing under the stars — the celebration we\'ve been counting down to.',

        // Welcome Lunch card
        'lunch.title': 'Welcome Lunch',
        'lunch.when': 'Thursday, July 23 · 12:15 PM',
        'lunch.where': 'La Casera, Intra',
        'lunch.desc': "An intimate lunch for the wedding party, plus-ones, and immediate family at La Casera in Intra — a giant tagliere of local meats and cheeses to share.",
        'lunch.ferry': 'Traveling by Ferry: Stresa → Intra departs 11:00 AM; the return from Intra → Stresa runs at 14:30 (2:30 PM) or 15:25 (3:25 PM). About 45–60 minutes each way — please check the ferry schedule before you travel.'
    },

    it: {
        // Navigation
        'nav.home': 'Home',
        'nav.rsvp': 'RSVP',
        'nav.story': 'La Nostra Storia',
        'nav.travel': 'Travel',
        'nav.todo': 'Cosa Fare',
        'nav.registry': 'Lista Nozze',
        'nav.faqs': 'FAQ',

        // Footer
        'footer.details': '24 Luglio 2026 · Stresa, Italia',

        // Home
        'home.datetime': '24 Luglio 2026 <span class="at">alle</span> 17:00',
        'home.location': 'Stresa, Italia',

        // Password
        'pw.placeholder': 'Inserisci la password',
        'pw.button': 'Entra',
        'pw.date': '24 Luglio 2026 <span style="font-family: Arial, sans-serif;">·</span> Stresa, Italia',
        'pw.error': 'Password errata. Riprova.',

        // Our Story
        'story.p1': "Tutto è iniziato quando Alyssa, amica d'infanzia di Emily, si è trasferita a San Francisco e si è ritrovata a vivere con un gruppo di sconosciuti trovati su Craigslist, uno dei quali era proprio Simo. Una sera, mentre Emily e Alyssa erano fuori con amici, Simo decise di unirsi a loro. E così, il resto è (più o meno) storia.",
        'story.p2': "Emily e Simo sono stati “solo amici” per anni, chiedendosi spesso se ci fosse qualcosa di più. Dopo tre anni di “quasi” dal tempismo perfetto, decisero finalmente di provarci sul serio e fu subito chiaro che avevano qualcosa di speciale!",
        'story.p3': "Insieme hanno viaggiato in tanti posti nuovi, custodito lunghe estati in Italia con la famiglia di Simo e messo radici a San Francisco acquistando la loro prima casa insieme, un traguardo che ha reso ancora più “casa” la città che amano.",
        'story.p4': "Quattro anni dopo, stanno per sposarsi e non potrebbero essere più felici di celebrare questo momento con le persone a cui vogliono più bene.",

        // FAQs
        'faq.attire.title': 'Abbigliamento',
        'faq.attire.sub': 'Chic Riviera Italiana (Abito da cocktail estivo)',
        'faq.attire.p': "Immaginate qualcosa di colorato, elegante e raffinato con naturalezza: tessuti leggeri, linee estive e un tocco di glamour si sposano perfettamente con l'atmosfera del lago. Scegliete scarpe adatte a erba e ghiaia e portate qualcosa di leggero per la brezza serale del lago.",
        'faq.children.title': 'Sono ammessi i bambini?',
        'faq.children.p': "Anche se i bambini non sono invitati alla celebrazione del matrimonio, sappiamo che molti di voi potrebbero viaggiare con i propri figli. Saremo felici di aiutarvi a organizzare l'assistenza, condividendo una lista di babysitter locali e di fiducia della zona.",
        'faq.transport.title': 'Navette',
        'faq.transport.p': "Per gli ospiti che alloggiano negli hotel di Stresa, il giorno del matrimonio metteremo a disposizione delle navette da Stresa alla location e ritorno a fine serata. Maggiori dettagli a breve!",
        'faq.weather.title': 'Meteo',
        'faq.weather.p': "Luglio è generalmente caldo, ma a Verbania possono capitare temporali occasionali. Consigliamo di portare abbigliamento a strati leggero ed essere pronti a un mix di sole e acquazzoni estivi.",
        'faq.explore.title': "Cos'altro visitare?",
        'faq.explore.p1': "Il Lago Maggiore si estende fino in Svizzera ed è facilmente raggiungibile in auto o in traghetto, perfetto per una gita in giornata!",
        'faq.explore.p2': "C'è tantissima Italia da scoprire e ogni meta è a un treno o a un breve volo di distanza. Per le gite vicine, consigliamo in particolare le Cinque Terre, Santa Margherita e Portofino per i loro panorami sul mare e l'ottima cucina.",
        'faq.explore.p3': "Volete altri consigli? Non esitate a contattarci! Saremo felici di condividere suggerimenti, itinerari e luoghi nascosti per rendere il vostro viaggio ancora più speciale.",
        'faq.questions.title': 'Avete altre domande?',
        'faq.questions.p': "Contattate Emily o Simo: saremo felici di aiutarvi!",

        // Things To Do
        'todo.intro': 'Ecco alcuni dei nostri posti preferiti.',
        'todo.alberti.p': "Cercate un regalo da portare a casa? Possiamo suggerirvi la libreria di famiglia? Fondata dal nonno di Simo nel 1954, qui troverete una grande varietà di libri e regali per tutta la famiglia. C'è anche una seconda sede a Stresa.",
        'todo.borromeo.title': 'Tour delle Isole Borromee',
        'todo.borromeo.p': "L'Isola Bella è una tappa imperdibile, ma vi consigliamo di visitare tutte le isole quando siete in zona. I biglietti si possono acquistare al porto di Stresa o prenotare online in anticipo.",
        'todo.ittico.p': "È qui che passiamo gran parte delle nostre serate per l'aperitivo! Ittico ha una vista impareggiabile sul lago e un'atmosfera impeccabile.",
        'todo.casera.p': "Anche se qui è tutto buonissimo, vi consigliamo “i taglieri”, perfetti per assaggiare un po' di tutti i salumi e formaggi.",
        'todo.dali.p': "È il nostro posto preferito per un cappuccino e un cornetto. La vista qui è tutto!",
        'todo.gelato.p': "Per legge italiana, è d'obbligo un gelato al giorno! Questo è il nostro posto preferito, ma onestamente non si sbaglia ovunque andiate.",
        'todo.skybar.p': 'La vista è mozzafiato, soprattutto al tramonto! La prenotazione è consigliata, ma non obbligatoria.',
        'todo.map.title': 'Altri Luoghi da Scoprire',
        'todo.map.p': 'Guarda la nostra raccolta completa su Google Maps',

        // Registry
        'registry.intro': "La vostra presenza al nostro matrimonio è il regalo più grande di tutti. Tuttavia, se desiderate farci un dono, ci siamo registrati su Zola.",

        // Travel — labels
        'travel.label.accom': 'Sistemazione',
        'travel.label.getting': 'Come Arrivare',
        'travel.label.shuttle': 'In Navetta',
        'travel.label.train': 'In Treno',
        'travel.label.car': 'In Auto',
        'travel.label.good': 'Buono a Sapersi',
        // Travel — titles
        'travel.title.hotel': 'Hotel',
        'travel.title.car': 'Autonoleggio',
        'travel.title.rideshare': 'Spostamenti',
        // Travel — Hotel
        'travel.hotel.p1': 'Consigliamo di soggiornare a <span class="highlight">Stresa</span>, da dove partirà la navetta il giorno del matrimonio.',
        'travel.hotel.p2': "Stresa è la classica località di villeggiatura del lago: un elegante lungolago, giardini e una serie di grandi hotel che l'hanno trasformata da tranquillo villaggio a meta dei viaggiatori europei tra fine Ottocento e inizio Novecento. Proprio di fronte si trovano le Isole Borromee—Isola Bella, Isola Madre e Isola dei Pescatori—celebri per palazzi, giardini e panorami da cartolina, legate da secoli alla famiglia Borromeo.",
        'travel.hotel.p3': '<span class="highlight">Consigliamo vivamente di prenotare il prima possibile.</span> E se vi fermate più a lungo (o cercate qualcosa di più specifico), ditecelo e saremo felici di suggerirvi altre opzioni intorno al lago.',
        'travel.hotel.favorites': 'Alcuni dei nostri preferiti (anche se Stresa ha molte ottime opzioni):',
        // Travel — Malpensa
        'travel.malpensa.p': "L'aeroporto più vicino a Stresa è <span class=\"highlight\">Milano Malpensa (MXP)</span>. Da lì, avete diverse opzioni per raggiungere il lago.",
        // Travel — Shuttle
        'travel.shuttle.p': "Il modo più semplice per arrivare da Malpensa a Stresa è l'<span class=\"highlight\"><a href=\"https://www.safduemila.com/linee/alibus-malpensa-lago-maggiore/\" target=\"_blank\">Alibus</a></span>, una navetta diretta con fermate al Terminal 1 (fermata bus 6) e al Terminal 2, che arriva direttamente a Stresa—senza cambi.",
        'travel.shuttle.departures.label': 'Partenze',
        'travel.shuttle.departures.val': '10:00, 12:00, 14:00, 16:00, 18:00, 20:00 da Malpensa',
        'travel.shuttle.time.label': 'Durata',
        'travel.shuttle.time.val': '~1 ora e 20 minuti per Stresa',
        'travel.shuttle.cost.label': 'Costo',
        'travel.shuttle.cost.val': '€14 per Stresa (prenotato in anticipo)',
        'travel.shuttle.details.label': 'Dettagli',
        'travel.shuttle.details.val': 'Orari e fermate →',
        'travel.shuttle.note': '<span class="highlight">Prenotate in anticipo</span> su <a href="https://www.safbooking.com" target="_blank">safbooking.com</a> entro le 11:00 del giorno prima del viaggio (entro venerdì alle 11:00 per i viaggi del weekend o nei festivi). È possibile salire senza prenotazione se restano posti, ma con un supplemento di €5.',
        // Travel — Train
        'travel.train.title': 'Attenzione: linea interrotta',
        'travel.train.p1': 'Durante la settimana del matrimonio (<span class="highlight">20–26 luglio 2026</span>), i treni regionali della <span class="highlight">linea Milano–Domodossola</span> sono <span class="highlight">cancellati nella tratta che serve Stresa</span> per importanti lavori di potenziamento. Trenitalia/Trenord attivano bus sostitutivi con fermata a Stresa, quindi i tempi di viaggio in treno saranno più lunghi e meno prevedibili.',
        'travel.train.p2': 'Vi consigliamo la navetta Alibus qui sopra, più comoda e diretta per raggiungere Stresa dall\'aeroporto. Se prevedete di viaggiare in treno, <span class="highlight">controllate con attenzione gli orari aggiornati e i bus sostitutivi</span> prima di partire.',
        'travel.train.note': 'Verificate orari, cancellazioni e bus sostitutivi su <a href="https://www.trenitalia.com" target="_blank">trenitalia.com</a> prima di partire.',
        // Travel — Car
        'travel.car.p': "Noleggiare un'auto è un'ottima opzione se volete esplorare il Lago Maggiore o i paesi vicini. Le principali compagnie come Hertz, Avis, Europcar, Sixt e Budget sono disponibili in aeroporto.",
        'travel.car.drive.label': 'Durata',
        'travel.car.drive.val': '~50–60 minuti',
        'travel.car.tolls.label': 'Pedaggi',
        'travel.car.tolls.val': 'Sì, portate carta di credito o contanti',
        'travel.car.parking.label': 'Parcheggio',
        'travel.car.parking.val': 'La maggior parte degli hotel offre parcheggio—verificate con il vostro hotel',
        'travel.car.note': "<span class=\"highlight\">Buono a sapersi:</span> se necessaria per il vostro Paese, conviene procurarsi una patente di guida internazionale prima della partenza, di solito presso l'automobile club locale.",
        // Travel — Rideshare
        'travel.rideshare.p': 'Tenete presente che i servizi come Uber non sono facilmente disponibili in Italia. I traghetti sono un modo bellissimo e panoramico per spostarsi sul Lago Maggiore!',

        // RSVP — static
        'rsvp.searchIntro': 'Inserisci il tuo nome per trovare il tuo invito.',
        'rsvp.firstName': 'Nome',
        'rsvp.lastName': 'Cognome',
        'rsvp.findBtn': 'Trova il mio invito',
        'rsvp.respondIntro': 'Ti abbiamo trovato! Facci sapere se sarai dei nostri.',
        'rsvp.accept': 'Accetto con gioia',
        'rsvp.decline': 'Rifiuto con rammarico',
        'rsvp.email': 'Email (per la conferma)',
        'rsvp.submit': 'Invia RSVP',
        'rsvp.back': '← Cerca un altro nome',
        'rsvp.thankyou': 'Grazie!',
        'rsvp.confirmNote1': "Ti abbiamo inviato un'email di conferma. Se non la ricevi, controlla la cartella spam o contattaci direttamente.",
        'rsvp.confirmNote2': 'Se devi modificare la tua risposta, cerca di nuovo il tuo nome.',
        'rsvp.updateBtn': 'Modifica risposta',
        // RSVP — dynamic
        'rsvp.searching': 'Ricerca...',
        'rsvp.notFound': "Non abbiamo trovato questo nome. Controlla l'ortografia e riprova, oppure contatta direttamente Emily & Simo.",
        'rsvp.genericError': 'Qualcosa è andato storto. Riprova.',
        'rsvp.connectError': 'Impossibile connettersi. Controlla la connessione e riprova.',
        'rsvp.submitting': 'Invio...',
        'rsvp.submitError': 'Impossibile inviare. Controlla la connessione e riprova.',
        'rsvp.msg.bothAccept': 'Siamo felicissimi che {guest} e {plusone} festeggeranno con noi a Stresa!',
        'rsvp.msg.guestAcceptPlusDecline': 'Siamo felicissimi che {guest} festeggerà con noi a Stresa! Ci mancherà {plusonefirst}.',
        'rsvp.msg.guestAccept': 'Siamo felicissimi che {guest} festeggerà con noi a Stresa!',
        'rsvp.msg.decline': 'Ci dispiace che non possiate esserci, ma grazie per avercelo fatto sapere. Ci mancherete!',

        // Aperitivo
        'ap.searchIntro': "Ti aspettiamo la <strong>sera prima del matrimonio</strong>. Inserisci il tuo nome per vedere i dettagli e rispondere.",
        'ap.notInvited1': 'Non abbiamo trovato il tuo nome nella lista per questo evento.',
        'ap.notInvited2': 'Se pensi che si tratti di un errore, contatta direttamente Emily o Simo.',
        'ap.tryAgain': '← Prova un altro nome',
        'ap.eyebrow': 'La Sera Prima',
        'ap.title': 'Aperitivo sul Lago',
        'ap.desc': "Vi aspettiamo per un brindisi e qualche stuzzichino mentre navighiamo intorno al Lago Maggiore e alle Isole Borromee. <strong>La barca parte da Stresa puntuale alle 18:00, quindi arrivate con un po' di anticipo.</strong> Un modo rilassato e festoso per iniziare insieme il weekend di nozze, prima del grande giorno.",
        'ap.when.label': 'Quando:',
        'ap.when.val': 'Giovedì 23 Luglio · 18:00–20:00',
        'ap.where.label': 'Dove:',
        'ap.where.val': 'Ritrovo a Stresa (TBD)',
        'ap.what.label': 'Cosa:',
        'ap.what.val': 'Crociera con aperitivo intorno al Lago Maggiore e alle Isole Borromee',
        'ap.calendar': 'Aggiungi al calendario',
        'ap.msg.guestAccept': 'Siamo felicissimi che {name} si unirà a noi sul lago!',
        'ap.msg.bothAccept': 'Siamo felicissimi che {name} e {plusonefirst} si uniranno a noi sul lago!',
        'ap.msg.decline': 'Ci dispiace che non possiate esserci, ma grazie per avercelo fatto sapere. Ci vediamo al matrimonio!',

        // Navigation (events tab)
        'nav.events': 'Eventi',

        // Welcome / entry
        'welcome.intro': 'Inserisci il tuo nome per vedere il tuo invito.',
        'welcome.button': 'Continua',
        'welcome.searching': 'Ricerca...',
        'welcome.notFound': "Non abbiamo trovato questo nome. Controlla l'ortografia oppure contatta direttamente Emily & Simo.",

        // Home greeting ({name} filled in JS)
        'greeting.hello': 'Ciao, {name}',

        // Schedule / events
        'schedule.title': 'Il Weekend',
        'schedule.intro': 'Ecco tutti i tuoi eventi.',
        'schedule.thursday': 'Giovedì',
        'schedule.friday': 'Venerdì',
        'schedule.status.going': 'Ci sarai',
        'schedule.status.notGoing': 'Non ci sarai',
        'schedule.status.respond': 'Da confermare',
        'schedule.rsvpToggle': 'Rispondi',
        'schedule.rsvpUpdate': 'Modifica risposta',
        'schedule.save': 'Salva risposta',
        'schedule.saving': 'Salvataggio...',
        'schedule.saved': 'Salvato',
        'schedule.none.title': 'Ci mancherai',
        'schedule.none.msg': 'Sembra che tu ci abbia fatto sapere che non puoi esserci. Se non è così, contatta Emily & Simo.',

        // Wedding card
        'wedding.title': 'Il Matrimonio',
        'wedding.when': 'Venerdì 24 Luglio · 17:00',
        'wedding.where': 'La Rampolina, Stresa',
        'wedding.desc': 'Immersa sulle colline sopra Stresa, La Rampolina si apre su una vista spettacolare sul Lago Maggiore e sulle Isole Borromee. Inizieremo con la cerimonia in giardino, seguita da aperitivo, cena e balli sotto le stelle: la festa che aspettiamo da tanto.',

        // Welcome Lunch card
        'lunch.title': 'Pranzo di Benvenuto',
        'lunch.when': 'Giovedì 23 Luglio · 12:15',
        'lunch.where': 'La Casera, Intra',
        'lunch.desc': 'Un pranzo intimo per il corteo nuziale, gli accompagnatori e i familiari più stretti da La Casera, a Intra: un grande tagliere di salumi e formaggi locali da condividere.',
        'lunch.ferry': 'Spostarsi in battello: Stresa → Intra parte alle 11:00; il ritorno da Intra → Stresa è alle 14:30 (2:30 PM) o 15:25 (3:25 PM). Circa 45–60 minuti a tratta — controllate gli orari dei battelli prima di partire.'
    }
};

(function () {
    const STORAGE_KEY = 'wedding_lang';

    function getLang() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return (stored === 'it' || stored === 'en') ? stored : 'en';
    }

    function apply(lang) {
        const dict = I18N[lang] || I18N.en;

        document.documentElement.lang = lang;
        document.body.setAttribute('data-lang', lang);

        // Text / HTML content
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            const key = el.getAttribute('data-i18n');
            if (dict[key] != null) el.innerHTML = dict[key];
        });

        // Placeholders
        document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-ph');
            if (dict[key] != null) el.placeholder = dict[key];
        });

        // Let page scripts (e.g. RSVP) react to a language change
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
    }

    // Public helpers
    window.WeddingLang = {
        get: getLang,
        set: function (lang) {
            if (lang !== 'en' && lang !== 'it') return;
            localStorage.setItem(STORAGE_KEY, lang);
            apply(lang);
        },
        toggle: function () {
            window.WeddingLang.set(getLang() === 'en' ? 'it' : 'en');
        },
        t: function (key) {
            const dict = I18N[getLang()] || I18N.en;
            return dict[key] != null ? dict[key] : (I18N.en[key] != null ? I18N.en[key] : '');
        },
        // translate + fill {placeholders} from a values object
        tf: function (key, values) {
            let s = window.WeddingLang.t(key);
            if (values) {
                Object.keys(values).forEach(function (k) {
                    s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), values[k]);
                });
            }
            return s;
        }
    };

    // Wire up any toggle controls and apply the saved language
    function init() {
        document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                window.WeddingLang.set(btn.getAttribute('data-set-lang'));
            });
        });
        apply(getLang());
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
