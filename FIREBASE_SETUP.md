# 🔥 Настройка Firebase для сайта Амана Токтогулова

## Шаг 1: Создание проекта Firebase

1. Перейдите на https://console.firebase.google.com/
2. Нажмите "Добавить проект" (Add project)
3. Введите название проекта: `aman-toktogul-site`
4. Отключите Google Analytics (не обязательно)
5. Нажмите "Создать проект"

## Шаг 2: Регистрация веб-приложения

1. В консоли Firebase выберите свой проект
2. Нажмите на иконку веб-приложения `</>`
3. Введите название приложения: `Aman Toktogul Website`
4. Отметьте "Также настроить Firebase Hosting"
5. Нажмите "Зарегистрировать приложение"
6. **СКОПИРУЙТЕ конфигурацию** (firebaseConfig)

## Шаг 3: Вставка конфигурации

1. Откройте файл `src/firebase/config.ts`
2. Замените значения в `firebaseConfig` на свои:

```typescript
const firebaseConfig = {
  apiKey: "ВАШ_API_KEY",
  authDomain: "ВАШ_PROJECT_ID.firebaseapp.com",
  projectId: "ВАШ_PROJECT_ID",
  storageBucket: "ВАШ_PROJECT_ID.appspot.com",
  messagingSenderId: "ВАШ_SENDER_ID",
  appId: "ВАШ_APP_ID"
};
```

## Шаг 4: Настройка Firestore Database

1. В меню слева выберите "Firestore Database"
2. Нажмите "Создать базу данных"
3. Выберите режим: **"Начать в тестовом режиме"** (Start in test mode)
4. Выберите регион: **europe-west** (ближайший к Кыргызстану)
5. Нажмите "Включить"

### Правила безопасности Firestore:

В разделе "Правила" (Rules) вставьте:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Все могут читать карточки
    match /contentCards/{cardId} {
      allow read: if true;
      // Только аутентифицированные пользователи могут писать
      allow write: if request.auth != null;
    }
  }
}
```

## Шаг 5: Настройка Storage

1. В меню слева выберите "Storage"
2. Нажмите "Начать"
3. Выберите режим: **"Начать в тестовом режиме"**
4. Выберите тот же регион: **europe-west**
5. Нажмите "Готово"

### Правила безопасности Storage:

В разделе "Правила" вставьте:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cards/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Шаг 6: Настройка Authentication (для админки)

1. В меню слева выберите "Authentication"
2. Нажмите "Начать"
3. Выберите метод входа: **"Email/Password"**
4. Включите его
5. Нажмите "Сохранить"

### Создание админа:

1. Перейдите на вкладку "Users"
2. Нажмите "Добавить пользователя"
3. Email: `admin@aman-toktogul.kg` (или любой другой)
4. Пароль: `aman2024` (или ваш пароль)
5. Нажмите "Добавить пользователя"

## Шаг 7: Деплой на Firebase Hosting

1. Установите Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Войдите в Firebase:
```bash
firebase login
```

3. Инициализируйте проект:
```bash
firebase init
```

Выберите:
- Hosting
- Use an existing project
- Выберите ваш проект
- Public directory: `build`
- Single-page app: `Yes`
- GitHub deploys: `No`

4. Соберите проект:
```bash
npm run build
```

5. Задеплойте:
```bash
firebase deploy
```

## 🎉 Готово!

Ваш сайт будет доступен по адресу:
`https://aman-toktogul-site.web.app`

## 📝 Важные замечания:

1. **Безопасность**: После тестирования обновите правила Firestore и Storage для большей безопасности
2. **Бэкап**: Регулярно делайте экспорт данных из Firestore
3. **Квоты**: Бесплатный план Firebase имеет лимиты. Следите за использованием в консоли

## 🆘 Если что-то не работает:

1. Проверьте правильность конфигурации в `src/firebase/config.ts`
2. Убедитесь, что правила Firestore и Storage настроены
3. Проверьте консоль браузера на ошибки
4. Убедитесь, что создан пользователь в Authentication
