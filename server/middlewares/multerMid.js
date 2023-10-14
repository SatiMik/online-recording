const multer = require('multer'); // Подключаем библиотеку Multer для обработки загрузки файлов
const path = require('path'); // Подключаем модуль для работы с путями к файлам и директориям

const storage = multer.diskStorage({
  // Настраиваем хранилище для загруженных файлов
  destination(req, file, cb) {
    // Определяем директорию, в которой будут сохранены загруженные файлы
    cb(null, './public/img');
  },
  filename(req, file, cb) {
    // Генерируем уникальное имя файла
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage, // Подключаем созданное хранилище

  // Устанавливаем ограничение на размер загружаемых файлов (10 МБ)
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    // Фильтр для определения разрешенных типов файлов
    if (file.mimetype.includes('image')) {
      // Если файл имеет MIME-тип, начинающийся с 'image', считаем его допустимым
      cb(null, true);
    } else {
      // В противном случае файл не допускается
      cb(null, false);
    }
  },
});

module.exports = upload;
// Экспортируем настроенный объект Multer для использования в других частях приложения
