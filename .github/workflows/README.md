# GitHub Actions для автодеплоя Frontend

## Настройка секретов

Для работы автодеплоя нужно добавить следующие секреты в настройках репозитория (Settings → Secrets and variables → Actions):

### Обязательные секреты:

1. **HOST** - IP адрес или домен сервера
   ```
   example: 192.168.1.100 или your-server.com
   ```

2. **USERNAME** - имя пользователя для SSH подключения
   ```
   example: ubuntu или deploy
   ```

3. **SSH_PRIVATE_KEY** - приватный SSH ключ для подключения к серверу
   ```
   Содержимое файла ~/.ssh/id_rsa (или другого приватного ключа)
   ```

4. **TELEGRAM_BOT_TOKEN** - токен Telegram бота для уведомлений
   ```
   example: 1234567890:AABBCCDDEEFFgghhiijjkkllmmnnoo
   ```

### Как получить SSH ключ:

```bash
# На локальной машине или в CI/CD
ssh-keygen -t ed25519 -C "your-email@example.com"

# Скопировать публичный ключ на сервер
ssh-copy-id -i ~/.ssh/id_ed25519.pub username@your-server

# Добавить приватный ключ в GitHub Secrets
cat ~/.ssh/id_ed25519
```

### Структура папок на сервере:

Убедитесь что на сервере существует:
```
~/spichka/
└── Spichka-mobile-web/  (клон репозитория)
    ├── deploy.sh
    ├── docker-compose.yml
    ├── Dockerfile
    └── ... (остальные файлы проекта)
```

### Настройка сервера:

1. Установите Docker и Docker Compose
2. Клонируйте репозиторий в нужную папку
3. Убедитесь что deploy.sh имеет права на выполнение:
   ```bash
   chmod +x ~/spichka/Spichka-mobile-web/deploy.sh
   ```

## Как работает пайплайн:

1. **Trigger**: Автоматически запускается при push в ветку `main`
2. **Build**: Устанавливает Node.js, dependencies, запускает линтер и build
3. **Deploy**: Подключается к серверу по SSH и запускает деплой
4. **Notifications**: Отправляет уведомления в Telegram на всех этапах

## Мониторинг:

- Логи деплоя: GitHub Actions tab в репозитории
- Логи приложения: `docker-compose logs -f spichka-app`
- Статус контейнера: `docker-compose ps`

## Troubleshooting:

### Если деплой падает:
1. Проверьте логи в GitHub Actions
2. Проверьте SSH подключение
3. Убедитесь что все секреты настроены правильно
4. Проверьте права на папки и файлы на сервере

### Если приложение не запускается:
1. Проверьте переменные окружения (.env файлы)
2. Проверьте логи Docker: `docker-compose logs spichka-app`
3. Проверьте что порт 3000 свободен

### Если нет уведомлений в Telegram:
1. Проверьте TELEGRAM_BOT_TOKEN
2. Убедитесь что бот добавлен в чат
3. Проверьте ID чата (-1002824319072)
