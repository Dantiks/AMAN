import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Save, Image as ImageIcon } from 'lucide-react';
import { ContentCard } from '../types';
import '../styles/AdminPanel.css';

interface AdminPanelProps {
  onClose: () => void;
  currentLang: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, currentLang }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [cards, setCards] = useState<ContentCard[]>([]);
  const [editingCard, setEditingCard] = useState<ContentCard | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Форма
  const [formData, setFormData] = useState({
    titleRu: '',
    titleKg: '',
    descriptionRu: '',
    descriptionKg: '',
    image: '',
    category: 'poetry'
  });

  const ADMIN_PASSWORD = 'aman2024'; // Можно изменить на более сложный

  useEffect(() => {
    // Загрузка карточек из localStorage
    const savedCards = localStorage.getItem('contentCards');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []);

  const saveCards = (newCards: ContentCard[]) => {
    localStorage.setItem('contentCards', JSON.stringify(newCards));
    setCards(newCards);
    // Отправляем событие для обновления главной страницы
    window.dispatchEvent(new Event('cardsUpdated'));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль!');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titleRu || !formData.descriptionRu) {
      alert('Заполните обязательные поля (название и описание на русском)');
      return;
    }

    const now = Date.now();
    
    if (editingCard) {
      // Редактирование
      const updatedCards = cards.map(card => 
        card.id === editingCard.id 
          ? { ...formData, id: card.id, createdAt: card.createdAt, updatedAt: now }
          : card
      );
      saveCards(updatedCards);
    } else {
      // Создание новой карточки
      const newCard: ContentCard = {
        ...formData,
        id: `card_${now}`,
        createdAt: now,
        updatedAt: now
      };
      saveCards([...cards, newCard]);
    }

    // Сброс формы
    setFormData({
      titleRu: '',
      titleKg: '',
      descriptionRu: '',
      descriptionKg: '',
      image: '',
      category: 'poetry'
    });
    setEditingCard(null);
    setShowForm(false);
  };

  const handleEdit = (card: ContentCard) => {
    setEditingCard(card);
    setFormData({
      titleRu: card.titleRu,
      titleKg: card.titleKg,
      descriptionRu: card.descriptionRu,
      descriptionKg: card.descriptionKg,
      image: card.image || '',
      category: card.category
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту карточку?')) {
      const updatedCards = cards.filter(card => card.id !== id);
      saveCards(updatedCards);
    }
  };

  const handleCancel = () => {
    setFormData({
      titleRu: '',
      titleKg: '',
      descriptionRu: '',
      descriptionKg: '',
      image: '',
      category: 'poetry'
    });
    setEditingCard(null);
    setShowForm(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-modal">
        <div className="admin-overlay" onClick={onClose}></div>
        <div className="admin-content login-content">
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
          
          <div className="login-form-container">
            <h2>🔐 Вход в админ-панель</h2>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Пароль:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  autoFocus
                />
              </div>
              <button type="submit" className="btn-primary">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-modal">
      <div className="admin-overlay" onClick={onClose}></div>
      <div className="admin-content">
        <div className="admin-header">
          <h2>📝 Панель администратора</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="admin-body">
          <div className="admin-stats">
            <div className="stat-card">
              <span className="stat-number">{cards.length}</span>
              <span className="stat-label">Всего карточек</span>
            </div>
            <button 
              className="btn-add-new"
              onClick={() => setShowForm(!showForm)}
            >
              <Plus size={20} />
              Добавить карточку
            </button>
          </div>

          {showForm && (
            <div className="card-form">
              <h3>{editingCard ? '✏️ Редактировать карточку' : '➕ Новая карточка'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Название (Русский) *</label>
                    <input
                      type="text"
                      value={formData.titleRu}
                      onChange={(e) => setFormData({ ...formData, titleRu: e.target.value })}
                      placeholder="Введите название"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Название (Кыргызча)</label>
                    <input
                      type="text"
                      value={formData.titleKg}
                      onChange={(e) => setFormData({ ...formData, titleKg: e.target.value })}
                      placeholder="Аталышын жазыңыз"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Описание (Русский) *</label>
                    <textarea
                      value={formData.descriptionRu}
                      onChange={(e) => setFormData({ ...formData, descriptionRu: e.target.value })}
                      placeholder="Введите описание"
                      rows={4}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Описание (Кыргызча)</label>
                    <textarea
                      value={formData.descriptionKg}
                      onChange={(e) => setFormData({ ...formData, descriptionKg: e.target.value })}
                      placeholder="Сүрөттөмөсүн жазыңыз"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Категория</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="poetry">Поэзия</option>
                      <option value="prose">Проза</option>
                      <option value="translations">Переводы</option>
                      <option value="journalism">Публицистика</option>
                      <option value="memoirs">Воспоминания</option>
                      <option value="gallery">Фотогалерея</option>
                      <option value="video">Видео</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Изображение</label>
                    <div className="image-upload">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="upload-label">
                        <ImageIcon size={20} />
                        Выбрать фото
                      </label>
                    </div>
                  </div>
                </div>

                {formData.image && (
                  <div className="image-preview">
                    <img src={formData.image} alt="Preview" />
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    <Save size={18} />
                    {editingCard ? 'Сохранить изменения' : 'Создать карточку'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={handleCancel}>
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="cards-list">
            <h3>📋 Список карточек</h3>
            {cards.length === 0 ? (
              <p className="empty-message">Пока нет карточек. Создайте первую!</p>
            ) : (
              <div className="cards-grid">
                {cards.map(card => (
                  <div key={card.id} className="admin-card">
                    {card.image && (
                      <div className="admin-card-image">
                        <img src={card.image} alt={card.titleRu} />
                      </div>
                    )}
                    <div className="admin-card-content">
                      <h4>{card.titleRu}</h4>
                      <p className="card-category">{card.category}</p>
                      <p className="card-description">{card.descriptionRu.substring(0, 100)}...</p>
                      <div className="card-actions">
                        <button 
                          className="btn-edit"
                          onClick={() => handleEdit(card)}
                        >
                          <Edit2 size={16} />
                          Изменить
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => handleDelete(card.id)}
                        >
                          <Trash2 size={16} />
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
