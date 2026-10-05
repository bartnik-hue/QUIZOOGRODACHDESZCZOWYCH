// Baza pytań oraz konfiguracja poziomów punktacji Quizu o Ogrodach Deszczowych
const QUIZ_DATA = {
  title: "QUIZ O OGRODACH DESZCZOWYCH",
  subtitle: "Sprawdź swoją wiedzę!",
  totalQuestionsCount: 27,
  idleTimeoutSeconds: 60, // Czas bezczynności przed automatycznym powrotem do ekranu startowego (1 minuta)
  
  scoreTiers: [
    {
      min: 0,
      max: 5,
      title: "Początkujący odkrywca",
      description: "To dopiero początek! Każda kropla wiedzy się liczy.",
      footer: "Dziękujemy za udział w quizie"
    },
    {
      min: 6,
      max: 10,
      title: "Tropiciel deszczu",
      description: "Coraz lepiej! Wiesz już sporo o wodzie i retencji.",
      footer: "Dziękujemy za udział w quizie"
    },
    {
      min: 11,
      max: 16,
      title: "Przyjaciel ogrodu",
      description: "Dobry wynik! Ogród deszczowy nie ma przed Tobą wielu tajemnic.",
      footer: "Dziękujemy za udział w quizie"
    },
    {
      min: 17,
      max: 22,
      title: "Ekspert retencji",
      description: "Świetny wynik! Naprawdę dobrze znasz ogrody deszczowe.",
      footer: "Dziękujemy za udział w quizie"
    },
    {
      min: 23,
      max: 27,
      title: "Mistrz ogrodu deszczowego",
      description: "Brawo! Doskonale znasz zasady działania ogrodu deszczowego.",
      footer: "Dziękujemy za udział w quizie"
    }
  ],

  questions: [
    {
      id: 1,
      question: "Jak nazywamy sytuację, gdy woda zamiast spłynąć do rury, zostaje w ogrodzie i powoli wsiąka w grunt?",
      options: [
        { key: "A", text: "Ewakuacja" },
        { key: "B", text: "Produkcja" },
        { key: "C", text: "Retencja" }
      ],
      correct: "C"
    },
    {
      id: 2,
      question: "Do czego służy rurka bezpieczeństwa w ogrodzie deszczowym w pojemniku lub skrzyni?",
      options: [
        { key: "A", text: "Do wypływu nawozu dla roślin" },
        { key: "B", text: "Do odprowadzenia nadmiaru wody przy bardzo silnym deszczu" },
        { key: "C", text: "Do podlewania kwiatów u sąsiada" },
        { key: "D", text: "Jako zjeżdżalnia dla biedronek" }
      ],
      correct: "B"
    },
    {
      id: 3,
      question: "Dlaczego w ogrodzie deszczowym warto sadzić rośliny o długich korzeniach?",
      options: [
        { key: "A", text: "Bo długie korzenie są smaczniejsze dla kretów" },
        { key: "B", text: "Bo korzenie tworzą kanaliki, którymi woda szybciej dociera w głąb ziemi" },
        { key: "C", text: "Żeby roślina mogła pobierać wodę z ogródka sąsiada" },
        { key: "D", text: "Żeby roślina trzymała się ziemi podczas huraganu" }
      ],
      correct: "B"
    },
    {
      id: 4,
      question: "Gdzie najlepiej skierować wodę z rynny, jeśli chcemy mieć ogród deszczowy?",
      options: [
        { key: "A", text: "Do ogrodu deszczowego, najlepiej przez kamienie lub żwir" },
        { key: "B", text: "Pod fundamenty domu" },
        { key: "C", text: "Na asfaltową ulicę przed domem" }
      ],
      correct: "A"
    },
    {
      id: 5,
      question: "Jakie rośliny najlepiej „pracują” w ogrodach deszczowych?",
      options: [
        { key: "A", text: "Tylko sztuczne kwiaty z plastiku" },
        { key: "B", text: "Rośliny, które nie znoszą wody" },
        { key: "C", text: "Rodzime byliny, trawy i rośliny łąkowe znoszące okresową wilgoć" },
        { key: "D", text: "Marchewki i ziemniaki" }
      ],
      correct: "C"
    },
    {
      id: 6,
      question: "Dlaczego ogrody deszczowe są dobre dla owadów?",
      options: [
        { key: "A", text: "Bo owady lubią pływać w głębokiej wodzie" },
        { key: "B", text: "Bo dają pokarm i schronienie wielu pożytecznym żyjątkom" },
        { key: "C", text: "Bo woda w nich zawsze jest lodowata" }
      ],
      correct: "B"
    },
    {
      id: 7,
      question: "Czy ogród deszczowy może pomóc, gdy latem w mieście jest bardzo gorąco?",
      options: [
        { key: "A", text: "Nie, bo rośliny tylko zabierają miejsce" },
        { key: "B", text: "Tak, bo można się w nim wykąpać jak w basenie" },
        { key: "C", text: "Tak, bo rośliny parują wodę i pomagają obniżać temperaturę" },
        { key: "D", text: "Nie, słońce go spali" }
      ],
      correct: "C"
    },
    {
      id: 8,
      question: "Kiedy ogród deszczowy najlepiej wykonuje swoją pracę?",
      options: [
        { key: "A", text: "Gdy świeci najmocniejsze słońce" },
        { key: "B", text: "Podczas intensywnych opadów deszczu" },
        { key: "C", text: "Podczas bardzo mroźnej zimy" },
        { key: "D", text: "Podczas długiej suszy" }
      ],
      correct: "B"
    },
    {
      id: 9,
      question: "Jaki jest główny cel zakładania ogrodu deszczowego?",
      options: [
        { key: "A", text: "Zbieranie i wykorzystywanie wody opadowej w miejscu jej opadu" },
        { key: "B", text: "Hodowla rzadkich ryb słodkowodnych" },
        { key: "C", text: "Szybsze odprowadzanie wody do kanalizacji" },
        { key: "D", text: "Miejsce kąpieli dla zwierząt domowych" }
      ],
      correct: "A"
    },
    {
      id: 10,
      question: "Gdzie najczęściej lokalizuje się ogrody deszczowe?",
      options: [
        { key: "A", text: "Wyłącznie w pełnym słońcu" },
        { key: "B", text: "W pobliżu rur spustowych i miejsc spływu deszczówki" },
        { key: "C", text: "W najwyższym punkcie działki" }
      ],
      correct: "B"
    },
    {
      id: 11,
      question: "Czy ogród deszczowy pomaga w walce z suszą?",
      options: [
        { key: "A", text: "Tak, bo zatrzymuje wodę w glebie zamiast ją szybko odprowadzać" },
        { key: "B", text: "Tak, bo przyciąga chmury deszczowe" },
        { key: "C", text: "Nie, nie ma żadnego wpływu" },
        { key: "D", text: "Poprawne są odpowiedzi A i B" }
      ],
      correct: "A"
    },
    {
      id: 12,
      question: "Dlaczego ogród deszczowy nie jest tym samym co oczko wodne lub staw?",
      options: [
        { key: "A", text: "Bo ogród deszczowy buduje się na dachu" },
        { key: "B", text: "Bo w ogrodzie deszczowym woda jest słona" },
        { key: "C", text: "Oczko wodne zwykle zatrzymuje wodę na stałe, a ogród deszczowy przepuszcza ją do podłoża" },
        { key: "D", text: "Bo w ogrodzie deszczowym nie sadzi się roślin" }
      ],
      correct: "C"
    },
    {
      id: 13,
      question: "Po co kładziemy małe kamienie w miejscu dopływu wody do ogrodu deszczowego?",
      options: [
        { key: "A", text: "Żeby strumień z rynny nie wypłukiwał ziemi i roślin" },
        { key: "B", text: "Żeby rośliny były niższe" },
        { key: "C", text: "Żeby ziemia nie uciekła podczas wiatru" }
      ],
      correct: "A"
    },
    {
      id: 14,
      question: "Skąd najczęściej przypływa woda do ogrodu deszczowego?",
      options: [
        { key: "A", text: "Z rur spustowych i rynien z dachów" },
        { key: "B", text: "Z kranu w kuchni" },
        { key: "C", text: "Z butelek z wodą mineralną" }
      ],
      correct: "A"
    },
    {
      id: 15,
      question: "Jakie rośliny najlepiej czują się w ogrodzie deszczowym?",
      options: [
        { key: "A", text: "Takie, które znoszą czasem mokre, a czasem suche warunki" },
        { key: "B", text: "Kaktusy z pustyni" },
        { key: "C", text: "Rośliny bez korzeni" }
      ],
      correct: "A"
    },
    {
      id: 16,
      question: "Co to znaczy, że ogród deszczowy „czyści” wodę?",
      options: [
        { key: "A", text: "Ziemia, piasek i korzenie działają jak naturalny filtr" },
        { key: "B", text: "W ogrodzie stoi pralka, która pierze wodę" },
        { key: "C", text: "Woda staje się pachnąca" }
      ],
      correct: "A"
    },
    {
      id: 17,
      question: "Dlaczego nie robimy ogrodu deszczowego na bardzo stromej skarpie?",
      options: [
        { key: "A", text: "Bo woda spłynie zbyt szybko, zamiast wsiąkać" },
        { key: "B", text: "Bo rośliny mają lęk wysokości" },
        { key: "C", text: "Bo skarpa jest zbyt blisko słońca" }
      ],
      correct: "A"
    },
    {
      id: 18,
      question: "Po co pod roślinami sypie się piasek i żwir?",
      options: [
        { key: "A", text: "Żeby budować zamki z piasku" },
        { key: "B", text: "Bo pomagają przepuszczać i oczyszczać wodę" },
        { key: "C", text: "Żeby ziemia była bardzo miękka" }
      ],
      correct: "B"
    },
    {
      id: 19,
      question: "Czy ogrody deszczowe pomagają, gdy jest upalnie?",
      options: [
        { key: "A", text: "Tak, rośliny oddają parę wodną i chłodzą powietrze" },
        { key: "B", text: "Nie, ponieważ nic nie robią" },
        { key: "C", text: "Tak, ponieważ działają jak klimatyzator z prądem" }
      ],
      correct: "A"
    },
    {
      id: 20,
      question: "Z czego składa się przepuszczalne dno ogrodu deszczowego?",
      options: [
        { key: "A", text: "Z warstw dobrej ziemi, piasku i żwiru" },
        { key: "B", text: "Z grubego betonu" },
        { key: "C", text: "Z warstwy, która nie przepuszcza wody" }
      ],
      correct: "A"
    },
    {
      id: 21,
      question: "Co jest potrzebne, żeby założyć własny miniogród deszczowy?",
      options: [
        { key: "A", text: "Gotowy zestaw ze sklepu z zabawkami" },
        { key: "B", text: "Pomoc dorosłych, kilka roślin, kamienie i dobre chęci" },
        { key: "C", text: "Czekanie, aż sam wyrośnie w domu" }
      ],
      correct: "B"
    },
    {
      id: 22,
      question: "Jaki kształt powinien mieć środek ogrodu deszczowego, żeby zebrać dużo wody?",
      options: [
        { key: "A", text: "Wypukły jak mała górka" },
        { key: "B", text: "Wklęsły jak płytka miska" },
        { key: "C", text: "Płaski jak ściana" }
      ],
      correct: "B"
    },
    {
      id: 23,
      question: "Co warto położyć tam, gdzie woda wypływa z rynny na ziemię?",
      options: [
        { key: "A", text: "Warstwę kamieni, która rozprasza strumień wody" },
        { key: "B", text: "Kilka kartek papieru" },
        { key: "C", text: "Cienki materiał" }
      ],
      correct: "A"
    },
    {
      id: 24,
      question: "Kiedy najlepiej widać, jak ogród deszczowy „pracuje”?",
      options: [
        { key: "A", text: "W trakcie lub tuż po dużym deszczu" },
        { key: "B", text: "W środku nocy" },
        { key: "C", text: "Gdy jest wielka susza" }
      ],
      correct: "A"
    },
    {
      id: 25,
      question: "Co oznacza słowo „retencja”?",
      options: [
        { key: "A", text: "Jazdę na rowerze pod górkę" },
        { key: "B", text: "Zatrzymywanie i magazynowanie wody" },
        { key: "C", text: "Przesuszony teren" }
      ],
      correct: "B"
    },
    {
      id: 26,
      question: "Skąd bierze się zanieczyszczona woda, którą ogród deszczowy może oczyścić?",
      options: [
        { key: "A", text: "Deszcz spłukuje pył, osady i zanieczyszczenia z dachów, chodników i ulic" },
        { key: "B", text: "Wlewane są do niej ścieki" },
        { key: "C", text: "Ryby ją brudzą" }
      ],
      correct: "A"
    },
    {
      id: 27,
      question: "Czym różni się roślina wodna od rośliny do ogrodu deszczowego?",
      options: [
        { key: "A", text: "Roślina wodna rośnie stale w wodzie, a roślina do ogrodu deszczowego znosi też okresy suszy" },
        { key: "B", text: "Niczym — to zawsze to samo" },
        { key: "C", text: "Rośliny deszczowe mają parasole" }
      ],
      correct: "A"
    }
  ]
};
