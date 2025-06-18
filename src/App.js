import React, { useState, useEffect } from 'react';
import './App.css';

// Dados completos do quiz
const quizData = [
  {
    question: "Qual o seu ritmo ideal de viagem?",
    options: [
      { text: "Relaxado, sem pressa", points: 1, type: "pace" },
      { text: "Moderado, com algumas atividades", points: 2, type: "pace" },
      { text: "Intenso, quero ver tudo!", points: 3, type: "pace" }
    ]
  },
  {
    question: "Que tipo de hospedagem você prefere?",
    options: [
      { text: "Conforto e luxo", points: 3, type: "accommodation" },
      { text: "Confortável e aconchegante", points: 2, type: "accommodation" },
      { text: "Econômica e funcional", points: 1, type: "accommodation" }
    ]
  },
  {
    question: "Qual sua atividade preferida em uma viagem?",
    options: [
      { text: "Natureza e aventura (trilhas, cachoeiras)", points: 3, type: "activity" },
      { text: "Cultura e história (museus, sítios históricos)", points: 2, type: "activity" },
      { text: "Compras e vida urbana (cidades grandes)", points: 1, type: "activity" }
    ]
  },
  {
    question: "Qual o seu nível de interesse em vida noturna?",
    options: [
      { text: "Muito importante, adoro festas e bares", points: 3, type: "nightlife" },
      { text: "Moderado, gosto de sair algumas vezes", points: 2, type: "nightlife" },
      { text: "Não ligo muito, prefiro descansar", points: 1, type: "nightlife" }
    ]
  },
  {
    question: "Qual a sua faixa de orçamento para esta viagem?",
    options: [
      { text: "Baixo", points: 1, type: "budget" },
      { text: "Médio", points: 2, type: "budget" },
      { text: "Alto", points: 3, type: "budget" }
    ]
  }
];

// Níveis de viajante completos
const travelerLevels = [
  {
    name: "Aventureiro Iniciante",
    description: "Você está começando a explorar o mundo das viagens e prefere experiências mais tranquilas e confortáveis. A segurança e o planejamento são prioridades para você. Que tal começar com destinos que ofereçam contato com a natureza de forma leve?",
    minPoints: 0,
    maxPoints: 5
  },
  {
    name: "Explorador Curioso",
    description: "Você gosta de desvendar novos lugares e culturas, com um bom equilíbrio entre aventura e conforto. Está aberto a novas experiências, mas com um bom planejamento prévio. Destinos com rica história e beleza natural moderada são ideais.",
    minPoints: 6,
    maxPoints: 10
  },
  {
    name: "Viajante Destemido",
    description: "Você é movido por desafios e experiências autênticas. Não tem medo de sair da sua zona de conforto e adora explorar lugares menos convencionais. Aventuras intensas e imersão cultural são o seu forte!",
    minPoints: 11,
    maxPoints: 15
  },
  {
    name: "Nômade Raiz",
    description: "Você vive para viajar, é um verdadeiro especialista em desbravar o mundo de forma independente e imersiva. Cada viagem é uma jornada de autoconhecimento e conexão profunda com o ambiente. Você busca o inusitado e o genuíno.",
    minPoints: 16,
    maxPoints: 20
  }
];

// Pacotes de viagem completos
const travelPackages = [
  {
    id: 'p1',
    name: "Caminhada Leve na Mata Atlântica",
    description: "Ideal para iniciantes, trilhas acessíveis com paisagens deslumbrantes e guias experientes. Hospedagem confortável e atividades relaxantes.",
    level: "Aventureiro Iniciante",
    whatsappMessage: "Olá, tenho interesse no pacote 'Caminhada Leve na Mata Atlântica'. Poderiam me dar mais informações?"
  },
  {
    id: 'p2',
    name: "Roteiro Histórico em Ouro Preto",
    description: "Explore a riqueza cultural e arquitetônica de Ouro Preto, Patrimônio Mundial da UNESCO. Visitas guiadas a igrejas barrocas, museus e ateliês de arte. Hospedagem charmosa no centro histórico.",
    level: "Explorador Curioso",
    whatsappMessage: "Olá, tenho interesse no pacote 'Roteiro Histórico em Ouro Preto'. Poderiam me dar mais informações?"
  },
  {
    id: 'p3',
    name: "Expedição de Trekking na Chapada Diamantina",
    description: "Aventure-se pelas cachoeiras, grutas e vales da Chapada Diamantina. Trekking moderado a intenso, com pernoite em acampamentos ou pousadas rústicas. Experiência inesquecível para os amantes da natureza.",
    level: "Viajante Destemido",
    whatsappMessage: "Olá, tenho interesse no pacote 'Expedição de Trekking na Chapada Diamantina'. Poderiam me dar mais informações?"
  },
  {
    id: 'p4',
    name: "Volta de Mochila pela América do Sul",
    description: "Uma jornada épica para o Nômade Raiz! Explore diversos países da América do Sul com flexibilidade, adaptando o roteiro aos seus interesses. Aventura, cultura e liberdade em um só pacote.",
    level: "Nômade Raiz",
    whatsappMessage: "Olá, tenho interesse no pacote 'Volta de Mochila pela América do Sul'. Poderiam me dar mais informações?"
  },
  {
    id: 'p5',
    name: "Férias no paraíso: Praia do Forte",
    description: "Desfrute de dias ensolarados e relaxantes na Praia do Forte. Com resorts de luxo e atividades aquáticas, é perfeito para quem busca tranquilidade e diversão em um cenário paradisíaco.",
    level: "Aventureiro Iniciante",
    whatsappMessage: "Olá, tenho interesse no pacote 'Férias no paraíso: Praia do Forte'. Poderiam me dar mais informações?"
  },
  {
    id: 'p6',
    name: "Rota Ecológica de Alagoas",
    description: "Mergulhe nas belezas intocadas da Rota Ecológica de Alagoas, com praias desertas, piscinas naturais e coqueirais. Hospedagens charmosas e gastronomia local.",
    level: "Explorador Curioso",
    whatsappMessage: "Olá, tenho interesse no pacote 'Rota Ecológica de Alagoas'. Poderiam me dar mais informações?"
  },
  {
    id: 'p7',
    name: "Aventura na Amazônia: Selva e Rios",
    description: "Explore a maior floresta tropical do mundo em uma imersão na Amazônia. Trilhas na selva, passeios de canoa, observação de vida selvagem e contato com comunidades locais. Uma experiência transformadora.",
    level: "Viajante Destemido",
    whatsappMessage: "Olá, tenho interesse no pacote 'Aventura na Amazônia: Selva e Rios'. Poderiam me dar mais informações?"
  },
  {
    id: 'p8',
    name: "Expedição Patagônia: Geleiras e Montanhas",
    description: "Para os mais audaciosos, uma expedição pela grandiosidade da Patagônia. Trekking em geleiras, escalada em montanhas e paisagens de tirar o fôlego. Uma jornada desafiadora e recompensadora.",
    level: "Nômade Raiz",
    whatsappMessage: "Olá, tenho interesse no pacote 'Expedição Patagônia: Geleiras e Montanhas'. Poderiam me dar mais informações?"
  }
];

// Componente de Card de Pacote
const PackageCard = ({ packageInfo }) => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '5511999999999';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(packageInfo.whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="package-card">
      <h3>{packageInfo.name}</h3>
      <p>{packageInfo.description}</p>
      <button onClick={handleWhatsAppClick} className="whatsapp-button">
        <i className="fab fa-whatsapp"></i> Fale com um agente (WhatsApp)
      </button>
    </div>
  );
};

// Componente Principal
const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userLevel, setUserLevel] = useState(null);
  const [recommendedPackages, setRecommendedPackages] = useState([]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setTotalPoints(0);
    setShowResults(false);
    setUserLevel(null);
    setRecommendedPackages([]);
  };

  const handleAnswer = (points) => {
    setTotalPoints(prev => prev + points);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const level = travelerLevels.find(
      lvl => totalPoints >= lvl.minPoints && totalPoints <= lvl.maxPoints
    );
    setUserLevel(level);
    setRecommendedPackages(travelPackages.filter(pkg => pkg.level === level.name));
    setShowResults(true);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setTotalPoints(0);
    setShowResults(false);
    setUserLevel(null);
    setRecommendedPackages([]);
  };

  useEffect(() => {
    // Carrega fontes externas
    const loadFonts = () => {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);

      const awesomeLink = document.createElement('link');
      awesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      awesomeLink.rel = 'stylesheet';
      document.head.appendChild(awesomeLink);

      document.body.style.fontFamily = 'Inter, sans-serif';
    };

    loadFonts();
  }, []);

  return (
    <div className="app-container">
      <div className="quiz-container">
        <h1>Trilheiros Nativus</h1>
        <h2>Descubra o seu Nível de Viajante!</h2>

        {!quizStarted && (
          <div className="quiz-intro fade-in">
            <p>
              Responda a algumas perguntas rápidas para descobrir qual tipo de viajante você é e encontre os pacotes perfeitos para suas próximas aventuras!
            </p>
            <button onClick={startQuiz} className="start-button">
              Iniciar Quiz
            </button>
          </div>
        )}

        {quizStarted && !showResults && (
          <div className="quiz-section fade-in">
            <p className="question-counter">Pergunta {currentQuestionIndex + 1} de {quizData.length}</p>
            <h3 className="question-text">{quizData[currentQuestionIndex].question}</h3>
            <div className="options-grid">
              {quizData[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.points)}
                  className="option-button"
                >
                  {option.text}
                </button>
              ))}
            </div>
            <p className="points-display">Pontuação atual: {totalPoints}</p>
          </div>
        )}

        {showResults && userLevel && (
          <div className="results-section fade-in">
            <h3 className="result-title animate-bounce-in">Parabéns! Você é um(a) {userLevel.name}!</h3>
            <p className="result-description">{userLevel.description}</p>

            <h4 className="recommendations-title">Pacotes Recomendados para Você:</h4>
            <div className="packages-grid">
              {recommendedPackages.length > 0 ? (
                recommendedPackages.map(pkg => (
                  <PackageCard key={pkg.id} packageInfo={pkg} />
                ))
              ) : (
                <p className="no-packages">Não encontramos pacotes específicos para o seu perfil. Entre em contato conosco para uma consultoria personalizada!</p>
              )}
            </div>

            <button onClick={resetQuiz} className="reset-button">
              Fazer o quiz novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;