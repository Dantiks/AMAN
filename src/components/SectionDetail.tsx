import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Feather, BookOpen, Camera, Video, FileText, Heart, Globe } from 'lucide-react';
import { ContentCard } from '../types';
import '../styles/CardDetail.css';

interface SectionDetailProps {
  currentLang: string;
}

const SectionDetail: React.FC<SectionDetailProps> = ({ currentLang }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sectionCards, setSectionCards] = useState<ContentCard[]>([]);

  const sectionsData: { [key: string]: any } = {
    poetry: {
      titleRu: 'Поэзия',
      titleKg: 'Ырлар',
      icon: <Feather size={80} />,
      descriptionRu: 'Аман Токтогулов создал более 6000 поэтических произведений за 24 года творчества. Его стихи отражают глубокую любовь к родной земле, народу и культуре Кыргызстана.',
      descriptionKg: 'Аман Токтогулов 24 жылдык чыгармачылык жолунда 6000дөн ашык ырларды жараткан. Анын ырлары туулган жерге, элге жана Кыргызстандын маданиятына болгон терең сүйүүнү чагылдырат.',
      contentRu: 'Поэзия Амана Токтогулова - это уникальное явление в современной кыргызской литературе. Его стихи пронизаны глубоким философским смыслом, любовью к родине и народу. В своих произведениях он мастерски сочетает традиционные формы кыргызской поэзии с современными литературными приемами.',
      contentKg: 'Аман Токтогулдун поэзиясы - бул азыркы кыргыз адабиятындагы уникалдуу көрүнүш. Анын ырлары терең философиялык мааниге, Ата Мекенге жана элге болгон сүйүүгө толгон. Өз чыгармаларында ал кыргыз поэзиясынын салттуу формаларын азыркы адабий ыкмалар менен чеберчилик менен айкалыштырат.'
    },
    prose: {
      titleRu: 'Проза',
      titleKg: 'Проза',
      icon: <BookOpen size={80} />,
      descriptionRu: 'Прозаические произведения Амана Токтогулова включают рассказы и повести, в которых раскрываются глубокие человеческие переживания и социальные проблемы современности.',
      descriptionKg: 'Аман Токтогулдун прозалык чыгармалары адамдын терең көңүл толгонууларын жана азыркы коомдук көйгөйлөрдү ачып берген аңгемелерди жана повестерди камтыйт.',
      contentRu: 'В прозе автор демонстрирует глубокое понимание человеческой природы и социальных процессов. Его рассказы отличаются психологической глубиной и реалистичным изображением жизни.',
      contentKg: 'Прозада автор адам табиятын жана коомдук процесстерди терең түшүнүүнү көрсөтөт. Анын аңгемелери психологиялык тереңдиги жана жашоонун реалисттик сүрөттөлүшү менен айырмаланат.'
    },
    translations: {
      titleRu: 'Переводы',
      titleKg: 'Котормолор',
      icon: <Globe size={80} />,
      descriptionRu: 'Аман Токтогулов внес значительный вклад в развитие переводческого искусства, переводя классические произведения мировой литературы на кыргызский язык.',
      descriptionKg: 'Аман Токтогулов дүйнөлүк адабияттын классикалык чыгармаларын кыргыз тилине которуу менен которуу искусствосунун өнүгүшүнө олуттуу салым кошкон.',
      contentRu: 'Переводы автора отличаются точностью передачи смысла и сохранением художественных особенностей оригинала. Он мастерски адаптирует произведения для кыргызского читателя.',
      contentKg: 'Авторлун котормолору маанинин так берилиши жана оригиналдын көркөм өзгөчөлүктөрүн сактоо менен айырмаланат. Ал чыгармаларды кыргыз окурманы үчүн чеберчилик менен адаптациялайт.'
    },
    journalism: {
      titleRu: 'Публицистика',
      titleKg: 'Публицистика',
      icon: <FileText size={80} />,
      descriptionRu: 'Публицистические работы Амана Токтогулова охватывают широкий спектр социальных, культурных и политических тем, актуальных для современного Кыргызстана.',
      descriptionKg: 'Аман Токтогулдун публицистикалык иштери азыркы Кыргызстан үчүн актуалдуу болгон коомдук, маданий жана саясий темалардын кеңири спектрин камтыйт.',
      contentRu: 'В своих статьях и очерках автор поднимает важные вопросы развития общества, сохранения культурного наследия и формирования национального самосознания.',
      contentKg: 'Өз макалаларында жана очерктеринде автор коомдун өнүгүшү, маданий мурасты сактоо жана улуттук аң-сезимди калыптандыруу боюнча маанилүү маселелерди көтөрөт.'
    },
    memoirs: {
      titleRu: 'Воспоминания',
      titleKg: 'Эскерүүлөр',
      icon: <Heart size={80} />,
      descriptionRu: 'Воспоминания Амана Токтогулова - это личные размышления о жизни, творчестве и встречах с выдающимися людьми своего времени.',
      descriptionKg: 'Аман Токтогулдун эскерүүлөрү - бул жашоо, чыгармачылык жана өз доорунун көрүнүктүү адамдары менен жолугуулар жөнүндө жеке ой жүгүртүүлөр.',
      contentRu: 'Мемуары автора представляют большую ценность для понимания литературной и культурной жизни Кыргызстана второй половины XX - начала XXI века.',
      contentKg: 'Авторлун мемуарлары XX кылымдын экинчи жарымы - XXI кылымдын башындагы Кыргызстандын адабий жана маданий жашоосун түшүнүү үчүн чоң баалуулукка ээ.'
    },
    gallery: {
      titleRu: 'Фотогалерея',
      titleKg: 'Фотогалерея',
      icon: <Camera size={80} />,
      descriptionRu: 'Фотографии из жизни и творческого пути Амана Токтогулова, запечатлевшие важные моменты его биографии.',
      descriptionKg: 'Аман Токтогулдун жашоосунан жана чыгармачылык жолунан алынган, анын биографиясынын маанилүү учурларын чагылдырган сүрөттөр.',
      contentRu: 'Коллекция фотографий включает снимки с литературных мероприятий, встреч с читателями, семейные фотографии и кадры из повседневной жизни поэта.',
      contentKg: 'Сүрөттөр жыйнагы адабий иш-чараларда, окурмандар менен жолугууларда тартылган сүрөттөрдү, үй-бүлөлүк сүрөттөрдү жана акындын күнүмдүк жашоосунан алынган кадрларды камтыйт.'
    },
    video: {
      titleRu: 'Видео',
      titleKg: 'Видео',
      icon: <Video size={80} />,
      descriptionRu: 'Видеоматериалы и интервью с Аманом Токтогуловым, записи выступлений и творческих встреч.',
      descriptionKg: 'Аман Токтогулов менен видео материалдар жана интервьюлар, чыгып сүйлөөлөрдүн жана чыгармачылык жолугуулардын жазуулары.',
      contentRu: 'Видеоархив содержит записи авторских чтений, интервью, выступлений на литературных форумах и фестивалях.',
      contentKg: 'Видео архив авторлук окууларынын, интервьюлардын, адабий форумдарда жана фестивалдарда чыгып сүйлөөлөрдүн жазууларын камтыйт.'
    }
  };

  // Загрузка карточек из админки для этой категории
  useEffect(() => {
    const loadCards = () => {
      const savedCards = localStorage.getItem('contentCards');
      if (savedCards) {
        const allCards: ContentCard[] = JSON.parse(savedCards);
        // Фильтруем карточки по категории
        const filtered = allCards.filter(card => card.category === id);
        setSectionCards(filtered);
      }
    };

    loadCards();

    // Слушаем обновления из админки
    const handleCardsUpdate = () => {
      loadCards();
    };

    window.addEventListener('cardsUpdated', handleCardsUpdate);

    return () => {
      window.removeEventListener('cardsUpdated', handleCardsUpdate);
    };
  }, [id]);

  const section = sectionsData[id || ''];

  if (!section) {
    return (
      <div className="card-detail-container">
        <div className="container">
          <div className="not-found">
            <h2>{currentLang === 'kg' ? 'Бөлүм табылган жок' : 'Раздел не найден'}</h2>
            <button className="back-button" onClick={() => navigate('/')}>
              <ArrowLeft size={20} />
              {currentLang === 'kg' ? 'Башкы бетке кайтуу' : 'Вернуться на главную'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const title = currentLang === 'kg' ? section.titleKg : section.titleRu;
  const description = currentLang === 'kg' ? section.descriptionKg : section.descriptionRu;
  const content = currentLang === 'kg' ? section.contentKg : section.contentRu;

  return (
    <div className="card-detail-container">
      <div className="detail-bg-pattern"></div>
      
      <div className="container">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          {currentLang === 'kg' ? 'Артка' : 'Назад'}
        </button>

        <div className="card-detail">
          <div className="detail-content">
            <div className="detail-header">
              <div className="section-icon-large">
                {section.icon}
              </div>
              <h1 className="detail-title">{title}</h1>
            </div>

            <div className="detail-divider"></div>

            <div className="detail-description">
              <p>{description}</p>
            </div>

            <div className="detail-extra">
              <div className="extra-section">
                <h3>{currentLang === 'kg' ? 'Толук маалымат' : 'Подробная информация'}</h3>
                <p>{content}</p>
              </div>
            </div>

            {/* Карточки из админки для этой категории */}
            {sectionCards.length > 0 && (
              <div className="section-admin-cards">
                <h3 className="cards-section-title">
                  {currentLang === 'kg' ? 'Чыгармалар' : 'Произведения'}
                </h3>
                <div className="admin-cards-grid">
                  {sectionCards.map((card) => (
                    <div 
                      key={card.id} 
                      className="admin-card-item"
                      onClick={() => navigate(`/card/${card.id}`)}
                    >
                      {card.image && (
                        <div className="admin-card-image">
                          <img src={card.image} alt={currentLang === 'kg' ? (card.titleKg || card.titleRu) : card.titleRu} />
                        </div>
                      )}
                      <div className="admin-card-body">
                        <h4>{currentLang === 'kg' ? (card.titleKg || card.titleRu) : card.titleRu}</h4>
                        <p>{(currentLang === 'kg' ? (card.descriptionKg || card.descriptionRu) : card.descriptionRu).substring(0, 100)}...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="detail-actions">
              <button className="action-button primary" onClick={() => navigate('/')}>
                {currentLang === 'kg' ? 'Башкы бетке кайтуу' : 'Вернуться на главную'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;
